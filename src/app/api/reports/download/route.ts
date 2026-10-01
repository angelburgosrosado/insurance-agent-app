import { NextResponse } from "next/server";
import {
  generateExecutiveReportHtml,
  generateMyIADBlueprintHtml,
  ReportData,
} from "@/lib/pdf/report-generator";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const reportType = searchParams.get("type") || "iul";
    const clientName = searchParams.get("name") || undefined;
    const lang = (searchParams.get("lang") || "en") as "en" | "es";

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
