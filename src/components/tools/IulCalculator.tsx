"use client";

import React, { useState, useEffect, useMemo, useTransition } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import { Button } from "@/components/ui/Button";

interface IulCalculatorProps {
  initialAge?: number;
  initialRetireAge?: number;
  initialMonthly?: number;
  initialReturn?: number;
  isStandalone?: boolean;
}

export function IulCalculator({
  initialAge = 35,
  initialRetireAge = 65,
  initialMonthly = 500,
  initialReturn = 7.0,
  isStandalone = false,
}: IulCalculatorProps) {
  const [currentAge, setCurrentAge] = useState(initialAge);
  const [retireAge, setRetireAge] = useState(initialRetireAge);
  const [monthlyContribution, setMonthlyContribution] = useState(initialMonthly);
  const [assumedReturn, setAssumedReturn] = useState(initialReturn);
  const [simulateCrash, setSimulateCrash] = useState(false);
  const [copied, setCopied] = useState(false);
  const [, startTransition] = useTransition();

  // Read URL parameters on initial client mount if available
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const ageParam = params.get("age");
      const retParam = params.get("retire");
      const monthlyParam = params.get("monthly");
      const returnParam = params.get("return");

      if (ageParam) setCurrentAge(Number(ageParam));
      if (retParam) setRetireAge(Number(retParam));
      if (monthlyParam) setMonthlyContribution(Number(monthlyParam));
      if (returnParam) setAssumedReturn(Number(returnParam));
    }
  }, []);

  // Compute projections year-by-year from currentAge to age 90
  const calculationData = useMemo(() => {
    const yearsToRetire = Math.max(1, retireAge - currentAge);
    const annualContribution = monthlyContribution * 12;
    const rate = assumedReturn / 100;
    const taxableRate = (assumedReturn * 0.75) / 100; // accounts for annual tax drag

    let iulCash = 0;
    let taxableCash = 0;
    let totalInvested = 0;
    const points: Array<{
      age: number;
      iulCashValue: number;
      taxableAccount: number;
      annualIncome: number;
      deathBenefit: number;
    }> = [];

    // Mid-career crash year for simulation (e.g. 10 years in)
    const crashAge = currentAge + Math.min(10, Math.floor(yearsToRetire / 2));

    for (let age = currentAge; age <= 90; age++) {
      if (age < retireAge) {
        // ACCUMULATION PHASE
        totalInvested += annualContribution;

        // Apply returns
        if (simulateCrash && age === crashAge) {
          // Market crashes -30%
          taxableCash = (taxableCash + annualContribution) * 0.70;
          // IUL has 0% Floor: no market drop, retains previous value + contribution
          iulCash = (iulCash + annualContribution) * 1.0;
        } else {
          iulCash = (iulCash + annualContribution) * (1 + rate);
          taxableCash = (taxableCash + annualContribution) * (1 + taxableRate);
        }

        const deathBenefit = Math.max(iulCash * 1.35, annualContribution * 20);

        points.push({
          age,
          iulCashValue: Math.round(iulCash),
          taxableAccount: Math.round(taxableCash),
          annualIncome: 0,
          deathBenefit: Math.round(deathBenefit),
        });
      } else {
        // DISTRIBUTION / RETIREMENT PHASE (Tax-Free Policy Loans)
        // Safe withdrawal rate of accumulated cash at retirement
        const initialRetireCash = points[retireAge - currentAge - 1]?.iulCashValue || iulCash;
        const annualTaxFreeIncome = Math.round(initialRetireCash * 0.068); // ~6.8% tax-free loan distribution

        // Cash value continues to earn interest on the collateral balance
        iulCash = Math.max(0, (iulCash - annualTaxFreeIncome * 0.4) * (1 + rate * 0.7));
        taxableCash = Math.max(0, (taxableCash - annualTaxFreeIncome * 1.25) * (1 + taxableRate)); // Taxable account pays income tax on withdrawals

        const deathBenefit = Math.max(iulCash * 1.2, 150000);

        points.push({
          age,
          iulCashValue: Math.round(iulCash),
          taxableAccount: Math.round(taxableCash),
          annualIncome: annualTaxFreeIncome,
          deathBenefit: Math.round(deathBenefit),
        });
      }
    }

    const retirePoint = points.find((p) => p.age === retireAge) || points[points.length - 1];
    const estimatedAnnualIncome = retirePoint ? Math.round(retirePoint.iulCashValue * 0.068) : 0;
    const totalLifetimeIncome = estimatedAnnualIncome * (90 - retireAge);
    const peakDeathBenefit = Math.round((retirePoint?.iulCashValue || 0) * 1.4);

    return {
      points,
      totalInvested,
      retireCashValue: retirePoint?.iulCashValue || 0,
      estimatedAnnualIncome,
      totalLifetimeIncome,
      peakDeathBenefit,
    };
  }, [currentAge, retireAge, monthlyContribution, assumedReturn, simulateCrash]);

  // Generate shareable link
  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    const base = window.location.origin;
    return `${base}/tools/iul-calculator?age=${currentAge}&retire=${retireAge}&monthly=${monthlyContribution}&return=${assumedReturn}`;
  }, [currentAge, retireAge, monthlyContribution, assumedReturn]);

  const handleCopyLink = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const smsText = encodeURIComponent(
    `Hi! Here is an interactive illustration showing how an IUL can generate ~$${calculationData.estimatedAnnualIncome.toLocaleString()}/yr in tax-free retirement income: ${shareUrl}`
  );

  const emailSubject = encodeURIComponent("Your Personalized IUL Growth & Retirement Illustration");
  const emailBody = encodeURIComponent(
    `Hello,\n\nHere is your custom Indexed Universal Life (IUL) wealth and tax-free retirement illustration:\n\n` +
      `• Current Age: ${currentAge}\n` +
      `• Target Retirement Age: ${retireAge}\n` +
      `• Monthly Contribution: $${monthlyContribution}/month\n` +
      `• Projected Tax-Free Annual Retirement Income: $${calculationData.estimatedAnnualIncome.toLocaleString()}/year\n` +
      `• Projected Lifetime Retirement Cash Flow: $${calculationData.totalLifetimeIncome.toLocaleString()}\n` +
      `• 0% Downside Market Protection Floor: Active\n\n` +
      `Interact with your full live model here:\n${shareUrl}\n\n` +
      `Best regards,\nAngel Burgos - State Licensed Financial Advisor\n(386) 333-1482 | Orlando, FL`
  );

  return (
    <div className={`bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden ${isStandalone ? "max-w-5xl mx-auto my-8" : "w-full"}`}>
      {/* Header Banner */}
      <div className="bg-[#001c38] text-white p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/20 border border-secondary/40 rounded-full text-secondary text-xs font-bold uppercase tracking-wider mb-2">
            Interactive Retirement & Wealth Simulator
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
            Indexed Universal Life (IUL) Growth Engine
          </h3>
          <p className="text-white/80 text-sm mt-1 max-w-xl">
            Simulate how market index participation, the guaranteed 0% floor, and IRS Section 7702 tax-free loans compound your retirement nest egg.
          </p>
        </div>
        <div className="text-left md:text-right shrink-0 bg-white/10 p-4 rounded-xl border border-white/15">
          <p className="text-xs text-secondary uppercase font-bold tracking-wider">Projected Tax-Free Income</p>
          <p className="text-3xl md:text-4xl font-extrabold text-white">
            ${calculationData.estimatedAnnualIncome.toLocaleString()}
            <span className="text-sm font-normal text-white/70"> / yr</span>
          </p>
          <p className="text-[11px] text-white/60 mt-0.5">from age {retireAge} to 90+</p>
        </div>
      </div>

      {/* Main Grid: Controls + Interactive Chart */}
      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sliders / Inputs Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-5">
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500">Your Plan Inputs</h4>

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
                min={18}
                max={60}
                step={1}
                value={currentAge}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  startTransition(() => {
                    setCurrentAge(val);
                    if (val >= retireAge) setRetireAge(val + 5);
                  });
                }}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-secondary"
              />
            </div>

            {/* Retirement Age */}
            <div>
              <div className="flex justify-between items-center text-sm font-semibold text-slate-800 mb-1.5">
                <label>Target Retirement Age</label>
                <span className="text-secondary font-bold text-base px-2 py-0.5 bg-white border border-slate-200 rounded-md">
                  {retireAge} yrs
                </span>
              </div>
              <input
                type="range"
                min={Math.max(currentAge + 5, 50)}
                max={75}
                step={1}
                value={retireAge}
                onChange={(e) => startTransition(() => setRetireAge(Number(e.target.value)))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-secondary"
              />
            </div>

            {/* Monthly Contribution */}
            <div>
              <div className="flex justify-between items-center text-sm font-semibold text-slate-800 mb-1.5">
                <label>Monthly Contribution</label>
                <span className="text-secondary font-bold text-base px-2 py-0.5 bg-white border border-slate-200 rounded-md">
                  ${monthlyContribution.toLocaleString()}/mo
                </span>
              </div>
              <input
                type="range"
                min={100}
                max={3000}
                step={50}
                value={monthlyContribution}
                onChange={(e) => startTransition(() => setMonthlyContribution(Number(e.target.value)))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-secondary"
              />
              <p className="text-[11px] text-slate-500 mt-1">Annual: ${(monthlyContribution * 12).toLocaleString()}/year</p>
            </div>

            {/* Assumed Interest Return */}
            <div>
              <div className="flex justify-between items-center text-sm font-semibold text-slate-800 mb-1.5">
                <label>Assumed Index Return</label>
                <span className="text-secondary font-bold text-base px-2 py-0.5 bg-white border border-slate-200 rounded-md">
                  {assumedReturn.toFixed(1)}%
                </span>
              </div>
              <input
                type="range"
                min={5.0}
                max={9.0}
                step={0.25}
                value={assumedReturn}
                onChange={(e) => startTransition(() => setAssumedReturn(Number(e.target.value)))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-secondary"
              />
              <p className="text-[11px] text-slate-500 mt-1">Based on historical S&P 500 index segments with cap & 0% floor.</p>
            </div>

            {/* Crash Simulation Toggle */}
            <div className="pt-2 border-t border-slate-200">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={simulateCrash}
                  onChange={(e) => startTransition(() => setSimulateCrash(e.target.checked))}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-secondary focus:ring-secondary accent-secondary"
                />
                <div>
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    Simulate -30% Market Crash
                    <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded text-[10px] font-bold">0% Floor Test</span>
                  </span>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    See how the IUL guaranteed 0% floor locks in wealth while the taxable brokerage drops.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Chart Column */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-50/50 p-4 md:p-6 rounded-2xl border border-slate-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Projected Cash Value Accumulation</h4>
                <p className="text-xs text-slate-500">Comparing IUL with 0% Downside Floor vs. Volatile Taxable Brokerage</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-medium">
                <span className="flex items-center gap-1.5 text-secondary font-bold">
                  <span className="h-3 w-3 rounded-full bg-secondary inline-block"></span> IUL Cash Value
                </span>
                <span className="flex items-center gap-1.5 text-slate-400">
                  <span className="h-3 w-3 rounded-full bg-slate-400 inline-block"></span> Taxable Account
                </span>
              </div>
            </div>

            <div className="h-[280px] md:h-[340px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={calculationData.points} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="iulGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0051d5" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#0051d5" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="taxableGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#94a3b8" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="age" tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} unit=" yrs" />
                  <YAxis
                    tickLine={false}
                    tick={{ fontSize: 11, fill: "#64748b" }}
                    tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    formatter={(val: any, name: any) => [
                      `$${Number(val).toLocaleString()}`,
                      name === "iulCashValue" ? "IUL Cash Value (Tax-Free)" : "Taxable Brokerage Account",
                    ]}
                    labelFormatter={(label) => `Age: ${label} years old`}
                    contentStyle={{ backgroundColor: "#001c38", color: "#fff", borderRadius: "12px", border: "none", fontSize: "12px" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="taxableAccount"
                    stroke="#94a3b8"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#taxableGradient)"
                  />
                  <Area
                    type="monotone"
                    dataKey="iulCashValue"
                    stroke="#0051d5"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#iulGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 3 Outcome Metric Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
              <p className="text-xs text-slate-500 uppercase font-semibold">Total Invested</p>
              <p className="text-xl font-bold text-slate-900 mt-1">${calculationData.totalInvested.toLocaleString()}</p>
              <p className="text-[11px] text-slate-400">over {retireAge - currentAge} years</p>
            </div>

            <div className="p-4 bg-secondary/10 rounded-xl border border-secondary/20 shadow-sm">
              <p className="text-xs text-secondary uppercase font-bold">Lifetime Tax-Free Income</p>
              <p className="text-xl font-bold text-secondary mt-1">${calculationData.totalLifetimeIncome.toLocaleString()}</p>
              <p className="text-[11px] text-secondary/80">From age {retireAge} to 90</p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
              <p className="text-xs text-slate-500 uppercase font-semibold">Family Death & Living Benefit</p>
              <p className="text-xl font-bold text-slate-900 mt-1">${calculationData.peakDeathBenefit.toLocaleString()}</p>
              <p className="text-[11px] text-slate-400">Tax-free inheritance protection</p>
            </div>
          </div>
        </div>
      </div>

      {/* Share, Export, and Action Toolbar */}
      <div className="bg-slate-100 border-t border-slate-200 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-1 text-center md:text-left">
          <h5 className="font-bold text-sm text-slate-900 flex items-center justify-center md:justify-start gap-2">
            <span>🚀</span> Export & Share This Interactive Model
          </h5>
          <p className="text-xs text-slate-600">
            Share this exact scenario with your spouse, business partner, or save it for your consultation with Angel Burgos.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {/* Copy Link Button */}
          <button
            onClick={handleCopyLink}
            className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 shadow-sm transition-all flex items-center gap-2"
          >
            {copied ? (
              <>
                <span className="text-emerald-600 font-bold">✓ Copied!</span>
              </>
            ) : (
              <>
                <span>🔗</span> Copy Scenario Link
              </>
            )}
          </button>

          {/* Send via SMS */}
          <a
            href={`sms:?&body=${smsText}`}
            className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 shadow-sm transition-all flex items-center gap-2"
          >
            <span>📱</span> Text Link (SMS)
          </a>

          {/* Send via WhatsApp */}
          <a
            href={`https://wa.me/?text=${encodeURIComponent(smsText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg text-xs font-semibold text-emerald-800 shadow-sm transition-all flex items-center gap-2"
          >
            <span>💬</span> Share on WhatsApp
          </a>

          {/* Send via Email */}
          <a
            href={`mailto:?subject=${emailSubject}&body=${emailBody}`}
            className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 shadow-sm transition-all flex items-center gap-2"
          >
            <span>✉️</span> Email Illustration
          </a>

          {/* Print / Save PDF */}
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 shadow-sm transition-all flex items-center gap-2"
          >
            <span>🖨️</span> Save as PDF / Print
          </button>

          {/* Request Official Illustration */}
          <a href="/#consultation" className="inline-block">
            <Button variant="primary" className="!bg-secondary !text-white !border-secondary hover:!bg-secondary/90 text-xs font-bold px-5 py-2.5 shadow-md">
              Request Official Carrier Illustration →
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
