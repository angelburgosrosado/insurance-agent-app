import { createRequire } from "node:module";
import type { PrismaClient as PrismaClientType } from "@prisma/client";

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

type GlobalWithPrisma = typeof globalThis & { __insurancePrisma?: PrismaClientType };
const require = createRequire(import.meta.url);

export function createServerDatabase(): PrismaClientType {
  const { PrismaClient } = require("@prisma/client") as { PrismaClient: new () => PrismaClientType };
  return new PrismaClient();
}

export function getPrismaClient(): PrismaClientType {
  const globalState = globalThis as GlobalWithPrisma;
  globalState.__insurancePrisma ??= createServerDatabase();
  return globalState.__insurancePrisma;
}

export async function disconnectServerDatabase(): Promise<void> {
  const globalState = globalThis as GlobalWithPrisma;
  const client = globalState.__insurancePrisma;
  if (!client) return;

  await client.$disconnect();
  globalState.__insurancePrisma = undefined;
}

export type ServerDatabase = PrismaClientType;

// The existing SQLite data layer remains in src/lib/db.ts and is intentionally not replaced.
// Prisma operations are only used by production-oriented server code after DATABASE_URL is configured.
