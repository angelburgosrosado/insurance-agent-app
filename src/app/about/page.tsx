"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ComplianceDisclosure } from "@/components/ui/ComplianceDisclosure";
import { Navbar } from "@/components/Navbar";
import { useLanguage } from "@/context/LanguageContext";
import { dictionary } from "@/lib/i18n/translations";
import { FloatingMobileBar } from "@/components/FloatingMobileBar";

export default function AboutPage() {
  const { lang } = useLanguage();
  const t = dictionary[lang];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      {/* Top Breadcrumb Header */}
      <div className="bg-[#001428] border-b border-white/10 text-white/80 py-3 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs md:text-sm">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">
              {lang === "es" ? "Inicio" : "Home"}
            </Link>
            <span>/</span>
            <span className="text-white font-medium">
              {lang === "es" ? "Sobre Angel Burgos" : "About Angel Burgos"}
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span>FL License: <strong>G328926</strong></span>
            <span>•</span>
            <a href="tel:3863331482" className="text-secondary hover:underline font-semibold">(386) 333-1482</a>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-[#001c38] text-white py-16 md:py-24 px-6 lg:px-10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-secondary/15 border border-secondary/30 rounded-full w-fit">
              <span className="text-secondary text-xs md:text-sm font-bold tracking-wide uppercase">
                {lang === "es" ? "Fundador y Asesor Financiero Estratégico" : "Founder & Strategic Financial Advisor"}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
              Angel Burgos
            </h1>
            <p className="text-lg md:text-xl text-white/85 max-w-3xl leading-relaxed">
              {lang === "es"
                ? "Combinando una mentalidad analítica orientada a la ingeniería con acceso a las mejores aseguradoras independientes para proteger lo que más importa: su familia, su salud y su retiro."
                : "Combining an analytical, engineering-driven mindset with premier independent brokerage access to protect what matters most—your family, your health, and your retirement."}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button href="/#consultation" variant="secondary" className="!bg-secondary !text-white !border-secondary hover:!bg-secondary/90 shadow-lg px-8 py-3.5 font-bold">
                {t.hero_cta_consultation}
              </Button>
              <Button href="tel:3863331482" variant="secondary" className="!text-white !border-white/30 hover:!bg-white/10 px-6 py-3.5">
                Direct: (386) 333-1482
              </Button>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col items-center lg:items-end">
            <div className="bg-white/10 border border-white/20 backdrop-blur-md rounded-3xl p-6 md:p-8 space-y-6 text-sm max-w-sm w-full shadow-2xl">
              <div className="flex justify-center">
                <img 
                  src="/images/angel-burgos.png" 
                  alt="Angel Burgos - State Licensed Financial Advisor" 
                  className="w-40 h-40 md:w-44 md:h-44 object-cover object-top rounded-2xl shadow-xl border-2 border-secondary/50 bg-white"
                />
              </div>

              <div className="space-y-2 text-center">
                <h3 className="text-xl font-bold text-white">Angel Burgos</h3>
                <p className="text-secondary text-xs font-semibold uppercase tracking-wider">Florida License #G328926</p>
                <p className="text-white/70 text-xs">National Producer Agent Code: F6D9U</p>
              </div>

              <div className="pt-2 border-t border-white/10 space-y-2 text-xs text-white/80">
                <div className="flex justify-between">
                  <span className="text-white/60">{lang === "es" ? "Licenciatura:" : "Licensure:"}</span>
                  <span className="font-semibold text-white">0215 Life, Health & Annuities</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">{lang === "es" ? "Idiomas:" : "Languages:"}</span>
                  <span className="font-semibold text-emerald-400">English & Español</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">{lang === "es" ? "Oficina Central:" : "Office:"}</span>
                  <span className="font-semibold text-white">Orlando, FL & Puerto Rico</span>
                </div>
              </div>

              {/* Direct Messaging & Social Channels */}
              <div className="pt-2 border-t border-white/10 space-y-2">
                <p className="text-[11px] font-bold text-secondary uppercase tracking-wider text-center">
                  {lang === "es" ? "Conectar Directamente" : "Connect & Message Direct"}
                </p>
                <div className="grid grid-cols-2 gap-2 text-center text-xs font-semibold">
                  <a 
                    href={
                      lang === "es"
                        ? "https://wa.me/13863331482?text=Hola%20Angel,%20deseo%20conocer%20mas%20sobre%20AB%20Global%20Consulting."
                        : "https://wa.me/13863331482?text=Hello%20Angel,%20I%20would%20like%20to%20learn%20more%20about%20AB%20Global%20Consulting."
                    }
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    <span>💬</span> WhatsApp
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/angelburgos" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    <span>💼</span> LinkedIn
                  </a>
                  <a 
                    href="https://www.facebook.com/abglco" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="py-1.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    <span>📘</span> Facebook
                  </a>
                  <a 
                    href="https://t.me/+13863331482" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="py-1.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    <span>✈️</span> Telegram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Story & Core Principles */}
      <section className="py-20 px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* The Philosophy */}
            <div className="bg-white p-8 md:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-3xl font-bold text-slate-900">
                {lang === "es" ? "Un Enfoque Analítico Centrado en el Cliente" : "An Analytical, Client-First Approach"}
              </h2>
              <p className="text-slate-600 leading-relaxed text-base">
                {lang === "es"
                  ? "En AB Global Consulting, creemos que las decisiones sobre seguros y finanzas deben ser claras, transparentes y construidas enteramente sobre sus metas personales, no sobre cuotas de venta ni tácticas de presión."
                  : "At AB Global Consulting, we believe insurance and financial decisions should be clear, transparent, and built entirely around your personal goals—not sales quotas or high-pressure tactics."}
              </p>
              <p className="text-slate-600 leading-relaxed text-base">
                {lang === "es"
                  ? "Como correduría independiente respaldada por la plataforma World Financial Group (WFG), Angel Burgos no está atado a una sola compañía. Esta independencia nos permite comparar y estructurar objetivamente pólizas de las principales instituciones de EE. UU. (incluidas Nationwide, Transamerica, Pacific Life, Mutual of Omaha y Everest Funeral Concierge), asegurando que su portafolio reciba los mejores beneficios al precio más competitivo."
                  : "As an independent brokerage under the World Financial Group (WFG) platform, Angel Burgos is not captive to any single insurance company. This independence enables us to objectively shop and structure solutions from America’s premier institutions (including Nationwide, Transamerica, Pacific Life, Mutual of Omaha, and Everest Funeral Concierge), ensuring your portfolio gets top-tier benefits at optimal pricing."}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-secondary font-bold text-lg">
                    {lang === "es" ? "01. Acceso Independiente" : "01. Independent Access"}
                  </span>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    {lang === "es" 
                      ? "Recomendaciones imparciales comparando múltiples aseguradoras con calificación A para adaptarse a su plan familiar."
                      : "Unbiased recommendations comparing multiple A-rated carriers to match your exact financial blueprint."}
                  </p>
                </div>
                <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-secondary font-bold text-lg">
                    {lang === "es" ? "02. Precisión de Ingeniería" : "02. Engineering Precision"}
                  </span>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    {lang === "es"
                      ? "Ilustraciones basadas en datos reales que muestran pisos garantizados, topes de rendimiento y ventajas fiscales."
                      : "Data-backed policy illustrations showing guaranteed floors, cap rates, cash value projections, and tax implications."}
                  </p>
                </div>
                <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-secondary font-bold text-lg">
                    {lang === "es" ? "03. Asesoría Bilingüe" : "03. Bilingual Advisory"}
                  </span>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    {lang === "es"
                      ? "Comunicación clara y cercana en español e inglés para familias y dueños de negocios en Florida y Puerto Rico."
                      : "Clear, culturally attuned communication in English and Spanish for individuals and business owners across Florida."}
                  </p>
                </div>
                <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-secondary font-bold text-lg">
                    {lang === "es" ? "04. Acompañamiento Continuo" : "04. Lifelong Support"}
                  </span>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    {lang === "es"
                      ? "Revisiones anuales de pólizas, actualización de beneficiarios y asistencia en reclamos cuando su familia más lo necesita."
                      : "Annual policy reviews, beneficiary updates, and claims assistance when your family needs us most."}
                  </p>
                </div>
              </div>
            </div>

            {/* Core Practice Areas */}
            <div className="bg-white p-8 md:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">
                {lang === "es" ? "Espectro de Soluciones y Productos" : "Comprehensive Solutions Spectrum"}
              </h2>
              <div className="space-y-4">
                <Link href="/services/life-insurance" className="block p-5 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">{t.pillar_1_title}</h3>
                    <span className="text-secondary font-bold text-sm">
                      {lang === "es" ? "Ver Detalles →" : "Learn More →"}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">{t.pillar_1_desc}</p>
                </Link>

                <Link href="/services/variable-annuities" className="block p-5 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">{t.pillar_2_title}</h3>
                    <span className="text-secondary font-bold text-sm">
                      {lang === "es" ? "Ver Detalles →" : "Learn More →"}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">{t.pillar_2_desc}</p>
                </Link>

                <Link href="/services/final-expense" className="block p-5 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">{t.pillar_3_title}</h3>
                    <span className="text-secondary font-bold text-sm">
                      {lang === "es" ? "Ver Detalles →" : "Learn More →"}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">{t.pillar_3_desc}</p>
                </Link>

                <Link href="/services/health-insurance" className="block p-5 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">{t.pillar_4_title}</h3>
                    <span className="text-secondary font-bold text-sm">
                      {lang === "es" ? "Ver Detalles →" : "Learn More →"}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">{t.pillar_4_desc}</p>
                </Link>

                <Link href="/services/long-term-care" className="block p-5 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">{t.pillar_5_title}</h3>
                    <span className="text-secondary font-bold text-sm">
                      {lang === "es" ? "Ver Detalles →" : "Learn More →"}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">{t.pillar_5_desc}</p>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Office Info & Consultation CTA */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#001c38] text-white p-8 rounded-2xl shadow-xl space-y-6">
              <h3 className="text-xl font-bold">
                {lang === "es" ? "Agende su Consulta Directa" : "Schedule Direct Advisory"}
              </h3>
              <p className="text-sm text-white/80 leading-relaxed">
                {lang === "es"
                  ? "Ya sea que esté evaluando un IUL, transfiriendo un 401(k) a una anualidad o planificando gastos finales con Everest, estamos listos para guiarle paso a paso."
                  : "Whether evaluating an IUL, rolling over a 401(k) to an annuity, or planning final expenses with Everest, we are here to provide clear, actionable guidance."}
              </p>
              <Button href="/#consultation" variant="secondary" className="w-full !bg-secondary !text-white !border-secondary hover:!bg-secondary/90 py-3.5 font-bold text-sm">
                {t.nav_consultation}
              </Button>
              <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-white/80">
                <p><strong>📞 {lang === "es" ? "Llamada Directa:" : "Direct Call:"}</strong> (386) 333-1482</p>
                <p><strong>🏢 {lang === "es" ? "Oficina Central:" : "Office Phone:"}</strong> (407) 930-6226</p>
                <p><strong>📍 {lang === "es" ? "Dirección:" : "Location:"}</strong> 9501 Satellite Blvd, Suite 105, Orlando, FL 32837</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider text-secondary">
                {lang === "es" ? "Instituciones Representadas" : "Represented Institutions"}
              </h4>
              <ul className="text-xs text-slate-600 space-y-2">
                <li className="flex items-center gap-2"><span>🛡️</span> Nationwide Financial</li>
                <li className="flex items-center gap-2"><span>🛡️</span> Transamerica</li>
                <li className="flex items-center gap-2"><span>🛡️</span> Pacific Life</li>
                <li className="flex items-center gap-2"><span>🛡️</span> Everest Funeral Concierge / WSG</li>
                <li className="flex items-center gap-2"><span>🛡️</span> Mutual of Omaha</li>
                <li className="flex items-center gap-2"><span>🛡️</span> Corebridge Financial / AIG</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <FloatingMobileBar />
      <ComplianceDisclosure />
    </main>
  );
}
