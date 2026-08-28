import { NextResponse } from "next/server";
import { leadInputFromUnknown } from "@/lib/db";
import { getLeadRepository } from "@/lib/server/leads";
import { validateLeadRequest } from "@/lib/server/lead-validation";
import { leadRateLimiter, rateLimitResponse, requestClientKey } from "@/lib/server/rate-limit";
import { sendEmail, buildCustomerAutoReplyHtml } from "@/lib/integrations/email";
import { sendSMS, buildWelcomeSMS } from "@/lib/integrations/sms";
import { dispatchToCRM } from "@/lib/integrations/crm";
import { syncLeadToHubSpot } from "@/lib/integrations/hubspot";

export async function POST(request: Request) {
  try {
    const rateLimit = leadRateLimiter.check(requestClientKey(request));
    if (!rateLimit.allowed) return rateLimitResponse(rateLimit);

    const body = await request.json().catch(() => null);
    const validation = validateLeadRequest(body);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: validation.error === "Invalid request" ? 400 : 422 }
      );
    }

    const inputData = leadInputFromUnknown(body);
    let lead: any = null;

    try {
      lead = await getLeadRepository().createLead(inputData);
    } catch (dbError) {
      console.error("[Leads API] Database lead creation warning, proceeding with resilient dispatch:", dbError);
      lead = {
        id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        ...inputData,
        status: "new",
        createdAt: new Date().toISOString(),
      };
    }

    // Build personalized customer auto-reply payload
    const langMatch = lead.message?.match(/\[Lang:\s*([a-z]+)\]/i);
    const detectedLang = langMatch ? langMatch[1].toLowerCase() : "en";
    const customerReply = buildCustomerAutoReplyHtml({
      firstName: lead.firstName,
      service: lead.service,
      lang: detectedLang,
    });

    // Asynchronously dispatch to integrations so we don't block the client response
    Promise.allSettled([
      // 1. Advisor Notification
      sendEmail({
        to: "angelburgosrosado@gmail.com",
        subject: `🚨 New Lead: ${lead.firstName} ${lead.lastName} (${lead.service})`,
        text: `A new lead has been received.\n\nName: ${lead.firstName} ${lead.lastName}\nEmail: ${lead.email}\nPhone: ${lead.phone}\nService: ${lead.service}\nSource: ${lead.source || "Direct"}\nCampaign: ${lead.campaign || "None"}\n\nMessage: ${lead.message}`,
      }),

      // 2. Customer Confirmation & Guide Auto-Delivery
      sendEmail({
        to: lead.email,
        subject: customerReply.subject,
        text: customerReply.text,
        html: customerReply.html,
      }),

      // 3. Native HubSpot CRM Sync
      syncLeadToHubSpot({
        firstName: lead.firstName,
        lastName: lead.lastName,
        email: lead.email,
        phone: lead.phone,
        service: lead.service,
        message: lead.message,
        source: lead.source,
        medium: lead.medium,
        campaign: lead.campaign,
      }),

      // 4. Webhook CRM Integration
      dispatchToCRM({
        event: "lead.created",
        data: lead,
        timestamp: new Date().toISOString(),
      }),

      // 5. Automated Welcome SMS (if valid phone provided and affirmative consent granted)
      ...(lead.phone && lead.consent && !lead.phone.toLowerCase().includes("request")
        ? [
            sendSMS({
              to: lead.phone,
              body: buildWelcomeSMS({
                firstName: lead.firstName,
                service: lead.service,
                lang: detectedLang,
              }),
            }),
          ]
        : []),
    ]).catch(console.error);

    return NextResponse.json({ ok: true, leadId: lead.id }, { status: 201 });
  } catch (error: any) {
    console.error("[Leads Route Handler Fatal Error]:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request. Please try again or call (386) 333-1482." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
