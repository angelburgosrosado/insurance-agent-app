import { NextResponse } from "next/server";
import {
  generateExecutiveReportHtml,
  generateMyIADBlueprintHtml,
  ReportData,
} from "@/lib/pdf/report-generator";
import { getLeadRepository } from "@/lib/server/leads";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const reportType = searchParams.get("type") || "iul";
    const clientName = searchParams.get("name") || undefined;
    const email = searchParams.get("email") || undefined;
    const phone = searchParams.get("phone") || undefined;
    const lang = (searchParams.get("lang") || "en") as "en" | "es";

    // Asynchronously record / annotate lead in CRM so document requests appear in the CRM pipeline
    if (clientName || email) {
      try {
        const repo = getLeadRepository();
        const existingLeads = await repo.listLeads();
        const trimmedName = (clientName || "").trim().toLowerCase();
        const existing = existingLeads.find(
          (l) =>
            (email && l.email?.toLowerCase() === email.toLowerCase()) ||
            (trimmedName &&
              `${l.firstName} ${l.lastName}`.trim().toLowerCase() === trimmedName)
        );

        if (existing) {
          await repo.addNote(
            existing.id,
            `📄 Document Downloaded from Front Page:
• Document Type: ${reportType.toUpperCase()}
• Language: ${lang}
• Timestamp: ${new Date().toISOString()}`,
            "Document Download Engine"
          );
        } else if (clientName) {
          const nameParts = clientName.trim().split(/\s+/);
          const firstName = nameParts[0] || "Client";
          const lastName = nameParts.slice(1).join(" ") || "Prospect";
          const coverageVal = searchParams.get("coverage");
          const coverageStr = coverageVal && !isNaN(Number(coverageVal))
            ? `$${Number(coverageVal).toLocaleString("en-US")}`
            : "Calculated on demand";

          const newLead = await repo.createLead({
            firstName,
            lastName,
            email:
              email ||
              `${firstName.toLowerCase().replace(/[^a-z0-9]/g, "") || "prospect"}@prospect.myiad.com`,
            phone: phone || "(888) 887-3585",
            service: `Document Request: ${reportType.toUpperCase()} (${coverageStr})`,
            contactTime: "Anytime",
            message: `Prospect downloaded ${reportType.toUpperCase()} document/blueprint from myiad.com front page.\nCoverage: ${coverageStr}\nIncome: ${searchParams.get("income") || "Standard"}\nAge: ${searchParams.get("age") || "N/A"}`,
            consent: true,
            consentText: "Affirmative consent provided via document download request",
            consentVersion: "v2.0-doc",
            consentAt: new Date().toISOString(),
            source: "myiad.com/reports/download",
            medium: "document-download",
            campaign: reportType,
          });

          await repo.addNote(
            newLead.id,
            `🎯 AI Underwriting Annotation:
• Document Type: ${reportType.toUpperCase()} Blueprint
• Target Protection Floor: ${coverageStr}
• Status: Document generated & downloaded
• Timestamp: ${new Date().toISOString()}`,
            "MyIAD Document Hub"
          );
        }
      } catch (crmErr) {
        console.warn("[Report Download] Lead tracking notice:", crmErr);
      }
    }

    if (reportType === "myiad_blueprint") {
      const age = Number(searchParams.get("age")) || 38;
      const annualIncome = Number(searchParams.get("income")) || 110000;
      const dependents = Number(searchParams.get("dependents")) || 2;
      const debt = Number(searchParams.get("debt")) || 250000;
      const coverageNeed = Number(searchParams.get("coverage")) || undefined;
      const taxFreeIncome = Number(searchParams.get("taxFreeIncome")) || undefined;
      const goal = searchParams.get("goal") || undefined;

      const htmlContent = generateMyIADBlueprintHtml({
        clientName,
        age,
        annualIncome,
        dependents,
        debt,
        goal,
        coverageNeed,
        taxFreeIncome,
        lang,
      });

      return new Response(htmlContent, {
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "public, max-age=3600, s-maxage=3600",
        },
        status: 200,
      });
    }

    const htmlContent = generateExecutiveReportHtml({
      reportType: reportType as ReportData["reportType"],
      clientName,
      lang,
    });

    return new Response(htmlContent, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
      status: 200,
    });
  } catch (error) {
    console.error("[Report Download Route Error]", error);
    return NextResponse.json({ error: "Failed to generate report" }, { status: 500 });
  }
}
