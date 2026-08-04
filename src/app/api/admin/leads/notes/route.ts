import { NextResponse } from "next/server";
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

export async function GET(request: Request) {
  const denied = await requireStaffApiResponse();
  if (denied) return denied;
  const leadId = parseLeadId(new URL(request.url).searchParams.get("leadId"));
  if (leadId === null) return NextResponse.json({ error: "Valid lead id is required" }, { status: 422 });
  return NextResponse.json({ notes: await getLeadRepository().listNotes(leadId) });
}

export async function POST(request: Request) {
  const denied = await requireStaffApiResponse();
  if (denied) return denied;
  const body = await request.json().catch(() => null) as { leadId?: unknown; body?: unknown; author?: unknown } | null;
  const leadId = parseLeadId(body?.leadId);
  const noteBody = typeof body?.body === "string" ? body.body.trim() : "";
  const author = typeof body?.author === "string" && body.author.trim() ? body.author.trim() : "Marketing team";
  if (leadId === null || !noteBody) return NextResponse.json({ error: "Lead id and note are required" }, { status: 422 });
  try {
    return NextResponse.json({ note: await getLeadRepository().addNote(leadId, noteBody, author) }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }
}

