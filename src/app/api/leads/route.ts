import { NextResponse } from "next/server";
import { leadInputFromUnknown } from "@/lib/db";
import { getLeadRepository } from "@/lib/server/leads";
import { validateLeadRequest } from "@/lib/server/lead-validation";
import { leadRateLimiter, rateLimitResponse, requestClientKey } from "@/lib/server/rate-limit";

export async function POST(request: Request) {
  const rateLimit = leadRateLimiter.check(requestClientKey(request));
  if (!rateLimit.allowed) return rateLimitResponse(rateLimit);

  const body = await request.json().catch(() => null);
  const validation = validateLeadRequest(body);
  if (!validation.valid) return NextResponse.json({ error: validation.error }, { status: validation.error === "Invalid request" ? 400 : 422 });

  const lead = await getLeadRepository().createLead(leadInputFromUnknown(body));

  return NextResponse.json({ ok: true, leadId: lead.id }, { status: 201 });
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
