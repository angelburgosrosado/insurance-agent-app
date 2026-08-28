import { NextResponse } from "next/server";
import { generateExecutiveReportHtml, ReportData } from "@/lib/pdf/report-generator";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const reportType = (searchParams.get("type") || "iul") as ReportData["reportType"];
    const clientName = searchParams.get("name") || undefined;
    const lang = (searchParams.get("lang") || "en") as "en" | "es";

    const htmlContent = generateExecutiveReportHtml({
      reportType,
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
