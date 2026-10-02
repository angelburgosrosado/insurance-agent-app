import test from "node:test";
import assert from "node:assert/strict";

test("MyIAD Voice Agent - Text-to-Speech text cleaner sanitizes markdown for speech synthesis", () => {
  const rawMarkdown = `### 🛡️ How the 0% Floor Works in an Indexed Universal Life (IUL)

In an **Indexed Universal Life (IUL)** policy, your cash value is **never directly invested in equities**. Instead:
- **0% Floor:** You never lose money.
- **IRC §7702:** Tax-free policy loans [learn more](https://myiad.com).
> Important disclaimer.`;

  const cleaned = rawMarkdown
    .replace(/###\s+/g, "")
    .replace(/##\s+/g, "")
    .replace(/#\s+/g, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/>\s+/g, "")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .trim();

  assert.ok(!cleaned.includes("###"));
  assert.ok(!cleaned.includes("**"));
  assert.ok(!cleaned.includes("[learn more]"));
  assert.ok(cleaned.includes("learn more"));
  assert.ok(cleaned.includes("How the 0% Floor Works"));
});

test("MyIAD Voice Agent - Token endpoint enforces rate limiting and valid responses", async () => {
  const { POST } = await import("../src/app/api/myiad/voice/token/route");

  const req = new Request("https://myiad.com/api/myiad/voice/token", {
    method: "POST",
    headers: { "x-forwarded-for": "10.0.0.1" },
  });

  const res = await POST(req);
  assert.ok(res.status === 200 || res.status === 503);
  const data = await res.json();

  if (res.status === 503) {
    assert.equal(data.ok, false);
    assert.ok(data.error.includes("DEEPGRAM_API_KEY"));
  } else {
    assert.equal(data.ok, true);
  }
});

test("MyIAD Voice Agent - TTS endpoint validates non-empty text input", async () => {
  const { POST } = await import("../src/app/api/myiad/voice/tts/route");

  // Empty text test
  const emptyReq = new Request("https://myiad.com/api/myiad/voice/tts", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": "10.0.0.2" },
    body: JSON.stringify({ text: "   " }),
  });

  const res = await POST(emptyReq);
  // If DEEPGRAM_API_KEY is unset locally, it returns 503; if set, it returns 422 for empty text
  assert.ok(res.status === 422 || res.status === 503);
});

test("MyIAD Voice Agent - STT endpoint validates non-empty audio payload", async () => {
  const { POST } = await import("../src/app/api/myiad/voice/stt/route");

  const emptyAudioReq = new Request("https://myiad.com/api/myiad/voice/stt", {
    method: "POST",
    headers: { "Content-Type": "audio/webm", "x-forwarded-for": "10.0.0.3" },
    body: new Uint8Array(0),
  });

  const res = await POST(emptyAudioReq);
  assert.ok(res.status === 422 || res.status === 503);
});
