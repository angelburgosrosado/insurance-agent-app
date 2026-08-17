# Expanding the Agent Content

Currently, the application displays a solid landing page, but the internal service pages (`/services/[slug]`) contain placeholder B2B consulting data, and the homepage doesn't actively link to the specific product pages.

This plan focuses on fleshing out the actual content for a 0215 State Licensed Practitioner (Life, Health, and Variable Annuities) and wiring up the navigation.

## User Review Required

> [!IMPORTANT]
> Please review the approach below and let me know if you want to make any adjustments before I start building the content pages!

## Open Questions

> [!WARNING]
>
> 1. Are there any specific carriers (besides Nationwide) or specific products you want heavily featured on these pages?
Answer:  See and extract from this page: <https://agents.worldfinancialgroup.com/Angel-Burgos-F6D9U> and this temporary wordpress pages that this app will substitute:  <https://abglco.com>
> 2. Should we add an "About the Agent" page (`/about`) as well, or is the homepage profile card sufficient for now?
Yes, about the agent page must be included

## Proposed Changes

### 1. Rebuild Service Data (`src/lib/content/services.ts`)

We will rewrite the placeholder data to include four core service pillars relevant to Angel Burgos's license:

- **Life Insurance**: Covering Nationwide Heritage®, Effortless Life, Term, and Universal Life policies.
- **Health Insurance**: Medicare Supplements, Advantage plans, and ACA navigation.
- **Annuities**: Fixed, Indexed, and Variable Annuities for retirement income planning.
- **Long-Term Care Planning**: Cash-Indemnity vs Reimbursement models (like Nationwide CareMatters).

Each service will include detailed descriptions, relevant FAQs, and targeted pain points to solve for the client.

### 2. Enhance the Service Page Layout (`src/components/service-page.tsx`)

We will enrich the layout so it isn't just a single block of text. We will add:

- A "Key Benefits" list with nice checkmark icons.
- A call-to-action block embedded at the bottom of the content.

### 3. Wire Up the Homepage (`src/app/page.tsx`)

- Update the top navigation bar to include a "Products" dropdown (or direct links) pointing to `/services/life-insurance`, `/services/annuities`, etc.
- In the "Strategic Protection Tiers" Bento grid, wrap the specific product boxes (e.g., "Nationwide Heritage") in actual Next.js `<Link>` tags so users can click them and read the newly created service pages.

## Verification Plan

### Manual Verification

- Start the dev server and verify the navigation menu works.
- Click into each of the 4 new service pages to ensure the content renders beautifully and the FAQs expand/display correctly.
- Ensure clicking the "Request a Consultation" button on any service page correctly routes the user to the lead form on the homepage (`/#consultation`).
