# Phase 6 Implementation Plan: Marketing Integrations and Analytics

This phase establishes a robust first-party analytics foundation, integrates GA4 and Meta Pixel securely, and sets up the architecture for transactional emails and CRM webhooks.

## User Review Required
> [!IMPORTANT]
> To comply with privacy standards, we are implementing a **First-Party Analytics Dispatcher**. This means all tracking events are managed internally first, and only dispatched to external providers (GA4, Meta) if the user has consented.
> 
> The Email/CRM integrations will be built conceptually using internal logging for now, preparing them to be hooked up to actual API keys once the infrastructure is deployed.

## Open Questions
1. **Email Provider:** Which transactional email provider do you intend to use for notifications? (e.g., SendGrid, Resend, Postmark, AWS SES)
2. **CRM Webhook:** Do you have a specific CRM endpoint (e.g., GoHighLevel, HubSpot, Zapier) that the webhook should hit upon a new lead? If not, we will just build the generic webhook adapter.

## Proposed Changes

### Task 6.1: First-Party Event Tracking
Establish our own internal dictionary of conversion events so we aren't heavily coupled to one vendor.

#### [NEW] `src/lib/analytics/events.ts`
TypeScript definitions for all standardized marketing events (e.g., `page_view`, `cta_click`, `lead_submit_success`).

#### [NEW] `src/components/analytics-provider.tsx`
A React Context Provider that handles firing events globally, respecting user consent state.

#### [MODIFY] `src/components/consultation-form.tsx`
Instrument the primary consultation form to track `form_start`, `form_step_complete`, and `lead_submit_success`.

---

### Task 6.2: External Platform Adapters (GA4 & Meta)
Securely route internal events to third-party ad networks.

#### [NEW] `src/lib/analytics/dispatcher.ts`
The core logic that intercepts internal events and routes them to enabled external adapters.

#### [NEW] `src/lib/analytics/providers/ga4.ts` & `meta.ts`
Adapters for Google Analytics 4 (GA4) and Meta (Facebook) Pixel. Will use environment variables (e.g. `NEXT_PUBLIC_GA_MEASUREMENT_ID`) so keys are not hardcoded.

#### [NEW] `docs/analytics-events.md`
Documentation of the event schema for marketing/advertising team reference.

---

### Task 6.3: Email and CRM Delivery Architecture
Backend integrations to securely send notifications and push data to a CRM.

#### [NEW] `src/lib/integrations/email.ts`
Adapter interface for sending transactional emails (e.g. "New Lead Received").

#### [NEW] `src/lib/integrations/crm.ts`
Webhook dispatcher that handles HTTP POST to your external CRM endpoint, featuring basic retry logic via database jobs.

## Verification Plan

### Automated Tests
- Type checking to ensure event payloads match definitions.

### Manual Verification
- In the local dev environment, watch the browser console (or network tab) to verify that `dispatcher.ts` is catching the `page_view` and `cta_click` events correctly when interacting with the site.
