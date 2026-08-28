"use client";

import React, { useState, useEffect, useMemo, useTransition } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";
import { dictionary } from "@/lib/i18n/translations";

interface AnnuityEstimatorProps {
  initialAge?: number;
  initialRetireAge?: number;
  initialPrincipal?: number;
  initialPayoutRate?: number;
  isStandalone?: boolean;
}

export function AnnuityEstimator({
  initialAge = 58,
  initialRetireAge = 65,
  initialPrincipal = 250000,
  initialPayoutRate = 7.2,
  isStandalone = false,
}: AnnuityEstimatorProps) {
  const { lang } = useLanguage();
  const t = dictionary[lang];

  const [currentAge, setCurrentAge] = useState(initialAge);
  const [retireAge, setRetireAge] = useState(initialRetireAge);
  const [principal, setPrincipal] = useState(initialPrincipal);
  const [payoutRate, setPayoutRate] = useState(initialPayoutRate);
  const [copied, setCopied] = useState(false);
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const ageParam = params.get("age");
      const retParam = params.get("retire");
      const principalParam = params.get("principal");
      const rateParam = params.get("rate");

      if (ageParam) setCurrentAge(Number(ageParam));
      if (retParam) setRetireAge(Number(retParam));
      if (principalParam) setPrincipal(Number(principalParam));
      if (rateParam) setPayoutRate(Number(rateParam));
    }
  }, []);

  const calculations = useMemo(() => {
    const deferralYears = Math.max(0, retireAge - currentAge);
    // Compound interest bonus during deferral (e.g. 5.5% rollup rate on income base)
    const incomeBase = Math.round(principal * Math.pow(1 + 0.06, deferralYears));
    const annualGuaranteedIncome = Math.round((incomeBase * payoutRate) / 100);
    const monthlyGuaranteedIncome = Math.round(annualGuaranteedIncome / 12);
    const cumulativePayoutAt85 = annualGuaranteedIncome * Math.max(1, 85 - retireAge);
    const cumulativePayoutAt95 = annualGuaranteedIncome * Math.max(1, 95 - retireAge);

    const chartData = [
      { category: t.annuity_cat_rollover, amount: principal, fill: "#94a3b8" },
      { category: t.annuity_cat_income_base, amount: incomeBase, fill: "#001c38" },
      { category: t.annuity_cat_age85, amount: cumulativePayoutAt85, fill: "#0051d5" },
      { category: t.annuity_cat_age95, amount: cumulativePayoutAt95, fill: "#10b981" },
    ];

    return {
      deferralYears,
      incomeBase,
      annualGuaranteedIncome,
      monthlyGuaranteedIncome,
      cumulativePayoutAt85,
      cumulativePayoutAt95,
      chartData,
    };
  }, [currentAge, retireAge, principal, payoutRate, t]);

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    const base = window.location.origin;
    return `${base}/tools/annuity-estimator?age=${currentAge}&retire=${retireAge}&principal=${principal}&rate=${payoutRate}`;
  }, [currentAge, retireAge, principal, payoutRate]);

  const handleCopyLink = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const smsText = encodeURIComponent(
    t.annuity_sms_text
      .replace("{amount}", calculations.monthlyGuaranteedIncome.toLocaleString())
      .replace("{url}", shareUrl)
  );

  const emailSubject = encodeURIComponent(t.annuity_email_subject);
  const emailBody = encodeURIComponent(
    t.annuity_email_salutation +
      `${t.annuity_email_principal}: $${principal.toLocaleString()}\n` +
      `${t.annuity_email_monthly}: $${calculations.monthlyGuaranteedIncome.toLocaleString()} / ${lang === "es" ? "mes" : "month"}\n` +
      `${t.annuity_email_annual}: $${calculations.annualGuaranteedIncome.toLocaleString()} / ${lang === "es" ? "año" : "year"}\n` +
      `${t.annuity_email_age85}: $${calculations.cumulativePayoutAt85.toLocaleString()}\n\n` +
      t.annuity_email_interact.replace("{url}", shareUrl) +
      t.annuity_email_closing
  );

  const ageUnit = lang === "es" ? "años" : "yrs";

  return (
    <div className={`bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden ${isStandalone ? "max-w-5xl mx-auto my-8" : "w-full"}`}>
      {/* Header */}
      <div className="bg-[#001c38] text-white p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/20 border border-secondary/40 rounded-full text-secondary text-xs font-bold uppercase tracking-wider mb-2">
            {t.annuity_badge}
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
            {t.annuity_title}
          </h3>
          <p className="text-white/80 text-sm mt-1 max-w-xl">
            {t.annuity_desc}
          </p>
        </div>
        <div className="text-left md:text-right shrink-0 bg-white/10 p-4 rounded-xl border border-white/15">
          <p className="text-xs text-secondary uppercase font-bold tracking-wider">{t.annuity_proj_income_label}</p>
          <p className="text-3xl md:text-4xl font-extrabold text-white">
            ${calculations.monthlyGuaranteedIncome.toLocaleString()}
            <span className="text-sm font-normal text-white/70">{t.annuity_per_mo}</span>
          </p>
          <p className="text-[11px] text-white/60 mt-0.5">
            {t.annuity_per_yr_life.replace("{amount}", `$${calculations.annualGuaranteedIncome.toLocaleString()}`)}
          </p>
        </div>
      </div>

      {/* Grid: Inputs + Chart */}
      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sliders */}
        <div className="lg:col-span-4 space-y-5">
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-5">
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500">{t.annuity_inputs_title}</h4>

            {/* Principal Investment */}
            <div>
              <div className="flex justify-between items-center text-sm font-semibold text-slate-800 mb-1.5">
                <label>{t.annuity_principal_label}</label>
                <span className="text-secondary font-bold text-base px-2 py-0.5 bg-white border border-slate-200 rounded-md">
                  ${principal.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min={25000}
                max={1000000}
                step={25000}
                value={principal}
                onChange={(e) => startTransition(() => setPrincipal(Number(e.target.value)))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-secondary"
              />
            </div>

            {/* Current Age */}
            <div>
              <div className="flex justify-between items-center text-sm font-semibold text-slate-800 mb-1.5">
                <label>{t.annuity_current_age}</label>
                <span className="text-secondary font-bold text-base px-2 py-0.5 bg-white border border-slate-200 rounded-md">
                  {currentAge} {ageUnit}
                </span>
              </div>
              <input
                type="range"
                min={45}
                max={75}
                step={1}
                value={currentAge}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  startTransition(() => {
                    setCurrentAge(val);
                    if (val >= retireAge) setRetireAge(val);
                  });
                }}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-secondary"
              />
            </div>

            {/* Income Start Age */}
            <div>
              <div className="flex justify-between items-center text-sm font-semibold text-slate-800 mb-1.5">
                <label>{t.annuity_start_age}</label>
                <span className="text-secondary font-bold text-base px-2 py-0.5 bg-white border border-slate-200 rounded-md">
                  {retireAge} {ageUnit}
                </span>
              </div>
              <input
                type="range"
                min={currentAge}
                max={80}
                step={1}
                value={retireAge}
                onChange={(e) => startTransition(() => setRetireAge(Number(e.target.value)))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-secondary"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                {calculations.deferralYears > 0 
                  ? t.annuity_bonus_rollup.replace("{years}", String(calculations.deferralYears)) 
                  : t.annuity_immediate_activation}
              </p>
            </div>
          </div>
        </div>

        {/* Chart Column */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-50/50 p-4 md:p-6 rounded-2xl border border-slate-200">
            <h4 className="text-sm font-bold text-slate-900 mb-1">{t.annuity_chart_title}</h4>
            <p className="text-xs text-slate-500 mb-4">{t.annuity_chart_desc}</p>

            <div className="h-[260px] md:h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={calculations.chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="category" tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} />
                  <YAxis tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`} />
                  <Tooltip
                    formatter={(val: any) => [`$${Number(val).toLocaleString()}`, t.annuity_tooltip_amount]}
                    contentStyle={{ backgroundColor: "#001c38", color: "#fff", borderRadius: "12px", border: "none", fontSize: "12px" }}
                  />
                  <Bar dataKey="amount" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
              <p className="text-xs text-slate-500 uppercase font-semibold">{t.annuity_metric_income_base}</p>
              <p className="text-xl font-bold text-slate-900 mt-1">${calculations.incomeBase.toLocaleString()}</p>
              <p className="text-[11px] text-slate-400">{t.annuity_metric_income_base_sub}</p>
            </div>

            <div className="p-4 bg-secondary/10 rounded-xl border border-secondary/20 shadow-sm">
              <p className="text-xs text-secondary uppercase font-bold">{t.annuity_metric_annual_income}</p>
              <p className="text-xl font-bold text-secondary mt-1">${calculations.annualGuaranteedIncome.toLocaleString()}</p>
              <p className="text-[11px] text-secondary/80">{t.annuity_metric_annual_income_sub}</p>
            </div>

            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 shadow-sm">
              <p className="text-xs text-emerald-700 uppercase font-bold">{t.annuity_metric_age95}</p>
              <p className="text-xl font-bold text-emerald-800 mt-1">${calculations.cumulativePayoutAt95.toLocaleString()}</p>
              <p className="text-[11px] text-emerald-600">{t.annuity_metric_age95_sub}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Share / Export Bar */}
      <div className="bg-slate-100 border-t border-slate-200 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-1 text-center md:text-left">
          <h5 className="font-bold text-sm text-slate-900 flex items-center justify-center md:justify-start gap-2">
            <span>🚀</span> {t.annuity_export_title}
          </h5>
          <p className="text-xs text-slate-600">{t.annuity_export_desc}</p>
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
            href={`https://wa.me/?text=${encodeURIComponent(t.annuity_sms_text.replace("{amount}", calculations.monthlyGuaranteedIncome.toLocaleString()).replace("{url}", shareUrl))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg text-xs font-semibold text-emerald-800 shadow-sm transition-all flex items-center gap-2"
          >
            <span>💬</span> {t.tool_share_whatsapp}
          </a>
          <a href={`mailto:?subject=${emailSubject}&body=${emailBody}`} className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 shadow-sm transition-all flex items-center gap-2">
            <span>✉️</span> {t.tool_share_email}
          </a>
          {/* Download Official Branded Report */}
          <a
            href={`/api/reports/download?type=annuity&lang=${lang}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-lg text-xs font-bold text-amber-900 shadow-sm transition-all flex items-center gap-1.5"
          >
            <span>📄</span> {lang === "es" ? "Descargar Reporte PDF" : "Download PDF Report"}
          </a>
          <a href="/#consultation">
            <Button variant="primary" className="!bg-secondary !text-white !border-secondary hover:!bg-secondary/90 text-xs font-bold px-5 py-2.5 shadow-md">
              {t.annuity_cta_lock}
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
