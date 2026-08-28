export interface SocialPublishRequest {
  channels: Array<"linkedin" | "facebook" | "instagram" | "twitter" | "whatsapp" | "webhook">;
  payload: {
    productName: string;
    title: string;
    caption: string;
    trackedUrl: string;
    disclosure: string;
    mediaCue?: string;
  };
  customWebhookUrl?: string;
}

export interface SocialPublishResponse {
  success: boolean;
  dispatchedChannels: string[];
  mode: "live" | "simulated";
  dispatchedAt: string;
  message: string;
  webhookStatus?: number;
}

/**
 * Dispatches campaign content to external webhooks (Zapier, Make, Buffer, Ayrshare, n8n)
 */
export async function dispatchSocialCampaign(
  req: SocialPublishRequest
): Promise<SocialPublishResponse> {
  const now = new Date().toISOString();
  const webhookUrl =
    req.customWebhookUrl ||
    process.env.SOCIAL_DISPATCH_WEBHOOK_URL ||
    process.env.CRM_WEBHOOK_URL;

  const dispatchedChannels = req.channels;

  if (!webhookUrl) {
    // Resilient simulated mode when no webhook is configured yet
    return {
      success: true,
      dispatchedChannels,
      mode: "simulated",
      dispatchedAt: now,
      message:
        "Campaign packaged successfully. Configure SOCIAL_DISPATCH_WEBHOOK_URL in .env.local to route live to Zapier/Buffer/Make.",
    };
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "ABGlobal-SocialStudio/1.0",
      },
      body: JSON.stringify({
        event: "campaign.dispatched",
        timestamp: now,
        advisor: "Angel Burgos, PE",
        license: "Florida 0215 #G328926",
        channels: dispatchedChannels,
        data: req.payload,
      }),
    });

    return {
      success: res.ok,
      dispatchedChannels,
      mode: "live",
      dispatchedAt: now,
      webhookStatus: res.status,
      message: res.ok
        ? "Campaign successfully dispatched to connected automation webhook."
        : `Webhook responded with status ${res.status}`,
    };
  } catch (error: any) {
    return {
      success: false,
      dispatchedChannels,
      mode: "live",
      dispatchedAt: now,
      message: error?.message || "Failed to dispatch to social webhook",
    };
  }
}

/**
 * Helper to build direct 1-click social web intents
 */
export function buildSocialIntents(text: string, url: string, title?: string) {
  const encodedText = encodeURIComponent(text);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title || "Financial Protection Insight");

  return {
    linkedin: `https://www.linkedin.com/feed/?shareActive=true&text=${encodedText}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedText}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedText}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedText}`,
  };
}
