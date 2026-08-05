const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type LeadValidationResult = { valid: true } | { valid: false; error: string };

export function validateLeadRequest(body: unknown): LeadValidationResult {
  if (!body || typeof body !== "object") return { valid: false, error: "Invalid request" };
  const input = body as Record<string, unknown>;
  const required = ["firstName", "lastName", "email", "phone", "service"];
  const missing = required.find((field) => !String(input[field] ?? "").trim());
  if (missing) return { valid: false, error: "Complete all required fields" };
  if (!emailPattern.test(String(input.email))) return { valid: false, error: "Enter a valid email address" };
  if (input.consent !== true) return { valid: false, error: "Consent is required to submit this request" };
  return { valid: true };
}
