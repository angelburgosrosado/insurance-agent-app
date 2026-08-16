export function validateEnv() {
  const required = [
    "DATABASE_URL",
    // These will be needed for Supabase Auth in Phase 2
    // "NEXT_PUBLIC_SUPABASE_URL",
    // "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  ];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    // Only warn since during some build steps not all envs are present
    console.warn(`⚠️ Warning: Missing required environment variables: ${missing.join(", ")}`);
  }

  return process.env as Record<string, string>;
}

export const env = validateEnv();
