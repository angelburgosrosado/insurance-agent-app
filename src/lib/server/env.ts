export function validateEnv() {
  const required = [
    "DATABASE_URL"
  ];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    if (process.env.NODE_ENV === "production" && !process.env.SKIP_ENV_VALIDATION && process.env.NEXT_PHASE !== "phase-production-build") {
      console.warn(`⚠️ Warning: Missing core environment variables: ${missing.join(", ")}`);
    }
  }

  return { env: process.env as Record<string, string>, missing };
}

export const { env, missing: missingEnvVars } = validateEnv();

