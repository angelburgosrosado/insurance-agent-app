import { AnalyticsEvent } from "../events";

// Extend window object to recognize GA's dataLayer
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export function trackGA4(event: AnalyticsEvent) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    // Map our internal event names to GA4 standard events where applicable
    let gaEventName = event.name as string;
    
    switch (event.name) {
      case "lead_submit_success":
        gaEventName = "generate_lead";
        break;
      case "signup":
        gaEventName = "sign_up";
        break;
      case "login":
        gaEventName = "login";
        break;
    }

    window.gtag("event", gaEventName, event.properties || {});
  }
}
