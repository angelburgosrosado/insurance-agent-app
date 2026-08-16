import { NextResponse } from "next/server";
import { getPrismaClient } from "@/lib/server/db";
import { createServerClient } from "@supabase/ssr";
import { getSupabaseConfig } from "@/lib/supabase/env";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const config = getSupabaseConfig();
    const cookieStore = await cookies();
    
    if (!config.configured) {
      return NextResponse.json({ error: "Configuration missing" }, { status: 500 });
    }

    const supabase = createServerClient(config.url, config.publishableKey, {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll() {}
      }
    });

    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { preferredDate, preferredTime, reason } = body;

    if (!preferredDate || !preferredTime) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const prisma = getPrismaClient();

    let lead = await prisma.lead.findFirst({
      where: { email: user.email }
    });

    if (!lead) {
      return NextResponse.json({ error: "Lead profile not found. Please complete profile first." }, { status: 400 });
    }

    // CONCEPT: Google Calendar API Integration goes here.
    // We would use the googleapis package with a Service Account to create a tentative event
    // or generate a scheduling link.
    // For now, we simulate the integration by creating an internal FollowUpTask.

    const task = await prisma.followUpTask.create({
      data: {
        leadId: lead.id,
        assignee: "angelburgosrosado@gmail.com", // Assign to admin
        dueDate: new Date(preferredDate),
        status: "pending",
        priority: "high"
      }
    });

    // Also add a note so the advisor knows the context
    await prisma.leadNote.create({
      data: {
        leadId: lead.id,
        author: user.email,
        body: `Requested consultation for ${preferredDate} at ${preferredTime}. Reason: ${reason || "N/A"}`
      }
    });

    // Audit the action
    await prisma.auditEvent.create({
      data: {
        actor: user.email,
        action: "REQUEST_CONSULTATION",
        entity: "LEAD",
        entityId: lead.id,
        metadata: JSON.stringify({ preferredDate, preferredTime, reason })
      }
    });

    return NextResponse.json({ success: true, taskId: task.id });
  } catch (error) {
    console.error("[API_PORTAL_APPOINTMENTS]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
