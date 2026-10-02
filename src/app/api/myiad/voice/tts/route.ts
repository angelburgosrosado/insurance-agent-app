import { NextResponse } from "next/server";
import { createRateLimiter, rateLimitResponse, requestClientKey } from "@/lib/server/rate-limit";

const ttsRateLimiter = createRateLimiter({
  maxRequests: 40,
  windowMs: 60_000,
  maxKeys: 10_000,
});

export async function POST(request: Request) {
  try {
    const rateLimit = ttsRateLimiter.check(requestClientKey(request));
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

    const body = await request.json().catch(() => null);
    const rawText = String(body?.text || "").trim();
    if (!rawText) {
      return NextResponse.json({ error: "Text is required for TTS synthesis" }, { status: 422 });
    }

    // Clean markdown headings, bullets, and links so speech sounds natural
    const cleanedText = rawText
      .replace(/###\s+/g, "")
      .replace(/##\s+/g, "")
      .replace(/#\s+/g, "")
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/>\s+/g, "")
      .replace(/\[(.*?)\]\(.*?\)/g, "$1")
      .slice(0, 1500); // Limit length to avoid character abuse

    const isSpanish = body?.lang === "es" || /seguro|póliza|anualidad|impuesto|hola|vida/i.test(cleanedText);
    const defaultVoice = isSpanish ? "aura-asteria-en" : (body?.voice || "aura-asteria-en");

    const dgResponse = await fetch(`https://api.deepgram.com/v1/speak?model=${defaultVoice}&encoding=mp3`, {
      method: "POST",
      headers: {
        Authorization: `Token ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: cleanedText }),
    });

    if (!dgResponse.ok) {
      const errText = await dgResponse.text().catch(() => "");
      console.error("[MyIAD Deepgram TTS] API Error:", dgResponse.status, errText);
      return NextResponse.json(
        { error: "Deepgram TTS service error", details: errText },
        { status: dgResponse.status }
      );
    }

    const audioArrayBuffer = await dgResponse.arrayBuffer();

    return new Response(audioArrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error synthesizing speech";
    console.error("[MyIAD Deepgram TTS] Catch:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
