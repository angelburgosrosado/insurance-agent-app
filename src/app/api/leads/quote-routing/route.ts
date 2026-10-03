import { NextResponse } from "next/server";
import { leadRateLimiter, rateLimitResponse, requestClientKey } from "@/lib/server/rate-limit";
import { getLeadRepository } from "@/lib/server/leads";
import { evaluateLeadRouting } from "@/lib/server/lead-routing";
import {
  validateMyIADLeadPayload,
  dispatchToMyIADCrm,
} from "@/lib/integrations/crm-myiad";
import { redactPiiFromText } from "@/lib/security/pii-guard";
import { sendEmail, buildCustomerAutoReplyHtml } from "@/lib/integrations/email";
import { sendSMS, dispatchAdvisorAlertSMS } from "@/lib/integrations/sms";

export async function POST(request: Request) {
  try {
    // 1. Rate Limit Enforcement
    const rateLimit = leadRateLimiter.check(requestClientKey(request));
    if (!rateLimit.allowed) {
      return rateLimitResponse(rateLimit);
    }

    // 2. Parse and Validate Payload
    const rawBody = await request.json().catch(() => null);
    const validation = validateMyIADLeadPayload(rawBody);

    if (!validation.valid) {
      return NextResponse.json(
        {
          error: validation.message,
          errors: validation.errors,
        },
        { status: 422 }
      );
    }

    const payload = validation.payload;

    // 3. Lead Territory & Advisor Routing
    const routingDecision = evaluateLeadRouting({
      phone: payload.applicantPhone,
      service: `${payload.productInterest} - ${payload.quoteParameters.productSubtype}`,
      message: `${payload.quoteParameters.notes} [Zip: ${payload.zipCode}]`,
    });

    payload.territory = routingDecision.territory;

    const coverageAmt = payload.quoteParameters.coverageOrInvestmentAmount || "$500,000";
    const territoryLabel = routingDecision.territory;
    const specLabel = routingDecision.specialization;

    let advisorMessage = `[Front Page Intake] Strategy: ${payload.productInterest} (${payload.quoteParameters.productSubtype || "Direct"}). Target Amount: ${coverageAmt}. Territory: ${territoryLabel} [ZIP: ${payload.zipCode}]. Underwriting: ${specLabel}.`;
    if (payload.npn || payload.quoteParameters.npn) {
      advisorMessage += ` NPN: ${payload.npn || payload.quoteParameters.npn}.`;
    }
    if (payload.licenseNumber || payload.quoteParameters.licenseNumber) {
      advisorMessage += ` Lic: ${payload.licenseState || payload.quoteParameters.licenseState || "US"} #${payload.licenseNumber || payload.quoteParameters.licenseNumber}.`;
    }
    if (payload.quoteParameters.notes && payload.quoteParameters.notes !== "None") {
      advisorMessage += ` Notes: ${payload.quoteParameters.notes}`;
    }

    // 4. Persistence into Lead Repository (Prisma with resilient SQLite/in-memory fallback)
    let storedLead: any = null;
    try {
      const repo = getLeadRepository();
      storedLead = await repo.createLead({
        firstName: payload.applicantFirstName,
        lastName: payload.applicantLastName,
        email: payload.applicantEmail,
        phone: payload.applicantPhone,
        service: `${payload.productInterest} - ${payload.quoteParameters.productSubtype || "Direct"} (${coverageAmt})`,
        contactTime: payload.preferredTimeOfDay || "afternoon",
        message: advisorMessage,
        consent: true,
        consentText: "TCPA Affirmative Consent verified for MyIAD lead routing.",
        consentVersion: payload.consentVersion || "myiad_tcpa_v2.0",
        consentAt: payload.consentTimestamp || new Date().toISOString(),
        source: payload.source || "myiad.com front page",
        medium: payload.medium || "organic",
        campaign: payload.campaign || "direct-intake",
      });

      // Add AI Underwriting Annotation Note into CRM
      if (storedLead?.id) {
        try {
          await repo.addNote(
            storedLead.id,
            `🎯 AI Underwriting Annotation:
• Territory: ${territoryLabel} (${specLabel})
• Recommended Strategy: ${payload.productInterest} - ${payload.quoteParameters.productSubtype}
• Protection Need / Target: ${coverageAmt}
• Statutory Compliance: TCPA Affirmative Consent verified (${payload.consentVersion || "v2.0"})
• Summary: Lead captured via ${payload.source || "myiad.com front page"}. Advisor alert dispatched to Angel Burgos (+1-386-333-1482).`,
            "MyIAD AI Copilot"
          );
        } catch (noteErr) {
          console.warn("[Quote Routing] Note annotation warning:", noteErr);
        }
      }
    } catch (dbErr: any) {
      console.error("[Quote Routing API] Database write warning, proceeding resiliently:", redactPiiFromText(dbErr?.message || ""));
      storedLead = {
        id: `quote_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        ...payload,
        createdAt: new Date().toISOString(),
      };
    }

    // 5. Direct Lead Routing Hook into crm.myiad.net Pipeline
    const crmResult = await dispatchToMyIADCrm(payload);

    // 6. Asynchronous Notification & Auto-Reply Dispatch
    const customerReply = buildCustomerAutoReplyHtml({
      firstName: payload.applicantFirstName,
      service: `${payload.productInterest} Quote Request`,
      lang: "en",
    });

    Promise.allSettled([
      // Advisor alert
      sendEmail({
        to: routingDecision.suggestedAgentEmail || "angelburgosrosado@gmail.com",
        subject: `🎯 New MyIAD Quote Lead: ${payload.applicantName} (${payload.productInterest})`,
        text: `New lead received from MyIAD Quote Selector.

Applicant: ${payload.applicantName}
Email: ${payload.applicantEmail}
Phone: ${payload.applicantPhone}
ZIP: ${payload.zipCode}
Territory: ${routingDecision.territory}
Product: ${payload.productInterest} - ${payload.quoteParameters.productSubtype}
Amount: ${payload.quoteParameters.coverageOrInvestmentAmount}
CRM Status: ${crmResult.success ? "Dispatched" : "Failed/Mock"}

Client Notes: ${payload.quoteParameters.notes || "None"}`,
      }),

      // Advisor real-time SMS dispatch alert
      dispatchAdvisorAlertSMS({
        applicantName: payload.applicantName,
        serviceOrProduct: `${payload.productInterest} - ${payload.quoteParameters.productSubtype}`,
        applicantPhone: payload.applicantPhone,
        applicantEmail: payload.applicantEmail,
        territory: routingDecision.territory,
        amount: payload.quoteParameters.coverageOrInvestmentAmount,
        notes: payload.quoteParameters.notes,
        source: "MyIAD Quote Selector",
      }),

      // Customer confirmation
      sendEmail({
        to: payload.applicantEmail,
        subject: customerReply.subject,
        text: customerReply.text,
        html: customerReply.html,
      }),

      // SMS confirmation if valid phone provided
      ...(payload.applicantPhone && !payload.applicantPhone.toLowerCase().includes("request")
        ? [
            sendSMS({
              to: payload.applicantPhone,
              body: `Hello ${payload.applicantFirstName}, thank you for requesting your personalized blueprint with MyIAD National Insurance Solutions. A licensed specialist will review your scenario shortly. View your blueprint: https://myiad.com/api/reports/download?type=myiad_blueprint&name=${encodeURIComponent(payload.applicantName)}&coverage=${payload.quoteParameters.coverageOrInvestmentAmount || 0} or call toll-free (888) 887-3585.`,
            }),
          ]
        : []),
    ]).catch((dispatchErr: any) => {
      console.warn("[Quote Routing API] Background dispatch warning:", redactPiiFromText(dispatchErr?.message || ""));
    });

    return NextResponse.json(
      {
        ok: true,
        success: true,
        leadId: storedLead.id,
        blueprintUrl: `/api/reports/download?type=myiad_blueprint&name=${encodeURIComponent(payload.applicantName)}&coverage=${payload.quoteParameters.coverageOrInvestmentAmount || 0}`,
        crmPipeline: {
          dispatched: crmResult.success,
          crmLeadId: crmResult.leadId,
          simulated: Boolean(crmResult.mock),
          error: crmResult.error,
        },
        routing: {
          territory: routingDecision.territory,
          advisor: routingDecision.suggestedAgentEmail,
          specialization: routingDecision.specialization,
        },
        scheduledBookingUrl:
          process.env.NEXT_PUBLIC_CALENDLY_URL ||
          "https://calendly.com/abglobalconsulting/15-min-consultation-abglobalceo",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("[Quote Routing API Fatal Error]:", redactPiiFromText(error?.message || ""));
    return NextResponse.json(
      {
        error: "An unexpected error occurred while processing your quote request. Please call toll-free (888) 887-3585.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      service: "MyIAD Quote Selector & Lead Routing API",
      version: "2026.1",
      supportedCategories: ["life", "health", "variable_annuity", "strategic_advisory", "strategic-portfolio"],
      pipelineTarget: "crm.myiad.net",
    },
    { status: 200 }
  );
}
