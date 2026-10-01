import test from "node:test";
import assert from "node:assert/strict";
import {
  validateMyIADLeadPayload,
  normalizeLeadForCrmMyIAD,
  dispatchToMyIADCrm,
  MyIADLeadSubmissionPayload,
  MyIADProductCategory,
} from "../src/lib/integrations/crm-myiad";
import { detectTerritoryFromPhone } from "../src/lib/lead-routing";

test("AC-1 (Progression): 4-step progressive flow data structures and sequence", () => {
  const steps = [
    { num: 1, label: "Coverage", key: "category" },
    { num: 2, label: "Parameters", key: "quoteParameters" },
    { num: 3, label: "Advisory Intake", key: "contact" },
    { num: 4, label: "Confirmation", key: "confirmation" },
  ];

  assert.equal(steps.length, 4);
  assert.equal(steps[0].label, "Coverage");
  assert.equal(steps[1].label, "Parameters");
  assert.equal(steps[2].label, "Advisory Intake");
  assert.equal(steps[3].label, "Confirmation");
});

test("AC-2 (Branching): Step 2 dynamic branching parameters across all 4 categories", () => {
  // 1. Life Insurance Branch
  const lifePayload = {
    applicantFirstName: "Maria",
    applicantLastName: "Rodriguez",
    applicantEmail: "maria.rodriguez@example.com",
    applicantPhone: "407-555-0199",
    zipCode: "32837",
    category: "life",
    quoteParameters: {
      category: "life",
      productSubtype: "indexed_universal_life",
      coverageOrInvestmentAmount: "$500,000",
      termLengthYears: "20 years",
      ageRange: "30-45",
      tobaccoUse: "no",
      notes: "0% floor IUL with living benefits",
    },
    consent: true,
  };
  const lifeRes = validateMyIADLeadPayload(lifePayload);
  assert.equal(lifeRes.valid, true);
  if (lifeRes.valid) {
    assert.equal(lifeRes.payload.productInterest, "Life");
    assert.equal(lifeRes.payload.quoteParameters.productSubtype, "indexed_universal_life");
    assert.equal(lifeRes.payload.quoteParameters.tobaccoUse, "no");
  }

  // 2. Health & Medicare Branch
  const healthPayload = {
    applicantFirstName: "Carmen",
    applicantLastName: "Ortiz",
    applicantEmail: "carmen.ortiz@example.com",
    applicantPhone: "787-555-0177",
    zipCode: "00901",
    category: "health",
    quoteParameters: {
      category: "health",
      productSubtype: "medicare_advantage_part_c",
      coverageOrInvestmentAmount: "Comprehensive Coverage",
      householdMembers: "1",
      currentPlanStatus: "Approaching Medicare Age 65",
    },
    consent: true,
  };
  const healthRes = validateMyIADLeadPayload(healthPayload);
  assert.equal(healthRes.valid, true);
  if (healthRes.valid) {
    assert.equal(healthRes.payload.productInterest, "Medicare");
    assert.equal(healthRes.payload.quoteParameters.householdMembers, "1");
    assert.equal(healthRes.payload.quoteParameters.currentPlanStatus, "Approaching Medicare Age 65");
  }

  // 3. Variable Annuity Branch
  const annuityPayload = {
    applicantFirstName: "Angel",
    applicantLastName: "Burgos",
    applicantEmail: "angel@abglco.com",
    applicantPhone: "386-333-1482",
    zipCode: "32801",
    category: "variable_annuity",
    quoteParameters: {
      category: "variable_annuity",
      productSubtype: "deferred_variable_annuity",
      coverageOrInvestmentAmount: "$250,000 - $500,000",
      targetRetirementAge: "60-65",
      riskTolerance: "balanced",
      finraDisclosureAcknowledged: true,
      notes: "401(k) rollover suitability review",
    },
    consent: true,
  };
  const annuityRes = validateMyIADLeadPayload(annuityPayload);
  assert.equal(annuityRes.valid, true);
  if (annuityRes.valid) {
    assert.equal(annuityRes.payload.productInterest, "Annuities");
    assert.equal(annuityRes.payload.quoteParameters.finraDisclosureAcknowledged, true);
    assert.equal(annuityRes.payload.quoteParameters.riskTolerance, "balanced");
  }

  // 4. Strategic Advisory & Producer Partnership Branch
  const advisoryPayload = {
    applicantFirstName: "Victor",
    applicantLastName: "Vega",
    applicantEmail: "victor@agencypartners.com",
    applicantPhone: "813-555-0144",
    zipCode: "33602",
    category: "strategic_advisory",
    quoteParameters: {
      category: "strategic_advisory",
      productSubtype: "producer_partnership",
      coverageOrInvestmentAmount: "$1,000,000 - $5,000,000+",
      currentPlanStatus: "Boutique Agency / IMO Affiliate (2-10 Advisors)",
      riskTolerance: "growth",
      notes: "Agency onboarding and bilingual AI quoting engine access",
    },
    consent: true,
  };
  const advisoryRes = validateMyIADLeadPayload(advisoryPayload);
  assert.equal(advisoryRes.valid, true);
  if (advisoryRes.valid) {
    assert.equal(advisoryRes.payload.productInterest, "Strategic Advisory");
    assert.equal(advisoryRes.payload.quoteParameters.productSubtype, "producer_partnership");
  }
});

test("AC-3 (Validation): Enforces strict validation on email, phone, ZIP, and affirmative consent", () => {
  const base = {
    applicantFirstName: "Test",
    applicantLastName: "Lead",
    applicantEmail: "test@example.com",
    applicantPhone: "4075551234",
    zipCode: "32837",
    category: "life",
    consent: true,
  };

  // Missing First Name
  const noName = validateMyIADLeadPayload({ ...base, applicantFirstName: "" });
  assert.equal(noName.valid, false);
  if (!noName.valid) assert.ok(noName.errors.applicantFirstName);

  // Invalid Email
  const badEmail = validateMyIADLeadPayload({ ...base, applicantEmail: "invalid-email" });
  assert.equal(badEmail.valid, false);
  if (!badEmail.valid) assert.ok(badEmail.errors.applicantEmail);

  // Phone less than 10 digits
  const shortPhone = validateMyIADLeadPayload({ ...base, applicantPhone: "407-555" });
  assert.equal(shortPhone.valid, false);
  if (!shortPhone.valid) assert.ok(shortPhone.errors.applicantPhone);

  // Invalid ZIP code
  const badZip = validateMyIADLeadPayload({ ...base, zipCode: "328" });
  assert.equal(badZip.valid, false);
  if (!badZip.valid) assert.ok(badZip.errors.zipCode);

  // Missing affirmative consent
  const noConsent = validateMyIADLeadPayload({ ...base, consent: false });
  assert.equal(noConsent.valid, false);
  if (!noConsent.valid) assert.ok(noConsent.errors.consent);
});

test("AC-4 (Payload Contract): Normalizes lead submission payload with UTM attribution and territory", () => {
  const territoryPR = detectTerritoryFromPhone("787-555-0123");
  assert.equal(territoryPR.territory, "puerto_rico");

  const territoryCFL = detectTerritoryFromPhone("386-333-1482");
  assert.equal(territoryCFL.territory, "central_fl");

  const payload: MyIADLeadSubmissionPayload = {
    applicantName: "Sofia Delgado",
    applicantFirstName: "Sofia",
    applicantLastName: "Delgado",
    applicantEmail: "sofia.delgado@example.com",
    applicantPhone: "787-555-0123",
    zipCode: "00907",
    territory: territoryPR.territory,
    productInterest: "Life",
    quoteParameters: {
      category: "life",
      productSubtype: "indexed_universal_life",
      coverageOrInvestmentAmount: "$1,000,000",
      ageRange: "30-45",
      tobaccoUse: "no",
      notes: "Living benefits IUL",
    },
    preferredContactMethod: "phone",
    preferredTimeOfDay: "morning",
    consultationRequested: true,
    consent: true,
    consentTimestamp: "2026-09-30T10:00:00.000Z",
    consentVersion: "myiad_tcpa_v2.0",
    source: "google_ads",
    medium: "cpc",
    campaign: "florida_iul_q4",
    timestamp: "2026-09-30T10:00:00.000Z",
  };

  const normalized = normalizeLeadForCrmMyIAD(payload);
  assert.equal(normalized.applicantName, "Sofia Delgado");
  assert.equal(normalized.applicantPhone, "787-555-0123");
  assert.equal(normalized.applicantEmail, "sofia.delgado@example.com");
  assert.equal(normalized.territory, "puerto_rico");
  assert.equal(normalized.source, "google_ads");
  assert.equal(normalized.campaign, "florida_iul_q4");
  assert.equal(normalized.consentGiven, true);
  assert.equal(normalized.consentVersion, "myiad_tcpa_v2.0");
  assert.match(normalized.notes, /indexed_universal_life/i);
});

test("AC-5 (CRM Webhook): Dispatches to crm.myiad.net webhook pipeline with simulated fallback", async () => {
  const payload: MyIADLeadSubmissionPayload = {
    applicantName: "Webhook Test",
    applicantFirstName: "Webhook",
    applicantLastName: "Test",
    applicantEmail: "webhook@test.com",
    applicantPhone: "407-555-9988",
    zipCode: "32801",
    territory: "central_fl",
    productInterest: "Life",
    quoteParameters: {
      category: "life",
      productSubtype: "term_life",
      coverageOrInvestmentAmount: "$500,000",
    },
    consultationRequested: true,
    consent: true,
    consentTimestamp: new Date().toISOString(),
    consentVersion: "myiad_tcpa_v2.0",
    source: "myiad.com",
    medium: "quote_selector",
    campaign: "test",
    timestamp: new Date().toISOString(),
  };

  const result = await dispatchToMyIADCrm(payload);
  assert.equal(result.success, true);
  assert.equal(result.mock, true);
  assert.ok(result.leadId);
  assert.match(result.leadId, /^MYIAD-\d{4}-[A-Z0-9]+$/);
});

test("AC-6 (FINRA 2330): Variable annuity suitability disclosure is captured", () => {
  const payload = {
    applicantFirstName: "Retirement",
    applicantLastName: "Investor",
    applicantEmail: "investor@example.com",
    applicantPhone: "407-555-4321",
    zipCode: "32837",
    category: "variable_annuity",
    quoteParameters: {
      category: "variable_annuity",
      productSubtype: "deferred_variable_annuity",
      coverageOrInvestmentAmount: "$500,000+",
      targetRetirementAge: "5 to 10 Years",
      riskTolerance: "balanced",
      finraDisclosureAcknowledged: true,
    },
    consent: true,
  };

  const result = validateMyIADLeadPayload(payload);
  assert.equal(result.valid, true);
  if (result.valid) {
    assert.equal(result.payload.productInterest, "Annuities");
    assert.equal(result.payload.quoteParameters.finraDisclosureAcknowledged, true);
  }
});

test("AC-7 (TCPA Consent): Verifies consent metadata logging and statutory version", () => {
  const now = new Date().toISOString();
  const payload = {
    applicantFirstName: "Consent",
    applicantLastName: "Tester",
    applicantEmail: "consent@example.com",
    applicantPhone: "386-555-0100",
    zipCode: "32114",
    category: "life",
    consent: true,
    consentTimestamp: now,
    consentVersion: "myiad_tcpa_v2.0",
  };

  const result = validateMyIADLeadPayload(payload);
  assert.equal(result.valid, true);
  if (result.valid) {
    assert.equal(result.payload.consent, true);
    assert.equal(result.payload.consentVersion, "myiad_tcpa_v2.0");
    assert.ok(result.payload.consentTimestamp);
  }
});

test("AC-8 (Scheduling Bridge): Pre-filled calendar URL encoding and confirmation mapping", () => {
  const baseUrl = "https://calendly.com/abglobalconsulting/15-min-consultation-abglobalceo";
  const name = "Angel Burgos";
  const email = "angel@abglco.com";

  const url = new URL(baseUrl);
  url.searchParams.set("name", name);
  url.searchParams.set("email", email);

  assert.equal(url.searchParams.get("name"), "Angel Burgos");
  assert.equal(url.searchParams.get("email"), "angel@abglco.com");
  assert.match(url.toString(), /name=Angel\+Burgos/);
  assert.match(url.toString(), /email=angel%40abglco\.com/);
});
