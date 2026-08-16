# UnlockedCRM reference

Source: read-only review of authenticated `https://app.unlockedcrm.ai`

## Observed CRM modules

- Contacts and Lead Lists
- Pipeline
- Calendar
- Inbox
- Tasks
- Documents
- Booking Links
- Policies
- Commissions
- Automations
- Campaigns
- Forms
- Analytics
- Life, Medicare, ACA, Quoting, and Underwrite AI
- unLocked AI

## Insurance domain model

- Contact, lead, client
- Agent and agency assignment
- Product and product interest
- Opportunity, pipeline, and stage
- Policy and carrier
- Commission
- Task, appointment, and activity
- Conversation and campaign
- Automation
- Form and document
- Lead list
- Renewal
- Quote and underwriting case

## Capability reference

- Contact lifecycle segmentation
- Product interest, lead source, tags, age, birthday, location, and agent filters
- Policy management, renewals, cross-sell opportunities, and policy-linked commissions
- Bulk import with automatic field mapping, required-field validation, saved mapping templates, and automatic tags
- Tasks, appointment scheduling, follow-up queues, booking links, and calendar workflows
- Inbox, email, SMS, voice, AI voice agents, and campaign sequences
- Workflow triggers, appointment-based waits, contact-field updates, intent filters, bulk re-enrollment, and campaign management
- Forms, documents, policy analysis, scope-of-appointment support, and client receipts
- Analytics for production, conversion, renewals, leakage, and campaign performance
- Contextual AI assistant with approval-gated CRM actions and page-specific prompts
- Multi-agent assignment and agency operations

## Workspace state during review

- Authenticated session confirmed
- Contacts: 0 records
- Booking Links: none
- No sample contact created
- No external data imported
- No phone number provisioned
- No A2P registration submitted
- No remote CRM mutation performed

## Current insurance-agent-app comparison

The local app currently models users, leads, lead attribution, lead notes, follow-up tasks, content entries, campaigns, and audit events. It has admin lead, task, campaign, analytics, and content surfaces, plus a client appointment request flow. It does not yet expose the full UnlockedCRM insurance model, especially policies, carriers, commissions, opportunities/pipelines, renewals, quotes, underwriting cases, conversations, automations, forms, documents, booking links, or agency-level assignment.

## Recommended implementation sequence

1. Contacts and lifecycle states
2. Insurance products and policy records
3. Opportunities, pipelines, and stages
4. Tasks, appointments, and activities
5. Renewals and cross-sell workflows
6. Commissions
7. Forms, documents, and imports
8. Automation engine
9. AI action layer with approval gates
10. Analytics and agency reporting

This document records reference findings only. It does not authorize remote CRM changes

## Extended product surface observed

### Navigation and workspace

- Product rail: Home, Phone, Email, Quoting, Life, Medicare, ACA, Build, Commission+, More, Agency, Earn, and Support
- CRM rail: unLocked AI, Inbox, Contacts, Pipeline, Calendar, Tools, Automations, Campaigns, Forms, Policies, Commissions, Tasks, Booking Links, Analytics, and Documents
- Workspace switching
- Sidebar collapse and search
- Setup checklist and onboarding progress
- Notifications panel with search, day grouping, priority colors, notification settings, clear-all, and mark-all-as-read
- Contextual page AI panel with page-specific prompts
- Upgrade-gated modules and plan-aware navigation

### Contacts and lead operations

- All Contacts list
- Lead Lists, Restore, Manage Lead Lists, and Family Trees
- Contact creation and bulk import
- CSV, XLSX, and XLS import flows
- Automatic field mapping and required-field validation
- Saved import mapping templates
- Automatic tag creation and assignment from imported columns
- Contact page layout customization with draggable blocks and cards
- Lifecycle filters for Lead, Active Client, and Archived Client
- Product, source, agent, location, age, birthday, gender, and tag filters
- Connection strength and last interaction tracking
- Bulk actions, including Power Dialer enrollment
- Contact editing inside the Power Dialer
- Inbound call routing that opens the matching client
- Number validation

### Pipeline and opportunity management

- Stage-based pipeline board
- Opportunity records and values
- Stage movement and ownership
- Closed Lost visibility within the original stage
- Lost reason tracking
- Follow-up prioritization
- AI summaries and next-action recommendations

### Communications and engagement

- Unified Inbox
- Email and phone entry points
- SMS and email conversations
- Draft reply assistance
- Unread conversation summaries
- Follow-up identification
- Power Dialer side panel that stays pinned while navigating
- Call notes and contact updates during calls
- AI Voice Agents for inbound and outbound calling
- Voice cloning support
- Multilingual language detection during calls
- Customer Replied automation trigger with positive or negative intent
- Communication history attached to contacts and opportunities

### Calendar, availability, and booking

- Calendar views and appointment management
- Booking link creation
- Booking link folders
- Booking link status, type, and agent filters
- Booking link search
- Submission review
- Multiple named availability lists per user
- Appointment-linked automation waits
- Public white-label URLs for booking, forms, quotes, and client portal
- Appointment preparation prompts

### Policies and insurance servicing

- Policy records linked to clients
- Policy detail pages with relationship context and editing
- Policy Analyzer for life, health, Medicare, and annuity policies
- Renewal tracking
- Renewal reminders
- Cross-sell opportunity identification
- Policy import with carrier-format auto-mapping
- Client receipts showing policy changes
- Policy and client relationship history

### Product lines and quoting

- General quoting
- Life insurance overview, quote, saved quotes, marketing, Life AI, and AI Quoting
- Medicare overview and T65 pipeline
- Medicare quote flows
- HealthSherpa integration surface
- Eligibility checking
- Doctor search
- Scope of Appointment generator
- Annual reviews
- CMS rules reference surface
- Medicare marketing
- Medicare Quoting
- Medicare Advantage and MAPD
- Medicare Supplement and Medigap
- Medicare Part D
- Medicare AI and Medigap AI
- ACA product surface
- Underwrite AI
- AI plan comparison
- Cheapest-plan search
- Top-three plan comparison
- Client-facing plan explanation
- Quote persistence and saved quote records

### Commissions and agency operations

- Commission records linked to policies and clients
- Expected and paid commission context
- Reconciliation and commission alerts
- Commission detail pages
- Agent assignment
- Invite Agent flow
- Agency-level operations
- Role and permission controls exposed through settings
- Multi-agent filtering and ownership

### Automations and campaigns

- Workflow list and builder
- Trigger, condition, wait, and action steps
- Contact-field update action
- Appointment-based wait conditions
- Exact Match filters with multiple values
- Customer Replied intent filters
- Automatic lead tagging
- Bulk Re-enroll action from enrollment history
- Enrollment status filtering
- Campaign creation, editing, archiving, restoring, and deletion
- Follow-up sequence generation
- AI workflow generation and workflow auditing
- SMS, email, appointment, contact, policy, and lead triggers

### Forms, documents, and compliance

- Form creation and publication
- Form submissions
- Client and lead capture
- Scope of Appointment support
- Document storage and client association
- Document generation and delivery
- Agent signature persistence
- Policy analysis reports
- Client receipts
- Consent and privacy messaging
- Support ticket creation and tracking

### Analytics and reporting

- Reports and analytics workspace
- Production and conversion reporting
- Pipeline leakage analysis
- Campaign performance
- Renewal reporting
- Commission reporting
- Agent performance
- Product-line performance
- Weekly change summaries
- AI report interpretation

### AI operating model

- Page-aware conversational assistant
- Page-specific starter prompts
- Contact prioritization
- Stale-lead detection
- Opportunity ranking
- Calendar preparation
- Policy renewal identification
- Cross-sell recommendations
- Task prioritization and client grouping
- Campaign analysis and sequence suggestions
- Workflow generation and auditing
- Quote comparison and client explanation
- Report interpretation
- Draft communications
- CRM action proposals with explicit approval before mutation
- AI disclaimer that outputs can contain mistakes

### Settings, support, and platform controls

- Settings search
- Workspace switching
- Upgrade and entitlement handling
- Support Center and Help Center entry points
- Training and onboarding checklist
- In-product bug reporting
- Support widget and ticket tracking
- Notifications and notification settings
- White-label URL configuration
- Agency and agent administration

## Private CRM implementation tiers

### Tier 1: required private CRM core

Implement first for the requested insurance-agent-app:

- Contacts with lifecycle state, source, product interest, tags, consent, and ownership
- Leads and clients with notes and activity history
- Custom fields and search/filtering
- Pipeline, opportunities, stages, values, owners, and lost reasons
- Tasks, appointments, calendar, availability, and booking links
- Policies, carriers, product lines, effective dates, renewal dates, and servicing status
- Basic commission records linked to policies
- CSV import with validation and reusable mappings
- Documents and consent records
- Audit events, roles, and row-level access control
- Basic analytics for leads, pipeline, policies, renewals, and commissions

### Tier 2: high-value operational extensions

Implement after the core is stable:

- Unified Inbox for email and SMS
- Calling integration and Power Dialer
- Campaigns and reusable follow-up sequences
- Automation builder with triggers, conditions, waits, and actions
- Renewal and cross-sell workflows
- Agent assignment and agency dashboards
- Forms, submissions, document templates, and signatures
- Policy import and carrier-specific mapping
- Commission reconciliation and alerts
- Client portal and white-label links

### Tier 3: specialized insurance products

Implement only when product demand and compliance ownership justify the scope:

- Life quoting and saved quotes
- Medicare T65 pipeline
- Medicare Advantage, MAPD, Supplement, Medigap, and Part D flows
- Eligibility and doctor search
- Scope of Appointment generation
- Annual reviews
- CMS rule references
- ACA quoting
- Underwriting workflows
- Policy Analyzer
- HealthSherpa or equivalent external integrations

### Tier 4: advanced AI and scale features

Defer until data quality, permissions, and audit controls are production-ready:

- Approval-gated AI CRM actions
- Contact prioritization and stale-lead detection
- AI-generated campaign sequences
- AI workflow generation and auditing
- Quote comparison and client-facing explanations
- AI Voice Agents and voice cloning
- Multilingual call detection
- Predictive renewal and cross-sell recommendations
- Natural-language analytics
- Automated document and policy analysis

## Scope-control rule

The private CRM should not reproduce every UnlockedCRM module in the first release. The recommended boundary is a private insurance operating system centered on contacts, opportunities, policies, renewals, tasks, commissions, documents, and controlled automation. Product-specific quoting, external carrier data, telephony, AI voice, CMS rules, and advanced underwriting should remain modular integrations behind explicit entitlement and compliance boundaries
