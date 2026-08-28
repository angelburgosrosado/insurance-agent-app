import test from "node:test";
import assert from "node:assert/strict";
import { dispatchSocialCampaign, buildSocialIntents } from "../src/lib/server/social-publisher";

test("Social Publisher - Builds valid 1-click web intent URLs for all platforms", () => {
  const text = "Strategic financial insight for military veterans.";
  const url = "https://abglco.com/tools/military-asset-shield";
  const title = "Military Asset Shield";

  const intents = buildSocialIntents(text, url, title);

  assert.ok(intents.linkedin.startsWith("https://www.linkedin.com/feed/?shareActive=true"));
  assert.ok(intents.linkedin.includes(encodeURIComponent(text)));

  assert.ok(intents.twitter.startsWith("https://twitter.com/intent/tweet"));
  assert.ok(intents.twitter.includes(encodeURIComponent(text)));

  assert.ok(intents.facebook.startsWith("https://www.facebook.com/sharer/sharer.php"));
  assert.ok(intents.facebook.includes(encodeURIComponent(url)));

  assert.ok(intents.whatsapp.startsWith("https://api.whatsapp.com/send"));
  assert.ok(intents.whatsapp.includes(encodeURIComponent(text)));

  assert.ok(intents.email.startsWith("mailto:?subject="));
  assert.ok(intents.email.includes(encodeURIComponent(title)));
});

test("Social Publisher - Operates in simulated mode without throwing when no webhook is set", async () => {
  const res = await dispatchSocialCampaign({
    channels: ["linkedin", "facebook", "whatsapp"],
    payload: {
      productName: "Military Asset Shield",
      title: "VGLI vs IUL Breakdown",
      caption: "Check out the transition calculator",
      trackedUrl: "https://abglco.com/tools/military-asset-shield",
      disclosure: "Florida License #G328926",
    },
  });

  assert.equal(res.success, true);
  assert.equal(res.mode, "simulated");
  assert.equal(res.dispatchedChannels.length, 3);
  assert.ok(res.dispatchedAt.length > 0);
});
