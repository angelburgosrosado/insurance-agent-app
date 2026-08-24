import { NextResponse } from "next/server";
import { leadInputFromUnknown } from "@/lib/db";
import { getLeadRepository } from "@/lib/server/leads";
import { validateLeadRequest } from "@/lib/server/lead-validation";
import { leadRateLimiter, rateLimitResponse, requestClientKey } from "@/lib/server/rate-limit";
import { sendEmail, buildCustomerAutoReplyHtml } from "@/lib/integrations/email";
import { dispatchToCRM } from "@/lib/integrations/crm";

export async function POST(request: Request) {
  const rateLimit = leadRateLimiter.check(requestClientKey(request));
  if (!rateLimit.allowed) return rateLimitResponse(rateLimit);

  const body = await request.json().catch(() => null);
  const validation = validateLeadRequest(body);
  if (!validation.valid) return NextResponse.json({ error: validation.error }, { status: validation.error === "Invalid request" ? 400 : 422 });

  const lead = await getLeadRepository().createLead(leadInputFromUnknown(body));

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

    // 3. Webhook CRM Integration
    dispatchToCRM({
      event: "lead.created",
      data: lead,
      timestamp: new Date().toISOString()
    })
  ]).catch(console.error);

  return NextResponse.json({ ok: true, leadId: lead.id }, { status: 201 });
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
