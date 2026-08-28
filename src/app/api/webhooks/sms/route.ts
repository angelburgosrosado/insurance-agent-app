import { getPrismaClient } from "@/lib/server/db";
import { sendEmail } from "@/lib/integrations/email";

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    let fromNumber = "";
    let bodyText = "";

    if (contentType.includes("application/x-www-form-urlencoded")) {
      const formData = await request.formData();
      fromNumber = (formData.get("From") as string) || "";
      bodyText = (formData.get("Body") as string) || "";
    } else {
      const json = await request.json().catch(() => ({}));
      fromNumber = json.From || json.from || "";
      bodyText = json.Body || json.body || "";
    }

    if (!fromNumber || !bodyText) {
      return new Response("<Response></Response>", {
        headers: { "Content-Type": "text/xml" },
        status: 200,
      });
    }

    const cleanPhone = fromNumber.replace(/\D/g, "");
    const last10Digits = cleanPhone.slice(-10);

    console.log(`[SMS Webhook Received] From: ${fromNumber} | Text: "${bodyText}"`);

    // Check for Stop / Opt-out
    const isOptOut = /^(stop|unsubscribe|cancel|quit|end)$/i.test(bodyText.trim());

    const prisma = getPrismaClient();

    try {
      // Find matching lead by phone
      const lead = await prisma.lead.findFirst({
        where: {
          phone: {
            contains: last10Digits,
          },
        },
      });

      if (lead) {
        // Record client reply in lead notes
        await prisma.leadNote.create({
          data: {
            leadId: lead.id,
            body: `📱 [Inbound SMS Reply]: "${bodyText}"${isOptOut ? " (Client requested STOP / Opt-Out)" : ""}`,
          },
        });

        // Notify Advisor
        await sendEmail({
          to: "angelburgosrosado@gmail.com",
          subject: `📱 SMS Reply from ${lead.firstName} ${lead.lastName} (${lead.phone})`,
          text: `A lead has replied via SMS!\n\nLead Name: ${lead.firstName} ${lead.lastName}\nPhone: ${lead.phone}\nService: ${lead.service}\n\nClient Message:\n"${bodyText}"\n\nView lead dossier: https://abglco.com/admin/leads/${lead.id}`,
        });
      }
    } catch (dbErr) {
      console.warn("[SMS Webhook DB note warning]:", dbErr);
    }

    // Twilio expects TwiML XML response
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
</Response>`;

    return new Response(twiml, {
      headers: { "Content-Type": "text/xml" },
      status: 200,
    });
  } catch (error) {
    console.error("[SMS Webhook Handler Error]", error);
    return new Response("<Response></Response>", {
      headers: { "Content-Type": "text/xml" },
      status: 200,
    });
  }
}
