import { AnalyticsEvent } from "../events";

// Extend window object to recognize Facebook Pixel
declare global {
  interface Window {
    fbq: (...args: any[]) => void;
  }
}

export function trackMeta(event: AnalyticsEvent) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    let fbEventName = event.name as string;
    let isCustom = true;
    
    // Map to Standard Events where applicable to leverage Meta's ML optimization
    switch (event.name) {
      case "lead_submit_success":
        fbEventName = "Lead";
        isCustom = false;
        break;
      case "form_start":
        fbEventName = "InitiateCheckout"; // Often used as a proxy for funnel start
        isCustom = false;
        break;
      case "consultation_request":
        fbEventName = "Schedule";
        isCustom = false;
        break;
    }

    if (isCustom) {
      window.fbq("trackCustom", fbEventName, event.properties || {});
    } else {
      window.fbq("track", fbEventName, event.properties || {});
    }
  }
}
