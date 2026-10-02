import { NextResponse } from "next/server";
import { createRateLimiter, rateLimitResponse, requestClientKey } from "@/lib/server/rate-limit";
import {
  generateCopilotResponse,
  generateScenarioDiagnostic,
  type AssessmentScenario,
} from "@/lib/myiad-ai-copilot";

const copilotRateLimiter = createRateLimiter({
  maxRequests: 20,
  windowMs: 60_000,
  maxKeys: 10_000,
});

export async function POST(request: Request) {
  try {
    const rateLimit = copilotRateLimiter.check(requestClientKey(request));
    if (!rateLimit.allowed) {
      return rateLimitResponse(rateLimit);
    }

    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON request body" }, { status: 400 });
    }

    // Type 1: Scenario Diagnostic Generation
    if (body.type === "diagnostic" && body.scenario) {
      const scenario: AssessmentScenario = body.scenario;
      const diagnostic = generateScenarioDiagnostic(scenario, body.lang || "en");
      return NextResponse.json({
        ok: true,
        type: "diagnostic",
        diagnostic,
      });
    }

    // Type 2: Conversational Copilot Query
    const query = String(body.query || "").trim();
    if (!query) {
      return NextResponse.json({ error: "Query parameter is required" }, { status: 422 });
    }

    const answer = await generateCopilotResponse({
      query,
      history: body.history || [],
      scenario: body.scenario,
      lang: body.lang || "en",
    });

    return NextResponse.json({
      ok: true,
      type: "chat",
      answer: answer.content,
      suggestedPrompts: answer.suggestedPrompts,
      actionCta: answer.actionCta,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error processing advisory intelligence";
    console.error("[MyIAD Copilot API] Error:", message);
    return NextResponse.json({ error: "Unable to process request at this time." }, { status: 500 });
  }
}
