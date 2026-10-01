import crypto from "node:crypto";

/**
 * PII Protection and Webhook Security Utilities
 * Enforces zero plain PII leaks in server logs, HMAC signatures, and optional payload encryption.
 */

export function maskEmail(email: string): string {
  if (!email || typeof email !== "string") return "***";
  const trimmed = email.trim();
  const atIndex = trimmed.indexOf("@");
  if (atIndex <= 1) return "***" + (atIndex !== -1 ? trimmed.slice(atIndex) : "");
  const username = trimmed.slice(0, atIndex);
  const domain = trimmed.slice(atIndex);
  const visible = username.charAt(0);
  return `${visible}***${domain}`;
}

export function maskPhone(phone: string): string {
  if (!phone || typeof phone !== "string") return "***";
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 4) return "***";
  const lastFour = digits.slice(-4);
  return `(***) ***-${lastFour}`;
}

export function maskName(name: string): string {
  if (!name || typeof name !== "string") return "***";
  const parts = name.trim().split(/\s+/);
  return parts
    .map((p) => (p.length > 0 ? `${p.charAt(0)}***` : "*"))
    .join(" ");
}

export function redactPiiFromText(text: string): string {
  if (!text || typeof text !== "string") return "";
  let redacted = text;
  // Redact emails
  redacted = redacted.replace(
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    (m) => maskEmail(m)
  );
  // Redact 10-digit phone numbers
  redacted = redacted.replace(
    /(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g,
    (m) => maskPhone(m)
  );
  // Redact SSN-like patterns
  redacted = redacted.replace(/\b\d{3}-\d{2}-\d{4}\b/g, "***-**-****");
  return redacted;
}

const SENSITIVE_KEYS = new Set([
  "applicantname",
  "applicantfirstname",
  "applicantlastname",
  "applicantemail",
  "applicantphone",
  "firstname",
  "lastname",
  "email",
  "phone",
  "telephone",
  "npn",
  "licensenumber",
  "ssn",
  "password",
  "secret",
]);

export function sanitizeObjectForLogging(obj: any): any {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj === "string") return redactPiiFromText(obj);
  if (typeof obj !== "object") return obj;

  if (Array.isArray(obj)) {
    return obj.map((item) => sanitizeObjectForLogging(item));
  }

  const sanitized: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    const lowerKey = key.toLowerCase();
    if (SENSITIVE_KEYS.has(lowerKey)) {
      if (lowerKey.includes("email")) {
        sanitized[key] = typeof value === "string" ? maskEmail(value) : "[MASKED_EMAIL]";
      } else if (lowerKey.includes("phone") || lowerKey.includes("telephone")) {
        sanitized[key] = typeof value === "string" ? maskPhone(value) : "[MASKED_PHONE]";
      } else if (lowerKey.includes("name")) {
        sanitized[key] = typeof value === "string" ? maskName(value) : "[MASKED_NAME]";
      } else {
        sanitized[key] = "[REDACTED]";
      }
    } else if (typeof value === "object") {
      sanitized[key] = sanitizeObjectForLogging(value);
    } else if (typeof value === "string") {
      sanitized[key] = redactPiiFromText(value);
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
}

/**
 * Computes HMAC-SHA256 signature for webhook payload verification.
 */
export function computeWebhookSignature(payloadString: string, secret: string): string {
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(payloadString, "utf8");
  return `sha256=${hmac.digest("hex")}`;
}

/**
 * Encrypts sensitive PII payload using AES-256-GCM.
 */
export function encryptPayloadPii(
  data: Record<string, any>,
  secretKey: string
): { ciphertext: string; iv: string; tag: string } {
  // Derive a 32-byte key from secret using SHA-256
  const key = crypto.createHash("sha256").update(secretKey).digest();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

  const serialized = JSON.stringify(data);
  let ciphertext = cipher.update(serialized, "utf8", "hex");
  ciphertext += cipher.final("hex");
  const tag = cipher.getAuthTag().toString("hex");

  return {
    ciphertext,
    iv: iv.toString("hex"),
    tag,
  };
}

/**
 * Decrypts sensitive PII payload using AES-256-GCM.
 */
export function decryptPayloadPii(
  encrypted: { ciphertext: string; iv: string; tag: string },
  secretKey: string
): Record<string, any> {
  const key = crypto.createHash("sha256").update(secretKey).digest();
  const iv = Buffer.from(encrypted.iv, "hex");
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(Buffer.from(encrypted.tag, "hex"));

  let decrypted = decipher.update(encrypted.ciphertext, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return JSON.parse(decrypted);
}
