"use client";

import type { ServiceInfo } from "@/lib/content/services";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Navbar } from "@/components/Navbar";
import { ComplianceDisclosure } from "@/components/ui/ComplianceDisclosure";
import { IulCalculator } from "@/components/tools/IulCalculator";
import { AnnuityEstimator } from "@/components/tools/AnnuityEstimator";
import { FuneralCostCalculator } from "@/components/tools/FuneralCostCalculator";
import { useLanguage } from "@/context/LanguageContext";
import { dictionary } from "@/lib/i18n/translations";
import { FloatingMobileBar } from "@/components/FloatingMobileBar";

export function ServicePageLayout({ service }: { service: ServiceInfo }) {
  const { lang } = useLanguage();
  const t = dictionary[lang];

  const title = lang === "es" && service.titleEs ? service.titleEs : service.title;
  const tagline = lang === "es" && service.taglineEs ? service.taglineEs : service.tagline;
  const category = lang === "es" && service.categoryEs ? service.categoryEs : service.category;
  const shortDescription = lang === "es" && service.shortDescriptionEs ? service.shortDescriptionEs : service.shortDescription;
  const keyBenefits = lang === "es" && service.keyBenefitsEs ? service.keyBenefitsEs : service.keyBenefits;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      {/* Top Breadcrumbs & Back Navigation */}
      <div className="bg-[#001428] border-b border-white/10 text-white/80 py-3 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs md:text-sm">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">
              {lang === "es" ? "Inicio" : "Home"}
            </Link>
            <span>/</span>
            <span className="text-secondary font-medium">{category}</span>
            <span>/</span>
            <span className="text-white truncate max-w-[200px] md:max-w-none">{title}</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-xs">
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
              <span className="text-secondary text-xs md:text-sm font-bold tracking-wide uppercase">{tagline}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
              {title}
            </h1>
            <p className="text-base md:text-xl text-white/85 max-w-3xl leading-relaxed">
              {shortDescription}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button href="/#consultation" variant="secondary" className="!bg-secondary !text-white !border-secondary hover:!bg-secondary/90 shadow-lg px-8 py-3.5 font-bold">
                {lang === "es" ? "Solicitar Cotización Personalizada" : "Request a Personalized Quote"}
              </Button>
              <Button href="tel:3863331482" variant="secondary" className="!text-white !border-white/30 hover:!bg-white/10 px-6 py-3.5">
                {lang === "es" ? "Llamar a Angel Burgos (Directo)" : "Call Angel Burgos (Direct)"}
              </Button>
            </div>
          </div>

          {/* Quick Carrier Overview Card */}
          <div className="lg:col-span-4 bg-white/5 border border-white/15 backdrop-blur-sm rounded-2xl p-6 md:p-8">
            <h3 className="text-xs uppercase tracking-widest text-secondary font-bold mb-4">
              {lang === "es" ? "Red de Aseguradoras Autorizadas" : "Authorized Carrier Network"}
            </h3>
            <div className="space-y-3">
              {service.featuredCarriers.map((carrier, i) => (
                <div key={i} className="p-3 bg-white/10 rounded-lg border border-white/10">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-sm text-white">{carrier.name}</p>
                    {carrier.link && (
                      <a href={carrier.link} target="_blank" rel="noopener noreferrer" className="text-xs text-secondary hover:text-white transition-colors">
                        {lang === "es" ? "Ver Aseguradora ↗" : "View Carrier ↗"}
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-white/70 mt-1">
                    {lang === "es" && carrier.highlightEs ? carrier.highlightEs : carrier.highlight}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Interactive Mini-App for this Service */}
      {service.slug === "life-insurance" && (
        <section className="max-w-7xl mx-auto px-6 lg:px-10 -mt-10 relative z-20">
          <IulCalculator isStandalone={true} />
        </section>
      )}

      {service.slug === "variable-annuities" && (
        <section className="max-w-7xl mx-auto px-6 lg:px-10 -mt-10 relative z-20">
          <AnnuityEstimator isStandalone={true} />
        </section>
      )}

      {service.slug === "final-expense" && (
        <section className="max-w-7xl mx-auto px-6 lg:px-10 -mt-10 relative z-20">
          <FuneralCostCalculator isStandalone={true} />
        </section>
      )}

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Deep Dive & FAQs */}
        <div className="lg:col-span-8 space-y-12">
          {/* Key Strategic Benefits */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">
              {lang === "es" ? "Beneficios Estratégicos Clave" : "Key Strategic Benefits"}
            </h2>
            <ul className="space-y-4">
              {keyBenefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-700">
                  <div className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span className="text-sm md:text-base leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Detailed Editorial Sections */}
          <div className="space-y-8">
            {service.detailedSections.map((section, idx) => {
              const heading = lang === "es" && section.headingEs ? section.headingEs : section.heading;
              const content = lang === "es" && section.contentEs ? section.contentEs : section.content;
              const subPoints = lang === "es" && section.subPointsEs ? section.subPointsEs : section.subPoints;

              return (
                <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="text-xl font-bold text-slate-900">{heading}</h3>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed">{content}</p>
                  {subPoints && (
                    <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600 pt-2">
                      {subPoints.map((point, pIdx) => (
                        <li key={pIdx}>{point}</li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>

          {/* FAQ Section */}
          {service.faqs.length > 0 && (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">
                {lang === "es" ? "Preguntas Frecuentes" : "Frequently Asked Questions"}
              </h2>
              <div className="space-y-6">
                {service.faqs.map((faq, fIdx) => {
                  const question = lang === "es" && faq.questionEs ? faq.questionEs : faq.question;
                  const answer = lang === "es" && faq.answerEs ? faq.answerEs : faq.answer;

                  return (
                    <div key={fIdx} className="border-b border-slate-100 pb-6 last:border-0 last:pb-0 space-y-2">
                      <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
                        <span className="text-secondary font-black">Q:</span> {question}
                      </h4>
                      <p className="text-slate-600 text-sm leading-relaxed pl-6">
                        {answer}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Advisor Profile & Consultation Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 sticky top-28">
            <div className="flex items-center gap-4">
              <img 
                src="/images/angel-burgos.png" 
                alt="Angel Burgos" 
                className="w-16 h-16 rounded-xl object-cover border-2 border-secondary/40 shadow-sm"
              />
              <div>
                <p className="font-bold text-slate-900">Angel Burgos</p>
                <p className="text-xs text-secondary font-semibold">FL License: #G328926</p>
                <p className="text-[11px] text-slate-500">0215 Life, Health & Annuities</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 space-y-2">
              <p className="font-bold text-slate-900">
                {lang === "es" ? "¿Necesita una Ilustración Personalizada?" : "Need a Tailored Illustration?"}
              </p>
              <p>
                {lang === "es"
                  ? "Revisamos sus objetivos, modelamos escenarios de tasas y diseñamos la estrategia óptima para su familia."
                  : "We stress-test carrier illustrations and run side-by-side scenarios to maximize your cash value and guaranteed income."}
              </p>
            </div>

            <Button href="/#consultation" variant="primary" className="w-full !bg-secondary !text-white !border-secondary hover:!bg-secondary/90 font-bold py-3 text-sm shadow-md">
              {t.nav_consultation}
            </Button>

            <div className="space-y-2 pt-2 border-t border-slate-100 text-center">
              <a href="tel:3863331482" className="block text-xs font-bold text-slate-700 hover:text-secondary">
                📞 (386) 333-1482
              </a>
              <a 
                href={
                  lang === "es"
                    ? `https://wa.me/13863331482?text=Hola%20Angel,%20estoy%20viendo%20la%20pagina%20de%20${encodeURIComponent(title)}%20y%20deseo%20mas%20informacion.`
                    : `https://wa.me/13863331482?text=Hello%20Angel,%20I%20am%20reviewing%20${encodeURIComponent(title)}%20and%20would%20like%20information.`
                }
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center gap-1 text-xs font-bold text-emerald-600 hover:underline"
              >
                <span>💬</span> {lang === "es" ? "Chatear en WhatsApp" : "Chat on WhatsApp"}
              </a>
            </div>
          </div>
        </div>
      </section>

      <FloatingMobileBar />
      <ComplianceDisclosure />
    </main>
  );
}
