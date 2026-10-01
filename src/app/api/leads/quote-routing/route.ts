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

    let advisorMessage = `[Quote Parameters] Coverage/Amount: ${payload.quoteParameters.coverageOrInvestmentAmount} | Category: ${payload.quoteParameters.category}`;
    if (payload.npn || payload.quoteParameters.npn) {
      advisorMessage += ` | NPN: ${payload.npn || payload.quoteParameters.npn}`;
    }
    if (payload.licenseNumber || payload.quoteParameters.licenseNumber) {
      advisorMessage += ` | License: ${payload.licenseState || payload.quoteParameters.licenseState || "US"} #${payload.licenseNumber || payload.quoteParameters.licenseNumber}`;
    }
    advisorMessage += ` | Notes: ${payload.quoteParameters.notes || "None"}`;

    // 4. Persistence into Lead Repository (Prisma with resilient SQLite/in-memory fallback)
    let storedLead: any = null;
    try {
      storedLead = await getLeadRepository().createLead({
        firstName: payload.applicantFirstName,
        lastName: payload.applicantLastName,
        email: payload.applicantEmail,
        phone: payload.applicantPhone,
        service: `${payload.productInterest}: ${payload.quoteParameters.productSubtype}`,
        contactTime: payload.preferredTimeOfDay || "afternoon",
        message: advisorMessage,
        consent: true,
        consentText: "TCPA Affirmative Consent verified for MyIAD lead routing.",
        consentVersion: payload.consentVersion,
        consentAt: payload.consentTimestamp,
        source: payload.source,
        medium: payload.medium,
        campaign: payload.campaign,
      });
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
              body: `Hello ${payload.applicantFirstName}, thank you for requesting a ${payload.productInterest} quote with MyIAD / AB Global. Your licensed advisor Angel Burgos will review your personalized scenario shortly. Call/text: (386) 333-1482.`,
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
        error: "An unexpected error occurred while processing your quote request. Please call (386) 333-1482.",
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
