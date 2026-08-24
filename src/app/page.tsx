"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ComplianceDisclosure } from "@/components/ui/ComplianceDisclosure";
import { AgentProfileCard } from "@/components/ui/AgentProfileCard";
import { ConsultationForm } from "@/components/consultation-form";
import { Navbar } from "@/components/Navbar";
import { LeadMagnetSection } from "@/components/LeadMagnetSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FloatingMobileBar } from "@/components/FloatingMobileBar";
import { useLanguage } from "@/context/LanguageContext";
import { dictionary } from "@/lib/i18n/translations";

export default function Home() {
  const { lang } = useLanguage();
  const t = dictionary[lang];

  return (
    <main className="min-h-screen bg-background text-slate-900">
      {/* Universal Global Header */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[680px] flex items-center overflow-hidden bg-[#001c38]">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,81,213,0.25),transparent_50%)] pointer-events-none"></div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-16 md:py-24">
          <div className="flex flex-col gap-6 reveal">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary/15 border border-secondary/30 rounded-full w-fit">
              <span className="text-secondary text-xs md:text-sm font-bold uppercase tracking-wider">
                {t.hero_badge}
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] text-white tracking-tight">
              {t.hero_title_1} <br />
              <span className="text-secondary">{t.hero_title_2}</span>
            </h1>
            
            <p className="text-base sm:text-lg text-white/85 max-w-xl leading-relaxed">
              {t.hero_desc}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button href="/#consultation" variant="secondary" className="!bg-secondary !text-white !border-secondary hover:!bg-secondary/90 shadow-xl px-8 py-4 text-sm md:text-base font-bold">
                {t.hero_cta_consultation}
              </Button>
              <Button href="/tools/iul-calculator" variant="secondary" className="!text-white !border-white/30 hover:!bg-white/10 px-6 py-4 text-sm md:text-base font-medium">
                {t.hero_cta_calculator}
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-3 text-xs text-white/70">
              <span className="flex items-center gap-1.5">
                <span className="text-emerald-400 font-bold">✓</span> {lang === "es" ? "Correduría 100% Independiente" : "100% Independent Brokerage"}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-emerald-400 font-bold">✓</span> {lang === "es" ? "Atención Bilingüe (Español / Inglés)" : "Bilingual (English / Español)"}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-emerald-400 font-bold">✓</span> FL Lic #G328926
              </span>
            </div>
          </div>

          <div className="hidden md:block reveal reveal-delay">
            <div className="relative h-[480px] w-full rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
              <img 
                className="w-full h-full object-cover" 
                alt="Family Wealth and Life Insurance Consultation Scene" 
                src="/images/financial-hero.jpg" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001c38]/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/15 backdrop-blur-md rounded-2xl border border-white/20 text-white text-xs space-y-0.5">
                <p className="font-bold text-sm">{lang === "es" ? "Protección Familiar Estratégica y Preservación de Patrimonio" : "Strategic Family Protection & Wealth Preservation"}</p>
                <p className="text-white/80">{lang === "es" ? "Soluciones Personalizadas 0215 en Vida, Salud y Anualidades" : "Tailored 0215 Life, Health & Variable Annuity Solutions"}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Authorized Carrier Partners Ribbon */}
      <section className="bg-slate-100 border-y border-slate-200 py-6 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-600">
          <span className="text-slate-900 font-bold uppercase tracking-wider flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-secondary"></span>
            {t.partners_title}
          </span>
          <div className="flex flex-wrap items-center gap-3 md:gap-6 text-slate-800">
            <span className="px-3.5 py-1.5 bg-white rounded-lg shadow-sm border border-slate-200">Nationwide Financial</span>
            <span className="px-3.5 py-1.5 bg-white rounded-lg shadow-sm border border-slate-200">Transamerica</span>
            <span className="px-3.5 py-1.5 bg-white rounded-lg shadow-sm border border-slate-200">Pacific Life</span>
            <span className="px-3.5 py-1.5 bg-white rounded-lg shadow-sm border border-slate-200">Everest Funeral Concierge / WSG</span>
            <span className="px-3.5 py-1.5 bg-white rounded-lg shadow-sm border border-slate-200">World Financial Group (WFG)</span>
          </div>
        </div>
      </section>

      {/* Interactive Financial Mini-Apps Showcase */}
      <section className="py-20 px-6 lg:px-10 bg-slate-50 border-b border-slate-200" id="interactive-tools">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 border border-secondary/20 rounded-full text-secondary text-xs font-bold uppercase tracking-wider mb-2">
                {t.tools_section_badge}
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                {t.tools_section_title}
              </h2>
              <p className="text-slate-600 text-sm md:text-base max-w-2xl mt-1">
                {t.tools_section_desc}
              </p>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
              {lang === "es" ? "Proyecciones Matemáticas en Vivo" : "Live Mathematical Projections"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Tool Card 1: IUL Wealth Simulator */}
            <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary text-2xl mb-5">
                  📊
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-secondary">{lang === "es" ? "Vida y Retiro" : "Life & Retirement"}</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">{lang === "es" ? "Exportable" : "Shareable"}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-secondary transition-colors">
                  {t.tool_iul_title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-5">
                  {t.tool_iul_desc}
                </p>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1 mb-5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">{lang === "es" ? "Ingreso Libre de Impuestos:" : "Tax-Free Income:"}</span>
                    <strong className="text-slate-900">IRS Sec 7702</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{lang === "es" ? "Riesgo de Pérdida:" : "Downside Risk:"}</span>
                    <strong className="text-emerald-600 font-bold">{lang === "es" ? "Piso Garantizado 0%" : "Guaranteed 0% Floor"}</strong>
                  </div>
                </div>
              </div>
              <Link href="/tools/iul-calculator" className="block w-full">
                <Button variant="primary" className="w-full !bg-slate-900 hover:!bg-secondary text-xs font-bold py-2.5 transition-colors">
                  {t.tool_cta_open}
                </Button>
              </Link>
            </div>

            {/* Tool Card 2: Annuity Paycheck Estimator */}
            <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary text-2xl mb-5">
                  📈
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-secondary">{lang === "es" ? "Pensión Privada" : "Private Pension"}</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">{lang === "es" ? "Exportable" : "Shareable"}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-secondary transition-colors">
                  {t.tool_annuity_title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-5">
                  {t.tool_annuity_desc}
                </p>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1 mb-5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">{lang === "es" ? "Garantía de Ingreso:" : "Paycheck Guarantee:"}</span>
                    <strong className="text-slate-900">{lang === "es" ? "Cheque Vitalicio" : "Lifetime Paycheck"}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{lang === "es" ? "Transferencia 401k/IRA:" : "Rollover Tax Status:"}</span>
                    <strong className="text-emerald-600 font-bold">{lang === "es" ? "100% Diferida" : "100% Tax-Deferred"}</strong>
                  </div>
                </div>
              </div>
              <Link href="/tools/annuity-estimator" className="block w-full">
                <Button variant="primary" className="w-full !bg-slate-900 hover:!bg-secondary text-xs font-bold py-2.5 transition-colors">
                  {t.tool_cta_open}
                </Button>
              </Link>
            </div>

            {/* Tool Card 3: Military & Veteran Asset Shield */}
            <div className="bg-white p-7 rounded-3xl border border-amber-300/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-bl-xl shadow-sm">
                🎖️ {lang === "es" ? "Militar / Veterano" : "Military / Veteran"}
              </div>
              <div>
                <div className="h-12 w-12 rounded-2xl bg-amber-500/15 flex items-center justify-center text-amber-800 text-2xl mb-5">
                  🛡️
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-amber-800">{lang === "es" ? "Fuerzas Armadas" : "Armed Forces"}</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">{lang === "es" ? "Exportable" : "Shareable"}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-amber-800 transition-colors">
                  {t.tool_military_title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-5">
                  {t.tool_military_desc}
                </p>
                <div className="p-3.5 bg-amber-50/60 rounded-xl border border-amber-200/60 text-xs space-y-1 mb-5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">{lang === "es" ? "Alternativa VGLI:" : "VGLI Rate Escalation:"}</span>
                    <strong className="text-amber-900 font-bold">{lang === "es" ? "IUL con Préstamos 7702" : "IUL 7702 Shield"}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{lang === "es" ? "Pensión Militar (SBP):" : "Pension Max:"}</span>
                    <strong className="text-emerald-600 font-bold">{lang === "es" ? "100% de Pensión" : "100% Full Pension"}</strong>
                  </div>
                </div>
              </div>
              <Link href="/tools/military-asset-shield" className="block w-full">
                <Button variant="primary" className="w-full !bg-slate-900 hover:!bg-amber-800 text-xs font-bold py-2.5 transition-colors">
                  {t.tool_cta_open}
                </Button>
              </Link>
            </div>

            {/* Tool Card 4: Everest Funeral Concierge Savings */}
            <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary text-2xl mb-5">
                  🕊️
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-secondary">Everest Concierge</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">{lang === "es" ? "Exportable" : "Shareable"}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-secondary transition-colors">
                  {t.tool_funeral_title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-5">
                  {t.tool_funeral_desc}
                </p>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1 mb-5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">{lang === "es" ? "Ahorro Promedio:" : "Average Savings:"}</span>
                    <strong className="text-emerald-600 font-bold">$3,500+ / {lang === "es" ? "familia" : "family"}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{lang === "es" ? "Desembolso Rápido:" : "Claim Payout:"}</span>
                    <strong className="text-slate-900">24 {lang === "es" ? "a" : "to"} 48 {lang === "es" ? "Horas" : "Hours"}</strong>
                  </div>
                </div>
              </div>
              <Link href="/tools/funeral-cost-savings" className="block w-full">
                <Button variant="primary" className="w-full !bg-slate-900 hover:!bg-secondary text-xs font-bold py-2.5 transition-colors">
                  {t.tool_cta_open}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic 5-Pillar Solutions Bento Grid */}
      <section className="py-24 px-6 lg:px-10 max-w-7xl mx-auto" id="services">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6 reveal">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 border border-secondary/20 rounded-full text-secondary text-xs font-bold uppercase tracking-wider mb-2">
              {t.pillars_badge}
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
              {t.pillars_title}
            </h2>
            <p className="text-base text-slate-600 max-w-2xl mt-1">
              {lang === "es" 
                ? "Cada estrategia se construye utilizando aseguradoras institucionales de primer nivel adaptadas a las metas específicas de su familia."
                : "Every plan is built using institutional-grade carriers tailored to Florida and Puerto Rico regulatory frameworks and individual financial goals."}
            </p>
          </div>
          <div className="flex gap-2">
            <span className="px-4 py-2 bg-slate-100 rounded-full text-xs font-bold text-primary border border-slate-200">
              {lang === "es" ? "Asesoría Licenciada 0215" : "0215 Certified Advisory"}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* 1. Life Insurance & IUL */}
          <div className="md:col-span-7 bg-white border border-slate-200 p-8 rounded-3xl shadow-sm hover:shadow-md transition-all reveal flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="h-12 w-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary font-bold text-xl">
                  🛡️
                </div>
                <span className="text-xs font-bold text-secondary uppercase tracking-widest bg-secondary/10 px-3 py-1 rounded-full">
                  {lang === "es" ? "Retiro Libre de Impuestos" : "Tax-Free Wealth"}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{t.pillar_1_title}</h3>
              <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                {t.pillar_1_desc}
              </p>
            </div>
            <div>
              <Link className="font-bold text-secondary hover:underline text-sm inline-flex items-center gap-1" href="/services/life-insurance">
                {lang === "es" ? "Ver Detalles de Seguros de Vida e IUL →" : "Explore Life & IUL Strategies →"}
              </Link>
            </div>
          </div>

          {/* 2. Variable & Indexed Annuities */}
          <div className="md:col-span-5 bg-white border border-slate-200 p-8 rounded-3xl shadow-sm hover:shadow-md transition-all reveal flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="h-12 w-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary text-xl">
                  🏛️
                </div>
                <span className="text-xs font-bold text-secondary uppercase tracking-widest bg-secondary/10 px-3 py-1 rounded-full">
                  {lang === "es" ? "Ingreso Vitalicio" : "Guaranteed Income"}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{t.pillar_2_title}</h3>
              <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                {t.pillar_2_desc}
              </p>
            </div>
            <div>
              <Link className="font-bold text-secondary hover:underline text-sm inline-flex items-center gap-1" href="/services/variable-annuities">
                {lang === "es" ? "Ver Opciones de Anualidades →" : "Explore Annuity Solutions →"}
              </Link>
            </div>
          </div>

          {/* 3. Final Expense & Everest Funeral Concierge */}
          <div className="md:col-span-6 bg-white border border-slate-200 p-8 rounded-3xl shadow-sm hover:shadow-md transition-all reveal flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="h-12 w-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary text-xl">
                  🕊️
                </div>
                <span className="text-xs font-bold text-secondary uppercase tracking-widest bg-secondary/10 px-3 py-1 rounded-full">
                  {lang === "es" ? "Alivio y Ahorro Familiar" : "Everest Concierge"}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{t.pillar_3_title}</h3>
              <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                {t.pillar_3_desc}
              </p>
            </div>
            <div>
              <Link className="font-bold text-secondary hover:underline text-sm inline-flex items-center gap-1" href="/services/final-expense">
                {lang === "es" ? "Ver Detalles de Gastos Finales y Everest →" : "Explore Everest Concierge & Final Expense →"}
              </Link>
            </div>
          </div>

          {/* 4 & 5. Health & Long-Term Care */}
          <div className="md:col-span-6 bg-white border border-slate-200 p-8 rounded-3xl shadow-sm hover:shadow-md transition-all reveal flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="h-12 w-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary text-xl">
                  🏥
                </div>
                <span className="text-xs font-bold text-secondary uppercase tracking-widest bg-secondary/10 px-3 py-1 rounded-full">
                  {lang === "es" ? "Salud y Cuidado Prolongado" : "Healthcare & LTC"}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{t.pillar_4_title}</h3>
              <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                {t.pillar_4_desc}
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link className="font-bold text-secondary hover:underline text-sm" href="/services/health-insurance">
                {lang === "es" ? "Salud y Medicare →" : "Health & Medicare →"}
              </Link>
              <span className="text-slate-300">•</span>
              <Link className="font-bold text-secondary hover:underline text-sm" href="/services/long-term-care">
                {lang === "es" ? "Cuidado a Largo Plazo →" : "Long-Term Care Planning →"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose AB Global Consulting: 4 Core Advantages */}
      <section className="py-20 px-6 lg:px-10 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              {t.why_title}
            </h2>
            <p className="text-white/75 text-sm md:text-base leading-relaxed">
              {t.why_desc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-3">
              <span className="text-2xl">📐</span>
              <h4 className="font-bold text-base text-white">{t.why_1_title}</h4>
              <p className="text-xs text-white/70 leading-relaxed">
                {t.why_1_desc}
              </p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-3">
              <span className="text-2xl">🏢</span>
              <h4 className="font-bold text-base text-white">{t.why_2_title}</h4>
              <p className="text-xs text-white/70 leading-relaxed">
                {t.why_2_desc}
              </p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-3">
              <span className="text-2xl">🗣️</span>
              <h4 className="font-bold text-base text-white">{t.why_3_title}</h4>
              <p className="text-xs text-white/70 leading-relaxed">
                {t.why_3_desc}
              </p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-3">
              <span className="text-2xl">🤝</span>
              <h4 className="font-bold text-base text-white">{t.why_4_title}</h4>
              <p className="text-xs text-white/70 leading-relaxed">
                {t.why_4_desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Request Section */}
      <section className="bg-slate-50 border-t border-slate-200 py-24 px-6 lg:px-10" id="consultation">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Column: Advisor Credentials Card */}
            <div className="flex flex-col reveal space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 border border-secondary/20 rounded-full text-secondary text-xs font-bold uppercase tracking-wider mb-3">
                  {t.form_badge}
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-4">
                  {lang === "es" ? "Proteja Su Legado Familiar con AB Global" : "Anchor Your Legacy with AB Global"}
                </h2>
                <p className="text-base text-slate-600 leading-relaxed">
                  {lang === "es"
                    ? "Asesoría independiente bilingüe en toda Florida y Puerto Rico. El agente licenciado Angel Burgos (G328926 / WFG F6D9U) brinda orientación analítica y transparente."
                    : "Bilingual independent advisory across Florida and Puerto Rico. Licensed agent Angel Burgos (G328926 / WFG F6D9U) provides transparent, analytical guidance."}
                </p>
              </div>
              
              <div className="w-full">
                <AgentProfileCard 
                  name="Angel Burgos"
                  title="Founder, F6D9U / FL License: G328926"
                  bilingual={true}
                />
              </div>

              <div className="p-5 bg-white rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-2 shadow-sm">
                <p className="font-bold text-slate-900 text-sm">{lang === "es" ? "Contacto Directo de Oficina:" : "Direct Office Contact Details:"}</p>
                <p>📍 <strong>{lang === "es" ? "Oficina Central:" : "Orlando Office:"}</strong> 9501 Satellite Blvd, Suite 105, Orlando, FL 32837</p>
                <p>📱 <strong>Mobile / Text:</strong> <a href="tel:3863331482" className="text-secondary font-bold hover:underline">(386) 333-1482</a></p>
                <p>📞 <strong>Office Phone:</strong> <a href="tel:4079306226" className="text-secondary font-bold hover:underline">(407) 930-6226</a></p>
              </div>
            </div>
            
            {/* Right Column: Lead Form */}
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-200 reveal reveal-delay">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-primary mb-2">{t.form_title}</h3>
                <p className="text-slate-600 text-sm">{t.form_desc}</p>
              </div>
              <ConsultationForm />
            </div>
          </div>
        </div>
      </section>

      {/* Verified Client Testimonials & Case Studies */}
      <TestimonialsSection />

      {/* Complimentary Consumer Planning Guides (Lead Magnets) */}
      <LeadMagnetSection />

      {/* Sticky Mobile Action Bar */}
      <FloatingMobileBar />

      <ComplianceDisclosure />
    </main>
  );
}
