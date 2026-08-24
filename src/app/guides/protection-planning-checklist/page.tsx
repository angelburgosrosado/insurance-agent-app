"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/Button";

export default function ProtectionPlanningChecklistGuidePage() {
  const { lang, setLang } = useLanguage();
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleLeadCapture = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;

    try {
      setLoading(true);
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: name.split(" ")[0] || name,
          lastName: name.split(" ").slice(1).join(" ") || "Client",
          email,
          phone,
          service: "Protection Planning Checklist Download",
          message: `Downloaded 4-Page PDF: The Protection Planning Checklist (Life, Health, Retirement & Legacy) [Lang: ${lang}]`,
          consent: true,
          source: "protection_planning_checklist_pdf",
        }),
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      {/* Top Navbar (Hidden on Print) */}
      <div className="print:hidden">
        <Navbar />
      </div>

      {/* Floating Action Bar for Web View (Hidden on Print) */}
      <div className="print:hidden sticky top-20 z-40 bg-white/95 backdrop-blur border-b border-slate-200 py-3 px-4 sm:px-8 shadow-sm">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Link
              href="/resources"
              className="text-xs font-bold text-slate-600 hover:text-secondary flex items-center gap-1"
            >
              ← {lang === "es" ? "Centro de Recursos" : "Resources"}
            </Link>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-bold text-slate-900 truncate">
              {lang === "es"
                ? "Lista de Verificación de Planificación y Protección"
                : "The Protection Planning Checklist"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === "en" ? "es" : "en")}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition-colors"
            >
              🌐 {lang === "en" ? "Español" : "English"}
            </button>

            {/* Print / Save as PDF Button */}
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-slate-900 hover:bg-secondary text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
            >
              <span>🖨️</span> {lang === "es" ? "Imprimir / Guardar PDF" : "Print / Save PDF"}
            </button>

            <a href="/#consultation">
              <Button
                variant="primary"
                className="!bg-secondary !text-white !border-secondary hover:!bg-secondary/90 text-xs font-bold px-4 py-2"
              >
                {lang === "es" ? "Consulta Gratuita" : "Free Consultation"}
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* 4-PAGE PRINTABLE CONTAINER (Styled for Letter 8.5 x 11 in) */}
      <div className="max-w-4xl mx-auto my-8 print:my-0 print:max-w-none space-y-8 print:space-y-0 px-4 sm:px-0">
        
        {/* =========================================================================
            PAGE 1: Executive Overview & The 4-Pillar Financial Security Framework
            ========================================================================= */}
        <section className="bg-white p-8 md:p-12 rounded-3xl print:rounded-none shadow-md print:shadow-none border border-slate-200 print:border-none min-h-[10.8in] flex flex-col justify-between print:break-after-page">
          <div>
            {/* Header / Institutional Branding */}
            <div className="flex justify-between items-start border-b-2 border-slate-900 pb-6 mb-8">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-900 text-[10px] font-bold uppercase tracking-widest mb-2">
                  <span>📋</span> {lang === "es" ? "Guía Institucional del Cliente" : "Institutional Client Guide & Lead Magnet"}
                </div>
                <h1 className="text-2xl md:text-3xl font-black text-slate-950 tracking-tight leading-tight">
                  {lang === "es" 
                    ? "Lista de Verificación de Planificación y Protección" 
                    : "The Protection Planning Checklist"}
                </h1>
                <p className="text-sm font-bold text-secondary mt-0.5">
                  {lang === "es" 
                    ? "Vida, Salud, Retiro y Legado Familiar" 
                    : "Life, Health, Retirement & Legacy"}
                </p>
              </div>

              <div className="text-right text-[11px] text-slate-600 space-y-0.5">
                <p className="font-extrabold text-slate-900">AB Global Consulting LLC</p>
                <p>Angel Burgos • 0215 Practitioner</p>
                <p>FL Lic: #G328926 | WFG: F6D9U</p>
                <p className="text-secondary font-bold">(386) 333-1482</p>
              </div>
            </div>

            {/* Executive Introduction */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 mb-8 space-y-2">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900">
                {lang === "es" ? "Propósito de esta Guía de Auditoría:" : "Purpose of this Planning Audit:"}
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed">
                {lang === "es"
                  ? "Esta lista de verificación está diseñada para ayudar a personas, familias, militares y dueños de negocios a auditar sus vulnerabilidades financieras antes de que ocurra una emergencia. Evalúa la protección contra caídas de mercado, la optimización fiscal bajo el Código IRS 7702, los beneficios en vida y la preservación del legado."
                  : "This checklist is designed to help individuals, families, military personnel, and business owners audit their financial vulnerabilities before a crisis occurs. It evaluates market crash defense, IRS Section 7702 tax optimization, living benefits, and legacy preservation."}
              </p>
            </div>

            {/* The 4-Pillar Framework Grid */}
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3">
              {lang === "es" ? "Los 4 Pilares de Seguridad Financiera Integral:" : "The 4 Pillars of Comprehensive Financial Defense:"}
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm space-y-1">
                <span className="text-xl block mb-1">🛡️</span>
                <h4 className="text-xs font-bold text-slate-900">1. {lang === "es" ? "Defensa de Vida e Ingreso" : "Life & Income Defense"}</h4>
                <p className="text-[11px] text-slate-600">{lang === "es" ? "IUL con piso 0%, beneficios en vida y préstamos 7702 libres de impuestos." : "0% Floor IUL, Living Benefits, and IRS 7702 tax-free policy loans."}</p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm space-y-1">
                <span className="text-xl block mb-1">🏥</span>
                <h4 className="text-xs font-bold text-slate-900">2. {lang === "es" ? "Salud y Cuidado Prolongado" : "Health & Medical Defense"}</h4>
                <p className="text-[11px] text-slate-600">{lang === "es" ? "Subsidios ACA, Suplementos Medicare G/N y protección de activos ante LTC." : "ACA subsidies, Medigap Plans G/N, and LTC asset protection."}</p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm space-y-1">
                <span className="text-xl block mb-1">📈</span>
                <h4 className="text-xs font-bold text-slate-900">3. {lang === "es" ? "Inmunidad en el Retiro" : "Retirement & Longevity"}</h4>
                <p className="text-[11px] text-slate-600">{lang === "es" ? "Transferencias 401k/IRA a anualidades con cheque vitalicio garantizado." : "401(k)/IRA rollovers to guaranteed lifetime income annuities."}</p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm space-y-1">
                <span className="text-xl block mb-1">🕊️</span>
                <h4 className="text-xs font-bold text-slate-900">4. {lang === "es" ? "Legado y Planificación Previa" : "Legacy & Pre-Planning"}</h4>
                <p className="text-[11px] text-slate-600">{lang === "es" ? "Everest Concierge (ahorro de $3,500+), desembolso en 48 hrs y testamento." : "Everest Concierge ($3,500+ savings), 48-hr payouts, and online wills."}</p>
              </div>
            </div>

            {/* Self-Audit Readiness Scorecard */}
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3">
              {lang === "es" ? "Tabla de Autoevaluación del Cliente (Marque su Estado):" : "Client Self-Audit Scorecard (Check Your Status):"}
            </h3>
            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-900 text-white font-bold">
                  <tr>
                    <th className="p-2.5">{lang === "es" ? "Área de Protección Clave" : "Core Protection Area"}</th>
                    <th className="p-2.5 text-center w-24">{lang === "es" ? "Protegido" : "Protected"}</th>
                    <th className="p-2.5 text-center w-24">{lang === "es" ? "Revisión" : "Needs Review"}</th>
                    <th className="p-2.5 text-center w-24 text-red-300">{lang === "es" ? "Vulnerable" : "At Risk"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-[11px]">
                  <tr>
                    <td className="p-2.5 font-medium">1. {lang === "es" ? "Beneficios en Vida (Infarto, Cáncer, Incapacidad Crónica)" : "Living Benefits for Critical/Chronic Illness"}</td>
                    <td className="p-2.5 text-center">⬜</td>
                    <td className="p-2.5 text-center">⬜</td>
                    <td className="p-2.5 text-center">⬜</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium">2. {lang === "es" ? "Piso del 0% contra caídas bursátiles en el retiro" : "0% Downside Market Floor for Retirement Nest Egg"}</td>
                    <td className="p-2.5 text-center">⬜</td>
                    <td className="p-2.5 text-center">⬜</td>
                    <td className="p-2.5 text-center">⬜</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium">3. {lang === "es" ? "Ingresos de retiro 100% libres de impuestos (IRS 7702)" : "Tax-Free Supplemental Retirement Income (IRS 7702)"}</td>
                    <td className="p-2.5 text-center">⬜</td>
                    <td className="p-2.5 text-center">⬜</td>
                    <td className="p-2.5 text-center">⬜</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium">4. {lang === "es" ? "Transición Militar SGLI/VGLI o Maximización de Pensión SBP" : "Military SGLI/VGLI Transition or SBP Pension Max"}</td>
                    <td className="p-2.5 text-center">⬜</td>
                    <td className="p-2.5 text-center">⬜</td>
                    <td className="p-2.5 text-center">⬜</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer Page Marker */}
          <div className="border-t border-slate-200 pt-4 flex justify-between items-center text-[10px] text-slate-400">
            <span>The Protection Planning Checklist • AB Global Consulting</span>
            <span>Page 1 of 4</span>
          </div>
        </section>


        {/* =========================================================================
            PAGE 2: Life & Health Defense (Living Benefits & Tax Shield)
            ========================================================================= */}
        <section className="bg-white p-8 md:p-12 rounded-3xl print:rounded-none shadow-md print:shadow-none border border-slate-200 print:border-none min-h-[10.8in] flex flex-col justify-between print:break-after-page">
          <div>
            <div className="border-b border-slate-200 pb-4 mb-6 flex justify-between items-center">
              <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">
                {lang === "es" ? "Pilar I & II: Vida, Beneficios en Vida y Salud" : "Pillars I & II: Life, Living Benefits & Healthcare Defense"}
              </h2>
              <span className="text-xs font-bold text-secondary">AB Global Consulting</span>
            </div>

            {/* Life Insurance Matrix */}
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
              {lang === "es" ? "1. Matriz de Evaluación de Seguros de Vida:" : "1. Life Insurance Structural Comparison:"}
            </h3>
            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs mb-6">
              <table className="w-full text-left">
                <thead className="bg-slate-100 text-slate-800 font-bold text-[10px] uppercase">
                  <tr>
                    <th className="p-2">Feature</th>
                    <th className="p-2">Term Life</th>
                    <th className="p-2">Traditional Whole Life</th>
                    <th className="p-2 text-secondary font-bold">Indexed Universal Life (IUL)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-[11px] text-slate-700">
                  <tr>
                    <td className="p-2 font-medium">Market Crash Floor</td>
                    <td className="p-2 text-slate-400">N/A</td>
                    <td className="p-2">Fixed (2-3%)</td>
                    <td className="p-2 font-bold text-emerald-600">Contractual 0% Loss Floor</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">Upside Potential</td>
                    <td className="p-2 text-slate-400">None</td>
                    <td className="p-2">Low dividend</td>
                    <td className="p-2 font-bold text-secondary">S&P 500 Index Participation</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">Tax-Free Loans (IRS 7702)</td>
                    <td className="p-2 text-slate-400">None</td>
                    <td className="p-2">Limited</td>
                    <td className="p-2 font-bold text-emerald-600">Structured Tax-Free Cash Flow</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">Accelerated Living Benefits</td>
                    <td className="p-2">Varies</td>
                    <td className="p-2">Often Add-On</td>
                    <td className="p-2 font-bold text-emerald-600">Built-in (Critical/Chronic)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Living Benefits Checklist */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 mb-6 space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-amber-900 flex items-center gap-2">
                <span>🏥</span> {lang === "es" ? "Auditoría de Beneficios en Vida (Acceso en Vida sin Fallecer):" : "Accelerated Living Benefits Audit (Access Funds While Alive):"}
              </h3>
              <p className="text-[11px] text-amber-950 leading-relaxed">
                {lang === "es"
                  ? "Las pólizas modernas permiten adelantar hasta el 90% del beneficio de muerte libre de impuestos si experimenta:"
                  : "Modern policies allow accelerating up to 90% of death benefits tax-free if you experience:"}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px]">
                <div className="p-3 bg-white rounded-xl border border-amber-100">
                  <p className="font-bold text-slate-900">1. Critical Illness</p>
                  <p className="text-slate-600 mt-0.5">Heart attack, stroke, cancer, organ failure, ALS.</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-amber-100">
                  <p className="font-bold text-slate-900">2. Chronic Disability</p>
                  <p className="text-slate-600 mt-0.5">Inability to perform 2 of 6 ADLs (bathing, dressing, etc.).</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-amber-100">
                  <p className="font-bold text-slate-900">3. Terminal Illness</p>
                  <p className="text-slate-600 mt-0.5">Diagnosis with life expectancy of 12–24 months.</p>
                </div>
              </div>
            </div>

            {/* Healthcare, ACA & Medicare Supplement Alignment */}
            <div className="space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-700">
                {lang === "es" ? "2. Lista de Cotejo de Salud y Medicare:" : "2. Healthcare & Medicare Navigation Checklist:"}
              </h3>
              <div className="space-y-2 text-xs text-slate-700">
                <label className="flex items-start gap-2.5">
                  <input type="checkbox" className="mt-0.5" />
                  <span><strong>ACA Marketplace Subsidy Optimization:</strong> Aligning adjusted gross income to maximize federal premium tax credits.</span>
                </label>
                <label className="flex items-start gap-2.5">
                  <input type="checkbox" className="mt-0.5" />
                  <span><strong>Medigap Plan G / N vs Advantage:</strong> Evaluating freedom to see any specialist nationwide with zero network gatekeepers.</span>
                </label>
                <label className="flex items-start gap-2.5">
                  <input type="checkbox" className="mt-0.5" />
                  <span><strong>IRMAA Surcharge Shield:</strong> Preventing high tax brackets from spiking Medicare Part B & D monthly premiums.</span>
                </label>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-4 flex justify-between items-center text-[10px] text-slate-400">
            <span>The Protection Planning Checklist • AB Global Consulting</span>
            <span>Page 2 of 4</span>
          </div>
        </section>


        {/* =========================================================================
            PAGE 3: Retirement Longevity & Volatility Immunity
            ========================================================================= */}
        <section className="bg-white p-8 md:p-12 rounded-3xl print:rounded-none shadow-md print:shadow-none border border-slate-200 print:border-none min-h-[10.8in] flex flex-col justify-between print:break-after-page">
          <div>
            <div className="border-b border-slate-200 pb-4 mb-6 flex justify-between items-center">
              <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">
                {lang === "es" ? "Pilar III: Inmunidad de Volatilidad y Retiro Militar" : "Pillar III: Retirement Longevity & Military Shield"}
              </h2>
              <span className="text-xs font-bold text-secondary">AB Global Consulting</span>
            </div>

            {/* Sequence of Returns Risk */}
            <div className="p-5 bg-red-50/70 border border-red-200 rounded-2xl mb-6 space-y-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-red-900 flex items-center gap-2">
                <span>⚠️</span> {lang === "es" ? "El Peligro de Secuencia de Rendimientos en 401(k) e IRA:" : "The 401(k) / IRA Sequence-of-Returns Risk:"}
              </h3>
              <p className="text-xs text-red-950 leading-relaxed">
                {lang === "es"
                  ? "Retirar fondos de una cartera de acciones en caída durante los primeros 5 años de jubilación agota los ahorros décadas antes. Una Anualidad Indexada Fija (FIA) o IUL crea un piso inamovible del 0% contra pérdidas, garantizando un cheque mensual que nunca se agota."
                  : "Withdrawing living expenses from a declining stock portfolio during the first 5 years of retirement exhausts wealth decades early. A Fixed Indexed Annuity (FIA) or IUL provides a contractual 0% floor against market losses and guarantees a lifetime paycheck."}
              </p>
            </div>

            {/* Annuity Rollover Checklist */}
            <div className="space-y-3 mb-6">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-700">
                {lang === "es" ? "1. Verificación de Transferencia de 401(k) / IRA / 403(b):" : "1. 401(k) / IRA Rollover & Pension Checklist:"}
              </h3>
              <div className="space-y-2 text-xs text-slate-700">
                <label className="flex items-start gap-2.5">
                  <input type="checkbox" className="mt-0.5" />
                  <span><strong>Direct Trustee-to-Trustee Transfer:</strong> Execute rollover 100% tax-free and penalty-free without tax withholding.</span>
                </label>
                <label className="flex items-start gap-2.5">
                  <input type="checkbox" className="mt-0.5" />
                  <span><strong>Guaranteed Lifetime Income Rider (GLIR):</strong> Lock in inflation-adjusted monthly paychecks backed by carrier reserves.</span>
                </label>
                <label className="flex items-start gap-2.5">
                  <input type="checkbox" className="mt-0.5" />
                  <span><strong>Contractual 0% Loss Floor:</strong> Participate in market index gains with zero downside exposure during crashes.</span>
                </label>
              </div>
            </div>

            {/* Military & Veteran Transition Checklist */}
            <div className="bg-[#001c38] text-white p-6 rounded-2xl space-y-3 mb-6">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <span>🎖️</span> {lang === "es" ? "Sección Especial para Militares y Veteranos:" : "Military & Veteran Tactical Transition Audit:"}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {lang === "es"
                  ? "No caiga en la trampa de tarifas de VGLI ni ceda el 6.5% de su pensión para siempre sin evaluar alternativas:"
                  : "Bypass the escalating VGLI rate trap and evaluate SBP pension maximization before permanent elections:"}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white/10 rounded-xl border border-white/15">
                  <p className="font-bold text-amber-300">VGLI Escalation Trap</p>
                  <p className="text-[11px] text-slate-200 mt-1">Rates jump every 5 yrs ($750+/mo at 65) with $0 cash return. Lock in permanent IUL with level rates.</p>
                </div>
                <div className="p-3 bg-white/10 rounded-xl border border-white/15">
                  <p className="font-bold text-amber-300">SBP Pension Maximization</p>
                  <p className="text-[11px] text-slate-200 mt-1">Take 100% full pension; fund a tax-free private asset that preserves equity if spouse passes first.</p>
                </div>
              </div>
            </div>

            {/* Long-Term Care Asset Shield */}
            <div className="space-y-2 text-xs text-slate-700">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-700">
                {lang === "es" ? "2. Blindaje ante Cuidados de Larga Duración (LTC):" : "2. Long-Term Care Asset Protection:"}
              </h3>
              <label className="flex items-start gap-2.5">
                <input type="checkbox" className="mt-0.5" />
                <span><strong>Cash Indemnity LTC:</strong> Receive direct monthly cash payouts without submitting medical receipts or invoices.</span>
              </label>
              <label className="flex items-start gap-2.5">
                <input type="checkbox" className="mt-0.5" />
                <span><strong>Medicaid Spend-Down Shield:</strong> Prevent nursing home costs from depleting personal home equity and family inheritance.</span>
              </label>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-4 flex justify-between items-center text-[10px] text-slate-400">
            <span>The Protection Planning Checklist • AB Global Consulting</span>
            <span>Page 3 of 4</span>
          </div>
        </section>


        {/* =========================================================================
            PAGE 4: Legacy, Pre-Planning & Action Blueprint
            ========================================================================= */}
        <section className="bg-white p-8 md:p-12 rounded-3xl print:rounded-none shadow-md print:shadow-none border border-slate-200 print:border-none min-h-[10.8in] flex flex-col justify-between">
          <div>
            <div className="border-b border-slate-200 pb-4 mb-6 flex justify-between items-center">
              <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">
                {lang === "es" ? "Pilar IV: Legado, Concierge Funerario y Plan de Acción" : "Pillar IV: Legacy, Funeral Concierge & Action Plan"}
              </h2>
              <span className="text-xs font-bold text-secondary">AB Global Consulting</span>
            </div>

            {/* Everest Funeral Concierge Checklist */}
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl mb-6 space-y-3">
              <div className="flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-wider">
                <span>🕊️</span> {lang === "es" ? "Everest Funeral Concierge y Gastos Finales:" : "Everest Funeral Concierge & Pre-Planning Audit:"}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <p className="font-bold text-slate-900">24/7 Price Negotiation</p>
                  <p className="text-[11px] text-slate-600 mt-0.5">Saves families an average of $3,500 by eliminating funeral markup.</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <p className="font-bold text-slate-900">24-48 Hr Express Payout</p>
                  <p className="text-[11px] text-slate-600 mt-0.5">Direct wire disbursement to cover immediate cemetery and mortuary bills.</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <p className="font-bold text-slate-900">Tenzing™ Online Will</p>
                  <p className="text-[11px] text-slate-600 mt-0.5">Secure, legal Will & Healthcare Directive creation software included.</p>
                </div>
              </div>
            </div>

            {/* 5-Step Action Blueprint */}
            <div className="space-y-3 mb-8">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                {lang === "es" ? "Su Plan de Acción de 5 Pasos para Cerrar Vulnerabilidades:" : "Your 5-Step Strategic Action Blueprint:"}
              </h3>
              <div className="space-y-2 text-xs text-slate-800">
                <div className="p-2.5 bg-slate-50 rounded-lg flex items-center gap-3">
                  <span className="h-6 w-6 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-[10px] shrink-0">1</span>
                  <span><strong>Complete the Self-Audit Scorecard:</strong> Review your checked boxes from pages 1–3 to isolate exposed areas.</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg flex items-center gap-3">
                  <span className="h-6 w-6 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-[10px] shrink-0">2</span>
                  <span><strong>Run Live Scenarios on Our Simulators:</strong> Test your numbers at <code>abglco.com/tools/iul-calculator</code> or <code>abglco.com/tools/military-asset-shield</code>.</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg flex items-center gap-3">
                  <span className="h-6 w-6 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-[10px] shrink-0">3</span>
                  <span><strong>Request an Official Carrier Illustration:</strong> Schedule a 15-minute diagnostic call with licensed advisor Angel Burgos.</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg flex items-center gap-3">
                  <span className="h-6 w-6 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-[10px] shrink-0">4</span>
                  <span><strong>Lock In 0% Downside & Living Benefits:</strong> Reallocate vulnerable accounts into asset-protected institutional vehicles.</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg flex items-center gap-3">
                  <span className="h-6 w-6 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-[10px] shrink-0">5</span>
                  <span><strong>Document Estate & Legacy Preferences:</strong> Establish online Will documents and share concierge instructions with family.</span>
                </div>
              </div>
            </div>

            {/* Advisor Callout & Direct Consultation Box */}
            <div className="bg-[#001c38] text-white p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg mb-6">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300">
                  {lang === "es" ? "Asesoría Profesional Independiente" : "Independent Professional Advisory"}
                </span>
                <h4 className="text-base font-bold text-white">Angel Burgos, FL Lic. #G328926 / WFG F6D9U</h4>
                <p className="text-xs text-slate-300">
                  Direct Line: <strong>(386) 333-1482</strong> • Office: <strong>(407) 930-6226</strong>
                </p>
                <p className="text-[11px] text-slate-400">9501 Satellite Blvd, Suite 105, Orlando, FL 32837</p>
              </div>

              <div className="shrink-0 text-center">
                <a href="https://abglco.com/#consultation" className="inline-block px-5 py-2.5 bg-secondary text-white font-bold text-xs rounded-xl shadow-md hover:bg-secondary/90 transition-all">
                  {lang === "es" ? "Agendar Consulta Gratis →" : "Book Free Consultation →"}
                </a>
                <p className="text-[10px] text-amber-200 mt-1">No Pressure • 100% Educational</p>
              </div>
            </div>

            {/* Compliance Legal Disclaimer */}
            <p className="text-[9px] text-slate-400 leading-tight">
              *Compliance Disclosure: AB Global Consulting and licensed professional Angel Burgos (FL License #G328926 / WFG Agent Code: F6D9U) are authorized to offer life insurance, health insurance, fixed annuities, variable annuities, and funeral concierge services in approved jurisdictions. The information in this checklist is for educational and illustrative purposes only. All guarantees are backed solely by the financial strength of the issuing insurance carriers.
            </p>
          </div>

          <div className="border-t border-slate-200 pt-4 flex justify-between items-center text-[10px] text-slate-400">
            <span>The Protection Planning Checklist • AB Global Consulting</span>
            <span>Page 4 of 4</span>
          </div>
        </section>

      </div>
    </main>
  );
}
