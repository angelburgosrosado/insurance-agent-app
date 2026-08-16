export interface WebhookPayload {
  event: string;
  data: Record<string, any>;
  timestamp: string;
}

export async function dispatchToCRM(payload: WebhookPayload) {
  const webhookUrl = process.env.CRM_WEBHOOK_URL;
  
  if (!webhookUrl) {
    if (process.env.NODE_ENV === "development") {
      console.log("[CRM Webhook (Mock)] Payload would have been sent:");
      console.log(JSON.stringify(payload, null, 2));
      return { success: true, mock: true };
    }
    // Don't throw an error in production if they haven't configured a CRM, just quietly skip
    console.warn("CRM_WEBHOOK_URL is not configured. Webhook skipped.");
    return { success: true, skipped: true };
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("[CRM Webhook Error]", response.status, errorText);
    throw new Error(`Failed to dispatch webhook: ${response.statusText}`);
  }

  return { success: true };
}
