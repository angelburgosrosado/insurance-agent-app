import type { ServiceInfo } from "@/lib/content/services";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Navbar } from "@/components/Navbar";
import { ComplianceDisclosure } from "@/components/ui/ComplianceDisclosure";
import { IulCalculator } from "@/components/tools/IulCalculator";
import { AnnuityEstimator } from "@/components/tools/AnnuityEstimator";
import { FuneralCostCalculator } from "@/components/tools/FuneralCostCalculator";

export function ServicePageLayout({ service }: { service: ServiceInfo }) {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      {/* Top Breadcrumbs & Back Navigation */}
      <div className="bg-[#001428] border-b border-white/10 text-white/80 py-3 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs md:text-sm">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-secondary font-medium">{service.category}</span>
            <span>/</span>
            <span className="text-white truncate max-w-[200px] md:max-w-none">{service.title}</span>
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
              <span className="text-secondary text-xs md:text-sm font-bold tracking-wide uppercase">{service.tagline}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
              {service.title}
            </h1>
            <p className="text-base md:text-xl text-white/85 max-w-3xl leading-relaxed">
              {service.shortDescription}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/#consultation">
                <Button variant="secondary" className="!bg-secondary !text-white !border-secondary hover:!bg-secondary/90 shadow-lg px-8 py-3.5 font-bold">
                  Request a Personalized Quote
                </Button>
              </Link>
              <a href="tel:3863331482">
                <Button variant="secondary" className="!text-white !border-white/30 hover:!bg-white/10 px-6 py-3.5">
                  Call Angel Burgos (Direct)
                </Button>
              </a>
            </div>
          </div>

          {/* Quick Carrier Overview Card */}
          <div className="lg:col-span-4 bg-white/5 border border-white/15 backdrop-blur-sm rounded-2xl p-6 md:p-8">
            <h3 className="text-xs uppercase tracking-widest text-secondary font-bold mb-4">Authorized Carrier Network</h3>
            <div className="space-y-3">
              {service.featuredCarriers.map((carrier, i) => (
                <div key={i} className="p-3 bg-white/10 rounded-lg border border-white/10">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-sm text-white">{carrier.name}</p>
                    {carrier.link && (
                      <a href={carrier.link} target="_blank" rel="noopener noreferrer" className="text-xs text-secondary hover:text-white transition-colors">
                        View Carrier ↗
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-white/70 mt-1">{carrier.highlight}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Detailed Insights & Breakdown */}
        <div className="lg:col-span-8 space-y-12">
          {/* Embedded Interactive Tools */}
          {service.slug === "life-insurance" && (
            <section className="space-y-4">
              <IulCalculator />
            </section>
          )}

          {service.slug === "variable-annuities" && (
            <section className="space-y-4">
              <AnnuityEstimator />
            </section>
          )}

          {service.slug === "final-expense" && (
            <section className="space-y-4">
              <FuneralCostCalculator />
            </section>
          )}

          {/* Key Benefits */}
          <section className="bg-white p-8 md:p-10 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <span className="h-8 w-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary text-base font-bold">✓</span>
              Strategic Benefits & Guarantees
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {service.keyBenefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50/80 border border-slate-100 hover:border-secondary/30 transition-colors">
                  <span className="h-5 w-5 rounded-full bg-secondary text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</span>
                  <p className="text-sm md:text-base text-slate-700 leading-snug">{benefit}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Detailed Sections */}
          {service.detailedSections.map((sec, idx) => (
            <section key={idx} className="bg-white p-8 md:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">{sec.heading}</h2>
              <p className="text-slate-600 leading-relaxed text-base">{sec.content}</p>
              {sec.subPoints && sec.subPoints.length > 0 && (
                <div className="space-y-3 pt-3">
                  {sec.subPoints.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border-l-4 border-secondary">
                      <p className="text-sm text-slate-700 leading-relaxed">{pt}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}

          {/* External Authorized Tools & Guides */}
          {service.externalTools && service.externalTools.length > 0 && (
            <section className="bg-[#002244] text-white p-8 md:p-10 rounded-2xl border border-white/10 shadow-lg">
              <h2 className="text-2xl font-bold mb-3">Authorized Tools & Consumer Guides</h2>
              <p className="text-white/80 text-sm mb-6">Explore interactive illustrations, carrier guides, and planning toolkits directly from our authorized partner platforms.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.externalTools.map((tool, tIdx) => (
                  <div key={tIdx} className="p-5 bg-white/10 rounded-xl border border-white/15 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-base text-white mb-1.5">{tool.name}</h4>
                      <p className="text-xs text-white/70 leading-relaxed mb-4">{tool.description}</p>
                    </div>
                    {tool.isExternal ? (
                      <a 
                        href={tool.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-secondary bg-white px-4 py-2 rounded hover:bg-slate-100 transition-colors w-fit"
                      >
                        Launch Portal / Guide ↗
                      </a>
                    ) : (
                      <Link 
                        href={tool.url}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-secondary bg-white px-4 py-2 rounded hover:bg-slate-100 transition-colors w-fit"
                      >
                        Access Tool →
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* FAQs */}
          {service.faqs.length > 0 && (
            <section className="bg-white p-8 md:p-10 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {service.faqs.map((faq, index) => (
                  <div key={index} className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                    <h3 className="font-bold text-base text-slate-900 mb-2">{faq.question}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Sidebar: Advisor Card & Consultation Trigger */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm sticky top-28 space-y-6">
            <div className="border-b border-slate-100 pb-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 border border-secondary/20 rounded-full mb-3">
                <span className="text-xs font-bold text-secondary">0215 Licensed Advisor</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Angel Burgos</h3>
              <p className="text-xs text-slate-500 font-medium">Florida License #G328926 • Agent F6D9U</p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Orlando, FL • Bilingual (EN / ES)</p>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Every family and portfolio is unique. We provide clear, zero-pressure comparisons across top-rated carriers to find the coverage that fits your exact goals.
            </p>

            <div className="space-y-3 pt-2">
              <Link href="/#consultation" className="block w-full">
                <Button variant="primary" className="w-full !bg-secondary !text-white !border-secondary hover:!bg-secondary/90 py-3 text-sm font-bold shadow-md">
                  Book Free Consultation
                </Button>
              </Link>
              <Link href="/about" className="block w-full">
                <Button variant="outline" className="w-full py-2.5 text-xs text-slate-700 hover:bg-slate-50">
                  View Advisor Profile & Credentials
                </Button>
              </Link>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 text-xs space-y-2 text-slate-600">
              <p className="font-semibold text-slate-900">Direct Office Contact:</p>
              <p>📍 9501 Satellite Blvd, Suite 105, Orlando, FL</p>
              <p>📞 Phone: <a href="tel:3863331482" className="text-secondary font-bold hover:underline">(386) 333-1482</a></p>
              <p>🏢 Office: (407) 930-6226</p>
            </div>
          </div>
        </div>
      </div>

      <ComplianceDisclosure />
    </main>
  );
}

