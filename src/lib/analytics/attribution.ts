"use client";

export interface AttributionData {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
  referrer?: string;
  landingPage?: string;
}

const STORAGE_KEY = "ab_lead_attribution";

/**
 * Captures UTM parameters and referrer on initial page load and stores in sessionStorage
 */
export function captureAttribution(): AttributionData {
  if (typeof window === "undefined") return {};

  try {
    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get("utm_source");
    const utmMedium = params.get("utm_medium");
    const utmCampaign = params.get("utm_campaign");
    const utmTerm = params.get("utm_term");
    const utmContent = params.get("utm_content");

    // Only overwrite if new UTM parameters are present
    if (utmSource || utmCampaign) {
      const data: AttributionData = {
        source: utmSource || "direct",
        medium: utmMedium || "organic",
        campaign: utmCampaign || "general",
        term: utmTerm || undefined,
        content: utmContent || undefined,
        referrer: document.referrer || undefined,
        landingPage: window.location.pathname,
      };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return data;
    }

    // Retrieve existing attribution from current session if available
    const existing = sessionStorage.getItem(STORAGE_KEY);
    if (existing) {
      return JSON.parse(existing);
    }

    // Fallback to organic/direct referrer
    const defaultData: AttributionData = {
      source: document.referrer ? new URL(document.referrer).hostname : "direct",
      medium: "referral",
      campaign: "direct_visit",
      landingPage: window.location.pathname,
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
    return defaultData;
  } catch {
    return {};
  }
}

/**
 * Retrieves the stored attribution data for form submissions
 */
export function getStoredAttribution(): AttributionData {
  if (typeof window === "undefined") return {};
  try {
    const existing = sessionStorage.getItem(STORAGE_KEY);
    if (existing) return JSON.parse(existing);
    return captureAttribution();
  } catch {
    return {};
  }
}
