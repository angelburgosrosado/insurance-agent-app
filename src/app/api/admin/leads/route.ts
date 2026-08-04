import { NextResponse } from "next/server";
import { isLeadStatus } from "@/lib/db";
import { getLeadRepository, type LeadId } from "@/lib/server/leads";
import { requireApiStaffAccess } from "@/lib/auth/server";

async function requireStaffApiResponse() {
  const authorization = await requireApiStaffAccess();
  if (!authorization.authenticated) return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  if (!authorization.authorized) return NextResponse.json({ error: "Staff access required" }, { status: 403 });
  return null;
}

function parseLeadId(value: unknown): LeadId | null {
  if (typeof value === "number" && Number.isSafeInteger(value) && value > 0) return value;
  if (typeof value !== "string" || !value.trim()) return null;
  const normalized = value.trim();
  if (/^\d+$/.test(normalized)) {
    const numeric = Number(normalized);
    return Number.isSafeInteger(numeric) && numeric > 0 ? numeric : null;
  }
  return normalized;
}

export async function GET() {
  const denied = await requireStaffApiResponse();
  if (denied) return denied;
  return NextResponse.json({ leads: await getLeadRepository().listLeads() });
}

export async function PATCH(request: Request) {
  const denied = await requireStaffApiResponse();
  if (denied) return denied;
  const body = await request.json().catch(() => null) as { id?: unknown; status?: unknown; followUpDate?: unknown } | null;
  const id = parseLeadId(body?.id);
  if (id === null || !isLeadStatus(body?.status)) {
    return NextResponse.json({ error: "Valid lead id and status are required" }, { status: 422 });
  }
  try {
    const lead = await getLeadRepository().updateLead(id, { status: body.status, followUpDate: typeof body.followUpDate === "string" ? body.followUpDate : undefined });
    return NextResponse.json({ lead });
  } catch {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }
}
