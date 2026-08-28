import { NextResponse } from "next/server";
import { getPrismaClient } from "@/lib/server/db";
import { requireApiStaffAccess } from "@/lib/auth/server";
import { sendSMS } from "@/lib/integrations/sms";

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
    const { message } = body;

    if (!message || !message.trim()) {
      return NextResponse.json({ error: "Message content is required" }, { status: 400 });
    }

    const prisma = getPrismaClient();
    const lead = await prisma.lead.findUnique({ where: { id } });

    if (!lead || !lead.phone) {
      return NextResponse.json({ error: "Lead not found or has no phone number on file" }, { status: 404 });
    }

    const result = await sendSMS({
      to: lead.phone,
      body: message.trim(),
    });

    if (!result.success && !result.mock) {
      return NextResponse.json({ error: result.error || "Failed to dispatch SMS" }, { status: 502 });
    }

    // Save outbound SMS to lead notes
    await prisma.leadNote.create({
      data: {
        leadId: id,
        body: `📤 [Outbound SMS Sent by Staff]: "${message.trim()}" (Status: ${result.provider || "sent"})`,
      },
    });

    return NextResponse.json({
      success: true,
      messageId: result.messageId,
      mock: result.mock,
    });
  } catch (error) {
    console.error("[Admin SMS Dispatch Error]", error);
    return NextResponse.json({ error: "Failed to send SMS" }, { status: 500 });
  }
}
