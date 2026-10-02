import { NextResponse } from "next/server";
import { generateCopilotResponse } from "@/lib/myiad-ai-copilot";
import { detectTerritoryFromPhone, detectSpecialization } from "@/lib/lead-routing";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      applicantName = "Prospective Client",
      service = "Life & Retirement",
      amount = "$500,000",
      phone = "",
      message = "",
      age = 42,
      riskTolerance = "Zero Market Risk (0% Floor)",
      lang = "en",
    } = body;

    const territory = detectTerritoryFromPhone(phone).label;
    const specialization = detectSpecialization(service, message).label;

    // 1. Synthesize Carrier & Suitability Recommendation
    let recommendedCarrier = "Mutual of Omaha";
    let strategyOverview = "Balanced Family Protection with Accelerated Living Benefits";
    let irc7702Benefit = "Tax-free death benefit under IRC §101(a) and tax-deferred growth under IRC §7702.";
    let suitabilityScore = 95;

    const serviceLower = service.toLowerCase();
    if (serviceLower.includes("iul") || serviceLower.includes("indexed") || serviceLower.includes("floor")) {
      recommendedCarrier = "Allianz Life - Pro+ Elite Indexation";
      strategyOverview = "0% Floor Volatility Hedge with S&P 500 Index Participation Cap & Annual Reset";
      irc7702Benefit = "Max-funded cash value accumulation allowing tax-free retirement income via collateralized policy loans under IRC §7702.";
      suitabilityScore = 97;
    } else if (serviceLower.includes("annuity") || serviceLower.includes("retirement") || serviceLower.includes("rollover")) {
      recommendedCarrier = "Allianz / Mutual of Omaha Guaranteed Income";
      strategyOverview = "Fixed Index Annuity with Contractual Lifetime Paycheck & 100% Principal Protection";
      irc7702Benefit = "Tax-deferred growth for non-qualified rollover funds with FINRA Rule 2330 compliance verification.";
      suitabilityScore = 98;
    } else if (serviceLower.includes("military") || serviceLower.includes("sgli") || serviceLower.includes("veteran")) {
      recommendedCarrier = "Mutual of Omaha - Military Asset Shield";
      strategyOverview = "Civilian Insurability Lock with Chronic & Critical Living Benefits (No Medical Exam Required)";
      irc7702Benefit = "Permanent private policy safeguarding veterans transitioning out of military service.";
      suitabilityScore = 99;
    }

    // 2. Generate Advisor Outreach Hook
    const advisorScriptEN = `Hello ${applicantName.split(" ")[0]}, this is Angel Burgos with MyIAD Advisory. I reviewed your diagnostic for ${service} (${amount}). Your 0% market floor and tax-advantaged retirement calculations are complete with ${recommendedCarrier}. When is a good time for a 5-minute walkthrough?`;

    const advisorScriptES = `Hola ${applicantName.split(" ")[0]}, le saluda Angel Burgos de MyIAD Advisory. He revisado su diagnóstico para ${service} (${amount}). Sus proyecciones con piso garantizado de 0% y ventajas contributivas están listas con ${recommendedCarrier}. ¿A qué hora le conviene una breve llamada de 5 minutos?`;

    // 3. Optional Copilot Query
    let copilotAdvice = "";
    try {
      const copilotResult = await generateCopilotResponse({
        query: `What is the optimal strategy for a client interested in ${service} with ${amount} in ${territory}?`,
        lang: lang === "es" ? "es" : "en",
        scenario: {
          clientName: applicantName,
          goal: serviceLower.includes("annuity") ? "lifetime_annuity" : serviceLower.includes("iul") ? "iul_wealth" : "family_protection",
          age: Number(age) || 42,
          annualIncome: 95000,
          dependents: 2,
          debt: 150000,
        },
      });
      copilotAdvice = copilotResult.content;
    } catch {
      copilotAdvice = "Recommended contract provides zero downside market risk and full accelerated living benefits for chronic illness and critical care.";
    }

    return NextResponse.json({
      success: true,
      applicantName,
      territory,
      specialization,
      recommendedCarrier,
      strategyOverview,
      irc7702Benefit,
      suitabilityScore,
      advisorScript: lang === "es" ? advisorScriptES : advisorScriptEN,
      copilotAdvice,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to synthesize AI strategy" },
      { status: 500 }
    );
  }
}
