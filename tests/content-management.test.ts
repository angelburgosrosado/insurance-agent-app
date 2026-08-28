import test from "node:test";
import assert from "node:assert/strict";
import { getAllContent, getContentBySlug } from "../src/lib/server/content-service";

test("Content Service - Seeds and retrieves all default resources and services", async () => {
  const allContents = await getAllContent();

  assert.ok(allContents.length >= 10);
  const dime = allContents.find((c) => c.slug === "dime-method-life-insurance");
  const iulService = allContents.find((c) => c.slug === "life-insurance");

  assert.ok(dime);
  assert.equal(dime?.type, "resource");
  assert.equal(dime?.status, "published");

  assert.ok(iulService);
  assert.equal(iulService?.type, "service");
});

test("Content Service - Retrieves single content item by slug with details", async () => {
  const item = await getContentBySlug("military-veteran-asset-shield", "resource");

  assert.ok(item);
  assert.equal(item?.slug, "military-veteran-asset-shield");
  assert.ok(item?.title.includes("Military"));
  assert.ok(item?.summary && item.summary.length > 10);
});

test("Content Service - Filters content by type correctly", async () => {
  const servicesOnly = await getAllContent("service");
  const resourcesOnly = await getAllContent("resource");

  assert.ok(servicesOnly.length > 0);
  assert.ok(resourcesOnly.length > 0);

  for (const s of servicesOnly) {
    assert.equal(s.type, "service");
  }

  for (const r of resourcesOnly) {
    assert.equal(r.type, "resource");
  }
});
