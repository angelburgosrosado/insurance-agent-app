# MyIAD Twilio ConversationRelay Voice Server

This module powers the AI phone receptionist for **MyIAD / AB Global National Insurance Solutions** (`+1-888-887-3585`). It uses **Twilio ConversationRelay** to stream caller audio transcripts to a WebSocket server, generate low-latency conversational answers with **Google Gemini**, and seamlessly transfer callers directly to Angel Burgos when requested.

---

## Architecture Flow

```text
Caller (888-887-3585)
       │
       ▼
 Twilio Voice
       │  HTTP POST /voice/incoming
       ▼
 Express API  ──(Returns TwiML <Connect><ConversationRelay>)──> Twilio Voice
                                                                     │
                                                       WebSocket wss://.../ws/agent
                                                                     ▼
                                                             Node.js Agent Server
                                                             (Google Gemini + MyIAD Heuristics)
                                                                     │
                                                             Handoff Triggered?
                                                             (Sends {"type":"end"})
                                                                     │
 Express API  <──(HTTP POST /voice/relay-handoff)────────────────────┘
       │
 (Returns TwiML <Dial><Number>+13863331482</Number></Dial>)
       │
       ▼
 Direct Phone (Angel Burgos)
```

---

## Key Features

1. **Integrated into This Repository**: Shares the existing MyIAD insurance dictionary, domain expertise, and Finra 2330 / IUL 0% floor compliance logic.
2. **Deepgram STT & Google TTS via Twilio**: Twilio manages the audio streaming, automatic speech recognition (Deepgram nova-2), and text-to-speech (Google Journey-O) natively.
3. **Bilingual Detection**: Automatically detects English and Spanish caller prompts and responds in the caller's spoken language.
4. **Instant Advisor Handoff**: If the caller asks for Angel, an agent, operator, or human advisor, the assistant verbally acknowledges and executes a warm transfer to Angel's direct phone (`+1-386-333-1482`).
5. **Dual-Engine AI**: Uses Google Gemini (`gemini-2.5-flash`) for real-time natural language reasoning, with an instant fallback to MyIAD's built-in insurance advisory engine if the API key is not configured.

---

## Environment Variables

Add these to your `.env` or deployment platform:

```ini
PORT=3001
SERVER_DOMAIN=voice.myiad.com
ANGEL_DIRECT_PHONE=+13863331482
TWILIO_PHONE_NUMBER=18888873585
GEMINI_API_KEY=your_google_gemini_api_key
```

---

## Local Development & Testing (with ngrok)

1. **Verify Voice Server is Running on Port 3001**:
   ```bash
   pnpm voice:dev
   ```
   *(Port 3001 prevents collisions with Next.js running on 3000).*

2. **Authenticate ngrok with your Account Authtoken**:
   If you see error `ERR_NGROK_4018`, add your authtoken from your ngrok dashboard:
   - Go to: [https://dashboard.ngrok.com/get-started/your-authtoken](https://dashboard.ngrok.com/get-started/your-authtoken)
   - Copy your token and run:
   ```bash
   ngrok config add-authtoken <YOUR_AUTHTOKEN>
   ```

3. **Start the ngrok Tunnel on Port 3001**:
   ```bash
   ngrok http 3001
   ```
   ngrok will display a public forwarding URL such as `https://xxxx-xx-xx.ngrok-free.app`.

4. **Connect Twilio Number (1-888-887-3585)**:
   - Open [Twilio Console -> Active Numbers](https://console.twilio.com/).
   - Click `+1 (888) 887-3585` (or `18888873585`).
   - Under **Voice Configuration**, set **A CALL COMES IN**:
     - Webhook: `https://<YOUR_NGROK_DOMAIN>/voice/incoming`
     - HTTP Method: `POST`
   - Click **Save**.

---

## 1-Click Google Cloud Run Deployment (Permanent Hosting)

Google Cloud Run is the recommended production host because it natively supports WebSockets, HTTPS, auto-scaling, and health monitoring.

Run the included automated deployment script:
```bash
./voice-relay/deploy-cloud-run.sh
```

Or deploy manually via Cloud Build:
```bash
# 1. Build container image
gcloud builds submit --config voice-relay/cloudbuild.yaml .

# 2. Deploy to Cloud Run
gcloud run deploy myiad-voice-relay \
  --image "gcr.io/$(gcloud config get-value project)/myiad-voice-relay" \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --session-affinity \
  --min-instances 1 \
  --cpu 1 \
  --memory 1Gi \
  --timeout 3600 \
  --port 8080 \
  --set-env-vars "ANGEL_DIRECT_PHONE=+13863331482,TWILIO_PHONE_NUMBER=18888873585,GEMINI_API_KEY=your_key"
```

---

## Twilio Console Configuration

1. Log in to [Twilio Console](https://console.twilio.com/).
2. Navigate to **Phone Numbers** -> **Manage** -> **Active Numbers**.
3. Click your toll-free number: `+1 (888) 887-3585`.
4. In the **Voice Configuration** section:
   - **Configure With**: Webhooks, TwiML Bin, Studio Flow, or Functions.
   - **A CALL COMES IN**: Webhook
   - **URL**: `https://<YOUR_CLOUD_RUN_DOMAIN>/voice/incoming`
   - **HTTP Method**: `POST`
5. Click **Save Configuration**.
