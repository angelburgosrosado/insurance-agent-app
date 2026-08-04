import assert from "node:assert/strict";
import test from "node:test";
import {
  disconnectServerDatabase,
  isProductionLeadStatus,
  normalizeLeadAttribution,
  validateLeadConsent,
} from "../../src/lib/server/db";

test("recognizes only valid production lead statuses", () => {
  assert.equal(isProductionLeadStatus("new"), true);
  assert.equal(isProductionLeadStatus("qualified"), true);
  assert.equal(isProductionLeadStatus("underwritten"), false);
  assert.equal(isProductionLeadStatus(""), false);
});

test("requires affirmative consent with text, version, and timestamp", () => {
  const consented = validateLeadConsent({
    consent: true,
    consentText: "I agree to be contacted about my request.",
    consentVersion: "2026-08-03",
    consentAt: "2026-08-03T12:00:00.000Z",
  });
  assert.deepEqual(consented, { valid: true });

  const missingText = validateLeadConsent({
    consent: true,
    consentText: "",
    consentVersion: "2026-08-03",
    consentAt: "2026-08-03T12:00:00.000Z",
  });
  assert.equal(missingText.valid, false);
});

test("rejects false consent", () => {
  assert.deepEqual(
    validateLeadConsent({
      consent: false,
      consentText: "I agree to be contacted.",
      consentVersion: "2026-08-03",
      consentAt: "2026-08-03T12:00:00.000Z",
    }),
    { valid: false, reason: "Consent must be affirmative" },
  );
});

test("rejects missing consent version", () => {
  const result = validateLeadConsent({
    consent: true,
    consentText: "I agree to be contacted.",
    consentVersion: "   ",
    consentAt: "2026-08-03T12:00:00.000Z",
  });

  assert.deepEqual(result, { valid: false, reason: "Consent version is required" });
});

test("rejects invalid consent timestamps", () => {
  const result = validateLeadConsent({
    consent: true,
    consentText: "I agree to be contacted.",
    consentVersion: "2026-08-03",
    consentAt: "not-a-timestamp",
  });

  assert.deepEqual(result, { valid: false, reason: "Consent timestamp is required" });
});

test("normalizes attribution values and omits empty values", () => {
  assert.deepEqual(
    normalizeLeadAttribution({
      source: "  Google ",
      medium: " CPC ",
      campaign: "  Summer 2026 ",
      content: "",
      term: "  quote  ",
    }),
    { source: "google", medium: "cpc", campaign: "summer 2026", term: "quote" },
  );
});

test("omits non-string attribution inputs", () => {
  assert.deepEqual(
    normalizeLeadAttribution({ source: 42, medium: null, campaign: true, content: " Email " }),
    { content: "email" },
  );
});

test("clears the cached Prisma client after disconnecting", async () => {
  let disconnectCalls = 0;
  const fakeClient = {
    $disconnect: async () => {
      disconnectCalls += 1;
    },
  } as never;
  (globalThis as typeof globalThis & { __insurancePrisma?: unknown }).__insurancePrisma = fakeClient;

  await disconnectServerDatabase();

  assert.equal(disconnectCalls, 1);
  assert.equal((globalThis as typeof globalThis & { __insurancePrisma?: unknown }).__insurancePrisma, undefined);
});
