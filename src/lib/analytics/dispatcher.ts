import { AnalyticsEvent } from "./events";
import { trackGA4 } from "./providers/ga4";
import { trackMeta } from "./providers/meta";

// We'll manage user consent state via this boolean flag.
// In a full implementation, this might be tied to a Cookie Consent banner.
let hasConsent = true; // defaulting to true for the prototype

export function setAnalyticsConsent(consent: boolean) {
  hasConsent = consent;
}

export function dispatchEvent(event: AnalyticsEvent) {
  if (!hasConsent) {
    console.log("[Analytics Dispatcher] Event dropped due to lack of consent:", event.name);
    return;
  }

  // Development logging
  if (process.env.NODE_ENV === "development") {
    console.log("[Analytics Dispatcher] Firing Event:", event.name, event.properties);
  }

  // Route to enabled providers
  trackGA4(event);
  trackMeta(event);
}
