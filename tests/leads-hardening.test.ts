import assert from "node:assert/strict";
import test from "node:test";
import { createRateLimiter } from "../src/lib/server/rate-limit";
import { validateLeadRequest } from "../src/lib/server/lead-validation";

test("rate limiter allows the configured burst and returns a bounded retry delay", () => {
  const limiter = createRateLimiter({ maxRequests: 2, windowMs: 1_000, maxKeys: 2 });

  assert.deepEqual(limiter.check("client-a", 0), { allowed: true, retryAfterSeconds: 0 });
  assert.deepEqual(limiter.check("client-a", 100), { allowed: true, retryAfterSeconds: 0 });
  assert.deepEqual(limiter.check("client-a", 200), { allowed: false, retryAfterSeconds: 1 });
  assert.deepEqual(limiter.check("client-a", 1_000), { allowed: true, retryAfterSeconds: 0 });
});

test("rate limiter bounds tracked clients and evicts expired entries", () => {
  const limiter = createRateLimiter({ maxRequests: 1, windowMs: 1_000, maxKeys: 2 });

  limiter.check("client-a", 0);
  limiter.check("client-b", 0);
  limiter.check("client-c", 0);
  assert.equal(limiter.size(), 2);
  assert.equal(limiter.check("client-a", 0).allowed, true);
  assert.equal(limiter.check("client-b", 1_001).allowed, true);
});

test("lead request validation is independent of the route handler", () => {
  const valid = validateLeadRequest({
    firstName: "Ada",
    lastName: "Lovelace",
    email: "ada@example.com",
    phone: "555-0100",
    service: "personal-insurance",
    consent: true,
  });
  assert.deepEqual(valid, { valid: true });

  assert.deepEqual(validateLeadRequest({ ...validInput(), consent: false }), {
    valid: false,
    error: "Consent is required to submit this request",
  });
  assert.deepEqual(validateLeadRequest({ ...validInput(), email: "not-an-email" }), {
    valid: false,
    error: "Enter a valid email address",
  });
});

function validInput() {
  return { firstName: "Ada", lastName: "Lovelace", email: "ada@example.com", phone: "555-0100", service: "personal-insurance", consent: true };
}


test("public policy copy stays generic and avoids invented legal details", async () => {
  const { privacyContent, disclosuresContent } = await import("../src/lib/policy-content");
  const combined = `${privacyContent} ${disclosuresContent}`;
  assert.match(combined, /insurance options|insurance consultation/i);
  assert.doesNotMatch(combined, /licensed in|license number|retention guaranteed|guarantee that we retain|street address/i);
});


test("policy pages are actual route modules", async () => {
  const privacy = await import("../src/app/privacy/page");
  const disclosures = await import("../src/app/disclosures/page");
  assert.equal(typeof privacy.default, "function");
  assert.equal(typeof disclosures.default, "function");
});
