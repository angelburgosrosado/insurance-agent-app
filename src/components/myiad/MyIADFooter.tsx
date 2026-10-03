"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Phone, Mail, MapPin, ExternalLink } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function MyIADFooter() {
  const { lang } = useLanguage();

  return (
    <footer className="bg-[#071324] text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Licensing */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#14B8A6] flex items-center justify-center text-white">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black text-white">
                My<span className="text-[#14B8A6]">IAD</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              {lang === "es"
                ? "Plataforma de Asesoría y Protección de Seguros Inteligente diseñada para consumidores, productores y líderes de agencias en los 50 estados y Puerto Rico."
                : "Intelligent Insurance Advisory & Protection platform engineered for consumers, producers, and brokerage leadership across all 50 US states."}
            </p>
            <div className="pt-2 text-slate-300 font-semibold space-y-1">
              <p>MyIAD National Insurance Solutions</p>
              <p className="text-[#14B8A6] font-mono text-[11px]">
                {lang === "es" ? "Red Nacional con Licencia en los 50 Estados y PR" : "Licensed Nationwide 50-State Network"}
              </p>
            </div>
          </div>

          {/* Col 2: Core Offerings */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {lang === "es" ? "Ofertas Principales" : "Core Offerings"}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#offerings" className="hover:text-white transition-colors">
                  {lang === "es" ? "Vida Universal Indexada (IUL)" : "Indexed Universal Life (IUL)"}
                </a>
              </li>
              <li>
                <a href="#offerings" className="hover:text-white transition-colors">
                  {lang === "es" ? "Seguro a Término con Beneficios en Vida" : "Living Benefits Term Architecture"}
                </a>
              </li>
              <li>
                <a href="#offerings" className="hover:text-white transition-colors">
                  {lang === "es" ? "Salud y Medicare Advantage / Medigap" : "Health & Medicare Advantage / Medigap"}
                </a>
              </li>
              <li>
                <a href="#offerings" className="hover:text-white transition-colors">
                  {lang === "es" ? "Anualidades Variables de Ingreso Vitalicio" : "Variable Annuity Guaranteed Income"}
                </a>
              </li>
              <li>
                <Link href="/tools/iul-calculator" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>{lang === "es" ? "Simulador Interactivo de IUL" : "Interactive IUL Calculator"}</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Specialized Platforms */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {lang === "es" ? "Plataformas y Segmentos" : "Advisory Segments"}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#ai-suite" className="hover:text-white transition-colors">
                  {lang === "es" ? "Suite de Inteligencia Artificial MyIAD" : "MyIAD AI Intelligence Suite"}
                </a>
              </li>
              <li>
                <a href="#ai-assessment" className="hover:text-white transition-colors">
                  {lang === "es" ? "Calculadora de Brechas de Protección" : "Interactive AI Needs Calculator"}
                </a>
              </li>
              <li>
                <a href="#producers" className="hover:text-white transition-colors">
                  {lang === "es" ? "Directores de Agencia y Distribución IMO" : "Agency Principals & IMO Distribution"}
                </a>
              </li>
              <li>
                <a href="#veterans" className="hover:text-white transition-colors">
                  {lang === "es" ? "Escudo Patrimonial para Veteranos" : "Veteran Asset Shield"}
                </a>
              </li>
              <li>
                <a href="#compliance" className="hover:text-white transition-colors">
                  {lang === "es" ? "Protocolos de Supervisión FINRA 2330" : "FINRA Rule 2330 Supervisory Protocols"}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Territory */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {lang === "es" ? "Contacto Directo y Línea Gratuita" : "Direct Contact & Toll-Free"}
            </h4>
            <div className="space-y-2.5 text-slate-300">
              <a href="tel:18888873585" className="flex items-center gap-2 hover:text-[#14B8A6] transition-colors">
                <Phone className="w-4 h-4 text-[#14B8A6] shrink-0" />
                <span className="font-bold text-white">Toll-Free: (888) 887-3585</span>
              </a>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#14B8A6] shrink-0" />
                <span>support@myiad.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#14B8A6] shrink-0 mt-0.5" />
                <span>
                  {lang === "es"
                    ? "Cobertura Nacional en los 50 Estados de EE. UU. y Puerto Rico"
                    : "Nationwide Coverage Across All 50 US States & Territories"}
                </span>
              </div>
            </div>
            <div className="pt-2">
              <a
                href="#ai-assessment"
                className="inline-block px-4 py-2 rounded-lg bg-slate-800 hover:bg-[#2563EB] text-white font-bold text-xs transition-colors"
              >
                {lang === "es" ? "Iniciar Evaluación con IA" : "Launch AI Need Assessment"}
              </a>
            </div>
          </div>
        </div>

        {/* Domain Ecosystem & Portals Ribbon */}
        <div className="pt-8 border-t border-slate-800/80">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs">
            <div className="space-y-1">
              <span className="font-bold text-white uppercase tracking-wider text-[11px] text-[#14B8A6]">
                {lang === "es" ? "Ecosistema de Dominios y Plataformas" : "Network & Domain Ecosystem"}
              </span>
              <p className="text-slate-400 text-[11px]">
                {lang === "es"
                  ? "Sistemas autorizados de MyIAD National Insurance Solutions y AB Global Consulting:"
                  : "Authorized digital properties of MyIAD National Insurance Solutions & AB Global Consulting:"}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 font-mono text-[11px]">
              <a
                href="https://myiad.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-teal-300 border border-teal-500/30 transition-colors flex items-center gap-1"
              >
                <span>myiad.com</span>
                <ExternalLink size={10} />
              </a>
              <a
                href="https://abglco.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-blue-300 border border-blue-500/30 transition-colors flex items-center gap-1"
              >
                <span>abglco.com</span>
                <ExternalLink size={10} />
              </a>
              <a
                href="https://crm.myiad.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-purple-300 border border-purple-500/30 transition-colors flex items-center gap-1"
              >
                <span>crm.myiad.com</span>
                <ExternalLink size={10} />
              </a>
              <a
                href="https://voice.myiad.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 transition-colors flex items-center gap-1"
              >
                <span>voice.myiad.com</span>
                <ExternalLink size={10} />
              </a>
            </div>
          </div>
        </div>

        {/* Regulatory & FINRA 2330 Legal Text */}
        <div className="space-y-4 text-[11px] leading-relaxed text-slate-400">
          <p>
            <strong>{lang === "es" ? "Divulgación Regulatoria y Cumplimiento:" : "Regulatory & Compliance Disclosure:"}</strong>{" "}
            {lang === "es"
              ? "MyIAD (myiad.com) es una plataforma de tecnología, asesoría y modelado de seguros. Las cotizaciones, el diseño de pólizas y las revisiones consultivas son realizadas por profesionales de seguros licenciados que operan en los 50 estados de EE. UU. y Puerto Rico. No estamos afiliados ni respaldados por el gobierno federal, el Departamento de Asuntos de Veteranos, CMS ni Medicare."
              : "MyIAD (myiad.com) is an insurance advisory, technology, and case modeling platform. Insurance quotes, policy design, and consultative reviews are performed by licensed life, health, and annuity insurance professionals operating across all 50 US states. Not affiliated with or endorsed by the federal government, the Department of Veterans Affairs, CMS, or Medicare."}
          </p>
          <p>
            <strong>{lang === "es" ? "Aviso de Riesgo de Anualidades Variables:" : "Variable Annuity Risk Warning:"}</strong>{" "}
            {lang === "es"
              ? "Las anualidades variables diferidas son instrumentos de inversión a largo plazo diseñados para la jubilación y están sujetas a fluctuaciones de mercado y riesgos de pérdida de capital. Las garantías se basan exclusivamente en la solvencia de la aseguradora emisora. Los retiros antes de los 59½ años pueden generar penalidades del 10% del IRS y cargos de rescate. Revise el prospecto antes de contratar."
              : "Deferred variable annuities are long-term investment vehicles designed for retirement planning and are subject to market fluctuations and investment risk, including potential loss of principal. Guarantees are backed solely by the financial strength and claims-paying ability of the issuing life insurance company. Withdrawals prior to age 59½ may trigger a 10% IRS penalty tax and surrender charges. Contract fees, subaccount management fees, and mortality & expense (M&E) charges apply. Review full prospectus materials carefully prior to purchasing."}
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 border-t border-slate-800/80">
            <p>
              &copy; {new Date().getFullYear()} MyIAD National Insurance Solutions • AB Global Consulting LLC. {lang === "es" ? "Todos los derechos reservados." : "All rights reserved."}
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors underline">
                {lang === "es" ? "Política de Privacidad" : "Privacy Policy"}
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors underline">
                {lang === "es" ? "Términos del Servicio" : "Terms of Service"}
              </Link>
              <Link href="/disclosures" className="hover:text-white transition-colors underline">
                {lang === "es" ? "Divulgaciones Estatutarias" : "Statutory Disclosures"}
              </Link>
              <Link href="/opt-in" className="hover:text-teal-300 text-teal-400 font-bold transition-colors underline flex items-center gap-1">
                <span>📱</span>
                <span>{lang === "es" ? "Consentimiento y Verificación SMS (Toll-Free)" : "SMS Opt-In & Toll-Free Compliance"}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
