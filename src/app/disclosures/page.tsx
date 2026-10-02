"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { ComplianceDisclosure } from "@/components/ui/ComplianceDisclosure";
import { useLanguage } from "@/context/LanguageContext";
import { 
  FileText, 
  ShieldAlert, 
  AlertCircle, 
  CheckCircle2, 
  Scale, 
  BookOpen, 
  Phone, 
  ExternalLink,
  Shield,
  Layers,
  HeartPulse,
  Award
} from "lucide-react";

export default function DisclosuresPage() {
  const { lang, setLang } = useLanguage();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Hero */}
        <section className="bg-[#001c38] text-white py-16 px-6 lg:px-10 border-b border-slate-800">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/20 border border-secondary/40 rounded-full text-secondary text-xs font-bold uppercase tracking-wider">
              <FileText size={14} className="text-secondary" />
              {lang === "es" ? "Divulgaciones Estatutarias y Regulatorias" : "Statutory & Regulatory Disclosures"}
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              {lang === "es" ? "Divulgaciones de MyIAD & AB Global" : "MyIAD Statutory Disclosures"}
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl">
              {lang === "es"
                ? "Divulgaciones legales, estatutos regulatorios y salvaguardas de protección al consumidor para los servicios y herramientas de myiad.com."
                : "Legal disclosures, statutory frameworks, and consumer protection guidelines governing products, simulations, and advisory consultations on myiad.com."}
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs text-slate-400">
              <span>{lang === "es" ? "Vigencia: 2026 • Edición Cumplimiento myiad.com" : "Effective: 2026 • myiad.com Compliance Edition"}</span>
              <span>•</span>
              <button
                onClick={() => setLang(lang === "es" ? "en" : "es")}
                className="text-secondary font-bold hover:underline cursor-pointer"
              >
                {lang === "es" ? "Read in English (EN)" : "Leer en Español (ES)"}
              </button>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-4xl mx-auto px-6 lg:px-10 py-16">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 space-y-12 leading-relaxed text-sm text-slate-700">
            
            {/* Regulatory Notice Banner */}
            <div className="p-5 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 text-xs md:text-sm flex items-start gap-3">
              <ShieldAlert size={22} className="text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm">
                  {lang === "es" ? "Aviso Estatutario para Consumidores:" : "Consumer Statutory Advisory:"}
                </p>
                <p className="mt-1">
                  {lang === "es"
                    ? "Los seguros de vida indexados (IUL), anualidades fijas indexadas y pólizas de gastos finales no son depósitos bancarios, no están asegurados por la FDIC ni garantizados por ninguna agencia gubernamental. Las garantías contractuales están respaldadas exclusivamente por la solidez financiera de la compañía aseguradora emisora."
                    : "Indexed Universal Life (IUL), fixed indexed annuities, and final expense policies are not bank deposits, are not FDIC insured, and are not obligations of or guaranteed by any governmental entity. All contract guarantees are backed solely by the financial strength and claims-paying ability of the issuing insurer."}
                </p>
              </div>
            </div>

            {/* Disclosure 1: FINRA Rule 2330 */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary font-bold text-lg border-b border-slate-100 pb-2">
                <Scale size={20} className="text-secondary" />
                <h2>
                  1. {lang === "es" ? "Regla FINRA 2330: Idoneidad en Anualidades Variables Diferidas" : "FINRA Rule 2330: Deferred Variable Annuity Suitability"}
                </h2>
              </div>
              <p>
                {lang === "es"
                  ? "Conforme a la Regla FINRA 2330 y los estándares modelo de la NAIC (Asociación Nacional de Comisionados de Seguros), cualquier recomendación relacionada con la compra, intercambio o reemplazo de una anualidad diferida debe satisfacer un estricto análisis de idoneidad y base razonable:"
                  : "Pursuant to FINRA Rule 2330 and National Association of Insurance Commissioners (NAIC) model regulations, all recommendations concerning the purchase, exchange, or replacement of deferred variable annuities are subject to rigorous suitability standards and supervisory review:"}
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs md:text-sm">
                <li>
                  <strong>{lang === "es" ? "Evaluación del Perfil del Cliente:" : "Comprehensive Customer Profile Assessment:"}</strong>{" "}
                  {lang === "es"
                    ? "El asesor debe verificar edad, horizonte de inversión, patrimonio líquido, necesidad de liquidez, situación fiscal y objetivos de ingresos garantizados de por vida antes de emitir una recomendación."
                    : "The practitioner must evaluate client age, investment time horizon, liquid net worth, existing liquidity requirements, tax status, and lifetime guaranteed income objectives."}
                </li>
                <li>
                  <strong>{lang === "es" ? "Evaluación de Intercambios Sección 1035:" : "Section 1035 Exchange & Surrender Evaluation:"}</strong>{" "}
                  {lang === "es"
                    ? "Cualquier intercambio de una póliza existente se analiza para determinar si el cliente incurrirá en cargos por rescate (surrender charges), pérdida de beneficios acumulados o reinicio de periodos de penalidad."
                    : "Any proposed exchange of an existing annuity is scrutinized for surrender charges, loss of accrued benefits, and newly imposed surrender periods to ensure the transaction provides substantial net benefit to the client."}
                </li>
              </ul>
            </div>

            {/* Disclosure 2: IRC §7702 and §7702A */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary font-bold text-lg border-b border-slate-100 pb-2">
                <BookOpen size={20} className="text-secondary" />
                <h2>
                  2. {lang === "es" ? "Código de Rentas Internas IRC §7702 y Prevención de MEC" : "Internal Revenue Code §7702 & Modified Endowment Contract (MEC) Rules"}
                </h2>
              </div>
              <p>
                {lang === "es"
                  ? "Las ilustraciones de seguros de vida universal indexados (IUL) para acumulación de efectivo y retiros libres de impuestos se estructuran bajo el Código de Rentas Internas §7702:"
                  : "Indexed Universal Life (IUL) illustrations modeling cash value accumulation and tax-free retirement distributions are structured under Internal Revenue Code Section 7702:"}
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs md:text-sm">
                <li>
                  <strong>{lang === "es" ? "Distribuciones Libres de Impuestos:" : "Tax-Advantaged Distributions:"}</strong>{" "}
                  {lang === "es"
                    ? "Los retiros se toman primero hasta el costo base (aportes) libres de impuestos sobre el ingreso. El exceso se accede típicamente mediante préstamos de póliza asegurados o variables no gravables, siempre que la póliza permanezca vigente hasta el fallecimiento."
                    : "Distributions are structured as basis withdrawals up to cumulative premiums, followed by non-taxable policy loans against cash surrender value. The policy must remain in force until death to avoid adverse tax consequences."}
                </li>
                <li>
                  <strong>{lang === "es" ? "Prueba de 7 Pagos (TAMRA §7702A):" : "TAMRA 7-Pay Test & MEC Limits:"}</strong>{" "}
                  {lang === "es"
                    ? "Si las primas pagadas exceden los límites estatutarios durante los primeros 7 años de la póliza, esta se clasifica como Contrato de Dotación Modificada (MEC), perdiendo el beneficio de préstamos libres de impuestos. MyIAD diseña pólizas monitoreando activamente los límites de MEC."
                    : "If cumulative premiums paid exceed statutory guideline limits during the first 7 years, the contract becomes classified as a Modified Endowment Contract (MEC), causing loans and withdrawals to be taxed on a LIFO (gain first) basis and potentially incurring a 10% IRS penalty if under age 59½."}
                </li>
              </ul>
            </div>

            {/* Disclosure 3: IUL 0% Floor Mechanics */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary font-bold text-lg border-b border-slate-100 pb-2">
                <Shield size={20} className="text-secondary" />
                <h2>
                  3. {lang === "es" ? "Mecánica del Piso Contractual del 0% y Costos de Póliza" : "Contractual 0% Floor Mechanics & Policy Deductions"}
                </h2>
              </div>
              <p>
                {lang === "es"
                  ? "En una póliza de IUL, el valor en efectivo indexado está protegido contra rendimientos negativos del mercado gracias al piso anual garantizado del 0%:"
                  : "Under an Indexed Universal Life (IUL) policy, cash values allocated to indexed strategies are protected against negative index performance by a contractual annual floor of 0%:"}
              </p>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs md:text-sm space-y-2 text-slate-700">
                <p>
                  <strong>{lang === "es" ? "Preservación del Principal vs. Gastos de Póliza:" : "Principal Protection vs. Recurring Monthly Charges:"}</strong>{" "}
                  {lang === "es"
                    ? "El piso del 0% garantiza que el interés acreditado por el índice bursátil nunca será negativo durante un año de caída del mercado. Sin embargo, la póliza continuará deduciendo mensualmente los costos de seguro de vida (COI), cargos administrativos y costo de jinetes opcionales. En años con 0% de interés indexado, el valor en efectivo puede disminuir debido a estas deducciones estatutarias."
                    : "The contractual 0% floor guarantees that the index credited interest rate will never be negative during market downturns. However, the policy continues to deduct monthly Cost of Insurance (COI), administrative fees, and optional rider costs. In a year where the index credits 0%, the cash value may decrease due to these legitimate recurring deductions."}
                </p>
                <p>
                  <strong>{lang === "es" ? "Límites de Participación (Caps & Spreads):" : "Index Caps, Participation Rates & Spreads:"}</strong>{" "}
                  {lang === "es"
                    ? "Los límites de rendimiento (caps) y tasas de participación son determinados periódicamente por la aseguradora según los costos del mercado de opciones y pueden variar a lo largo de la vida de la póliza."
                    : "Growth caps and participation rates are reset periodically by the carrier in response to option market pricing and fixed-income portfolio yields, and are subject to change subject to contractual minimum guarantees."}
                </p>
              </div>
            </div>

            {/* Disclosure 4: Living Benefits Riders */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary font-bold text-lg border-b border-slate-100 pb-2">
                <HeartPulse size={20} className="text-secondary" />
                <h2>
                  4. {lang === "es" ? "Beneficios en Vida (Accelerated Death Benefit Riders)" : "Living Benefits (Accelerated Death Benefit Riders)"}
                </h2>
              </div>
              <p>
                {lang === "es"
                  ? "Las cláusulas adicionales de aceleración de beneficios por enfermedad terminal, crónica o crítica permiten al titular acceder a una porción del beneficio por muerte en vida:"
                  : "Accelerated Death Benefit Riders for Terminal, Chronic, or Critical Illness permit policyholders to accelerate a portion of the policy death benefit while living:"}
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs md:text-sm">
                <li>
                  <strong>{lang === "es" ? "Reducción del Beneficio por Muerte:" : "Reduction of Death Benefit:"}</strong>{" "}
                  {lang === "es"
                    ? "Cualquier adelanto de beneficios en vida reduce de forma proporcional el beneficio por muerte disponible para los beneficiarios y el valor en efectivo de la póliza."
                    : "Accelerating death benefits under living benefit provisions will directly reduce the ultimate death benefit payable to beneficiaries as well as the accumulated cash surrender value."}
                </li>
                <li>
                  <strong>{lang === "es" ? "Calificación y Certificación Médica:" : "Medical Certification Required:"}</strong>{" "}
                  {lang === "es"
                    ? "El pago requiere certificación de un médico licenciado indicando que el asegurado cumple con los criterios de elegibilidad estipulados en el contrato."
                    : "Benefit eligibility requires written certification from a licensed healthcare physician demonstrating that the insured satisfies qualifying diagnostic criteria defined in the policy."}
                </li>
              </ul>
            </div>

            {/* Disclosure 5: Everest Funeral Concierge */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary font-bold text-lg border-b border-slate-100 pb-2">
                <Award size={20} className="text-secondary" />
                <h2>
                  5. {lang === "es" ? "Servicios de Everest Funeral Concierge" : "Everest Funeral Concierge Advisory Services"}
                </h2>
              </div>
              <p>
                {lang === "es"
                  ? "Everest Funeral Package, LLC es un proveedor independiente de servicios de conserjería y planificación funeraria que colabora con aseguradoras seleccionadas de gastos finales:"
                  : "Everest Funeral Package, LLC is an independent funeral planning and consumer advocacy concierge provider that partners with select life insurance underwriters:"}
              </p>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs md:text-sm space-y-1">
                <p>
                  <strong>{lang === "es" ? "Independencia Operativa:" : "Independent Operational Entity:"}</strong>{" "}
                  {lang === "es"
                    ? "Everest Funeral Package, LLC no es una compañía de seguros ni una funeraria. Los servicios de planificación previa y negociación de precios se proporcionan como un beneficio complementario adjunto a pólizas elegibles."
                    : "Everest Funeral Package, LLC is not an insurance company, funeral home, or cemetery. Pre-planning advisory and funeral pricing advocacy are provided as specialized third-party services bundled with eligible underwritten policies."}
                </p>
              </div>
            </div>

            {/* Disclosure 6: Non-Government Affiliation */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary font-bold text-lg border-b border-slate-100 pb-2">
                <Layers size={20} className="text-secondary" />
                <h2>
                  6. {lang === "es" ? "Aviso de No Afiliación Gubernamental (Militar & SGLI/VGLI)" : "Non-Governmental Affiliation Notice (Military & Veterans)"}
                </h2>
              </div>
              <p>
                {lang === "es"
                  ? "MyIAD National Insurance Solutions y AB Global Consulting son firmas privadas de asesoría patrimonial:"
                  : "MyIAD National Insurance Solutions and AB Global Consulting are privately owned advisory entities:"}
              </p>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs md:text-sm space-y-1 text-slate-700">
                <p>
                  {lang === "es"
                    ? "No estamos afiliados, asociados, autorizados ni respaldados por el Departamento de Asuntos de Veteranos de EE.UU. (VA), el Departamento de Defensa (DoD) ni las Fuerzas Armadas de EE.UU. Nuestros análisis sobre el reemplazo o transición de SGLI/VGLI a soluciones privadas de IUL representan consultoría financiera privada independiente."
                    : "We are not affiliated with, endorsed by, sponsored by, or connected to the U.S. Department of Veterans Affairs (VA), the U.S. Department of Defense (DoD), or any branch of the United States Armed Forces. Educational materials analyzing Servicemembers' Group Life Insurance (SGLI) or Veterans' Group Life Insurance (VGLI) transitions represent independent private financial consulting."}
                </p>
              </div>
            </div>

            {/* Disclosure 7: Toll-Free Verification & SMS */}
            <div className="space-y-4 p-6 bg-slate-50 rounded-2xl border-2 border-teal-500/30">
              <div className="flex items-center gap-2 text-teal-900 font-bold text-base">
                <Phone size={18} className="text-teal-600" />
                <span>
                  {lang === "es" 
                    ? "Divulgación de Mensajería SMS y Línea Gratuita (888) 887-3585" 
                    : "Toll-Free SMS Communications & Carrier Compliance (888-887-3585)"}
                </span>
              </div>
              <p className="text-xs md:text-sm text-slate-700">
                {lang === "es"
                  ? "Para cumplir cabalmente con las directrices de la CTIA y los requisitos de verificación de números Toll-Free de portadores de telecomunicaciones (Twilio, The Campaign Registry):"
                  : "In strict compliance with CTIA guidelines, TCPA regulations, and Toll-Free carrier verification mandates:"}
              </p>

              <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 space-y-2">
                <p>
                  <strong>{lang === "es" ? "Cláusula Estricta de Privacidad Móvil:" : "Mandatory Carrier Non-Sharing Clause:"}</strong><br />
                  <span className="italic">
                    "No mobile information will be shared with third parties/affiliates for marketing/promotional purposes. All other categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties."
                  </span>
                </p>
                <p>
                  {lang === "es"
                    ? "Para consultar el proceso detallado de consentimiento, palabras clave STOP/HELP y registrarse o cancelar sus preferencias de SMS:"
                    : "To review the comprehensive opt-in workflow, sample disclosures, STOP/HELP keywords, or manage messaging preferences:"}
                </p>
                <Link
                  href="/opt-in"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-bold transition-colors"
                >
                  <ExternalLink size={14} />
                  <span>{lang === "es" ? "Acceder a Página de Cumplimiento /opt-in" : "Access Toll-Free /opt-in Compliance Center"}</span>
                </Link>
              </div>
            </div>

            {/* Disclosure 8: Licensing */}
            <div className="space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-secondary" />
                {lang === "es" ? "Licenciamiento Profesional e Información de Supervisión" : "Professional Licensing & Agency Supervision"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
                <div>
                  <p className="font-bold text-slate-900">Angel Burgos</p>
                  <p>{lang === "es" ? "Licencia Florida 0215 (Vida, Salud y Anualidades Variables):" : "Florida 0215 Life, Health & Variable Annuity License:"} #G328926</p>
                  <p>WFG Agent Code: F6D9U</p>
                  <p className="mt-1 text-slate-500">
                    {lang === "es" ? "Jurisdicciones autorizadas: Florida, Puerto Rico y estados designados." : "Authorized resident/non-resident states: Florida, Puerto Rico, and designated reciprocal jurisdictions."}
                  </p>
                </div>
                <div>
                  <p className="font-bold text-slate-900">AB Global Consulting / MyIAD</p>
                  <p>{lang === "es" ? "Línea Gratuita:" : "Toll-Free:"} <a href="tel:18888873585" className="text-primary font-bold hover:underline">1-888-887-3585</a></p>
                  <p>{lang === "es" ? "Directo:" : "Direct:"} <a href="tel:13863331482" className="text-primary font-bold hover:underline">(386) 333-1482</a></p>
                  <p>Email: <a href="mailto:info@abglco.com" className="text-primary font-bold hover:underline">info@abglco.com</a></p>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200">
              <Link
                href="/"
                className="w-full sm:w-auto text-center px-6 py-3 bg-slate-900 hover:bg-secondary text-white font-bold text-xs rounded-xl shadow transition-all"
              >
                ← {lang === "es" ? "Volver al Inicio" : "Back to Home"}
              </Link>
              <div className="flex items-center gap-3 text-xs font-semibold">
                <Link href="/privacy" className="text-slate-600 hover:text-primary hover:underline">
                  {lang === "es" ? "Política de Privacidad" : "Privacy Policy"}
                </Link>
                <span>•</span>
                <Link href="/terms" className="text-slate-600 hover:text-primary hover:underline">
                  {lang === "es" ? "Términos de Servicio" : "Terms of Service"}
                </Link>
                <span>•</span>
                <Link href="/opt-in" className="text-teal-700 hover:text-teal-900 hover:underline">
                  {lang === "es" ? "Cumplimiento SMS /opt-in" : "SMS Opt-In Compliance"}
                </Link>
              </div>
            </div>

          </div>
        </section>
      </div>

      <ComplianceDisclosure />
    </main>
  );
}