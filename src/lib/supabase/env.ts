export type SupabaseEnvironment = Readonly<Record<string, string | undefined>>;

type ConfiguredSupabase = {
  configured: true;
  url: string;
  publishableKey: string;
};

type UnconfiguredSupabase = {
  configured: false;
  missing: string[];
  invalid?: string[];
};

export type SupabaseConfig = ConfiguredSupabase | UnconfiguredSupabase;

function isSupabaseUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname.endsWith(".supabase.co");
  } catch {
    return false;
  }
}

function isPublishableKey(value: string): boolean {
  return value.length > 0 && !value.includes("service_role") && !value.includes("secret");
}

export function getSupabaseConfig(
  env: SupabaseEnvironment = process.env,
): SupabaseConfig {
  const url = env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const publishableKey = env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();
  const missing: string[] = [];
  const invalid: string[] = [];

  if (!url) missing.push("NEXT_PUBLIC_SUPABASE_URL");
  else if (!isSupabaseUrl(url)) invalid.push("NEXT_PUBLIC_SUPABASE_URL");

  if (!publishableKey) missing.push("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");
  else if (!isPublishableKey(publishableKey)) invalid.push("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");

  if (missing.length > 0 || invalid.length > 0) {
    return { configured: false, missing, ...(invalid.length > 0 ? { invalid } : {}) };
  }

  return { configured: true, url: url as string, publishableKey: publishableKey as string };
}

export function requireSupabaseConfig(): ConfiguredSupabase {
  const config = getSupabaseConfig();
  if (!config.configured) {
    const details = [...config.missing, ...(config.invalid ?? [])].join(", ");
    throw new Error(`Supabase authentication is not configured. Set ${details}.`);
  }
  return config;
}

export const SUPABASE_CONFIGURATION_BLOCKER =
  "Authentication is locally wired but blocked until NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY are configured.";
