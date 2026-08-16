# Prospect Portal Boundary Definition

This document explicitly outlines the scope and boundaries of the Prospect Portal within the AB Global Consulting Private Insurance Acquisition App. The portal is designed strictly for marketing, intake, and appointment coordination.

## Allowed Scope
- **Authentication:** Prospects can log in via Email/Password or Google OAuth (using Supabase).
- **Profile Management:** Viewing and updating basic contact information (name, email, phone).
- **Consent Preferences:** Managing communication preferences (email/SMS opt-in) with versioned consent tracking.
- **Consultation Scheduling:** Requesting and viewing the status of appointments (integrated with Google Calendar API).
- **Data Privacy:** Prospects can request account deletion (anonymization) in compliance with retention policies.

## Strictly Forbidden Scope
- **No Policy Administration:** The portal will not display policy numbers, coverage amounts, or deductibles.
- **No Underwriting:** There will be no questionnaires related to health status, financial underwriting, or risk assessment directly exposed to automated decision engines.
- **No Claims:** Prospects cannot file or view insurance claims.
- **No Contract Issuance:** No binding agreements or coverage issuance capabilities will exist within the application.

## Security Controls
- Prospects have a specific `prospect` role.
- APIs under `/api/portal/*` strictly enforce Row-Level Security (RLS) or server-side checks to ensure a prospect can only access their own specific `Lead` or `User` record.
- Prospect accounts cannot access `/admin` or `/api/admin` endpoints.
