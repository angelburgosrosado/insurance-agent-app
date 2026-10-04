import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  validateMyIADLeadPayload,
  normalizeLeadForCrmMyIAD,
  dispatchToMyIADCrm,
  MyIADLeadSubmissionPayload,
} from "../src/lib/integrations/crm-myiad";
import {
  maskEmail,
  maskPhone,
  maskName,
  redactPiiFromText,
  sanitizeObjectForLogging,
  computeWebhookSignature,
  encryptPayloadPii,
  decryptPayloadPii,
} from "../src/lib/security/pii-guard";
import { detectTerritoryFromPhone, detectSpecialization } from "../src/lib/lead-routing";

test("Quote Selector - Validates Life Insurance quote parameters", () => {
  const payload = {
    applicantFirstName: "Carlos",
    applicantLastName: "Rivera",
    applicantEmail: "carlos.rivera@example.com",
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
      notes: "Interested in 0% floor tax-free retirement loan options.",
    },
    consent: true,
  };

  const result = validateMyIADLeadPayload(payload);
  assert.equal(result.valid, true);
  if (result.valid) {
    assert.equal(result.payload.productInterest, "Life");
    assert.equal(result.payload.applicantName, "Carlos Rivera");
    assert.equal(result.payload.quoteParameters.productSubtype, "indexed_universal_life");
  }
});

test("Quote Selector - Validates Health Insurance (ACA and Medicare) parameters", () => {
  // ACA Test
  const acaPayload = {
    applicantFirstName: "Elena",
    applicantLastName: "Torres",
    applicantEmail: "elena.torres@example.com",
    applicantPhone: "305-555-0144",
    zipCode: "33101",
    category: "health",
    quoteParameters: {
      category: "health",
      productSubtype: "aca_individual_family",
      coverageOrInvestmentAmount: "Comprehensive Silver",
      householdMembers: "2-3",
      currentPlanStatus: "Job transition",
    },
    consent: true,
  };

  const acaResult = validateMyIADLeadPayload(acaPayload);
  assert.equal(acaResult.valid, true);
  if (acaResult.valid) {
    assert.equal(acaResult.payload.productInterest, "ACA");
  }

  // Medicare Test
  const medicarePayload = {
    applicantFirstName: "Eleanor",
    applicantLastName: "Vance",
    applicantEmail: "eleanor.vance@example.com",
    applicantPhone: "787-555-0188",
    zipCode: "00901",
    category: "health",
    quoteParameters: {
      category: "health",
      productSubtype: "medicare_advantage_part_c",
      coverageOrInvestmentAmount: "Medicare Advantage",
    },
    consent: true,
  };

  const medResult = validateMyIADLeadPayload(medicarePayload);
  assert.equal(medResult.valid, true);
  if (medResult.valid) {
    assert.equal(medResult.payload.productInterest, "Medicare");
  }
});

test("Quote Selector - Validates Variable Annuity parameters and FINRA 2330 suitability", () => {
  const annuityPayload = {
    applicantName: "Angel Burgos",
    applicantEmail: "angel@abglco.com",
    applicantPhone: "(386) 333-1482",
    zipCode: "32837",
    category: "variable_annuity",
    quoteParameters: {
      category: "variable_annuity",
      productSubtype: "deferred_variable_annuity",
      coverageOrInvestmentAmount: "$250,000 - $500,000",
      targetRetirementAge: "60-65",
      riskTolerance: "balanced",
      finraDisclosureAcknowledged: true,
      notes: "Seeking institutional rollover from 401(k).",
    },
    consent: true,
  };

  const result = validateMyIADLeadPayload(annuityPayload);
  assert.equal(result.valid, true);
  if (result.valid) {
    assert.equal(result.payload.productInterest, "Annuities");
    assert.equal(result.payload.applicantFirstName, "Angel");
    assert.equal(result.payload.applicantLastName, "Burgos");
    assert.equal(result.payload.quoteParameters.finraDisclosureAcknowledged, true);
  }
});

test("Quote Selector - Validates optional NPN and State License verification", () => {
  // Valid producer credentials
  const validProducerPayload = {
    applicantFirstName: "David",
    applicantLastName: "Miller",
    applicantEmail: "david.miller@advisory.com",
    applicantPhone: "407-555-8822",
    zipCode: "32801",
    category: "strategic_advisory",
    npn: "19876543",
    licenseState: "FL",
    licenseNumber: "G328926",
    quoteParameters: {
      category: "strategic_advisory",
      productSubtype: "producer_partnership",
      coverageOrInvestmentAmount: "$1,000,000+",
    },
    consent: true,
  };

  const validRes = validateMyIADLeadPayload(validProducerPayload);
  assert.equal(validRes.valid, true);
  if (validRes.valid) {
    assert.equal(validRes.payload.npn, "19876543");
    assert.equal(validRes.payload.licenseState, "FL");
    assert.equal(validRes.payload.licenseNumber, "G328926");
  }

  // Invalid NPN: Non-numeric
  const badNpnRes = validateMyIADLeadPayload({
    ...validProducerPayload,
    npn: "ABC12345",
  });
  assert.equal(badNpnRes.valid, false);
  if (!badNpnRes.valid) {
    assert.match(badNpnRes.errors.npn, /valid 6 to 10-digit National Producer Number/i);
  }

  // Invalid NPN: Too short (< 6 digits)
  const shortNpnRes = validateMyIADLeadPayload({
    ...validProducerPayload,
    npn: "12345",
  });
  assert.equal(shortNpnRes.valid, false);

  // Invalid State License: Missing State when License Number provided
  const missingStateRes = validateMyIADLeadPayload({
    ...validProducerPayload,
    licenseState: "",
    licenseNumber: "W998877",
  });
  assert.equal(missingStateRes.valid, false);
  if (!missingStateRes.valid) {
    assert.match(missingStateRes.errors.licenseState, /State is required/i);
  }

  // Invalid State License: Invalid territory code
  const badStateRes = validateMyIADLeadPayload({
    ...validProducerPayload,
    licenseState: "ZZ",
    licenseNumber: "W998877",
  });
  assert.equal(badStateRes.valid, false);
  if (!badStateRes.valid) {
    assert.match(badStateRes.errors.licenseState, /valid 2-letter state or territory/i);
  }
});

test("Quote Selector - Rejects invalid inputs with descriptive error states", () => {
  // Empty payload
  const emptyRes = validateMyIADLeadPayload(null);
  assert.equal(emptyRes.valid, false);

  // Missing name
  const missingNameRes = validateMyIADLeadPayload({
    applicantEmail: "test@example.com",
    applicantPhone: "4075551234",
    zipCode: "32837",
    consent: true,
  });
  assert.equal(missingNameRes.valid, false);
  if (!missingNameRes.valid) {
    assert.ok(missingNameRes.errors.applicantFirstName);
  }

  // Invalid email
  const badEmailRes = validateMyIADLeadPayload({
    applicantFirstName: "John",
    applicantEmail: "not-an-email",
    applicantPhone: "4075551234",
    zipCode: "32837",
    consent: true,
  });
  assert.equal(badEmailRes.valid, false);
  if (!badEmailRes.valid) {
    assert.ok(badEmailRes.errors.applicantEmail);
  }

  // Short phone
  const badPhoneRes = validateMyIADLeadPayload({
    applicantFirstName: "John",
    applicantEmail: "john@example.com",
    applicantPhone: "123",
    zipCode: "32837",
    consent: true,
  });
  assert.equal(badPhoneRes.valid, false);
  if (!badPhoneRes.valid) {
    assert.ok(badPhoneRes.errors.applicantPhone);
  }

  // Bad ZIP code
  const badZipRes = validateMyIADLeadPayload({
    applicantFirstName: "John",
    applicantEmail: "john@example.com",
    applicantPhone: "4075551234",
    zipCode: "ABCDE",
    consent: true,
  });
  assert.equal(badZipRes.valid, false);
  if (!badZipRes.valid) {
    assert.ok(badZipRes.errors.zipCode);
  }

  // Missing affirmative consent
  const noConsentRes = validateMyIADLeadPayload({
    applicantFirstName: "John",
    applicantEmail: "john@example.com",
    applicantPhone: "4075551234",
    zipCode: "32837",
    consent: false,
  });
  assert.equal(noConsentRes.valid, false);
  if (!noConsentRes.valid) {
    assert.ok(noConsentRes.errors.consent);
  }
});

test("Lead Routing Normalization - Conforms exactly to crm.myiad.com webhook schema", () => {
  const validatedPayload: MyIADLeadSubmissionPayload = {
    applicantName: "Roberto Gomez",
    applicantFirstName: "Roberto",
    applicantLastName: "Gomez",
    applicantEmail: "roberto@example.com",
    applicantPhone: "787-999-1234",
    zipCode: "00907",
    territory: "puerto_rico",
    productInterest: "Life",
    npn: "12345678",
    licenseState: "PR",
    licenseNumber: "PR-9988",
    quoteParameters: {
      category: "life",
      productSubtype: "indexed_universal_life",
      coverageOrInvestmentAmount: "$1,000,000",
      ageRange: "30-45",
      tobaccoUse: "no",
      termLengthYears: "Permanent / Age 100",
      notes: "High cash value accumulation plan",
      npn: "12345678",
      licenseState: "PR",
      licenseNumber: "PR-9988",
    },
    preferredContactMethod: "phone",
    preferredTimeOfDay: "morning",
    consultationRequested: true,
    scheduledAppointment: {
      booked: true,
      platform: "calendly",
      appointmentTime: "2026-10-01T14:00:00Z",
    },
    consent: true,
    consentTimestamp: "2026-09-29T12:00:00Z",
    consentVersion: "myiad_tcpa_v2.0",
    source: "myiad.com",
    medium: "quote_selector",
    campaign: "q4_campaign",
    timestamp: "2026-09-29T12:00:00Z",
  };

  const normalized = normalizeLeadForCrmMyIAD(validatedPayload);

  assert.equal(normalized.applicantName, "Roberto Gomez");
  assert.equal(normalized.applicantPhone, "787-999-1234");
  assert.equal(normalized.applicantEmail, "roberto@example.com");
  assert.equal(normalized.productInterest, "Life");
  assert.equal(normalized.zipCode, "00907");
  assert.equal(normalized.npn, "12345678");
  assert.equal(normalized.licenseState, "PR");
  assert.equal(normalized.licenseNumber, "PR-9988");
  assert.equal(normalized.source, "myiad.com");
  assert.equal(normalized.leadScore, 95);
  assert.match(normalized.notes, /Indexed Universal Life|1,000,000/i);
  assert.match(normalized.notes, /Producer NPN: 12345678/i);
  assert.match(normalized.notes, /State License: PR #PR-9988/i);
  assert.equal(normalized.scheduledAppointment.booked, true);
  assert.equal(normalized.consentGiven, true);
});

test("CRM Dispatcher - Dispatches in resilient mock mode without crashing in test environment", async () => {
  const samplePayload: MyIADLeadSubmissionPayload = {
    applicantName: "Test Lead",
    applicantFirstName: "Test",
    applicantLastName: "Lead",
    applicantEmail: "test@example.com",
    applicantPhone: "407-555-1234",
    zipCode: "32837",
    territory: "central_fl",
    productInterest: "Life",
    quoteParameters: {
      category: "life",
      productSubtype: "term_life",
      coverageOrInvestmentAmount: "$500,000",
    },
    consultationRequested: false,
    consent: true,
    consentTimestamp: new Date().toISOString(),
    consentVersion: "myiad_tcpa_v2.0",
    source: "myiad.com",
    medium: "test",
    campaign: "unit_test",
    timestamp: new Date().toISOString(),
  };

  const result = await dispatchToMyIADCrm(samplePayload);
  assert.equal(result.success, true);
  assert.equal(result.mock, true);
  assert.ok(result.leadId);
  assert.match(result.leadId, /^MYIAD-\d{4}-[A-Z0-9]+$/);
});

test("PII Protection - Redacts and masks customer data for zero plain PII in logs", () => {
  // Test email masking
  assert.equal(maskEmail("angelburgosrosado@gmail.com"), "a***@gmail.com");
  assert.equal(maskEmail("carlos@example.com"), "c***@example.com");

  // Test phone masking
  assert.equal(maskPhone("3863331482"), "(***) ***-1482");
  assert.equal(maskPhone("+1-407-555-0199"), "(***) ***-0199");

  // Test name masking
  assert.equal(maskName("Angel Burgos"), "A*** B***");
  assert.equal(maskName("Carlos Rivera Gomez"), "C*** R*** G***");

  // Test text redaction
  const logMessage = "Error delivering lead for Carlos Rivera at carlos@example.com with phone 407-555-0199";
  const redacted = redactPiiFromText(logMessage);
  assert.ok(!redacted.includes("carlos@example.com"));
  assert.ok(!redacted.includes("407-555-0199"));
  assert.match(redacted, /c\*\*\*@example\.com/);
  assert.match(redacted, /\(\*\*\*\) \*\*\*-0199/);

  // Test object sanitization
  const sensitiveObj = {
    applicantName: "Angel Burgos",
    applicantEmail: "angel@abglco.com",
    applicantPhone: "386-333-1482",
    quoteCategory: "life",
    nested: {
      email: "nested@example.com",
      phone: "305-555-0100",
      status: "pending",
    },
  };

  const sanitized = sanitizeObjectForLogging(sensitiveObj);
  assert.equal(sanitized.applicantName, "A*** B***");
  assert.equal(sanitized.applicantEmail, "a***@abglco.com");
  assert.equal(sanitized.applicantPhone, "(***) ***-1482");
  assert.equal(sanitized.quoteCategory, "life");
  assert.equal(sanitized.nested.email, "n***@example.com");
  assert.equal(sanitized.nested.phone, "(***) ***-0100");
  assert.equal(sanitized.nested.status, "pending");
});

test("Webhook Security - Computes HMAC SHA-256 signature and performs AES-256-GCM encryption", () => {
  const payloadStr = JSON.stringify({ leadId: "MYIAD-2026-001", amount: "$500,000" });
  const secret = "test_webhook_secret_key_123456";

  const signature = computeWebhookSignature(payloadStr, secret);
  assert.match(signature, /^sha256=[a-f0-9]{64}$/);

  // Encryption and Decryption test
  const piiBundle = {
    applicantName: "Angel Burgos",
    applicantEmail: "angel@myiad.com",
    applicantPhone: "3863331482",
  };
  const encKey = "secure_agency_encryption_key_32bytes!!";
  const encrypted = encryptPayloadPii(piiBundle, encKey);

  assert.ok(encrypted.ciphertext);
  assert.ok(encrypted.iv);
  assert.ok(encrypted.tag);

  const decrypted = decryptPayloadPii(encrypted, encKey);
  assert.deepEqual(decrypted, piiBundle);
});

test("Vercel Routing Configuration - vercel.json contains required security headers and myiad.com rewrites", () => {
  const vercelConfigPath = path.resolve(process.cwd(), "vercel.json");
  assert.ok(fs.existsSync(vercelConfigPath), "vercel.json must exist in project root");

  const configContent = JSON.parse(fs.readFileSync(vercelConfigPath, "utf-8"));
  assert.equal(configContent.framework, "nextjs");
  assert.ok(Array.isArray(configContent.headers), "headers array must be configured");

  // Check security headers
  const rootHeaders = configContent.headers.find((h: any) => h.source === "/(.*)");
  assert.ok(rootHeaders);
  const headerKeys = rootHeaders.headers.map((h: any) => h.key);
  assert.ok(headerKeys.includes("Strict-Transport-Security"));
  assert.ok(headerKeys.includes("X-Content-Type-Options"));
  assert.ok(headerKeys.includes("X-Frame-Options"));

  // Check rewrites for myiad.com
  assert.ok(Array.isArray(configContent.rewrites));
  const myiadRewrite = configContent.rewrites.find(
    (r: any) => r.source === "/" && r.destination === "/myiad"
  );
  assert.ok(myiadRewrite, "Must include rewrite for host matching myiad.com -> /myiad");
});

test("Lead Intake - Correctly parses fullName and name fields without requiring separate first name", () => {
  const result = validateMyIADLeadPayload({
    fullName: "Gabriel A. Santos",
    email: "gabriel@example.com",
    phone: "8135550192",
    zipCode: "33602",
    consent: true,
  });

  assert.equal(result.valid, true);
  if (result.valid) {
    assert.equal(result.payload.applicantFirstName, "Gabriel");
    assert.equal(result.payload.applicantLastName, "A. Santos");
    assert.equal(result.payload.applicantName, "Gabriel A. Santos");
  }

  // Single word full name fallback
  const singleName = validateMyIADLeadPayload({
    fullName: "Gabriel",
    email: "gabriel@example.com",
    phone: "8135550192",
    zipCode: "33602",
    consent: true,
  });

  assert.equal(singleName.valid, true);
  if (singleName.valid) {
    assert.equal(singleName.payload.applicantFirstName, "Gabriel");
    assert.equal(singleName.payload.applicantLastName, "Client");
    assert.equal(singleName.payload.applicantName, "Gabriel");
  }

  // Missing name gives clear user-facing error
  const noName = validateMyIADLeadPayload({
    email: "test@example.com",
    phone: "8135550192",
    zipCode: "33602",
    consent: true,
  });
  assert.equal(noName.valid, false);
  if (!noName.valid) {
    assert.equal(noName.errors.applicantFirstName, "Full name is required.");
  }
});

test("Number Formatting - Protection floor $1,525,000 formats with correct thousand separator commas", () => {
  const rawCoverageNeed = 250000 + 110000 * 10 + 2 * 75000 + 25000;
  assert.equal(rawCoverageNeed, 1525000);

  const formattedFloor = `$${Math.round(rawCoverageNeed).toLocaleString("en-US")}`;
  assert.equal(formattedFloor, "$1,525,000");
  assert.notEqual(formattedFloor, "$1525,000", "Must never output 1525,000 with missing comma");
});
