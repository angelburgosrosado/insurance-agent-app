#!/usr/bin/env bash
# ==============================================================================
# MyIAD Twilio ConversationRelay - 1-Click Google Cloud Run Deployment
# ==============================================================================
set -euo pipefail

SERVICE_NAME="${SERVICE_NAME:-myiad-voice-relay}"
REGION="${GCP_REGION:-us-central1}"
ANGEL_DIRECT_PHONE="${ANGEL_DIRECT_PHONE:-+13863331482}"
TWILIO_PHONE_NUMBER="${TWILIO_PHONE_NUMBER:-+18888873585}"
GEMINI_API_KEY="${GEMINI_API_KEY:-}"

echo "=========================================================="
echo "🚀 Deploying MyIAD Twilio Voice Relay to Google Cloud Run"
echo "=========================================================="
echo "Service:  $SERVICE_NAME"
echo "Region:   $REGION"
echo "Target:   $ANGEL_DIRECT_PHONE"
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

echo "Deploying in project: $PROJECT_ID..."

# Build and deploy from source using voice-relay/Dockerfile
gcloud run deploy "$SERVICE_NAME" \
  --source . \
  --dockerfile voice-relay/Dockerfile \
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

echo ""
echo "=========================================================="
echo "✅ Deployment Successful!"
echo "=========================================================="
echo "Service URL:       $SERVICE_URL"
echo "Domain:            $DOMAIN_CLEAN"
echo ""
echo "📞 Twilio Configuration:"
echo "1. Go to Twilio Console -> Phone Numbers -> Manage -> Active Numbers."
echo "2. Select your toll-free number ($TWILIO_PHONE_NUMBER)."
echo "3. Under 'Voice Configuration', set 'A CALL COMES IN' to:"
echo "   - Webhook (POST): $SERVICE_URL/voice/incoming"
echo "4. Under 'Status Callback' or Hand-off, you can also monitor calls."
echo "5. Save changes in Twilio Console."
echo "=========================================================="
