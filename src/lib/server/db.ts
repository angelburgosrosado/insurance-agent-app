import { PrismaClient } from "@prisma/client";

export const productionLeadStatuses = [
  "new",
  "reviewing",
  "assigned",
  "contacted",
  "qualified",
  "closed",
] as const;

export type ProductionLeadStatus = (typeof productionLeadStatuses)[number];

export type LeadConsentInput = {
  consent: unknown;
  consentText: unknown;
  consentVersion: unknown;
  consentAt: unknown;
};

export type LeadAttributionInput = {
  source?: unknown;
  medium?: unknown;
  campaign?: unknown;
  content?: unknown;
  term?: unknown;
};

export function isProductionLeadStatus(value: unknown): value is ProductionLeadStatus {
  return typeof value === "string" && (productionLeadStatuses as readonly string[]).includes(value);
}

export function validateLeadConsent(input: LeadConsentInput): { valid: true } | { valid: false; reason: string } {
  if (input.consent !== true) return { valid: false, reason: "Consent must be affirmative" };
  if (typeof input.consentText !== "string" || input.consentText.trim() === "") {
    return { valid: false, reason: "Consent text is required" };
  }
  if (typeof input.consentVersion !== "string" || input.consentVersion.trim() === "") {
    return { valid: false, reason: "Consent version is required" };
  }
  if (typeof input.consentAt !== "string" || Number.isNaN(Date.parse(input.consentAt))) {
    return { valid: false, reason: "Consent timestamp is required" };
  }
  return { valid: true };
}

function normalizeAttributionValue(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const normalized = value.trim().toLowerCase();
  return normalized || undefined;
}

export function normalizeLeadAttribution(input: LeadAttributionInput) {
  return Object.fromEntries(
    Object.entries(input)
      .map(([key, value]) => [key, normalizeAttributionValue(value)] as const)
      .filter((entry): entry is readonly [string, string] => entry[1] !== undefined),
  ) as Partial<Record<keyof LeadAttributionInput, string>>;
}

type GlobalWithPrisma = typeof globalThis & { __insurancePrisma?: PrismaClient };

export function createServerDatabase(): PrismaClient {
  return new PrismaClient();
}

export const prisma = (globalThis as GlobalWithPrisma).__insurancePrisma ?? createServerDatabase();

if (process.env.NODE_ENV !== "production") {
  (globalThis as GlobalWithPrisma).__insurancePrisma = prisma;
}

export default prisma;

export async function disconnectServerDatabase(): Promise<void> {
  await prisma.$disconnect();
}

export type ServerDatabase = PrismaClient;

export { PrismaClient };

// The existing SQLite data layer remains in src/lib/db.ts and is intentionally not replaced.
// Prisma operations are only used by production-oriented server code after DATABASE_URL is configured.
