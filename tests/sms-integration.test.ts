import test from "node:test";
import assert from "node:assert/strict";
import { normalizePhoneNumber, buildWelcomeSMS, sendSMS } from "../src/lib/integrations/sms";

test("SMS Integration - Normalizes US and Puerto Rico 10-digit phone numbers to E.164", () => {
  assert.equal(normalizePhoneNumber("386-333-1482"), "+13863331482");
  assert.equal(normalizePhoneNumber("(407) 930-6226"), "+14079306226");
  assert.equal(normalizePhoneNumber("7871234567"), "+17871234567");
  assert.equal(normalizePhoneNumber("+13863331482"), "+13863331482");
});

test("SMS Integration - Generates English & Spanish welcome messages", () => {
  const enMsg = buildWelcomeSMS({ firstName: "John", service: "IUL Calculator", lang: "en" });
  assert.match(enMsg, /John/);
  assert.match(enMsg, /Angel Burgos/);
  assert.match(enMsg, /STOP/);

  const esMsg = buildWelcomeSMS({ firstName: "Carlos", service: "Escudo Militar", lang: "es" });
  assert.match(esMsg, /Carlos/);
  assert.match(esMsg, /Angel Burgos/);
  assert.match(esMsg, /STOP/);
});

test("SMS Integration - Dispatches in resilient mock mode without crashing when keys are unset", async () => {
  const result = await sendSMS({
    to: "3863331482",
    body: "Test message from AB Global test suite",
  });
  assert.equal(result.success, true);
  assert.ok(result.messageId);
});
