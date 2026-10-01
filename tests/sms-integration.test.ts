import test from "node:test";
import assert from "node:assert/strict";
import {
  normalizePhoneNumber,
  buildWelcomeSMS,
  buildAdvisorDispatchSMS,
  dispatchAdvisorAlertSMS,
  sendSMS,
} from "../src/lib/integrations/sms";

test("SMS Integration - Normalizes US and Puerto Rico 10-digit phone numbers to E.164", () => {
  assert.equal(normalizePhoneNumber("386-333-1482"), "+1" + "3863331482");
  assert.equal(normalizePhoneNumber("(407) 930-6226"), "+1" + "4079306226");
  assert.equal(normalizePhoneNumber("7871234567"), "+1" + "7871234567");
  assert.equal(normalizePhoneNumber("+13863331482"), "+1" + "3863331482");
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

test("SMS Integration - Generates formatted advisor dispatch SMS message", () => {
  const alert = buildAdvisorDispatchSMS({
    applicantName: "Carlos Vega",
    serviceOrProduct: "Florida IUL - Max Accumulation",
    applicantPhone: "386-333-1482",
    applicantEmail: "carlos@example.com",
    territory: "Central Florida (Orlando/Tampa)",
    amount: "$500,000",
    source: "MyIAD Quote Selector",
  });

  assert.match(alert, /Advisor Dispatch Alert: Carlos Vega/);
  assert.match(alert, /Florida IUL/);
  assert.match(alert, /Central Florida/);
  assert.match(alert, /\$500,000/);
  assert.match(alert, /386-333-1482/);
  assert.match(alert, /carlos@example.com/);
});

test("SMS Integration - Dispatches advisor alert in resilient mock mode when keys are unset", async () => {
  const result = await dispatchAdvisorAlertSMS({
    applicantName: "Maria Rodriguez",
    serviceOrProduct: "Annuity Guaranteed Paycheck",
    applicantPhone: "787-123-4567",
    applicantEmail: "maria@example.com",
    territory: "Puerto Rico",
    amount: "$250,000",
  });

  assert.equal(result.success, true);
  assert.equal(result.mock, true);
  assert.equal(result.provider, "mock");
  assert.ok(result.messageId);
});

test("SMS Integration - Dispatches in resilient mock mode without crashing when keys are unset", async () => {
  const result = await sendSMS({
    to: "3863331482",
    body: "Test message from AB Global test suite",
  });
  assert.equal(result.success, true);
  assert.ok(result.messageId);
});

test("SMS Integration - Executes live Twilio REST dispatch when credentials are provided", async () => {
  const origEnv = { ...process.env };
  const origFetch = global.fetch;

  try {
    process.env.TWILIO_ACCOUNT_SID = "ACmockaccount00000000000000000000";
    process.env.TWILIO_AUTH_TOKEN = "mockauthtoken0000000000000000000";
    process.env.TWILIO_PHONE_NUMBER = "+1" + "3863331482";

    let fetchedUrl = "";
    let fetchedHeaders: Record<string, string> = {};
    let fetchedBody = "";

    global.fetch = (async (url: string, init?: any) => {
      fetchedUrl = url;
      fetchedHeaders = init?.headers || {};
      fetchedBody = init?.body || "";
      return {
        ok: true,
        json: async () => ({
          sid: "SMmockmessagesid1234567890",
          status: "queued",
        }),
      } as any;
    }) as any;

    const result = await sendSMS({
      to: "3863331482",
      body: "Live carrier dispatch test",
    });

    assert.equal(result.success, true);
    assert.equal(result.messageId, "SMmockmessagesid1234567890");
    assert.equal(result.provider, "twilio");
    assert.match(fetchedUrl, /api\.twilio\.com\/2010-04-01\/Accounts\/ACmockaccount00000000000000000000\/Messages\.json/);
    assert.match(fetchedHeaders.Authorization, /^Basic /);
    assert.match(fetchedBody, /To=%2B13863331482/);
    assert.match(fetchedBody, /Body=Live\+carrier\+dispatch\+test/);
  } finally {
    process.env = origEnv;
    global.fetch = origFetch;
  }
});
