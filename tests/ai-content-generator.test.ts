import test from "node:test";
import assert from "node:assert/strict";
import { generateCampaignPack, getProductMetadata, UNIVERSAL_SOCIAL_BIOS } from "../src/lib/server/ai-content-generator";

test("AI Content Generator - Generates multi-channel pack for Military persona with seed rotation", () => {
  const pack1 = generateCampaignPack({
    product: "military",
    persona: "veterans",
    trigger: "military_transition",
    tone: "analytical",
    lang: "en",
    seed: 0,
  });

  const pack2 = generateCampaignPack({
    product: "military",
    persona: "veterans",
    trigger: "military_transition",
    tone: "analytical",
    lang: "en",
    seed: 1,
  });

  assert.ok(pack1.trackedUrl.includes("utm_source=social"));
  assert.equal(pack1.variationId, 1);
  assert.equal(pack2.variationId, 2);
  assert.notEqual(pack1.videoScript.title, pack2.videoScript.title);
  assert.ok(pack1.videoScript.hook.length > 10);
  assert.ok(pack1.linkedInPost.includes("SBP"));
  assert.ok(pack1.paidAd.headline.includes("Military"));
  assert.ok(pack1.youtubeVideo.chapters.length >= 4);
  assert.equal(pack1.carouselSlides.length, 5);
  assert.ok(pack1.complianceDisclosure.includes("#G328926"));
});

test("AI Content Generator - Generates Spanish campaign pack for Florida IUL with Engineering Clarity", () => {
  const pack = generateCampaignPack({
    product: "iul",
    persona: "hispanic_families",
    trigger: "engineering_clarity",
    tone: "direct_response",
    lang: "es",
    seed: 0,
    customNotes: "Empresario en Orlando",
  });

  assert.ok(pack.product.includes("IUL"));
  assert.ok(pack.videoScript.fullText.length > 20);
  assert.ok(pack.linkedInPost.includes("IRS"));
  assert.ok(pack.youtubeVideo.title.includes("Piso 0%"));
  assert.equal(pack.customAngleApplied, "Empresario en Orlando");
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

test("AI Content Generator - Universal Social Bios conform to brand identity", () => {
  assert.equal(UNIVERSAL_SOCIAL_BIOS.universal.headline, "Strategic Financial Advisor | PE");
  assert.ok(UNIVERSAL_SOCIAL_BIOS.linkedin.about.includes("#G328926"));
  assert.ok(UNIVERSAL_SOCIAL_BIOS.instagram.bio.includes("abglco.com"));
});
