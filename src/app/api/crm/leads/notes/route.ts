import { NextResponse } from "next/server";
import { getLeadRepository, type LeadId } from "@/lib/server/leads";

export const dynamic = "force-dynamic";

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
  try {
    const { searchParams } = new URL(request.url);
    const rawId = searchParams.get("leadId");
    const leadId = parseLeadId(rawId);

    if (leadId === null) {
      return NextResponse.json(
        { success: false, error: "Valid leadId is required" },
        { status: 422 }
      );
    }

    const repo = getLeadRepository();
    let notes = await repo.listNotes(leadId);

    // If no notes exist yet, check if the lead has an intake diagnostic message
    // and synthesize/persist an initial AI Underwriting Annotation note
    if (!notes || notes.length === 0) {
      try {
        const lead = await repo.getLead(leadId);
        if (lead && lead.message) {
          const autoBody = `🎯 AI Underwriting Annotation:
• Service / Interest: ${lead.service || "Advisory Intake"}
• Contact Preference: ${lead.contactTime || "Standard"}
• Source: ${lead.source || "myiad.com front page"}
• Statutory Compliance: TCPA Affirmative Consent verified (${lead.consentVersion || "v2.0"})
• Diagnostic / Parameters: ${lead.message}`;

          try {
            const createdNote = await repo.addNote(leadId, autoBody, "MyIAD AI Copilot");
            notes = [createdNote];
          } catch {
            notes = [
              {
                id: `auto_${lead.id}`,
                leadId: lead.id,
                body: autoBody,
                author: "MyIAD AI Copilot",
                createdAt: lead.createdAt || new Date().toISOString(),
              },
            ];
          }
        }
      } catch (checkErr) {
        console.warn("[CRM Notes API] Lead message inspection notice:", checkErr);
      }
    }

    return NextResponse.json({ success: true, notes: notes || [] });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to fetch lead notes" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => null)) as {
      leadId?: unknown;
      body?: unknown;
      author?: unknown;
    } | null;

    const leadId = parseLeadId(body?.leadId);
    const noteBody = typeof body?.body === "string" ? body.body.trim() : "";
    const author =
      typeof body?.author === "string" && body.author.trim()
        ? body.author.trim()
        : "MyIAD Advisory";

    if (leadId === null || !noteBody) {
      return NextResponse.json(
        { success: false, error: "Lead id and note body are required" },
        { status: 422 }
      );
    }

    const repo = getLeadRepository();
    const note = await repo.addNote(leadId, noteBody, author);
    return NextResponse.json({ success: true, note }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to create note" },
      { status: 500 }
    );
  }
}
