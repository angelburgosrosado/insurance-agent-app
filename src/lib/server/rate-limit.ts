export type RateLimitResult = {
  allowed: boolean;
  retryAfterSeconds: number;
};

type Entry = { timestamps: number[] };

type RateLimiterOptions = {
  maxRequests: number;
  windowMs: number;
  maxKeys: number;
};

export function createRateLimiter(options: RateLimiterOptions) {
  const entries = new Map<string, Entry>();

  function check(key: string, now = Date.now()): RateLimitResult {
    const existing = entries.get(key);
    const timestamps = (existing?.timestamps ?? []).filter((timestamp) => now - timestamp < options.windowMs);

    if (!existing && entries.size >= options.maxKeys) {
      const oldestKey = entries.keys().next().value as string | undefined;
      if (oldestKey !== undefined) entries.delete(oldestKey);
    }

    if (timestamps.length >= options.maxRequests) {
      const retryAfterMs = Math.max(0, options.windowMs - (now - timestamps[0]));
      entries.set(key, { timestamps });
      return { allowed: false, retryAfterSeconds: Math.max(1, Math.ceil(retryAfterMs / 1_000)) };
    }

    timestamps.push(now);
    entries.set(key, { timestamps });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  function size(): number {
    return entries.size;
  }

  return { check, size };
}

export const leadRateLimiter = createRateLimiter({
  maxRequests: 5,
  windowMs: 60_000,
  maxKeys: 10_000,
});

export function requestClientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip")?.trim() || "unknown-client";
}

export function rateLimitResponse(result: RateLimitResult): Response {
  return new Response(JSON.stringify({ error: "Too many requests. Try again shortly." }), {
    status: 429,
    headers: {
      "Content-Type": "application/json",
      "Retry-After": String(result.retryAfterSeconds),
      "Cache-Control": "no-store",
    },
  });
}
