import { NextResponse } from "next/server";
import { db, isLeadStatus } from "@/lib/db";

export async function GET() {
  return NextResponse.json({ leads: db.listLeads() });
}

export async function PATCH(request: Request) {
  const body = await request.json().catch(() => null) as { id?: unknown; status?: unknown; followUpDate?: unknown } | null;
  const id = Number(body?.id);
  if (!Number.isInteger(id) || id < 1 || !isLeadStatus(body?.status)) {
    return NextResponse.json({ error: "Valid lead id and status are required" }, { status: 422 });
  }
  try {
    const lead = db.updateLead(id, { status: body.status, followUpDate: typeof body.followUpDate === "string" ? body.followUpDate : undefined });
    return NextResponse.json({ lead });
  } catch {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }
}
