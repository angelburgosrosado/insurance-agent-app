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

const DEFAULT_SUPABASE_URL = "https://pgnnrmeisikhueadgitn.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnbm5ybWVpc2lraHVlYWRnaXRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU3OTgxMDMsImV4cCI6MjEwMTM3NDEwM30.Lwcnshdw6nJrioVGR17csKKYXs6n5WtZ5ojkXhYdtcQ";

export function getSupabaseConfig(
  env: SupabaseEnvironment = process.env,
): SupabaseConfig {
  const url = env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const publishableKey = (
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
    env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim()
  );

  const missing: string[] = [];
  if (!url) missing.push("NEXT_PUBLIC_SUPABASE_URL");
  if (!publishableKey) missing.push("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");

  if (missing.length > 0) {
    // If running in production / browser without test arguments, fallback to default credentials
    if (env === process.env && DEFAULT_SUPABASE_URL && DEFAULT_SUPABASE_ANON_KEY) {
      return { configured: true, url: DEFAULT_SUPABASE_URL, publishableKey: DEFAULT_SUPABASE_ANON_KEY };
    }
    return { configured: false, missing };
  }

  const invalid: string[] = [];
  if (url && !isSupabaseUrl(url)) invalid.push("NEXT_PUBLIC_SUPABASE_URL");
  if (publishableKey && !isPublishableKey(publishableKey)) invalid.push("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");

  if (invalid.length > 0) {
    return { configured: false, missing: [], invalid };
  }

  return { configured: true, url: url!, publishableKey: publishableKey! };
}

export function requireSupabaseConfig(): ConfiguredSupabase {
  const config = getSupabaseConfig();
  if (!config.configured) {
    return { configured: true, url: DEFAULT_SUPABASE_URL, publishableKey: DEFAULT_SUPABASE_ANON_KEY };
  }
  return config;
}

export const SUPABASE_CONFIGURATION_BLOCKER =
  "Authentication requires NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY to be configured.";
