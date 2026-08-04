import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireApiAuthentication } from "@/lib/auth/server";

export async function GET(request: Request) {
  if (!(await requireApiAuthentication())) return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  const leadId = Number(new URL(request.url).searchParams.get("leadId"));
  if (!Number.isInteger(leadId) || leadId < 1) return NextResponse.json({ error: "Valid lead id is required" }, { status: 422 });
  return NextResponse.json({ notes: db.listNotes(leadId) });
}

export async function POST(request: Request) {
  if (!(await requireApiAuthentication())) return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  const body = await request.json().catch(() => null) as { leadId?: unknown; body?: unknown; author?: unknown } | null;
  const leadId = Number(body?.leadId);
  const noteBody = typeof body?.body === "string" ? body.body.trim() : "";
  const author = typeof body?.author === "string" && body.author.trim() ? body.author.trim() : "Marketing team";
  if (!Number.isInteger(leadId) || leadId < 1 || !noteBody) return NextResponse.json({ error: "Lead id and note are required" }, { status: 422 });
  try {
    return NextResponse.json({ note: db.addNote(leadId, noteBody, author) }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }
}
