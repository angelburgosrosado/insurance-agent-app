# Automation & Integration Architecture Plan

This plan establishes the technical architecture and rollout roadmap for advanced automations across the AB Global Consulting platform, elevating client conversion, streamlining advisor operations, and automating lead nurturing.

---

## 1. Executive Summary of Automation Modules

| Module | Core Capability | Technologies / Providers | Key Value |
| :--- | :--- | :--- | :--- |
| **1. Twilio SMS Automation** | Instant 2-way SMS auto-reply upon form submission & 1-click admin SMS outreach | Twilio REST API, Node.js webhook handler | Immediate <60s contact rate with prospective clients |
| **2. Calendar Booking Integration** | Embedded Calendly / Cal.com scheduling on Thank-You page, Client Portal, and Admin | Calendly API / Webhooks, React Embed | Eliminates email/phone back-and-forth for consultation booking |
| **3. Dynamic PDF Report Generator** | Instant branded PDF illustrations for IUL Simulator, Annuity Estimator, and Military Shield | React PDF / HTML-to-PDF engine | High-value personalized deliverable sent directly to client's email |
| **4. Multi-Agent Lead Routing** | Automated territory & product-based lead distribution across Florida & Puerto Rico agents | Prisma DB schema update, routing rules engine | Scales advisory practice to support team members and assistants |

---

## 2. Configuration & Requirements

### Required Integrations:
1. **Twilio SMS**:
   - `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER`
   - Built with resilient fallbacks so the app operates smoothly with or without live Twilio keys.
2. **Calendar Scheduling**:
   - Calendly / Cal.com link (e.g. `https://calendly.com/...`) embedded into the Thank You and appointment screens.
3. **Multi-Agent Lead Routing**:
   - Default assignment to Principal Advisor Angel Burgos with territory tags (Florida, Puerto Rico, Out-of-State).

---

## 3. Detailed Architecture & Proposed Changes

### Module 1: Automated SMS Engine (`Twilio / SMS Gateway`)
- **`src/lib/integrations/sms.ts`**:
  - Implements `sendSMS({ to, body })` with Twilio API credentials.
  - Graceful fallback: If Twilio is not yet configured, logs the message payload safely without throwing errors.
  - Formats messages in bilingual format according to detected language (`en` / `es`).
- **`src/app/api/webhooks/sms/route.ts`**:
  - Inbound webhook handler for SMS replies (supports standard TCPA `STOP` / `UNSUBSCRIBE` and client chat responses).
- **`src/app/api/leads/route.ts`**:
  - Automatically triggers welcome SMS upon valid form intake if affirmative consent was granted.
- **`src/app/api/admin/leads/[id]/sms/route.ts`**:
  - Allows Angel / staff to send 1-click custom SMS messages directly from the Lead Dossier screen.

---

### Module 2: Seamless Calendar Booking (`Calendly / Cal.com`)
- **`src/components/CalendarBookingModal.tsx`**:
  - Lightweight embedded calendar widget supporting inline popups or embedded iframe.
  - Automatically pre-fills client's name, email, and phone into the booking form.
- **`src/app/thank-you/page.tsx`**:
  - Adds a prominent *"Step 2: Choose Your Consultation Time on the Calendar"* module immediately following form submission.
- **`src/app/api/webhooks/calendly/route.ts`**:
  - Receives `invitee.created` and `invitee.canceled` webhook events.
  - Automatically updates lead status to `assigned` or `qualified` and creates follow-up calendar tasks in the database.

---

### Module 3: Dynamic PDF Illustration & Report Generator
- **`src/lib/pdf/report-generator.ts`**:
  - Generates downloadable, high-resolution branded PDF reports summarizing client scenarios:
    - **Florida IUL Report**: 0% floor modeling, IRS 7702 tax-free cash projection, and living benefit riders.
    - **Military Asset Shield Report**: SGLI vs VGLI cost comparison table, SBP Pension Max illustration, and TSP rollover summary.
    - **Annuity Paycheck Report**: Guaranteed lifetime paycheck modeling from 401(k)/IRA balances.
- **`src/app/api/reports/download/route.ts`**:
  - Generates on-demand PDF stream for client downloads and advisor email attachments.

---

### Module 4: Multi-Agent & Territory Lead Routing
- **`prisma/schema.prisma`**:
  - Add `assignedAgentId` relation on `Lead` model, along with `territory` and `agentNotes`.
- **`src/lib/server/lead-routing.ts`**:
  - Rules engine supporting:
    - Default routing to Principal Advisor Angel Burgos.
    - Zip code / state detection (FL vs PR vs out-of-state).
    - Product specialization routing (e.g., Veteran specialists vs Annuity specialists).
- **`src/app/admin/leads/[id]/page.tsx`**:
  - Reassignment dropdown selector allowing quick team handoffs.

---

## 4. Phased Implementation Roadmap & Verification Status

| Phase | Milestone | Scope & Artifacts | Status |
| :--- | :--- | :--- | :--- |
| **Phase 1** | **Twilio SMS Engine** | Bilingual auto-replies, dispatch alerts to `(386) 333-1482`, `src/lib/integrations/sms.ts`, admin 1-click SMS | ✅ **COMPLETED & TESTED** |
| **Phase 2** | **Calendar Booking** | Calendly embed, `CalendarBookingModal.tsx`, webhook auto-task sync at `/api/webhooks/calendly` | ✅ **COMPLETED & TESTED** |
| **Phase 3** | **Dynamic PDF Generator** | High-res PDF generator for IUL, Military Shield, Annuities, D.I.M.E. (`src/lib/pdf/report-generator.ts`) | ✅ **COMPLETED & TESTED** |
| **Phase 4** | **Multi-Agent Lead Routing** | Territory detection (FL/PR/US), product routing, admin reassignments (`src/lib/server/lead-routing.ts`) | ✅ **COMPLETED & TESTED** |
| **Phase 5** | **AI Voice Receptionist** | Twilio ConversationRelay (`voice-relay/server.ts`), Deepgram STT, Google TTS, Gemini LLM, live handoff | ✅ **COMPLETED & TESTED** |
| **Phase 6** | **Toll-Free & Legal Compliance** | Carrier verification `/opt-in` center, updated `/privacy`, `/terms`, `/disclosures`, domain footer links | ✅ **COMPLETED & TESTED** |

---

## 5. Production Operational Checklist

- [x] **Toll-Free Number Live:** `1-888-887-3585` configured for ConversationRelay voice webhook and CTIA SMS.
- [x] **Direct Advisor Line:** `(386) 333-1482` designated for live warm transfer handoffs and instant SMS dispatch.
- [x] **Carrier Verification URL:** `https://myiad.com/opt-in` accessible with verbatim non-sharing clause and unchecked consent demo.
- [x] **Full Bilingual Support:** English and Spanish translations complete across all landing pages, tools, and voice prompts.
- [x] **Automated Test Suite:** 93/93 unit and integration tests passing (`npm test`).
- [x] **Clean Production Build:** All 61 Next.js application routes compiled and verified (`npm run build`).
