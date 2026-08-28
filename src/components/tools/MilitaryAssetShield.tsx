"use client";

import React, { useState, useEffect, useMemo, useTransition } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";
import { dictionary } from "@/lib/i18n/translations";

interface MilitaryAssetShieldProps {
  initialAge?: number;
  initialRetireAge?: number;
  initialPension?: number;
  initialCoverage?: number;
  initialStatus?: "active" | "veteran";
  isStandalone?: boolean;
}

// Official VA VGLI monthly rates per $1,000 of coverage by age band
const getVgliMonthlyRatePerThousand = (age: number): number => {
  if (age < 30) return 0.08;
  if (age < 35) return 0.10;
  if (age < 40) return 0.13;
  if (age < 45) return 0.17;
  if (age < 50) return 0.22;
  if (age < 55) return 0.36;
  if (age < 60) return 0.67;
  if (age < 65) return 1.08;
  if (age < 70) return 1.50;
  if (age < 75) return 2.20;
  return 4.50; // Age 75+
};

export function MilitaryAssetShield({
  initialAge = 32,
  initialRetireAge = 42,
  initialPension = 3800,
  initialCoverage = 500000,
  initialStatus = "active",
  isStandalone = false,
}: MilitaryAssetShieldProps) {
  const { lang } = useLanguage();
  const t = dictionary[lang];

  const [status, setStatus] = useState<"active" | "veteran">(initialStatus);
  const [activeTab, setActiveTab] = useState<"sgli" | "sbp" | "tsp" | "tax">("sgli");
  const [currentAge, setCurrentAge] = useState(initialAge);
  const [retireAge, setRetireAge] = useState(initialRetireAge);
  const [monthlyPension, setMonthlyPension] = useState(initialPension);
  const [coverageAmount, setCoverageAmount] = useState(initialCoverage);
  const [copied, setCopied] = useState(false);
  const [, startTransition] = useTransition();

  // Read URL parameters on mount if provided
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const ageParam = params.get("age");
      const retParam = params.get("retire");
      const penParam = params.get("pension");
      const covParam = params.get("cov");
      const statParam = params.get("status");

      if (ageParam) setCurrentAge(Number(ageParam));
      if (retParam) setRetireAge(Number(retParam));
      if (penParam) setMonthlyPension(Number(penParam));
      if (covParam) setCoverageAmount(Number(covParam));
      if (statParam === "active" || statParam === "veteran") setStatus(statParam);
    }
  }, []);

  // Compute military calculations and timeline
  const calculations = useMemo(() => {
    const coverageInThousands = coverageAmount / 1000;
    const sgliMonthlyCost = coverageInThousands * 0.062; // ~$31/mo for $500k

    // SBP cost is contractually 6.5% of gross military retired pay
    const monthlySbpCost = Math.round(monthlyPension * 0.065);
    const annualSbpCost = monthlySbpCost * 12;
    const sbpSurvivorPension = Math.round(monthlyPension * 0.55); // 55% spouse annuity

    // Typical level funding for private IUL asset protection equivalent
    const iulMonthlyFunding = Math.round(Math.max(150, coverageInThousands * 0.45));
    const annualIulFunding = iulMonthlyFunding * 12;

    const timelineData: Array<{
      age: number;
      vgliAnnualCost: number;
      cumulativeVgliCost: number;
      iulCashValue: number;
      iulDeathBenefit: number;
      sbpCumulativeCost: number;
    }> = [];

    let cumulativeVgli = 0;
    let iulCash = 0;
    let sbpCumulative = 0;

    for (let age = currentAge; age <= 80; age++) {
      // VGLI calculation (active duty pays SGLI, then shifts to VGLI post-separation)
      let annualVgliRate = 0;
      if (age < retireAge && status === "active") {
        annualVgliRate = sgliMonthlyCost * 12;
      } else {
        annualVgliRate = getVgliMonthlyRatePerThousand(age) * coverageInThousands * 12;
      }
      cumulativeVgli += Math.round(annualVgliRate);

      // SBP accumulation post-retirement (up to 30 years or age 70)
      if (age >= retireAge && age <= Math.min(retireAge + 30, 70)) {
        sbpCumulative += annualSbpCost;
      }

      // IUL Cash accumulation with 7.0% assumed index performance & 0% floor
      if (age < 65) {
        iulCash = (iulCash + annualIulFunding) * 1.068;
      } else {
        // Post 65: policy continues compounding or funds tax-free policy distributions
        iulCash = iulCash * 1.055;
      }

      const livingDeathBenefit = Math.max(coverageAmount, Math.round(iulCash * 1.25));

      timelineData.push({
        age,
        vgliAnnualCost: Math.round(annualVgliRate),
        cumulativeVgliCost: cumulativeVgli,
        iulCashValue: Math.round(iulCash),
        iulDeathBenefit: livingDeathBenefit,
        sbpCumulativeCost: sbpCumulative,
      });
    }

    const at75Point = timelineData.find((p) => p.age === 75) || timelineData[timelineData.length - 1];
    const totalVgliAt75 = at75Point?.cumulativeVgliCost || 0;
    const totalIulCashAt75 = at75Point?.iulCashValue || 0;
    const annualTaxFreeRetirementIncome = Math.round(totalIulCashAt75 * 0.065);

    // SBP vs Pension Max bar chart data
    const sbpComparisonData = [
      {
        name: lang === "es" ? "Reducción SBP (6.5%)" : "SBP Pension Reduction",
        cost: sbpCumulative,
        equity: 0,
        fill: "#ef4444",
      },
      {
        name: lang === "es" ? "Estrategia Pension Max IUL" : "Pension Max IUL Asset",
        cost: annualIulFunding * Math.min(30, 70 - currentAge),
        equity: totalIulCashAt75,
        fill: "#10b981",
      },
    ];

    return {
      sgliMonthlyCost,
      monthlySbpCost,
      annualSbpCost,
      sbpSurvivorPension,
      iulMonthlyFunding,
      totalVgliAt75,
      totalIulCashAt75,
      annualTaxFreeRetirementIncome,
      timelineData,
      sbpComparisonData,
    };
  }, [currentAge, retireAge, monthlyPension, coverageAmount, status, lang]);

  // Generate shareable link
  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    const base = window.location.origin;
    return `${base}/tools/military-asset-shield?age=${currentAge}&retire=${retireAge}&pension=${monthlyPension}&cov=${coverageAmount}&status=${status}`;
  }, [currentAge, retireAge, monthlyPension, coverageAmount, status]);

  const handleCopyLink = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const smsText = encodeURIComponent(
    t.mil_sms_text.replace("{url}", shareUrl)
  );

  const emailSubject = encodeURIComponent(t.mil_email_subject);
  const emailBody = encodeURIComponent(
    t.mil_email_salutation +
      `${t.mil_email_status}: ${status === "active" ? t.mil_status_active : t.mil_status_veteran}\n` +
      `${t.mil_email_age}: ${currentAge} ${lang === "es" ? "años (Retiro:" : "yrs (Retire:"} ${retireAge})\n` +
      `${t.mil_email_coverage}: $${coverageAmount.toLocaleString()}\n` +
      `${t.mil_email_pension}: $${monthlyPension.toLocaleString()}/${lang === "es" ? "mes" : "mo"}\n` +
      `${t.mil_email_savings}\n\n` +
      t.mil_email_interact.replace("{url}", shareUrl) +
      t.mil_email_closing
  );

  const ageUnit = lang === "es" ? "años" : "yrs";

  return (
    <div className={`bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden ${isStandalone ? "max-w-5xl mx-auto my-8" : "w-full"}`}>
      {/* Header Banner */}
      <div className="bg-[#001c38] text-white p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 border border-amber-400/40 rounded-full text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
            <span>🎖️</span> {t.mil_badge}
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
            {t.mil_title}
          </h3>
          <p className="text-white/80 text-sm mt-1 max-w-xl">
            {t.mil_desc}
          </p>
        </div>

        {/* Status Switcher (Active Duty vs Veteran) */}
        <div className="shrink-0 bg-white/10 p-3.5 rounded-2xl border border-white/15 space-y-2">
          <p className="text-[11px] uppercase font-bold tracking-wider text-amber-300">{t.mil_status_label}</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setStatus("active")}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                status === "active"
                  ? "bg-secondary text-white shadow-md"
                  : "bg-white/10 text-white/80 hover:bg-white/20"
              }`}
            >
              🇺🇸 {lang === "es" ? "Servicio Activo" : "Active Duty"}
            </button>
            <button
              onClick={() => setStatus("veteran")}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                status === "veteran"
                  ? "bg-secondary text-white shadow-md"
                  : "bg-white/10 text-white/80 hover:bg-white/20"
              }`}
            >
              🎖️ {lang === "es" ? "Veterano / Retiro" : "Veteran / Ret."}
            </button>
          </div>
        </div>
      </div>

      {/* Strategic Module Navigation Tabs */}
      <div className="bg-slate-100/80 border-b border-slate-200 px-6 pt-3 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTab("sgli")}
          className={`px-4 py-2.5 rounded-t-xl text-xs font-bold border-t border-x transition-all ${
            activeTab === "sgli"
              ? "bg-white text-secondary border-slate-200 -mb-[1px] shadow-sm"
              : "bg-transparent text-slate-600 border-transparent hover:text-slate-900"
          }`}
        >
          🛡️ {t.mil_tab_sgli}
        </button>

        <button
          onClick={() => setActiveTab("sbp")}
          className={`px-4 py-2.5 rounded-t-xl text-xs font-bold border-t border-x transition-all ${
            activeTab === "sbp"
              ? "bg-white text-secondary border-slate-200 -mb-[1px] shadow-sm"
              : "bg-transparent text-slate-600 border-transparent hover:text-slate-900"
          }`}
        >
          💼 {t.mil_tab_sbp}
        </button>

        <button
          onClick={() => setActiveTab("tsp")}
          className={`px-4 py-2.5 rounded-t-xl text-xs font-bold border-t border-x transition-all ${
            activeTab === "tsp"
              ? "bg-white text-secondary border-slate-200 -mb-[1px] shadow-sm"
              : "bg-transparent text-slate-600 border-transparent hover:text-slate-900"
          }`}
        >
          📈 {t.mil_tab_tsp}
        </button>

        <button
          onClick={() => setActiveTab("tax")}
          className={`px-4 py-2.5 rounded-t-xl text-xs font-bold border-t border-x transition-all ${
            activeTab === "tax"
              ? "bg-white text-secondary border-slate-200 -mb-[1px] shadow-sm"
              : "bg-transparent text-slate-600 border-transparent hover:text-slate-900"
          }`}
        >
          🔒 {t.mil_tab_tax}
        </button>
      </div>

      {/* Main Grid: Controls + Interactive Models */}
      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Profile Inputs Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-5">
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500">{t.mil_inputs_title}</h4>

            {/* Current Age */}
            <div>
              <div className="flex justify-between items-center text-sm font-semibold text-slate-800 mb-1.5">
                <label>{t.mil_age_label}</label>
                <span className="text-secondary font-bold text-base px-2 py-0.5 bg-white border border-slate-200 rounded-md">
                  {currentAge} {ageUnit}
                </span>
              </div>
              <input
                type="range"
                min={20}
                max={60}
                step={1}
                value={currentAge}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  startTransition(() => {
                    setCurrentAge(val);
                    if (val >= retireAge) setRetireAge(val + 4);
                  });
                }}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-secondary"
              />
            </div>

            {/* Retirement / Separation Age */}
            <div>
              <div className="flex justify-between items-center text-sm font-semibold text-slate-800 mb-1.5">
                <label>{t.mil_retire_age_label}</label>
                <span className="text-secondary font-bold text-base px-2 py-0.5 bg-white border border-slate-200 rounded-md">
                  {retireAge} {ageUnit}
                </span>
              </div>
              <input
                type="range"
                min={Math.max(currentAge + 1, 38)}
                max={65}
                step={1}
                value={retireAge}
                onChange={(e) => startTransition(() => setRetireAge(Number(e.target.value)))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-secondary"
              />
            </div>

            {/* Coverage Amount Slider */}
            <div>
              <div className="flex justify-between items-center text-sm font-semibold text-slate-800 mb-1.5">
                <label>{t.mil_coverage_amount}</label>
                <span className="text-secondary font-bold text-base px-2 py-0.5 bg-white border border-slate-200 rounded-md">
                  ${(coverageAmount / 1000).toFixed(0)}k
                </span>
              </div>
              <input
                type="range"
                min={250000}
                max={1500000}
                step={50000}
                value={coverageAmount}
                onChange={(e) => startTransition(() => setCoverageAmount(Number(e.target.value)))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-secondary"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                {lang === "es" ? "SGLI activo cubre hasta $500k; IUL privado permite $1M+ sin restricciones." : "SGLI caps at $500k; private IUL allows $1M+ permanent coverage."}
              </p>
            </div>

            {/* Monthly Pension Amount */}
            <div>
              <div className="flex justify-between items-center text-sm font-semibold text-slate-800 mb-1.5">
                <label>{t.mil_monthly_base_pay}</label>
                <span className="text-secondary font-bold text-base px-2 py-0.5 bg-white border border-slate-200 rounded-md">
                  ${monthlyPension.toLocaleString()}/{lang === "es" ? "mes" : "mo"}
                </span>
              </div>
              <input
                type="range"
                min={1500}
                max={12000}
                step={250}
                value={monthlyPension}
                onChange={(e) => startTransition(() => setMonthlyPension(Number(e.target.value)))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-secondary"
              />
            </div>

            {/* Military Advisory Notice */}
            <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs space-y-1 text-amber-900">
              <p className="font-bold flex items-center gap-1.5">
                <span>⚠️</span> {lang === "es" ? "Alerta de Vencimiento SGLI" : "SGLI Expiration Alert"}
              </p>
              <p className="text-[11px] leading-relaxed text-amber-800">
                {t.mil_sgli_note}
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Comparison Display Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* TAB 1: SGLI/VGLI vs IUL Visual Model */}
          {activeTab === "sgli" && (
            <div className="space-y-6">
              <div className="bg-slate-50/50 p-4 md:p-6 rounded-2xl border border-slate-200">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{t.mil_chart_cost_vs_asset}</h4>
                    <p className="text-xs text-slate-500">{t.mil_chart_cost_desc}</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-medium">
                    <span className="flex items-center gap-1.5 text-red-500 font-bold">
                      <span className="h-3 w-3 rounded-full bg-red-500 inline-block"></span> VGLI Cost
                    </span>
                    <span className="flex items-center gap-1.5 text-secondary font-bold">
                      <span className="h-3 w-3 rounded-full bg-secondary inline-block"></span> IUL Cash Asset
                    </span>
                  </div>
                </div>

                <div className="h-[280px] md:h-[320px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={calculations.timelineData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="milIulGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0051d5" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#0051d5" stopOpacity={0.0} />
                        </linearGradient>
                        <linearGradient id="milVgliGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="age" tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} unit={` ${ageUnit}`} />
                      <YAxis tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`} />
                      <Tooltip
                        formatter={(val: any, name: any) => [
                          `$${Number(val).toLocaleString()}`,
                          name === "iulCashValue" ? t.mil_legend_iul_asset : t.mil_legend_vgli_cost,
                        ]}
                        labelFormatter={(label) => `${t.mil_age_label}: ${label} ${ageUnit}`}
                        contentStyle={{ backgroundColor: "#001c38", color: "#fff", borderRadius: "12px", border: "none", fontSize: "12px" }}
                      />
                      <Area type="monotone" dataKey="cumulativeVgliCost" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#milVgliGrad)" />
                      <Area type="monotone" dataKey="iulCashValue" stroke="#0051d5" strokeWidth={3} fillOpacity={1} fill="url(#milIulGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* 3 Outcome Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-red-50 rounded-xl border border-red-200 shadow-sm">
                  <p className="text-xs text-red-600 uppercase font-semibold">{t.mil_vgli_cumulative_label}</p>
                  <p className="text-xl font-bold text-red-700 mt-1">${calculations.totalVgliAt75.toLocaleString()}</p>
                  <p className="text-[11px] text-red-500">$0 {lang === "es" ? "patrimonio recuperable" : "cash value return"}</p>
                </div>

                <div className="p-4 bg-secondary/10 rounded-xl border border-secondary/20 shadow-sm">
                  <p className="text-xs text-secondary uppercase font-bold">{t.mil_iul_cash_label}</p>
                  <p className="text-xl font-bold text-secondary mt-1">${calculations.totalIulCashAt75.toLocaleString()}</p>
                  <p className="text-[11px] text-secondary/80">IRS 7702 {lang === "es" ? "libre de impuestos" : "tax-free cash"}</p>
                </div>

                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 shadow-sm">
                  <p className="text-xs text-emerald-700 uppercase font-bold">{t.mil_iul_tax_free_income}</p>
                  <p className="text-xl font-bold text-emerald-800 mt-1">${calculations.annualTaxFreeRetirementIncome.toLocaleString()}</p>
                  <p className="text-[11px] text-emerald-600">{lang === "es" ? "De por vida sin impuestos" : "Annual tax-free loan flow"}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SBP vs Pension Maximization */}
          {activeTab === "sbp" && (
            <div className="space-y-6">
              <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-200 space-y-4">
                <h4 className="text-base font-bold text-slate-900">
                  {lang === "es" ? "Análisis de Maximización de Pensión Militar (SBP vs. Póliza Privada)" : "Military Pension Maximization Analysis (SBP vs. Private Asset)"}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {lang === "es" 
                    ? "Al retirarse, ceder el 6.5% de su pensión para SBP reduce permanentemente su cheque. Si su cónyuge fallece primero, el gobierno retiene todo el dinero sin reembolso. La estrategia de 'Pension Max' le permite cobrar el 100% de su pensión y proteger a su familia con un beneficio en vida libre de impuestos que conserva su valor."
                    : "Electing Survivor Benefit Plan (SBP) permanently forfeits 6.5% of gross military retired pay. If your spouse predeceases you, all deducted premiums are lost forever with zero refund. Pension Maximization enables you to draw 100% of your pension while funding private permanent coverage that protects your spouse, retains cash value, and transfers to heirs."}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
                    <p className="text-xs font-bold text-slate-500 uppercase">{t.mil_sbp_reduction_label}</p>
                    <p className="text-2xl font-black text-red-600">-${calculations.monthlySbpCost}/mo</p>
                    <p className="text-xs text-slate-500">(${calculations.annualSbpCost.toLocaleString()}/yr deducted from retired pay)</p>
                    <p className="text-[11px] text-slate-400 pt-1 border-t border-slate-100">
                      {t.mil_sbp_survivor_benefit}: ~${calculations.sbpSurvivorPension.toLocaleString()}/mo
                    </p>
                  </div>

                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2">
                    <p className="text-xs font-bold text-emerald-800 uppercase">{lang === "es" ? "Ventaja Pension Max" : "Pension Max Net Advantage"}</p>
                    <p className="text-2xl font-black text-emerald-700">+${monthlyPension.toLocaleString()}/mo</p>
                    <p className="text-xs text-emerald-600">{lang === "es" ? "100% pensión completa + $500k protección líquida" : "100% full pension + $500k tax-free lump sum"}</p>
                    <p className="text-[11px] text-emerald-700/80 pt-1 border-t border-emerald-200">
                      {lang === "es" ? "Si el cónyuge fallece primero, el valor en efectivo le pertenece." : "If spouse passes first, policy cash value is 100% retained."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TSP 0% Floor Rollover Strategy */}
          {activeTab === "tsp" && (
            <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-200 space-y-5">
              <h4 className="text-base font-bold text-slate-900">
                {lang === "es" ? "Blindaje de TSP: Cero Riesgo de Secuencia de Rendimientos" : "TSP Shield: Zero Sequence of Returns Market Risk"}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === "es"
                  ? "Los fondos del TSP (C, S e I Funds) están completamente expuestos a caídas bursátiles de -30% a -50%. Al separarse o retirarse del servicio, transferir parte de su TSP a una Anualidad Indexada Fija o IUL institucional asegura un piso del 0%, garantizando que su dinero nunca retroceda ante una crisis bursátil mientras genera un cheque vitalicio."
                  : "Thrift Savings Plan (TSP C, S, and I funds) are fully exposed to 30%-50% market drawdowns during retirement transition. Rolling over eligible TSP funds into a Fixed Indexed Annuity (FIA) or IUL locks in a contractually guaranteed 0% floor—ensuring market downturns never reduce your retirement balance while guaranteeing a lifetime paycheck."}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded-xl border border-slate-200">
                  <span className="text-2xl mb-1 block">🛡️</span>
                  <p className="font-bold text-xs text-slate-900">{t.mil_pillar_1_title}</p>
                  <p className="text-[11px] text-slate-500 mt-1">{t.mil_pillar_1_desc}</p>
                </div>

                <div className="p-4 bg-white rounded-xl border border-slate-200">
                  <span className="text-2xl mb-1 block">💵</span>
                  <p className="font-bold text-xs text-slate-900">{t.mil_pillar_2_title}</p>
                  <p className="text-[11px] text-slate-500 mt-1">{t.mil_pillar_2_desc}</p>
                </div>

                <div className="p-4 bg-white rounded-xl border border-slate-200">
                  <span className="text-2xl mb-1 block">🏥</span>
                  <p className="font-bold text-xs text-slate-900">{t.mil_pillar_3_title}</p>
                  <p className="text-[11px] text-slate-500 mt-1">{t.mil_pillar_3_desc}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Tax & Asset Shield Pillars */}
          {activeTab === "tax" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <div className="h-8 w-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary text-base font-bold">1</div>
                <h5 className="font-bold text-sm text-slate-900">{t.mil_pillar_1_title}</h5>
                <p className="text-xs text-slate-600 leading-relaxed">{t.mil_pillar_1_desc}</p>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <div className="h-8 w-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary text-base font-bold">2</div>
                <h5 className="font-bold text-sm text-slate-900">{t.mil_pillar_2_title}</h5>
                <p className="text-xs text-slate-600 leading-relaxed">{t.mil_pillar_2_desc}</p>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <div className="h-8 w-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary text-base font-bold">3</div>
                <h5 className="font-bold text-sm text-slate-900">{t.mil_pillar_3_title}</h5>
                <p className="text-xs text-slate-600 leading-relaxed">{t.mil_pillar_3_desc}</p>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <div className="h-8 w-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary text-base font-bold">4</div>
                <h5 className="font-bold text-sm text-slate-900">{t.mil_pillar_4_title}</h5>
                <p className="text-xs text-slate-600 leading-relaxed">{t.mil_pillar_4_desc}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Share / Export Action Toolbar */}
      <div className="bg-slate-100 border-t border-slate-200 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-1 text-center md:text-left">
          <h5 className="font-bold text-sm text-slate-900 flex items-center justify-center md:justify-start gap-2">
            <span>🎖️</span> {t.tool_share_header}
          </h5>
          <p className="text-xs text-slate-600">{t.tool_share_desc}</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handleCopyLink}
            className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 shadow-sm transition-all flex items-center gap-2"
          >
            {copied ? <span className="text-emerald-600 font-bold">✓ {t.tool_share_copied}</span> : <span>🔗 {t.tool_share_copy}</span>}
          </button>
          <a href={`sms:?&body=${smsText}`} className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 shadow-sm transition-all flex items-center gap-2">
            <span>📱</span> {t.tool_share_sms}
          </a>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(t.mil_sms_text.replace("{url}", shareUrl))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg text-xs font-semibold text-emerald-800 shadow-sm transition-all flex items-center gap-2"
          >
            <span>💬</span> {t.tool_share_whatsapp}
          </a>
          <a href={`mailto:?subject=${emailSubject}&body=${emailBody}`} className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 shadow-sm transition-all flex items-center gap-2">
            <span>✉️</span> {t.tool_share_email}
          </a>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 shadow-sm transition-all flex items-center gap-2"
          >
            <span>🖨️</span> {t.tool_share_pdf}
          </button>
          <a href="/#consultation">
            <Button variant="primary" className="!bg-secondary !text-white !border-secondary hover:!bg-secondary/90 text-xs font-bold px-5 py-2.5 shadow-md">
              {t.mil_cta_quote}
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
