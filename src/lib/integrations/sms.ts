export interface SMSPayload {
  to: string;
  body: string;
  from?: string;
}

export interface SMSResult {
  success: boolean;
  messageId?: string;
  provider?: string;
  error?: string;
  mock?: boolean;
}

/**
 * Normalize phone numbers to E.164 format (+1XXXXXXXXXX for US and Puerto Rico)
 */
export function normalizePhoneNumber(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) {
    return `+1${digits}`;
  }
  if (digits.length === 11 && digits.startsWith("1")) {
    return `+${digits}`;
  }
  if (phone.startsWith("+")) {
    return phone;
  }
  return `+1${digits}`;
}

/**
 * Dispatches an SMS using Twilio REST API with resilient in-memory fallback.
 */
export async function sendSMS(payload: SMSPayload): Promise<SMSResult> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = payload.from || process.env.TWILIO_PHONE_NUMBER;
  const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;

  const recipient = normalizePhoneNumber(payload.to);

  // 1. If Twilio Credentials exist, execute real HTTP dispatch
  if (accountSid && authToken && (fromNumber || messagingServiceSid)) {
    try {
      const endpoint = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
      const authHeader = `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`;

      const params = new URLSearchParams();
      params.append("To", recipient);
      params.append("Body", payload.body);

      if (messagingServiceSid) {
        params.append("MessagingServiceSid", messagingServiceSid);
      } else if (fromNumber) {
        params.append("From", fromNumber);
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Authorization": authHeader,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`[Twilio SMS Success] SID: ${data.sid} sent to ${recipient}`);
        return { success: true, messageId: data.sid, provider: "twilio" };
      }

      const errData = await response.json().catch(() => null);
      console.error("[Twilio SMS API Error]", errData);
      return { success: false, error: JSON.stringify(errData), provider: "twilio" };
    } catch (dispatchError) {
      console.error("[Twilio Dispatch Fatal Error]", dispatchError);
      return { success: false, error: String(dispatchError), provider: "twilio" };
    }
  }

  // 2. Safe Resilient Mock Mode
  console.log(`[SMS Log - Mock Dispatch]
To: ${recipient}
Body: "${payload.body}"
(Notice: Set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_PHONE_NUMBER in environment variables to enable live carrier dispatch)`);

  return {
    success: true,
    mock: true,
    messageId: `mock_sms_${Date.now()}`,
    provider: "mock",
  };
}

/**
 * Builds automated bilingual welcome & lead follow-up SMS text
 */
export function buildWelcomeSMS(params: {
  firstName: string;
  service?: string;
  lang?: string;
}): string {
  const isSpanish = params.lang === "es";

  if (isSpanish) {
    return `Hola ${params.firstName}, le escribe Angel Burgos de AB Global Consulting. Recibí su consulta sobre ${params.service || "planificación de seguros"}. ¿Cuál es el mejor momento hoy para una breve llamada de 10 min? (Responda STOP para cancelar)`;
  }

  return `Hi ${params.firstName}, this is Angel Burgos with AB Global Consulting. I received your request regarding ${params.service || "insurance planning"}. What's the best time today for a quick 10-min review? (Reply STOP to cancel)`;
}
