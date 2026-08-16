# Deployment Guide

This document outlines the steps to deploy the AB Global Consulting Private Insurance Agent App to **Firebase App Hosting** (Frontend) and **Supabase** (Database).

## 1. Database Provisioning (Supabase)

1. Create a new project on [Supabase](https://supabase.com).
2. Go to **Project Settings -> Database** and copy the Connection String (URI). 
   - Make sure to use the connection pooling string (usually ending in `?pgbouncer=true` or port `6543`) for serverless environments.
3. In your local terminal, run the Prisma migration against your new production database:
   ```bash
   DATABASE_URL="postgres://user:pass@host:6543/postgres?pgbouncer=true" npx prisma migrate deploy
   ```

## 2. Environment Variables

You will need the following environment variables configured in your deployment environment:

| Variable | Description |
|---|---|
| `DATABASE_URL` | Your Supabase connection string. |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase Project URL (for client-side auth/data). |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase Anon Key. |
| `SENDGRID_API_KEY` | SendGrid API key for transactional emails. |
| `CRM_WEBHOOK_URL` | The endpoint URL for your GoHighLevel/CRM webhook. |

## 3. Frontend Deployment (Firebase App Hosting)

Firebase App Hosting automatically detects and builds Next.js applications directly from your GitHub repository.

1. Ensure your code is pushed to a GitHub repository.
2. Go to the [Firebase Console](https://console.firebase.google.com/).
3. Navigate to **Build > App Hosting**.
4. Click **Get Started** and link your GitHub repository.
5. In the configuration step:
   - **Root directory:** `/` (or leave default if the app is at the root of the repo).
   - **Environment Variables:** Add all the variables listed in section 2 above.
6. Click **Deploy**.

Firebase will automatically run `npm run build` (which executes `next build`), containerize the Next.js app, and deploy it globally using Cloud Run.

## 4. Post-Deployment Verification

1. **Test the Admin Dashboard:** Visit `https://your-firebase-app-url/admin` and verify the metrics load.
2. **Test Lead Flow:** Go to `https://your-firebase-app-url/portal`, submit a test lead, and verify that:
   - It appears in the Supabase database.
   - It triggers a SendGrid email.
   - It triggers a webhook to your CRM.
3. **Check Analytics:** Verify the UTM test lead shows up under `/admin/campaigns`.

## Troubleshooting

- **Missing Environment Variables:** If the build fails or the app crashes on load, check the Firebase App Hosting build logs. The app uses `src/lib/server/env.ts` to strictly validate required variables and will throw a loud error if any are missing.
- **Database Connection Issues:** Ensure your Supabase database is allowing connections and that you are using the correct connection pooler string if seeing Prisma connection exhaustion errors.
