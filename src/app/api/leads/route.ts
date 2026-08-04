import { NextResponse } from "next/server";
import { leadInputFromUnknown } from "@/lib/db";
import { getLeadRepository } from "@/lib/server/leads";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const required = ["firstName", "lastName", "email", "phone", "service"];
  const missing = required.find((field) => !String(body[field] ?? "").trim());

  if (missing) {
    return NextResponse.json({ error: "Complete all required fields" }, { status: 422 });
  }

  if (!emailPattern.test(String(body.email))) {
    return NextResponse.json({ error: "Enter a valid email address" }, { status: 422 });
  }

  if (body.consent !== true) {
    return NextResponse.json({ error: "Consent is required to submit this request" }, { status: 422 });
  }

  const lead = await getLeadRepository().createLead(leadInputFromUnknown(body));

  return NextResponse.json({ ok: true, leadId: lead.id }, { status: 201 });
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
