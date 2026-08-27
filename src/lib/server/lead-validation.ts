const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type LeadValidationResult = { valid: true } | { valid: false; error: string };

export function validateLeadRequest(body: unknown): LeadValidationResult {
  if (!body || typeof body !== "object") return { valid: false, error: "Invalid request" };
  const input = body as Record<string, unknown>;

  // Handle single Full Name input gracefully if lastName was left blank
  if (typeof input.firstName === "string" && input.firstName.trim().includes(" ") && !input.lastName) {
    const parts = input.firstName.trim().split(/\s+/);
    input.firstName = parts[0];
    input.lastName = parts.slice(1).join(" ");
  }

  // Ensure default service if not specified
  if (!input.service || !String(input.service).trim()) {
    input.service = "Life Insurance & Retirement (IUL)";
  }

  // Ensure phone has fallback for lead magnet downloads if left empty
  if (!input.phone || !String(input.phone).trim()) {
    if (String(input.source || "").includes("lead_magnet") || String(input.service || "").includes("PDF") || String(input.service || "").includes("Guide")) {
      input.phone = "Provided upon request";
    }
  }

  const required = ["firstName", "lastName", "email", "phone", "service"];
  const missing = required.find((field) => !String(input[field] ?? "").trim());
  if (missing) return { valid: false, error: "Complete all required fields" };
  if (!emailPattern.test(String(input.email))) return { valid: false, error: "Enter a valid email address" };
  if (input.consent !== true && input.consent !== "true") {
    return { valid: false, error: "Consent is required to submit this request" };
  }
  return { valid: true };
}
