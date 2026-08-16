# Phase 4 Implementation Plan: Content Operations & SEO

This plan covers the transition of the application into a robust public acquisition platform, integrating database-driven content management and rigorous technical SEO.

## User Review Required
> [!IMPORTANT]
> The Master Plan specifies that **database-driven content** is preferred over a Headless CMS for the first release. This implementation plan proceeds with using our Prisma `ContentEntry` table to manage articles/resources.
> 
> Also, **all service pages** will be set to `noindex` until you confirm the content has been approved for compliance (avoiding unsupported financial/insurance promises).

## Open Questions
1. **CMS Scope:** Do you want a full admin interface to create/edit `ContentEntry` records right now, or should we just build the API routes and display pages first, relying on direct database edits for now?
2. **Business Details for SEO:** To accurately implement the `Organization` or `ProfessionalService` structured schema, I need basic business details (e.g. Official Business Name, Phone Number, Service Area/State). Do you have these available?

## Proposed Changes

### Task 4.1: Service Page Architecture
Create dynamic service pages with robust SEO metadata.

#### [NEW] `src/lib/content/services.ts`
A static mapping or database query for approved service offerings (e.g. Life Insurance, Health Insurance).

#### [NEW] `src/components/service-page.tsx`
A reusable layout component containing the hero section, description, CTA form link, and an FAQ block.

#### [NEW] `src/app/services/[slug]/page.tsx`
The dynamic Next.js route mapping to individual services. Will include Next.js `generateMetadata` for dynamic title, description, and canonical URLs.

---

### Task 4.2: Resource Center Foundations (CMS)
Establish a lightweight database-driven content center.

#### [NEW] `src/app/resources/page.tsx`
A listing page for published educational content and articles, queried from the Prisma `ContentEntry` table.

#### [NEW] `src/app/resources/[slug]/page.tsx`
Dynamic route displaying individual content entries, rendering Markdown/HTML safely.

#### [NEW] `src/app/api/admin/content/route.ts`
Protected API endpoints (restricted to admin) for creating, updating, and publishing `ContentEntry` records.

---

### Task 4.3: Structured Data and Technical SEO
Ensure maximum visibility and correct indexing behavior.

#### [NEW] `src/lib/seo/schema.ts`
Utility functions generating Google-compliant JSON-LD structured data (`BreadcrumbList`, `FAQPage`, `ProfessionalService`).

#### [MODIFY] `src/app/layout.tsx`
Inject default canonical URLs, OpenGraph tags, and the base Organization JSON-LD script.

#### [MODIFY] `src/app/sitemap.ts` & `src/app/robots.ts`
Dynamically generate sitemaps including published resources and services. Ensure `/admin`, `/api`, and draft content are strictly disallowed in `robots.txt`.

## Verification Plan

### Automated Tests
- Run `npm run build` to verify static and dynamic route generation.

### Manual Verification
- Validate the generated JSON-LD using Google's Rich Results Test tool.
- Ensure the `x-robots-tag: noindex` (or meta tag) is correctly applied to service pages.
- Verify that draft content does not appear in `/resources` or `sitemap.xml`.
