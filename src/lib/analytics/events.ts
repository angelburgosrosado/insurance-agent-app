export type EventName = 
  | "page_view"
  | "cta_click"
  | "form_start"
  | "form_step_complete"
  | "lead_submit_success"
  | "lead_submit_error"
  | "consultation_request"
  | "login"
  | "signup";

export interface AnalyticsEvent {
  name: EventName;
  properties?: Record<string, any>;
  timestamp?: number;
}

// Helper for standardizing payload structures
export function createEvent(name: EventName, properties?: Record<string, any>): AnalyticsEvent {
  return {
    name,
    properties,
    timestamp: Date.now(),
  };
}
