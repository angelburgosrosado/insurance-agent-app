"use client";

import React, { useState, useEffect, useMemo, useTransition } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Button } from "@/components/ui/Button";

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
      { category: "Initial Rollover", amount: principal, fill: "#94a3b8" },
      { category: "Income Base at Ret.", amount: incomeBase, fill: "#001c38" },
      { category: "Paid by Age 85", amount: cumulativePayoutAt85, fill: "#0051d5" },
      { category: "Paid by Age 95", amount: cumulativePayoutAt95, fill: "#10b981" },
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
  }, [currentAge, retireAge, principal, payoutRate]);

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
    `Hi! Here is an interactive estimate showing a guaranteed lifetime paycheck of ~$${calculations.monthlyGuaranteedIncome.toLocaleString()}/mo: ${shareUrl}`
  );

  const emailSubject = encodeURIComponent("Guaranteed Lifetime Annuity Income Estimate");
  const emailBody = encodeURIComponent(
    `Hello,\n\nHere is your custom Lifetime Annuity Income Projection:\n\n` +
      `• Initial Investment / 401(k) Rollover: $${principal.toLocaleString()}\n` +
      `• Guaranteed Monthly Paycheck: $${calculations.monthlyGuaranteedIncome.toLocaleString()} / month\n` +
      `• Guaranteed Annual Paycheck: $${calculations.annualGuaranteedIncome.toLocaleString()} / year\n` +
      `• Total Guaranteed Cash Received by Age 85: $${calculations.cumulativePayoutAt85.toLocaleString()}\n\n` +
      `Explore your full live interactive model here:\n${shareUrl}\n\n` +
      `Best regards,\nAngel Burgos - State Licensed Financial Advisor\n(386) 333-1482 | Orlando, FL`
  );

  return (
    <div className={`bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden ${isStandalone ? "max-w-5xl mx-auto my-8" : "w-full"}`}>
      {/* Header */}
      <div className="bg-[#001c38] text-white p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/20 border border-secondary/40 rounded-full text-secondary text-xs font-bold uppercase tracking-wider mb-2">
            Private Pension & Lifetime Income Tool
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
            Guaranteed Lifetime Annuity Calculator
          </h3>
          <p className="text-white/80 text-sm mt-1 max-w-xl">
            See how converting a portion of your 401(k), IRA, or cash into a Fixed Indexed Annuity guarantees a monthly paycheck for life.
          </p>
        </div>
        <div className="text-left md:text-right shrink-0 bg-white/10 p-4 rounded-xl border border-white/15">
          <p className="text-xs text-secondary uppercase font-bold tracking-wider">Guaranteed Monthly Income</p>
          <p className="text-3xl md:text-4xl font-extrabold text-white">
            ${calculations.monthlyGuaranteedIncome.toLocaleString()}
            <span className="text-sm font-normal text-white/70"> / mo</span>
          </p>
          <p className="text-[11px] text-white/60 mt-0.5">${calculations.annualGuaranteedIncome.toLocaleString()} / year for life</p>
        </div>
      </div>

      {/* Grid: Inputs + Chart */}
      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sliders */}
        <div className="lg:col-span-4 space-y-5">
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-5">
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500">Plan Inputs</h4>

            {/* Principal Investment */}
            <div>
              <div className="flex justify-between items-center text-sm font-semibold text-slate-800 mb-1.5">
                <label>401(k) / Rollover Amount</label>
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
                <label>Current Age</label>
                <span className="text-secondary font-bold text-base px-2 py-0.5 bg-white border border-slate-200 rounded-md">
                  {currentAge} yrs
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
                <label>Income Start Age</label>
                <span className="text-secondary font-bold text-base px-2 py-0.5 bg-white border border-slate-200 rounded-md">
                  {retireAge} yrs
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
                {calculations.deferralYears > 0 ? `${calculations.deferralYears} years of guaranteed bonus rollup` : "Immediate income activation"}
              </p>
            </div>
          </div>
        </div>

        {/* Chart Column */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-50/50 p-4 md:p-6 rounded-2xl border border-slate-200">
            <h4 className="text-sm font-bold text-slate-900 mb-1">Cumulative Guaranteed Payout Comparison</h4>
            <p className="text-xs text-slate-500 mb-4">Initial asset value vs. Total lifetime payments received</p>

            <div className="h-[260px] md:h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={calculations.chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="category" tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} />
                  <YAxis tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`} />
                  <Tooltip
                    formatter={(val: any) => [`$${Number(val).toLocaleString()}`, "Amount"]}
                    contentStyle={{ backgroundColor: "#001c38", color: "#fff", borderRadius: "12px", border: "none", fontSize: "12px" }}
                  />
                  <Bar dataKey="amount" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
              <p className="text-xs text-slate-500 uppercase font-semibold">Protected Income Base</p>
              <p className="text-xl font-bold text-slate-900 mt-1">${calculations.incomeBase.toLocaleString()}</p>
              <p className="text-[11px] text-slate-400">Guaranteed withdrawal baseline</p>
            </div>

            <div className="p-4 bg-secondary/10 rounded-xl border border-secondary/20 shadow-sm">
              <p className="text-xs text-secondary uppercase font-bold">Annual Guaranteed Income</p>
              <p className="text-xl font-bold text-secondary mt-1">${calculations.annualGuaranteedIncome.toLocaleString()}</p>
              <p className="text-[11px] text-secondary/80">Never decreases, paid for life</p>
            </div>

            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 shadow-sm">
              <p className="text-xs text-emerald-700 uppercase font-bold">Total Paid by Age 95</p>
              <p className="text-xl font-bold text-emerald-800 mt-1">${calculations.cumulativePayoutAt95.toLocaleString()}</p>
              <p className="text-[11px] text-emerald-600">Pure guaranteed longevity benefit</p>
            </div>
          </div>
        </div>
      </div>

      {/* Share / Export Bar */}
      <div className="bg-slate-100 border-t border-slate-200 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-1 text-center md:text-left">
          <h5 className="font-bold text-sm text-slate-900 flex items-center justify-center md:justify-start gap-2">
            <span>🚀</span> Export & Share This Annuity Scenario
          </h5>
          <p className="text-xs text-slate-600">Send via SMS or Email to review with your family before your session with Angel Burgos.</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handleCopyLink}
            className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 shadow-sm transition-all flex items-center gap-2"
          >
            {copied ? <span className="text-emerald-600 font-bold">✓ Copied!</span> : <span>🔗 Copy Link</span>}
          </button>
          <a href={`sms:?&body=${smsText}`} className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 shadow-sm transition-all flex items-center gap-2">
            <span>📱</span> Text (SMS)
          </a>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(smsText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg text-xs font-semibold text-emerald-800 shadow-sm transition-all flex items-center gap-2"
          >
            <span>💬</span> WhatsApp
          </a>
          <a href={`mailto:?subject=${emailSubject}&body=${emailBody}`} className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 shadow-sm transition-all flex items-center gap-2">
            <span>✉️</span> Email
          </a>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 shadow-sm transition-all flex items-center gap-2"
          >
            <span>🖨️</span> Save as PDF / Print
          </button>
          <a href="/#consultation">
            <Button variant="primary" className="!bg-secondary !text-white !border-secondary hover:!bg-secondary/90 text-xs font-bold px-5 py-2.5 shadow-md">
              Lock In Carrier Payout Rate →
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
