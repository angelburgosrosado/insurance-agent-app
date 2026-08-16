# Integrating the Stitch Design into Next.js (Updated Plan)

Based on your answers and the analysis of the `insurance-agent-app` directory, this plan outlines the strategy to consolidate the Stitch frontend designs with your existing Next.js + Prisma/Supabase setup.

## User Review Required

> [!IMPORTANT]
> Please review this updated plan to confirm the technical approach for wiring the new UI to the existing PostgreSQL database. Once approved, I will begin execution!

## Open Questions

> [!WARNING]
>
> 1. **Database Schema Mapping**: The current app has a Prisma schema (`prisma/schema.prisma`). When we wire up the "Get a Personalized Quote" or lead capture forms from the Stitch design, should we assume they map directly to an existing `Lead` or `Quote` table in Prisma, or would you like me to update the Prisma schema as well if fields are missing?
Answer:  Update schema and missing fields.
> 2. **Authentication (Supabase)**: For the "Secure Client Documents Portal" or "Lead Management Dashboard Admin", do you want to integrate Supabase SSR auth immediately, or start with just the UI views?
Answer: We can do Supabase SSR auth, I am already using it for the current app.

## Proposed Changes

We will approach the consolidation in three phases:

### Phase 1: Design System Consolidation (Sentinel Professional Narrative)

We will update your Next.js configuration to strictly follow the **Sentinel Professional Narrative** vibe design, prioritizing trust, authority, and bilingual support.

#### [MODIFY] `tailwind.config.ts`

- Add the **Inter** font family.
- Port over the Sentinel colors: **Sentinel Navy** (`#000f27` / `#0b2447`), **Professional Gold** (`#c5a059`), and **Trust Teal** (`#159895`).
- Update border radius to soft geometry (`4px` for standard elements, `8px` for cards) and spacing rules (including the `1.2x` bilingual buffer logic for buttons/inputs).

#### [MODIFY] `src/app/globals.css`

- Import the Inter font.
- Apply base surface styles (`#f7f9fb`) to the `body`.

---

### Phase 2: Core UI Components Extraction

We will create reusable Next.js components matching the Sentinel design, ready to be wired to the backend.

#### [NEW] `src/components/ui/Button.tsx`

- Primary (Navy) and Secondary (Gold) variants with bilingual padding buffers.

#### [NEW] `src/components/ui/AgentProfileCard.tsx`

- The signature component featuring the portrait, title, and bilingual badges.

#### [NEW] `src/components/ui/ComplianceDisclosure.tsx`

- The dedicated footer area with `disclosure-text` typography.

#### [NEW] `src/components/ui/Input.tsx`

- High-contrast labels with custom "Caution Red" error states and no placeholders.

---

### Phase 3: Page Integration & Backend Consolidation

We will convert the HTML from the Stitch export into Next.js React pages, starting with the highest priority page, and wire them to your existing backend.

#### [NEW/MODIFY] `src/app/page.tsx` (Expert Insurance & Retirement Solutions)

- Translate `code.html` from `ab_global_consulting_expert_insurance_retirement_solutions`.
- Consolidate any existing homepage logic from the current app into this new design.
- Convert standard HTML elements into React components.

#### [NEW] Server Actions (`src/lib/actions.ts` or inline)

- As we build forms (e.g., Lead Capture or Quote Requests), we will use Next.js Server Actions to securely connect the UI to your PostgreSQL database using the existing `PrismaClient` setup.

## Verification Plan

### Automated Tests

- Run `pnpm run build` and `pnpm run typecheck` to ensure there are no TypeScript or React hydration errors.
- Run `pnpm test` to ensure existing backend tests pass with the new UI integrations.

### Manual Verification

- We will start the development server (`pnpm run dev`).
- We will compare the rendered Next.js app against the `screen.png` files to ensure the Sentinel Professional Narrative vibe is perfectly captured.
