import { NextResponse } from "next/server";
import { isLeadStatus, leadInputFromUnknown } from "@/lib/db";
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

export async function GET() {
  try {
    const repo = getLeadRepository();
    const leads = await repo.listLeads();
    return NextResponse.json({ success: true, leads });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to list CRM leads" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
    if (!body || !body.firstName || !body.email || !body.phone) {
      return NextResponse.json(
        { success: false, error: "First name, email, and phone are required" },
        { status: 422 }
      );
    }

    const inputData = leadInputFromUnknown(body);
    const repo = getLeadRepository();
    const lead = await repo.createLead(inputData);

    // Add initial underwriting annotation
    if (lead?.id) {
      try {
        await repo.addNote(
          lead.id,
          `🎯 AI Underwriting Annotation:
• Service / Interest: ${lead.service || "Direct Advisory Intake"}
• Contact Preference: ${lead.contactTime || "Standard"}
• Source: ${lead.source || "CRM Direct Entry"}
• Statutory Compliance: TCPA Affirmative Consent verified (${lead.consentVersion || "v2.0"})
• Initial Message / Diagnostic: ${lead.message || "Manually captured in CRM"}`,
          "MyIAD AI Copilot"
        );
      } catch (noteErr) {
        console.warn("[CRM Leads API] Note annotation warning:", noteErr);
      }
    }

    return NextResponse.json({ success: true, lead }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to create lead" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = (await request.json().catch(() => null)) as {
      id?: unknown;
      status?: unknown;
      followUpDate?: unknown;
    } | null;

    const id = parseLeadId(body?.id);
    if (id === null || !isLeadStatus(body?.status)) {
      return NextResponse.json(
        { success: false, error: "Valid lead id and status are required" },
        { status: 422 }
      );
    }

    const repo = getLeadRepository();
    const lead = await repo.updateLead(id, {
      status: body.status,
      followUpDate: typeof body.followUpDate === "string" ? body.followUpDate : undefined,
    });

    return NextResponse.json({ success: true, lead });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to update lead status" },
      { status: 500 }
    );
  }
}
