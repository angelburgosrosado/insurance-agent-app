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
  const url = (env.NEXT_PUBLIC_SUPABASE_URL?.trim() || DEFAULT_SUPABASE_URL);
  const publishableKey = (
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
    env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ||
    DEFAULT_SUPABASE_ANON_KEY
  );

  return { configured: true, url, publishableKey };
}

export function requireSupabaseConfig(): ConfiguredSupabase {
  return getSupabaseConfig() as ConfiguredSupabase;
}

export const SUPABASE_CONFIGURATION_BLOCKER =
  "Authentication is configured for Supabase.";
