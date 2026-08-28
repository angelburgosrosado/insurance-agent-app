import test from "node:test";
import assert from "node:assert/strict";
import { generateCampaignPack, getProductMetadata } from "../src/lib/server/ai-content-generator";

test("AI Content Generator - Generates multi-channel pack for Military persona", () => {
  const pack = generateCampaignPack({
    product: "military",
    persona: "veterans",
    trigger: "military_transition",
    tone: "analytical",
    lang: "en",
  });

  assert.ok(pack.trackedUrl.includes("utm_source=social"));
  assert.ok(pack.trackedUrl.includes("utm_campaign=military_veterans_military_transition"));
  assert.ok(pack.videoScript.hook.includes("VGLI"));
  assert.ok(pack.linkedInPost.includes("SBP"));
  assert.ok(pack.paidAd.headline.includes("Military"));
  assert.equal(pack.carouselSlides.length, 5);
  assert.ok(pack.complianceDisclosure.includes("#G328926"));
});

test("AI Content Generator - Generates Spanish campaign pack for Florida IUL", () => {
  const pack = generateCampaignPack({
    product: "iul",
    persona: "hispanic_families",
    trigger: "market_volatility",
    tone: "direct_response",
    lang: "es",
  });

  assert.ok(pack.product.includes("IUL"));
  assert.ok(pack.videoScript.fullText.includes("Florida"));
  assert.ok(pack.linkedInPost.includes("IRS"));
  assert.ok(pack.complianceDisclosure.includes("Asesoría Licenciada 0215"));
});

test("AI Content Generator - Metadata resolves valid URLs for all products", () => {
  const products = ["military", "iul", "annuity", "funeral", "dime", "ltc"] as const;
  for (const prod of products) {
    const metaEn = getProductMetadata(prod, "en");
    const metaEs = getProductMetadata(prod, "es");
    assert.ok(metaEn.path.startsWith("/tools/"));
    assert.ok(metaEs.path.startsWith("/tools/"));
    assert.ok(metaEn.name.length > 0);
    assert.ok(metaEs.name.length > 0);
  }
});
