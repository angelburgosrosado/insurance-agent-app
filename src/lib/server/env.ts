export function validateEnv() {
  const required = [
    "DATABASE_URL",
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "SENDGRID_API_KEY",
    "CRM_WEBHOOK_URL"
  ];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    if (process.env.NODE_ENV === "production" && !process.env.SKIP_ENV_VALIDATION) {
      throw new Error(`❌ Missing required environment variables: ${missing.join(", ")}`);
    } else {
      console.warn(`⚠️ Warning: Missing required environment variables: ${missing.join(", ")}`);
    }
  }

  return { env: process.env as Record<string, string>, missing };
}

export const { env, missing: missingEnvVars } = validateEnv();
