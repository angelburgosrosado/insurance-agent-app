# Phase 7 Implementation Plan: Campaigns & Internal Analytics

This phase focuses on empowering the administrative and marketing teams by building out internal dashboards to visualize campaign effectiveness and overall lead flow without relying entirely on third-party platforms.

## User Review Required
> [!IMPORTANT]
> The internal analytics dashboard will provide a foundational view of your data using Recharts (a charting library). If you require deep, multi-dimensional slicing of data (e.g., cohort analysis), that is typically better handled in GA4 or a BI tool. This dashboard will be excellent for day-to-day pulse checks.

## Proposed Changes

### Task 7.1: Internal Analytics Dashboard (`/admin/analytics`)
Provide high-level visual representations of lead generation and conversion trends.

#### [NEW] `src/app/admin/analytics/page.tsx`
- Implement the analytics dashboard UI.
- Show a time-series chart of leads generated over the last 30 days.
- Show a breakdown of leads by service requested (Pie/Bar chart).

#### [NEW] `src/lib/server/analytics-metrics.ts`
- Create Prisma queries to aggregate leads by date (for the time-series chart) and by service (for the breakdown chart).

### Task 7.2: Campaign Tracking Dashboard (`/admin/campaigns`)
Provide visibility into which marketing channels and specific UTM campaigns are driving qualified leads.

#### [NEW] `src/app/admin/campaigns/page.tsx`
- Implement a data table view grouping leads by `utm_source`, `utm_medium`, and `utm_campaign`.
- Show metrics like Total Leads, Qualified Leads, and Conversion Rate per campaign.

#### [NEW] `src/lib/server/campaign-metrics.ts`
- Create Prisma queries to group lead data by their `LeadAttribution` relations.
- Calculate conversion rates per campaign.

## Verification Plan

### Manual Verification
- Navigate to `/admin/analytics` and ensure the charts render correctly with the mock/existing data in the database.
- Navigate to `/admin/campaigns` and verify that leads with UTM parameters (if any exist) are grouped correctly. If no UTM leads exist, submit a test lead with `?utm_source=test` and verify it appears.
