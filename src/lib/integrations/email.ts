export interface EmailPayload {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export async function sendEmail(payload: EmailPayload) {
  const apiKey = process.env.SENDGRID_API_KEY;
  
  if (!apiKey) {
    if (process.env.NODE_ENV === "development") {
      console.log("[SendGrid (Mock)] Email would have been sent:");
      console.log("To:", payload.to);
      console.log("Subject:", payload.subject);
      console.log("Text Body:", payload.text);
      return { success: true, mock: true };
    }
    throw new Error("SENDGRID_API_KEY is not configured.");
  }

  // SendGrid v3 API call
  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: payload.to }] }],
      from: { email: process.env.EMAIL_FROM || "notifications@abglco.com", name: "AB Global Consulting" },
      subject: payload.subject,
      content: [
        { type: "text/plain", value: payload.text },
        ...(payload.html ? [{ type: "text/html", value: payload.html }] : [])
      ]
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.error("[SendGrid Error]", errorData);
    throw new Error("Failed to send email via SendGrid");
  }

  return { success: true };
}
