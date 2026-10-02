import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { computeWebhookSignature } from "../src/lib/security/pii-guard";
import { POST } from "../src/app/api/webhooks/leads/route";
import { proxy } from "../src/proxy";
import { NextRequest } from "next/server";

test("CRM Integration - /api/webhooks/leads accepts and validates valid lead payload", async () => {
  const payload = {
    applicantName: "Elena Rostova",
    applicantFirstName: "Elena",
    applicantLastName: "Rostova",
    applicantEmail: "elena.rostova@example.com",
    applicantPhone: "407-555-0199",
    zipCode: "32801",
    territory: "Central Florida",
    productInterest: "Life",
    quoteParameters: {
      category: "life",
      productSubtype: "Indexed Universal Life (0% Floor)",
      coverageOrInvestmentAmount: "$1,000,000",
      notes: "Showcase test case",
    },
    consent: true,
    consentTimestamp: new Date().toISOString(),
    consentVersion: "myiad-v1.0-statutory",
    source: "crm.myiad.net",
    medium: "inbound-api",
    campaign: "external-demo",
  };

  const req = new Request("https://crm.myiad.net/api/webhooks/leads", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const res = await POST(req);
  assert.equal(res.status, 200);

  const json = await res.json();
  assert.equal(json.success, true);
  assert.equal(json.pipelineTarget, "crm.myiad.net");
  assert.ok(json.leadId, "Must return an assigned lead ID");
});

test("CRM Integration - /api/webhooks/leads rejects empty or invalid requests", async () => {
  // Empty request
  const emptyReq = new Request("https://crm.myiad.net/api/webhooks/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "",
  });
  const emptyRes = await POST(emptyReq);
  assert.equal(emptyRes.status, 400);

  // Missing email and phone
  const invalidReq = new Request("https://crm.myiad.net/api/webhooks/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ applicantName: "John Doe" }),
  });
  const invalidRes = await POST(invalidReq);
  assert.equal(invalidRes.status, 422);
});

test("CRM Integration - /api/webhooks/leads verifies HMAC signature when secret is configured", async () => {
  const secret = "test-crm-secret-key-123456789";
  process.env.CRM_MYIAD_WEBHOOK_SECRET = secret;

  const validPayload = JSON.stringify({
    applicantFirstName: "Carlos",
    applicantLastName: "Gomez",
    applicantEmail: "carlos@example.com",
    applicantPhone: "787-555-1234",
  });

  const validSignature = computeWebhookSignature(validPayload, secret);

  // 1. Valid signature
  const validReq = new Request("https://crm.myiad.net/api/webhooks/leads", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-myiad-signature": validSignature,
    },
    body: validPayload,
  });
  const validRes = await POST(validReq);
  assert.equal(validRes.status, 200);

  // 2. Tampered / invalid signature
  const tamperedReq = new Request("https://crm.myiad.net/api/webhooks/leads", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-myiad-signature": "invalid-tampered-signature",
    },
    body: validPayload,
  });
  const tamperedRes = await POST(tamperedReq);
  assert.equal(tamperedRes.status, 401);

  delete process.env.CRM_MYIAD_WEBHOOK_SECRET;
});

test("CRM Integration - proxy.ts rewrites crm.myiad.com to /crm", () => {
  const req = new NextRequest("https://crm.myiad.com/");
  const res = proxy(req);

  assert.ok(res);
  const rewriteHeader = res.headers.get("x-middleware-rewrite");
  assert.ok(rewriteHeader?.includes("/crm"), "Must rewrite crm.myiad.com root to /crm");
});

test("CRM Integration - proxy.ts rewrites crm.myiad.net to /crm showcase", () => {
  // crm.myiad.net root
  const req = new NextRequest("https://crm.myiad.net/");
  const res = proxy(req);

  // Check rewrite response
  assert.ok(res);
  const rewriteHeader = res.headers.get("x-middleware-rewrite");
  assert.ok(rewriteHeader?.includes("/crm"), "Must rewrite crm.myiad.net root to /crm");
});

test("CRM Integration - proxy.ts preserves API webhook paths on crm.myiad.net", () => {
  const req = new NextRequest("https://crm.myiad.net/api/webhooks/leads");
  const res = proxy(req);

  assert.ok(res);
  const rewriteHeader = res.headers.get("x-middleware-rewrite");
  assert.equal(rewriteHeader, null, "API routes on crm.myiad.net should pass through without rewrite");
});

test("CRM Integration - vercel.json contains crm.myiad.com and crm.myiad.net rewrites to /crm", () => {
  const vercelConfig = JSON.parse(
    fs.readFileSync(path.resolve(process.cwd(), "vercel.json"), "utf-8")
  );

  const crmComRewrite = vercelConfig.rewrites.find(
    (r: any) => r.source === "/" && r.destination === "/crm" && r.has?.[0]?.value === "crm\\.myiad\\.com"
  );
  assert.ok(crmComRewrite, "vercel.json must have rewrite for crm.myiad.com to /crm");

  const crmNetRewrite = vercelConfig.rewrites.find(
    (r: any) => r.source === "/" && r.destination === "/crm" && r.has?.[0]?.value === "crm\\.myiad\\.net"
  );
  assert.ok(crmNetRewrite, "vercel.json must have rewrite for crm.myiad.net to /crm");
});

test("CRM Integration - /api/crm/ai-synthesis synthesizes carrier and FINRA 2330 suitability", async () => {
  const { POST: postAi } = await import("../src/app/api/crm/ai-synthesis/route");

  const req = new Request("https://crm.myiad.com/api/crm/ai-synthesis", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      applicantName: "Gabriel Santos",
      service: "Military SGLI Transition",
      amount: "$500,000",
      phone: "813-555-0192",
    }),
  });

  const res = await postAi(req);
  assert.equal(res.status, 200);

  const data = await res.json();
  assert.equal(data.success, true);
  assert.ok(data.recommendedCarrier.includes("Mutual of Omaha"));
  assert.ok(data.suitabilityScore >= 90);
  assert.ok(data.advisorScript.includes("Gabriel"));
});


