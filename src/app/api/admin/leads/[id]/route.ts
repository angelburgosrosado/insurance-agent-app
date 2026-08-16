import { NextResponse } from "next/server";
import { getPrismaClient } from "@/lib/server/db";
import { createClient } from "@/lib/supabase/server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const prisma = getPrismaClient();
    
    // Auth Check
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user || user.email !== "angelburgosrosado@gmail.com") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (body.action === "update_task") {
      const { taskId, status } = body;
      const updatedTask = await prisma.followUpTask.update({
        where: { id: taskId, leadId: id },
        data: { status },
      });
      return NextResponse.json({ task: updatedTask });
    }

    // Default: update lead status
    if (body.status) {
      const updatedLead = await prisma.lead.update({
        where: { id },
        data: { status: body.status },
      });
      return NextResponse.json({ lead: updatedLead });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const prisma = getPrismaClient();
    
    // Auth Check
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user || user.email !== "angelburgosrosado@gmail.com") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (body.action === "add_note") {
      const note = await prisma.leadNote.create({
        data: {
          leadId: id,
          body: body.body,
          authorId: user.id, // Or just save the name if schema prefers
        },
      });
      return NextResponse.json({ note });
    }

    if (body.action === "add_task") {
      const dueAt = body.dueAt ? new Date(body.dueAt) : null;
      const task = await prisma.followUpTask.create({
        data: {
          leadId: id,
          title: body.title,
          status: "pending",
          dueAt,
        },
      });
      return NextResponse.json({ task });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
