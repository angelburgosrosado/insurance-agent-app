export function resolveDeepgramApiKey(): string | undefined {
  const candidates = [
    "DEEPGRAM_API_KEY",
    "DEEPGRAM_KEY",
    "DEEPGRAM_TOKEN",
    "DEEPGRAM_API_TOKEN",
    "DEEPGRAM_SECRET",
    "DG_API_KEY",
    "DG_KEY",
    "NEXT_PUBLIC_DEEPGRAM_API_KEY",
    "NEXT_PUBLIC_DEEPGRAM_KEY",
  ];

  for (const name of candidates) {
    const val = process.env[name];
    if (val && typeof val === "string" && val.trim().length > 0) {
      return val.trim();
    }
  }

  // Dynamic regex fallback for any key matching deepgram
  for (const [key, val] of Object.entries(process.env)) {
    if (/deep.*gram/i.test(key) && val && typeof val === "string" && val.trim().length > 0) {
      return val.trim();
    }
  }

  return undefined;
}

export function getDeepgramEnvKeys(): string[] {
  return Object.keys(process.env).filter((k) => /deep|gram|dg_/i.test(k));
}
