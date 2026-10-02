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

---

## 5. Voice Relay Deployment (Twilio ConversationRelay + Google Cloud Run)

The voice server (`voice-relay/server.ts`) powers real-time conversational phone triage on `1-888-887-3585` using Deepgram STT, Google TTS, and Gemini.

### 1-Click Deployment Script:
```bash
./voice-relay/deploy-cloud-run.sh
```

### Required Voice Environment Variables:
- `PORT=3001`
- `SERVER_DOMAIN=voice.myiad.com` (or your Cloud Run / ngrok domain)
- `ANGEL_DIRECT_PHONE=+13863331482`
- `TWILIO_PHONE_NUMBER=18888873585`
- `GEMINI_API_KEY=your_gemini_api_key`

### Twilio Console Configuration:
1. Open [Twilio Console -> Active Numbers](https://console.twilio.com/).
2. Select `+1 (888) 887-3585`.
3. Under **Voice Configuration**, set webhook: `https://<YOUR_VOICE_DOMAIN>/voice/incoming` (HTTP POST).

---

## 6. Toll-Free Verification Submission Guide (Twilio / TCR)

When submitting Toll-Free Verification for `1-888-887-3585` in the Twilio Console:

1. **Business Name:** MyIAD National Insurance Solutions (AB Global Consulting LLC)
2. **Corporate Website:** `https://myiad.com`
3. **Opt-In URL (Evidence):** `https://myiad.com/opt-in`
4. **Campaign Type:** Customer Care & Advisory Alerts
5. **Campaign Description:** Conversational follow-ups, quote delivery, policy illustrations (IUL, Annuities, Final Expense), and appointment reminders requested by consumers.
6. **Message Flow / Call to Action:** Prospective clients enter contact details on `myiad.com` or call `1-888-887-3585` and affirmatively check an unselected consent box agreeing to receive text messages.
7. **Sample Message 1 (Confirmation):**
   `"MyIAD: Thank you for contacting MyIAD National Insurance Solutions. You are subscribed to advisory updates. Msg frequency varies. Msg&data rates may apply. Reply STOP to cancel, HELP for help (1-888-887-3585)."`
8. **Sample Message 2 (Advisory Alert):**
   `"MyIAD: Hello, your requested IUL 0% Floor Protection Blueprint has been prepared. Review details with licensed advisor Angel Burgos at myiad.com. Reply STOP to cancel."`
9. **Opt-Out Keywords:** STOP, CANCEL, UNSUBSCRIBE, END, QUIT
10. **Help Keywords:** HELP, INFO
11. **Privacy Policy URL:** `https://myiad.com/privacy`
12. **Terms of Service URL:** `https://myiad.com/terms`
13. **Mandatory Non-Sharing Clause:**
    *"No mobile information will be shared with third parties/affiliates for marketing/promotional purposes. All other categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties."*

