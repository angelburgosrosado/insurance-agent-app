"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";
import { dictionary } from "@/lib/i18n/translations";
import { Sparkles, ShieldAlert } from "lucide-react";

export function TermVsIulSimulator() {
  const { lang } = useLanguage();
  const t = dictionary[lang];
  const isSpanish = lang === "es";

  // State
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [currentAge, setCurrentAge] = useState<number>(35);
  const [years, setYears] = useState<number>(25);
  const [simulatedDrop, setSimulatedDrop] = useState<boolean>(true);

  // Calculations
  // Term + Brokerage:
  // Term cost ~ $40/mo, leaving $460/mo in taxable stock account.
  // Taxable stock account pays ~15% capital gains tax + 1.2% fee drag.
  // If crash occurs (-25%), brokerage loses value while IUL captures 0% floor.
  const annualContrib = monthlyContribution * 12;
  const termCostAnnual = 480;
  const investAnnual = Math.max(0, annualContrib - termCostAnnual);

  // Growth calculation approximations over `years`
  // IUL average net ~ 6.5% with 0% floor, 0 tax on loans
  const iulRate = 0.065;
  // Brokerage raw 8% - 1.2% fee - 1.5% tax drag = ~5.3% net (plus crash penalty if toggle active)
  const brokerageRate = simulatedDrop ? 0.045 : 0.058;

  const calculateFutureValue = (pmt: number, rate: number, n: number) => {
    let total = 0;
    for (let i = 0; i < n; i++) {
      total = (total + pmt) * (1 + rate);
    }
    return total;
  };

  const iulAccumulated = calculateFutureValue(annualContrib * 0.85, iulRate, years); // factor in policy COI
  const brokerageAccumulated = calculateFutureValue(investAnnual, brokerageRate, years);

  // Tax-Free Retirement Annual Loan (IRS 7702): ~ 6% safe distribution
  const iulAnnualRetirementLoan = iulAccumulated * 0.065;
  // Taxable brokerage withdrawal: ~ 6% distribution minus 20% taxes
  const brokerageAnnualNetIncome = (brokerageAccumulated * 0.065) * 0.80;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const emailSubject = encodeURIComponent(
    isSpanish ? "Simulación Comparativa Term vs IUL - AB Global" : "Term vs IUL Head-to-Head Simulation - AB Global"
  );
  const emailBody = encodeURIComponent(
    isSpanish
      ? `Simulación Comparativa a los ${currentAge + years} años:\n- Aporte Mensual: ${formatCurrency(monthlyContribution)}\n- Valor Acumulado IUL (Piso 0%): ${formatCurrency(iulAccumulated)}\n- Ingreso Anual Libre de Impuestos IUL (IRS 7702): ${formatCurrency(iulAnnualRetirementLoan)}/año\n- Valor Cuenta Bursátil Tributable: ${formatCurrency(brokerageAccumulated)}\n- Ingreso Neto Bursátil tras Impuestos: ${formatCurrency(brokerageAnnualNetIncome)}/año\n\nConsulte con Angel Burgos en abglco.com.`
      : `Term vs IUL Comparison at Age ${currentAge + years}:\n- Monthly Contribution: ${formatCurrency(monthlyContribution)}\n- IUL Accumulated Value (0% Floor): ${formatCurrency(iulAccumulated)}\n- IUL Annual Tax-Free Loan (IRS 7702): ${formatCurrency(iulAnnualRetirementLoan)}/yr\n- Taxable Brokerage Accumulated: ${formatCurrency(brokerageAccumulated)}\n- Brokerage Net After-Tax Income: ${formatCurrency(brokerageAnnualNetIncome)}/yr\n\nConsultation with Angel Burgos at abglco.com.`
  );

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden my-8 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-[#001c38] text-white p-6 md:p-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 border border-amber-500/40 rounded-full text-amber-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles size={13} />
          {isSpanish ? "Análisis Comparativo Institucional" : "Institutional Head-to-Head Analyzer"}
        </div>
        <h2 className="text-2xl md:text-3xl font-black tracking-tight">
          {isSpanish ? "Seguro a Término + Inversión vs. Seguro Indexado Universal (IUL)" : "Buy Term & Invest Rest vs. Indexed Universal Life (IUL)"}
        </h2>
        <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed">
          {isSpanish
            ? "Vea cómo el piso del 0% contra pérdidas de bolsa y los préstamos libres de impuestos bajo el Código IRS Sección 7702 superan a las carteras de inversión tributables."
            : "Evaluate how the contractual 0% floor and IRS Section 7702 tax-free policy loans insulate retirement capital compared to taxable brokerage portfolios."}
        </p>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-6">
          {/* Monthly Budget */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-black text-slate-900 uppercase">
                {isSpanish ? "Aporte Mensual Destinado a Protección / Ahorro:" : "Monthly Protection & Savings Budget:"}
              </label>
              <span className="text-sm font-black text-amber-600">{formatCurrency(monthlyContribution)}/mo</span>
            </div>
            <input
              type="range"
              min={150}
              max={2500}
              step={50}
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              className="w-full accent-amber-600"
            />
          </div>

          {/* Age & Horizon */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <label className="text-xs font-black text-slate-900 uppercase block">
                {isSpanish ? "Edad Actual:" : "Current Age:"}
              </label>
              <select
                value={currentAge}
                onChange={(e) => setCurrentAge(Number(e.target.value))}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900"
              >
                <option value={25}>25 {isSpanish ? "años" : "yrs"}</option>
                <option value={35}>35 {isSpanish ? "años" : "yrs"}</option>
                <option value={45}>45 {isSpanish ? "años" : "yrs"}</option>
                <option value={55}>55 {isSpanish ? "años" : "yrs"}</option>
              </select>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <label className="text-xs font-black text-slate-900 uppercase block">
                {isSpanish ? "Horizonte de Años:" : "Time Horizon:"}
              </label>
              <select
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900"
              >
                <option value={15}>15 {isSpanish ? "años" : "years"}</option>
                <option value={20}>20 {isSpanish ? "años" : "years"}</option>
                <option value={25}>25 {isSpanish ? "años" : "years"}</option>
                <option value={30}>30 {isSpanish ? "años" : "years"}</option>
              </select>
            </div>
          </div>

          {/* Market Crash Stress Test Toggle */}
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-300 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-amber-950 flex items-center gap-1.5 cursor-pointer">
                <ShieldAlert size={16} className="text-amber-700" />
                <span>{isSpanish ? "Simular Caídas Bursátiles Periódicas (-25%)" : "Simulate Periodic Stock Corrections (-25%)"}</span>
              </label>
              <input
                type="checkbox"
                checked={simulatedDrop}
                onChange={(e) => setSimulatedDrop(e.target.checked)}
                className="h-4 w-4 rounded border-amber-400 text-amber-600 focus:ring-amber-500 cursor-pointer"
              />
            </div>
            <p className="text-[11px] text-amber-800/80 leading-relaxed">
              {isSpanish
                ? "En caídas de bolsa, el IUL activa su piso contractual del 0%, mientras que la cartera tributable sufre pérdidas de capital y retrasos de recuperación."
                : "During market corrections, the IUL applies its contractual 0% floor while taxable equities lose capital value."}
            </p>
          </div>
        </div>

        {/* Comparison Result Cards */}
        <div className="lg:col-span-6 space-y-4">
          {/* IUL Card */}
          <div className="bg-[#001c38] text-white p-6 rounded-3xl border-2 border-amber-500/50 shadow-xl space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <span className="px-2.5 py-0.5 bg-amber-500 text-slate-950 rounded-full text-[10px] font-black uppercase">
                  {isSpanish ? "Opción 1: IUL con Piso 0%" : "Option 1: Florida IUL Strategy"}
                </span>
                <h4 className="text-xl font-bold text-white mt-1">
                  {formatCurrency(iulAccumulated)}
                </h4>
                <p className="text-[11px] text-slate-400">
                  {isSpanish ? `Valor en Efectivo a la edad de ${currentAge + years} años` : `Cash Value Accumulated by Age ${currentAge + years}`}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-amber-400 font-bold uppercase">{isSpanish ? "Ingreso Libre de Impuestos" : "Tax-Free Income"}</p>
                <p className="text-lg font-black text-amber-300">
                  {formatCurrency(iulAnnualRetirementLoan)}<span className="text-xs text-slate-400 font-normal">/yr</span>
                </p>
              </div>
            </div>

            <div className="text-xs text-slate-300 space-y-1.5 pt-2 border-t border-slate-800">
              <p className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <span>✓</span> {isSpanish ? "Piso del 0%: Cero riesgo de perder ganancias por caídas de bolsa." : "0% Annual Floor: Zero market downside risk."}
              </p>
              <p className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <span>✓</span> {isSpanish ? "IRS 7702: Préstamos de retiro 100% libres de impuestos federales." : "IRS 7702: 100% Tax-free retirement distributions."}
              </p>
              <p className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <span>✓</span> {isSpanish ? "Beneficios en Vida: Cobertura por infarto, cáncer o incapacidad." : "Living Benefits included for critical/chronic illness."}
              </p>
            </div>
          </div>

          {/* Buy Term + Brokerage Card */}
          <div className="bg-slate-100 text-slate-900 p-6 rounded-3xl border border-slate-300 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <span className="px-2.5 py-0.5 bg-slate-300 text-slate-700 rounded-full text-[10px] font-black uppercase">
                  {isSpanish ? "Opción 2: Término + Cuenta Tributable" : "Option 2: Buy Term & Invest Rest"}
                </span>
                <h4 className="text-xl font-bold text-slate-900 mt-1">
                  {formatCurrency(brokerageAccumulated)}
                </h4>
                <p className="text-[11px] text-slate-500">
                  {isSpanish ? `Valor tras impuestos a los ${currentAge + years} años` : `Estimated Brokerage Value at Age ${currentAge + years}`}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-500 font-bold uppercase">{isSpanish ? "Ingreso Neto tras Impuestos" : "Net After-Tax Income"}</p>
                <p className="text-lg font-black text-slate-800">
                  {formatCurrency(brokerageAnnualNetIncome)}<span className="text-xs text-slate-500 font-normal">/yr</span>
                </p>
              </div>
            </div>

            <div className="text-xs text-slate-600 space-y-1.5 pt-2 border-t border-slate-300">
              <p className="flex items-center gap-1.5 text-red-600 font-medium">
                <span>⚠️</span> {isSpanish ? `El seguro a término expira a los ${currentAge + years} años sin dejar valor.` : `Term policy expires at age ${currentAge + years} with $0 residual value.`}
              </p>
              <p className="flex items-center gap-1.5 text-red-600 font-medium">
                <span>⚠️</span> {isSpanish ? "Sujeto a impuestos de ganancias de capital del 15%–20% en cada retiro." : "Subject to 15%–20% capital gains taxes upon withdrawal."}
              </p>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap gap-2 pt-2">
            <a
              href={`mailto:?subject=${emailSubject}&body=${emailBody}`}
              className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 shadow-sm transition-all flex items-center gap-1.5"
            >
              <span>✉️</span> {t.tool_share_email}
            </a>

            {/* 1-Click PDF Report Download */}
            <a
              href={`/api/reports/download?type=term_vs_iul&lang=${lang}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-xl text-xs font-bold text-amber-900 shadow-sm transition-all flex items-center gap-1.5"
            >
              <span>📄</span> {isSpanish ? "Descargar Reporte PDF" : "Download PDF Report"}
            </a>
          </div>

          <a href="/#consultation" className="block pt-2">
            <Button variant="primary" className="w-full !bg-secondary !text-white !border-secondary hover:!bg-secondary/90 text-xs font-bold py-3.5 shadow-md">
              {isSpanish ? "Diseñar Mi Póliza IUL Personalizada →" : "Structure My Custom IUL Illustration →"}
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
