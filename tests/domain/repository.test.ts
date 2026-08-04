import assert from "node:assert/strict";
import test from "node:test";
import {
  createLeadRepository,
  getPersistenceMode,
  mapPrismaLead,
  type PrismaLeadClient,
} from "../../src/lib/server/leads";
import { leadInputFromUnknown } from "../../src/lib/db";

test("normalizes lead intake consent and attribution fields", () => {
  assert.deepEqual(leadInputFromUnknown({
    firstName: "  Ada ", lastName: " Lovelace ", email: " ADA@EXAMPLE.COM ", phone: " 555 ", service: " business-insurance ",
    consent: true, consentText: " I agree ", consentVersion: " v2 ", consentAt: "2026-08-03T12:00:00.000Z",
    source: " Google ", medium: " CPC ", campaign: " Summer ", content: " Hero ", term: " Insurance ",
  }), {
    firstName: "Ada", lastName: "Lovelace", email: "ada@example.com", phone: "555", service: "business-insurance",
    contactTime: "", message: "", consent: true, consentText: "I agree", consentVersion: "v2", consentAt: "2026-08-03T12:00:00.000Z",
    source: "google", medium: "cpc", campaign: "summer", content: "hero", term: "insurance",
  });
});

test("maps a Prisma lead and nested attribution to the API lead shape", () => {
  const mapped = mapPrismaLead({
    id: "lead-uuid", firstName: "Ada", lastName: "Lovelace", email: "ada@example.com", phone: "555", service: "life-insurance",
    contactTime: null, message: null, status: "new", consent: true, consentText: "I agree", consentVersion: "v2",
    consentAt: new Date("2026-08-03T12:00:00.000Z"), createdAt: new Date("2026-08-03T12:01:00.000Z"), updatedAt: new Date("2026-08-03T12:01:00.000Z"),
    attribution: { source: "google", medium: "cpc", campaign: "summer", content: "hero", term: "insurance" },
  });
  assert.deepEqual(mapped, {
    id: "lead-uuid", firstName: "Ada", lastName: "Lovelace", email: "ada@example.com", phone: "555", service: "life-insurance",
    contactTime: "", message: "", consent: true, consentText: "I agree", consentVersion: "v2", consentAt: "2026-08-03T12:00:00.000Z",
    source: "google", medium: "cpc", campaign: "summer", content: "hero", term: "insurance", status: "new", followUpDate: "", createdAt: "2026-08-03T12:01:00.000Z",
  });
});

test("creates Prisma repository with injected client and maps nested attribution on create", async () => {
  let args: unknown;
  const client = { lead: { create: async (input: unknown) => { args = input; return { id: "lead-1", firstName: "A", lastName: "B", email: "a@example.com", phone: "1", service: "life", contactTime: "", message: "", status: "new", consent: true, consentText: "yes", consentVersion: "v1", consentAt: new Date("2026-08-03T12:00:00.000Z"), createdAt: new Date("2026-08-03T12:01:00.000Z"), attribution: null }; } } } as unknown as PrismaLeadClient;
  const repository = createLeadRepository({ mode: "prisma", prisma: client });
  const lead = await repository.createLead(leadInputFromUnknown({ firstName: "A", lastName: "B", email: "A@EXAMPLE.COM", phone: "1", service: "life", consent: true, consentText: "yes", consentVersion: "v1", consentAt: "2026-08-03T12:00:00.000Z", source: "Google", medium: "CPC" }));
  assert.equal(lead.id, "lead-1");
  assert.deepEqual(args, { data: { firstName: "A", lastName: "B", email: "a@example.com", phone: "1", service: "life", contactTime: "", message: "", consent: true, consentText: "yes", consentVersion: "v1", consentAt: new Date("2026-08-03T12:00:00.000Z"), attribution: { create: { source: "google", medium: "cpc" } } }, include: { attribution: true } });
});

test("selects SQLite only when explicitly requested and Prisma when DATABASE_URL exists", () => {
  assert.equal(getPersistenceMode({}), "sqlite");
  assert.equal(getPersistenceMode({ LEAD_PERSISTENCE: "sqlite", DATABASE_URL: "postgresql://example" }), "sqlite");
  assert.equal(getPersistenceMode({ DATABASE_URL: "postgresql://example" }), "prisma");
  assert.equal(getPersistenceMode({ LEAD_PERSISTENCE: "prisma" }), "prisma");
});

test("does not require DATABASE_URL to construct the explicit SQLite repository", () => {
  const repository = createLeadRepository({ mode: "sqlite", sqlitePath: ":memory:" });
  assert.equal(typeof repository.createLead, "function");
  repository.close();
});

test("keeps Prisma repository close safe", async () => {
  const client = { $disconnect: async () => undefined } as unknown as PrismaLeadClient;
  const repository = createLeadRepository({ mode: "prisma", prisma: client });
  await repository.close();
});

void test;
void createLeadRepository;
void mapPrismaLead;
void getPersistenceMode;
void assert;
void test;
void ({ } as PrismaLeadClient);
