# Implementation Plan: Visual Setup Wizard

You requested a setup screen to configure the application's environment variables and deployment information rather than relying purely on manual file editing.

## Goal
Create an interactive, visual "Setup Wizard" (`/setup`) that can be accessed when running the app locally to configure environment variables, provision the database, and prepare the app for deployment.

## Open Questions
- **Action vs Guide:** Do you want this setup screen to actively write the values to your local `.env` file, or simply be a visual checklist/generator that gives you the commands to run and values to copy into your Firebase Console? (I recommend allowing it to write to the local `.env` for testing, and providing copyable snippets for your Firebase production deployment.)

## Proposed Changes

### 1. The Setup Route (`/setup`)
#### [NEW] `src/app/setup/page.tsx`
- A multi-step UI wizard:
  - **Step 1: Database (Supabase)**: Form to input `DATABASE_URL`, `NEXT_PUBLIC_SUPABASE_URL`, and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
  - **Step 2: Integrations**: Form for `SENDGRID_API_KEY` and `CRM_WEBHOOK_URL`.
  - **Step 3: Firebase Deployment**: Informational screen that takes the inputs from Steps 1 & 2 and generates the exact Firebase CLI commands (or Firebase Console instructions) to deploy the app with these variables.

### 2. Server Action to Save Environment
#### [NEW] `src/app/setup/actions.ts`
- A Next.js server action `saveEnvironmentVariables(data)` that reads the submitted form data and writes/updates the local `.env.local` file using Node's `fs` module. 
- *Note: This will only be allowed to run when `NODE_ENV === "development"`, as serverless production environments are read-only.*

### 3. Setup Middleware / Notification
#### [MODIFY] `src/lib/server/env.ts` or `src/app/layout.tsx`
- If we are in development mode and variables are missing, display a banner across the app linking to `/setup` so the developer (or you) knows where to go to configure the app.

## Verification Plan
1. Start the app locally without an `.env` file.
2. Navigate to `/setup`.
3. Enter test variables and save.
4. Verify the `.env.local` file is created/updated with the correct keys.
5. Verify the generated deployment instructions reflect the provided keys.
