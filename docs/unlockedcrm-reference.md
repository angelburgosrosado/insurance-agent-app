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
