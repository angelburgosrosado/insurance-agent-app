import { NextResponse } from "next/server";
import { createRateLimiter, rateLimitResponse, requestClientKey } from "@/lib/server/rate-limit";

const sttRateLimiter = createRateLimiter({
  maxRequests: 40,
  windowMs: 60_000,
  maxKeys: 10_000,
});

export async function POST(request: Request) {
  try {
    const rateLimit = sttRateLimiter.check(requestClientKey(request));
    if (!rateLimit.allowed) {
      return rateLimitResponse(rateLimit);
    }

    const apiKey =
      process.env.DEEPGRAM_API_KEY ||
      process.env.DEEPGRAM_KEY ||
      process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "DEEPGRAM_API_KEY is not configured on the server." },
        { status: 503 }
      );
    }

    const contentType = request.headers.get("content-type") || "audio/webm";
    const audioBuffer = await request.arrayBuffer();

    if (!audioBuffer || audioBuffer.byteLength === 0) {
      return NextResponse.json({ error: "Empty audio payload received" }, { status: 422 });
    }

    const dgResponse = await fetch(
      "https://api.deepgram.com/v1/listen?model=nova-3&smart_format=true&punctuate=true",
      {
        method: "POST",
        headers: {
          Authorization: `Token ${apiKey}`,
          "Content-Type": contentType,
        },
        body: audioBuffer,
      }
    );

    if (!dgResponse.ok) {
      const errText = await dgResponse.text().catch(() => "");
      console.error("[MyIAD Deepgram STT] API Error:", dgResponse.status, errText);
      return NextResponse.json(
        { error: "Deepgram STT transcription error", details: errText },
        { status: dgResponse.status }
      );
    }

    const data = await dgResponse.json();
    const transcript =
      data.results?.channels?.[0]?.alternatives?.[0]?.transcript || "";
    const confidence =
      data.results?.channels?.[0]?.alternatives?.[0]?.confidence || 0;

    return NextResponse.json({
      ok: true,
      transcript,
      confidence,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error transcribing audio";
    console.error("[MyIAD Deepgram STT] Catch:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
