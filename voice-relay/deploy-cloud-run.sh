#!/usr/bin/env bash
# ==============================================================================
# MyIAD Twilio ConversationRelay - 1-Click Google Cloud Run Deployment
# ==============================================================================
set -euo pipefail

SERVICE_NAME="${SERVICE_NAME:-myiad-voice-relay}"
REGION="${GCP_REGION:-us-central1}"
ANGEL_DIRECT_PHONE="${ANGEL_DIRECT_PHONE:-+13863331482}"

# Normalize Twilio number to E.164 (+18888873585) if provided as 18888873585
RAW_TWILIO="${TWILIO_PHONE_NUMBER:-18888873585}"
CLEAN_TWILIO=$(echo "$RAW_TWILIO" | tr -cd '0-9')
if [[ ${#CLEAN_TWILIO} -eq 10 ]]; then
  TWILIO_PHONE_NUMBER="+1${CLEAN_TWILIO}"
elif [[ ${#CLEAN_TWILIO} -eq 11 && $CLEAN_TWILIO == 1* ]]; then
  TWILIO_PHONE_NUMBER="+${CLEAN_TWILIO}"
else
  TWILIO_PHONE_NUMBER="+18888873585"
fi

GEMINI_API_KEY="${GEMINI_API_KEY:-}"

echo "=========================================================="
echo "🚀 Deploying MyIAD Twilio Voice Relay to Google Cloud Run"
echo "=========================================================="
echo "Service:  $SERVICE_NAME"
echo "Region:   $REGION"
echo "Twilio:   $TWILIO_PHONE_NUMBER (1-888-887-3585)"
echo "Angel:    $ANGEL_DIRECT_PHONE"
echo ""

# Verify gcloud CLI is available
if ! command -v gcloud &> /dev/null; then
  echo "❌ Error: 'gcloud' CLI is not installed or not in PATH."
  echo "Please install Google Cloud SDK: https://cloud.google.com/sdk/docs/install"
  exit 1
fi

PROJECT_ID=$(gcloud config get-value project 2>/dev/null || true)
if [ -z "$PROJECT_ID" ]; then
  echo "❌ Error: No active GCP project configured. Run 'gcloud config set project <PROJECT_ID>'."
  exit 1
fi

echo "Active Project: $PROJECT_ID"
IMAGE_TAG="gcr.io/${PROJECT_ID}/${SERVICE_NAME}"

echo ""
echo "📦 Step 1: Building container image via Google Cloud Build..."
gcloud builds submit --config voice-relay/cloudbuild.yaml .

echo ""
echo "🚢 Step 2: Deploying container image to Cloud Run..."
gcloud run deploy "$SERVICE_NAME" \
  --image "$IMAGE_TAG" \
  --platform managed \
  --region "$REGION" \
  --allow-unauthenticated \
  --session-affinity \
  --min-instances 1 \
  --max-instances 10 \
  --cpu 1 \
  --memory 1Gi \
  --timeout 3600 \
  --port 8080 \
  --set-env-vars "ANGEL_DIRECT_PHONE=${ANGEL_DIRECT_PHONE},TWILIO_PHONE_NUMBER=${TWILIO_PHONE_NUMBER},GEMINI_API_KEY=${GEMINI_API_KEY}"

# Retrieve assigned Cloud Run URL
SERVICE_URL=$(gcloud run services describe "$SERVICE_NAME" --platform managed --region "$REGION" --format 'value(status.url)')
DOMAIN_CLEAN=$(echo "$SERVICE_URL" | sed -e 's|^https://||' -e 's|/$||')

# Update SERVER_DOMAIN env variable in Cloud Run with the real domain
gcloud run services update "$SERVICE_NAME" \
  --platform managed \
  --region "$REGION" \
  --update-env-vars "SERVER_DOMAIN=${DOMAIN_CLEAN}" > /dev/null 2>&1 || true

echo ""
echo "=========================================================="
echo "✅ Deployment Successful!"
echo "=========================================================="
echo "Service URL:       $SERVICE_URL"
echo "Domain:            $DOMAIN_CLEAN"
echo "Twilio Number:     $TWILIO_PHONE_NUMBER"
echo ""
echo "📞 Final Step: Configure Twilio Console:"
echo "1. Go to Twilio Console -> Phone Numbers -> Manage -> Active Numbers."
echo "2. Select your number: $TWILIO_PHONE_NUMBER (18888873585)"
echo "3. Under 'Voice Configuration':"
echo "   - 'A CALL COMES IN': Webhook"
echo "   - URL (POST): $SERVICE_URL/voice/incoming"
echo "4. Click Save."
echo "=========================================================="
