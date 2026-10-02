import { NextResponse } from "next/server";
import { createRateLimiter, rateLimitResponse, requestClientKey } from "@/lib/server/rate-limit";

import { resolveDeepgramApiKey, getDeepgramEnvKeys } from "@/lib/server/deepgram-env";

const tokenRateLimiter = createRateLimiter({
  maxRequests: 30,
  windowMs: 60_000,
  maxKeys: 10_000,
});

export async function POST(request: Request) {
  try {
    const rateLimit = tokenRateLimiter.check(requestClientKey(request));
    if (!rateLimit.allowed) {
      return rateLimitResponse(rateLimit);
    }

    const apiKey = resolveDeepgramApiKey();
    if (!apiKey) {
      return NextResponse.json(
        {
          ok: false,
          error: "DEEPGRAM_API_KEY is not configured on the server.",
          mode: "fallback",
          detectedKeys: getDeepgramEnvKeys(),
        },
        { status: 503 }
      );
    }

    // Attempt to mint an ephemeral scoped token from Deepgram
    try {
      const grantRes = await fetch("https://api.deepgram.com/v1/auth/grant", {
        method: "POST",
        headers: {
          Authorization: `Token ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ttl: 60, // 60 seconds TTL for WebSocket handshake
        }),
      });

      if (grantRes.ok) {
        const grantData = await grantRes.json();
        return NextResponse.json({
          ok: true,
          token: grantData.token || grantData.access_token || apiKey,
          expiresIn: 60,
          endpoint: "wss://agent.deepgram.com/v1/agent/converse",
        });
      }
    } catch (grantErr) {
      console.warn("[MyIAD Voice Token] Ephemeral grant notice, falling back to proxy mode:", (grantErr as any)?.message);
    }

    // Fallback: return token status so client can use server proxy TTS/STT endpoints
    return NextResponse.json({
      ok: true,
      proxyMode: true,
      ttsEndpoint: "/api/myiad/voice/tts",
      sttEndpoint: "/api/myiad/voice/stt",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error generating voice credentials";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
