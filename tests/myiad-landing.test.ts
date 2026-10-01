import assert from "node:assert/strict";
import test from "node:test";
import {
  MYIAD_TOKENS,
  CORE_OFFERINGS,
  AUDIENCE_MODULES,
  FINRA_2330_COMPLIANCE_DISCLOSURE,
} from "../src/components/myiad/tokens";

test("MyIAD brand tokens match design specifications", () => {
  assert.equal(MYIAD_TOKENS.colors.primaryNavy, "#0B1F3A");
  assert.equal(MYIAD_TOKENS.colors.techBlue, "#2563EB");
  assert.equal(MYIAD_TOKENS.colors.growthTeal, "#14B8A6");
  assert.equal(MYIAD_TOKENS.colors.cleanBg, "#F8FAFC");
  assert.equal(MYIAD_TOKENS.colors.contrastCharcoal, "#111827");
  assert.match(MYIAD_TOKENS.typography.headline, /MyIAD - Intelligent Insurance Advisory & Protection/i);
  assert.match(MYIAD_TOKENS.licensing.service, /Nationwide Insurance Services/i);
  assert.equal(MYIAD_TOKENS.licensing.tollFree, "1-888-887-3585");
});

test("MyIAD implements the Three Core Offerings architecture", () => {
  const ids = CORE_OFFERINGS.map((o) => o.id);
  assert.deepEqual(ids, ["life", "health", "annuity"]);

  const life = CORE_OFFERINGS.find((o) => o.id === "life");
  assert.ok(life);
  assert.match(life.title, /Life Insurance/i);
  assert.match(life.description, /0% floor/i);
  assert.match(life.description, /IRC Section 7702/i);

  const health = CORE_OFFERINGS.find((o) => o.id === "health");
  assert.ok(health);
  assert.match(health.title, /Health Insurance/i);
  assert.match(health.subtitle, /Medicare/i);

  const annuity = CORE_OFFERINGS.find((o) => o.id === "annuity");
  assert.ok(annuity);
  assert.match(annuity.title, /Variable Annuity/i);
  assert.match(annuity.benefits.join(" "), /FINRA Rule 2330/i);
});

test("MyIAD incorporates all three audience segment hooks", () => {
  const hooks = AUDIENCE_MODULES.map((m) => m.headline);

  assert.ok(
    hooks.some((h) =>
      h.includes("Show prospects their 0% floor tax-free retirement with institutional math in 30 seconds.")
    ),
    "Missing high-performing producer hook"
  );

  assert.ok(
    hooks.some((h) =>
      h.includes("Equip your entire brokerage with bilingual AI quoting, compliant disclosures, and instant CRM routing.")
    ),
    "Missing agency principal / IMO hook"
  );

  assert.ok(
    hooks.some((h) =>
      h.includes("The Veteran Asset Shield: How to lock in permanent pension protection before the rate cliff.")
    ),
    "Missing veteran advisor hook"
  );
});

test("MyIAD includes FINRA Rule 2330 compliance and supervisory disclosure standards", () => {
  assert.match(FINRA_2330_COMPLIANCE_DISCLOSURE.ruleTitle, /FINRA Rule 2330/i);
  assert.ok(FINRA_2330_COMPLIANCE_DISCLOSURE.supervisoryStandard.length > 50);

  const combinedDisclosures = FINRA_2330_COMPLIANCE_DISCLOSURE.suitabilityDisclosures.join(" ");
  assert.match(combinedDisclosures, /possible loss of principal/i);
  assert.match(combinedDisclosures, /10% federal IRS tax penalty/i);
  assert.match(combinedDisclosures, /Surrender charges/i);
  assert.match(combinedDisclosures, /mortality and expense/i);
  assert.match(combinedDisclosures, /NOT insured by the FDIC/i);

  assert.ok(FINRA_2330_COMPLIANCE_DISCLOSURE.supervisoryChecklist.length >= 4);
});

test("MyIAD page is an actual Next.js route module with metadata", async () => {
  const pageModule = await import("../src/app/myiad/page");
  assert.equal(typeof pageModule.default, "function");

  const metadata = pageModule.metadata;
  assert.ok(metadata);
  assert.match(String(metadata.title), /MyIAD - Intelligent Insurance Advisory & Protection/i);
  assert.match(String(metadata.description), /Indexed Universal Life.*Health.*variable annuities/i);
});
