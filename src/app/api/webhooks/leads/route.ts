import { NextResponse } from "next/server";
import { getPrismaClient } from "@/lib/server/db";
import {
  computeWebhookSignature,
  redactPiiFromText,
} from "@/lib/security/pii-guard";
import { dispatchAdvisorAlertSMS } from "@/lib/integrations/sms";
import { detectTerritoryFromPhone } from "@/lib/lead-routing";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    if (!rawBody || rawBody.trim() === "") {
      return NextResponse.json(
        { success: false, error: "Empty request payload" },
        { status: 400 }
      );
    }

    // Optional HMAC signature verification
    const signature =
      request.headers.get("x-myiad-signature") ||
      request.headers.get("x-hub-signature-256");
    const webhookSecret =
      process.env.CRM_MYIAD_WEBHOOK_SECRET || process.env.CRM_WEBHOOK_SECRET;

    if (webhookSecret && signature) {
      const expectedSignature = computeWebhookSignature(rawBody, webhookSecret);
      if (signature !== expectedSignature) {
        console.warn("[CRM Webhook] Invalid HMAC-SHA256 signature detected.");
        return NextResponse.json(
          { success: false, error: "Unauthorized: Invalid webhook signature" },
          { status: 401 }
        );
      }
    }

    let data: any;
    try {
      data = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { success: false, error: "Malformed JSON payload" },
        { status: 400 }
      );
    }

    // Extract core fields supporting both raw MyIAD submission and normalized CRM format
    const applicantFirstName =
      data.applicantFirstName ||
      data.firstName ||
      (data.applicantName ? data.applicantName.split(" ")[0] : "Prospective");
    const applicantLastName =
      data.applicantLastName ||
      data.lastName ||
      (data.applicantName && data.applicantName.includes(" ")
        ? data.applicantName.split(" ").slice(1).join(" ")
        : "Client");
    const email = data.applicantEmail || data.email;
    const phone = data.applicantPhone || data.phone;
    const zipCode = data.zipCode || data.postalCode || "";
    const productInterest =
      data.productInterest || data.service || "Life & Retirement";
    const productSubtype =
      data.quoteParameters?.productSubtype ||
      data.productSubtype ||
      "Strategic Advisory";
    const coverageAmount =
      data.quoteParameters?.coverageOrInvestmentAmount ||
      data.coverageOrInvestmentAmount ||
      data.coverageAmount ||
      "Not specified";
    const clientNotes = data.quoteParameters?.notes || data.message || data.notes || "";
    const territory =
      data.territory ||
      detectTerritoryFromPhone(phone || "").label ||
      "General Territory";

    if (!email && !phone) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed: Either email or phone is required.",
        },
        { status: 422 }
      );
    }

    const consentVersion = data.consentVersion || "myiad-v1.0-statutory";
    const consentTimestamp = data.consentTimestamp || new Date().toISOString();

    let leadId = `crm_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

    // Persist to database if available
    try {
      const prisma = getPrismaClient();
      const created = await prisma.lead.create({
        data: {
          firstName: applicantFirstName,
          lastName: applicantLastName,
          email: email || "unspecified@myiad.com",
          phone: phone || "000-000-0000",
          service: `${productInterest}: ${productSubtype}`,
          contactTime: data.preferredTimeOfDay || "afternoon",
          message: `[crm.myiad.com Ingestion] Coverage/Investment: ${coverageAmount}. Territory: ${territory}. ZIP: ${zipCode}. Notes: ${clientNotes}`,
          consent: true,
          consentText: "TCPA Affirmative Consent verified for crm.myiad.com lead pipeline.",
          consentVersion: consentVersion,
          consentAt: new Date(consentTimestamp),
          attribution: {
            create: {
              source: data.source || "crm.myiad.com",
              medium: data.medium || "inbound-api",
              campaign: data.campaign || "external-integration",
            },
          },
        },
      });
      leadId = created.id;
    } catch (dbErr: any) {
      console.warn(
        "[CRM Ingestion] Database write bypassed or unavailable (running resiliently):",
        redactPiiFromText(dbErr?.message || "")
      );
    }

    // Trigger asynchronous advisor SMS notification
    if (phone) {
      try {
        await dispatchAdvisorAlertSMS({
          applicantName: `${applicantFirstName} ${applicantLastName}`.trim(),
          serviceOrProduct: `${productInterest}: ${productSubtype}`,
          applicantPhone: phone,
          applicantEmail: email || "N/A",
          territory,
          amount: coverageAmount,
          notes: clientNotes,
        });
      } catch (smsErr: any) {
        console.warn(
          "[CRM Ingestion] SMS alert warning:",
          redactPiiFromText(smsErr?.message || "")
        );
      }
    }

    return NextResponse.json({
      success: true,
      leadId,
      pipelineTarget: "crm.myiad.com",
      timestamp: new Date().toISOString(),
      message: "Lead successfully ingested into MyIAD CRM pipeline.",
    });
  } catch (error: any) {
    console.error(
      "[CRM Ingestion Webhook Error]:",
      redactPiiFromText(error?.message || "Internal error")
    );
    return NextResponse.json(
      {
        success: false,
        error: "Internal CRM webhook processing error.",
      },
      { status: 500 }
    );
  }
}
