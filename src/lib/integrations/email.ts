export interface EmailPayload {
  to: string;
  subject: string;
  text: string;
  html?: string;
  from?: string;
}

export async function sendEmail(payload: EmailPayload): Promise<{ success: boolean; provider?: string; error?: string; mock?: boolean }> {
  const sendgridKey = process.env.SENDGRID_API_KEY;
  const resendKey = process.env.RESEND_API_KEY;
  const fromEmail = payload.from || process.env.EMAIL_FROM || "onboarding@resend.dev";
  const fromName = process.env.EMAIL_FROM_NAME || "Angel Burgos • AB Global Consulting";

  // 1. Try Resend if configured
  if (resendKey && resendKey.startsWith("re_")) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: `${fromName} <${fromEmail}>`,
          to: [payload.to],
          subject: payload.subject,
          text: payload.text,
          html: payload.html,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("[Resend Success] Sent email ID:", data.id, "to:", payload.to);
        return { success: true, provider: "resend" };
      }
      const err = await res.json().catch(() => null);
      console.error("[Resend Error]", err);
    } catch (e) {
      console.error("[Resend Dispatch Failed]", e);
    }
  }

  // 2. Try SendGrid if configured
  if (sendgridKey && sendgridKey.startsWith("SG.")) {
    try {
      const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${sendgridKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: payload.to }] }],
          from: { email: fromEmail, name: fromName },
          subject: payload.subject,
          content: [
            { type: "text/plain", value: payload.text },
            ...(payload.html ? [{ type: "text/html", value: payload.html }] : []),
          ],
        }),
      });

      if (res.ok) {
        return { success: true, provider: "sendgrid" };
      }
      const err = await res.json().catch(() => null);
      console.error("[SendGrid Error]", err);
    } catch (e) {
      console.error("[SendGrid Dispatch Failed]", e);
    }
  }

  // 3. Fallback / Mock mode when API key is missing or unauthorized
  console.log(`[Email Notice] Email queued (Provider not connected or key invalid):
To: ${payload.to}
Subject: ${payload.subject}
Body:\n${payload.text}`);

  return { success: false, mock: true, error: "No valid SENDGRID_API_KEY (must start with SG.) or RESEND_API_KEY (starts with re_) configured." };
}

export function buildCustomerAutoReplyHtml(params: {
  firstName: string;
  service: string;
  lang?: string;
  baseUrl?: string;
}): { subject: string; text: string; html: string } {
  const isSpanish = params.lang === "es";
  const baseUrl = params.baseUrl || process.env.NEXT_PUBLIC_SITE_URL || "https://abglco.com";

  const subject = isSpanish
    ? `Su Guía y Confirmación de Consulta • Angel Burgos (AB Global)`
    : `Your Guide & Consultation Confirmation • Angel Burgos (AB Global)`;

  const text = isSpanish
    ? `Hola ${params.firstName},

Gracias por comunicarse con AB Global Consulting. Hemos recibido su solicitud para: ${params.service}.

📄 Acceda a su Guía Digital y Lista de Verificación en PDF:
- The Protection Planning Checklist (PDF 4 Páginas): ${baseUrl}/guides/protection-planning-checklist
- Calculadora IUL y Simuladores de Retiro: ${baseUrl}/tools/iul-calculator
- Escudo Patrimonial Militar: ${baseUrl}/tools/military-asset-shield

Si desea una sesión diagnóstica de 15 minutos sin costo para evaluar su caso específico:
📞 Llame directamente al asesor Angel Burgos: (386) 333-1482 o (407) 930-6226
📅 Agende en línea: ${baseUrl}/#consultation

Atentamente,
Angel Burgos • Asesor Licenciado 0215 (FL Lic. #G328926 / WFG Code: F6D9U)
AB Global Consulting LLC • Orlando, FL & Puerto Rico`
    : `Hello ${params.firstName},

Thank you for reaching out to AB Global Consulting. We have received your request for: ${params.service}.

📄 Access Your Digital Guides & Printable PDF Checklist:
- The Protection Planning Checklist (4-Page PDF): ${baseUrl}/guides/protection-planning-checklist
- Florida IUL & Retirement Calculators: ${baseUrl}/tools/iul-calculator
- Military & Veteran Asset Shield: ${baseUrl}/tools/military-asset-shield

If you would like a complimentary 15-minute diagnostic session to review your personalized numbers:
📞 Call Angel Burgos directly: (386) 333-1482 or (407) 930-6226
📅 Book online: ${baseUrl}/#consultation

Best regards,
Angel Burgos • State Licensed 0215 Practitioner (FL Lic. #G328926 / WFG Code: F6D9U)
AB Global Consulting LLC • Orlando, FL & Puerto Rico`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; margin: 0; padding: 0; background: #f8fafc; }
          .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; }
          .header { background: #001c38; padding: 32px 24px; text-align: center; color: #ffffff; }
          .badge { display: inline-block; padding: 4px 12px; background: rgba(217, 119, 6, 0.2); border: 1px solid #d97706; border-radius: 20px; color: #fbbf24; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; }
          .content { padding: 32px 24px; }
          .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 20px 0; }
          .button { display: inline-block; background: #d97706; color: #ffffff !important; font-weight: bold; font-size: 14px; text-decoration: none; padding: 12px 28px; border-radius: 10px; margin: 12px 0; }
          .footer { background: #f1f5f9; padding: 24px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="badge">${isSpanish ? "AB Global Consulting" : "AB Global Consulting"}</div>
            <h1 style="margin: 0; font-size: 22px; font-weight: 800;">${isSpanish ? "Confirmación y Entrega de Guía" : "Guide Delivery & Confirmation"}</h1>
            <p style="margin: 6px 0 0 0; font-size: 13px; opacity: 0.85;">${isSpanish ? "Planificación de Vida, Salud, Retiro y Legado" : "Life, Health, Retirement & Legacy Planning"}</p>
          </div>
          <div class="content">
            <p style="font-size: 15px;"><strong>${isSpanish ? "Hola" : "Hello"} ${params.firstName},</strong></p>
            <p style="font-size: 14px; color: #475569;">
              ${isSpanish 
                ? `Hemos recibido su solicitud para <strong>${params.service}</strong>. A continuación tiene acceso inmediato a su guía digital y herramientas interactivas:`
                : `We received your request for <strong>${params.service}</strong>. Below is your immediate access to our digital client guides and interactive planning tools:`}
            </p>
            
            <div class="card">
              <h3 style="margin: 0 0 10px 0; font-size: 14px; color: #0f172a;">📄 ${isSpanish ? "Guías y Listas de Verificación Disponibles:" : "Available Guides & Checklists:"}</h3>
              <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #334155;">
                <li style="margin-bottom: 8px;">
                  <a href="${baseUrl}/guides/protection-planning-checklist" style="color: #d97706; font-weight: bold; text-decoration: underline;">
                    ${isSpanish ? "Lista de Planificación y Protección (PDF de 4 Páginas) →" : "The Protection Planning Checklist (4-Page PDF) →"}
                  </a>
                </li>
                <li style="margin-bottom: 8px;">
                  <a href="${baseUrl}/tools/iul-calculator" style="color: #0f172a; text-decoration: underline;">
                    ${isSpanish ? "Simulador IUL y Retiro Libre de Impuestos" : "IUL Tax-Free Retirement Simulator"}
                  </a>
                </li>
                <li>
                  <a href="${baseUrl}/tools/military-asset-shield" style="color: #0f172a; text-decoration: underline;">
                    ${isSpanish ? "Escudo Patrimonial para Militares y Veteranos" : "Military & Veteran Asset Shield"}
                  </a>
                </li>
              </ul>
            </div>

            <div style="text-align: center; margin: 28px 0;">
              <p style="font-size: 13px; color: #475569; margin-bottom: 10px;">
                ${isSpanish ? "¿Desea revisar su escenario con un asesor licenciado?" : "Ready to review your custom numbers with an advisor?"}
              </p>
              <a href="${baseUrl}/#consultation" class="button">
                ${isSpanish ? "Agendar Consulta Gratuita (15 Min)" : "Book Free 15-Min Consultation"}
              </a>
            </div>

            <p style="font-size: 13px; color: #64748b; line-height: 1.5;">
              <strong>Angel Burgos</strong> • 0215 Practitioner (FL Lic. #G328926 / WFG Code: F6D9U)<br />
              📞 <strong>(386) 333-1482</strong> / (407) 930-6226<br />
              📍 9501 Satellite Blvd, Suite 105, Orlando, FL 32837
            </p>
          </div>
          <div class="footer">
            © ${new Date().getFullYear()} AB Global Consulting LLC. All rights reserved. Licensed in Florida & Puerto Rico.
          </div>
        </div>
      </body>
    </html>
  `;

  return { subject, text, html };
}
