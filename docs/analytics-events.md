# Analytics Event Dictionary

This document outlines the standard first-party events used across the application. These events are dispatched by the `AnalyticsProvider` and intercepted by the `dispatcher.ts`, which then routes them to enabled third-party adapters (like GA4 and Meta Pixel).

## `page_view`
- **When:** Fired on every route change.
- **Properties:**
  - `path`: The relative URL path (e.g. `/services/life-insurance`)

## `cta_click`
- **When:** Fired when a user clicks a primary Call To Action button outside of a form.
- **Properties:**
  - `cta_name`: Identifier for the CTA (e.g. `hero_schedule_button`)
  - `destination`: URL or anchor it leads to.

## `form_start`
- **When:** Fired the first time a user interacts with a form input.
- **Properties:**
  - `form_name`: Identifier for the form (e.g. `consultation_form`)

## `form_step_complete`
- **When:** For multi-step forms, fired when a user successfully passes a step.
- **Properties:**
  - `form_name`: Identifier for the form
  - `step`: Step number or name (e.g. `contact_info`)

## `lead_submit_success`
- **When:** Fired when a lead form is successfully submitted and the server responds with a 200 OK.
- **Properties:**
  - `form_name`: Identifier for the form
  - `service`: The service area they selected, if applicable

## `lead_submit_error`
- **When:** Fired when a lead form submission fails validation or server error.
- **Properties:**
  - `form_name`: Identifier for the form
  - `error_message`: The specific error returned

## `consultation_request`
- **When:** Fired when a user requests a specific calendar appointment time in the portal.
- **Properties:**
  - `preferredDate`: The date requested
  - `preferredTime`: The time block requested

## `signup` / `login`
- **When:** Fired on successful authentication.
- **Properties:**
  - `method`: e.g. `google`, `email`
