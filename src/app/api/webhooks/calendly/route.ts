import { NextResponse } from "next/server";
import { getPrismaClient } from "@/lib/server/db";
import { sendEmail } from "@/lib/integrations/email";
import { syncLeadToHubSpot } from "@/lib/integrations/hubspot";

export async function POST(request: Request) {
  try {
    const payload = await request.json().catch(() => null);
    if (!payload || !payload.event) {
      return NextResponse.json({ error: "Invalid webhook payload" }, { status: 400 });
    }

    console.log(`[Calendly Webhook Received] Event: ${payload.event}`);

    // We process "invitee.created" and "invitee.canceled"
    if (payload.event === "invitee.created") {
      const invitee = payload.payload?.invitee || {};
      const scheduledEvent = payload.payload?.event || {};

      const email = invitee.email?.toLowerCase().trim();
      const name = invitee.name || "";
      const startTime = scheduledEvent.start_time ? new Date(scheduledEvent.start_time) : new Date();
      const joinUrl = scheduledEvent.location?.join_url || scheduledEvent.location?.location || "Phone Consultation";

      const [firstName, ...rest] = name.split(" ");
      const lastName = rest.join(" ");

      const prisma = getPrismaClient();

      try {
        // 1. Find or create lead
        let lead = await prisma.lead.findFirst({
          where: { email },
        });

        if (!lead) {
          lead = await prisma.lead.create({
            data: {
              firstName: firstName || "Scheduled",
              lastName: lastName || "Prospect",
              email: email || `prospect_${Date.now()}@calendly.user`,
              phone: invitee.text_reminder_number || "Not provided",
              service: "consultation",
              status: "assigned",
              message: `Booked via Calendly: ${scheduledEvent.name || "15-Min Consultation"}`,
              consent: true,
              consentVersion: "v1-calendly",
              consentText: "Affirmative consent granted during Calendly scheduling",
              consentAt: new Date(),
            },
          });
        } else {
          // Update status to assigned
          await prisma.lead.update({
            where: { id: lead.id },
            data: { status: "assigned" },
          });
        }

        // 2. Create Follow-Up Task for Angel Burgos
        await prisma.followUpTask.create({
          data: {
            leadId: lead.id,
            title: `📅 Consultation: ${name} (${scheduledEvent.name || "15-Min Diagnostic"})`,
            dueAt: startTime,
            status: "pending",
          },
        });

        // 3. Add to Lead Notes
        await prisma.leadNote.create({
          data: {
            leadId: lead.id,
            body: `📅 [Calendly Booking Confirmed]: Scheduled for ${startTime.toLocaleString()} • Link: ${joinUrl}`,
          },
        });

        // 4. Sync appointment to HubSpot
        syncLeadToHubSpot({
          firstName: lead.firstName,
          lastName: lead.lastName,
          email: lead.email,
          phone: lead.phone,
          service: "Scheduled Consultation",
          message: `Scheduled Consultation on ${startTime.toLocaleString()} (${joinUrl})`,
        }).catch(console.error);

        // 5. Send Advisor Email Alert
        await sendEmail({
          to: "angelburgosrosado@gmail.com",
          subject: `📅 New Consultation Booked: ${name} on ${startTime.toLocaleDateString()}`,
          text: `A new client consultation has been booked through your live calendar!\n\nClient Name: ${name}\nEmail: ${email}\nScheduled Time: ${startTime.toLocaleString()}\nMeeting Link / Location: ${joinUrl}\n\nView Lead Dossier: https://abglco.com/admin/leads/${lead.id}`,
        });
      } catch (dbErr) {
        console.warn("[Calendly Webhook DB operation warning]:", dbErr);
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[Calendly Webhook Handler Fatal Error]:", error);
    return NextResponse.json({ error: "Internal webhook processing error" }, { status: 500 });
  }
}
