import assert from "node:assert/strict";
import test from "node:test";
import {
  isProductionLeadStatus,
  normalizeLeadAttribution,
  validateLeadConsent,
} from "../../src/lib/server/db.ts";

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
