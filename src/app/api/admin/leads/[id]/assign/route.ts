import { NextResponse } from "next/server";
import { getPrismaClient } from "@/lib/server/db";
import { requireApiStaffAccess } from "@/lib/auth/server";
import { sendEmail } from "@/lib/integrations/email";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireApiStaffAccess();
  if (!auth.authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const { agentEmail, agentName, notes } = body;

    const prisma = getPrismaClient();

    const lead = await prisma.lead.findUnique({ where: { id } });
    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    let targetUser = null;
    if (agentEmail) {
      targetUser = await prisma.user.findUnique({ where: { email: agentEmail } });
      if (!targetUser) {
        // Create user placeholder if doesn't exist
        targetUser = await prisma.user.create({
          data: {
            email: agentEmail,
            name: agentName || agentEmail.split("@")[0],
            role: "user",
          },
        });
      }
    }

    // Update lead assignment
    const updatedLead = await prisma.lead.update({
      where: { id },
      data: {
        assignedToId: targetUser?.id || null,
        status: targetUser ? "assigned" : lead.status,
      },
    });

    const assigneeLabel = agentName || agentEmail || "Unassigned";

    // Record internal note
    await prisma.leadNote.create({
      data: {
        leadId: id,
        body: `👤 [Lead Assigned]: Assigned to ${assigneeLabel}${notes ? ` • Note: ${notes}` : ""}`,
      },
    });

    // Notify assigned agent via email
    if (agentEmail) {
      await sendEmail({
        to: agentEmail,
        subject: `🚨 Lead Assigned to You: ${lead.firstName} ${lead.lastName} (${lead.service})`,
        text: `You have been assigned a prospective client lead!\n\nName: ${lead.firstName} ${lead.lastName}\nEmail: ${lead.email}\nPhone: ${lead.phone}\nService: ${lead.service}\nBest Time: ${lead.contactTime || "Not specified"}\n\nClient Scenario / Notes:\n${lead.message || "N/A"}\n\nView lead dossier: https://abglco.com/admin/leads/${lead.id}`,
      });
    }

    return NextResponse.json({
      success: true,
      lead: updatedLead,
      assignedTo: assigneeLabel,
    });
  } catch (error) {
    console.error("[Lead Assignment Error]", error);
    return NextResponse.json({ error: "Failed to assign lead" }, { status: 500 });
  }
}
