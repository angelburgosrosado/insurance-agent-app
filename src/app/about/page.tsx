import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ComplianceDisclosure } from "@/components/ui/ComplianceDisclosure";
import { Navbar } from "@/components/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Angel Burgos | Licensed Financial Professional (0215) | AB Global Consulting",
  description: "Learn more about Angel Burgos, Florida State Licensed 0215 Practitioner (G328926), providing expert guidance on Life Insurance, Variable Annuities, Health, and Funeral Concierge planning.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      {/* Top Breadcrumb Header */}
      <div className="bg-[#001428] border-b border-white/10 text-white/80 py-3 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs md:text-sm">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-medium">About Angel Burgos</span>
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
                Founder & Strategic Financial Advisor
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
              Angel Burgos
            </h1>
            <p className="text-lg md:text-xl text-white/85 max-w-3xl leading-relaxed">
              Combining an analytical, engineering-driven mindset with premier independent brokerage access to protect what matters most—your family, your health, and your retirement.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/#consultation">
                <Button variant="secondary" className="!bg-secondary !text-white !border-secondary hover:!bg-secondary/90 shadow-lg px-8 py-3.5 font-bold">
                  Schedule 1-on-1 Consultation
                </Button>
              </Link>
              <a href="tel:3863331482">
                <Button variant="secondary" className="!text-white !border-white/30 hover:!bg-white/10 px-6 py-3.5">
                  Direct: (386) 333-1482
                </Button>
              </a>
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
                  <span className="text-white/60">Licensure:</span>
                  <span className="font-semibold text-white">0215 Life, Health & Annuities</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Languages:</span>
                  <span className="font-semibold text-emerald-400">English & Español</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Office:</span>
                  <span className="font-semibold text-white">Orlando, FL</span>
                </div>
              </div>

              {/* Direct Messaging & Social Channels */}
              <div className="pt-2 border-t border-white/10 space-y-2">
                <p className="text-[11px] font-bold text-secondary uppercase tracking-wider text-center">Connect & Message Direct</p>
                <div className="grid grid-cols-2 gap-2 text-center text-xs font-semibold">
                  <a 
                    href="https://wa.me/13863331482?text=Hello%20Angel,%20I%20would%20like%20to%20learn%20more%20about%20AB%20Global%20Consulting." 
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
              <h2 className="text-3xl font-bold text-slate-900">An Analytical, Client-First Approach</h2>
              <p className="text-slate-600 leading-relaxed text-base">
                At AB Global Consulting, we believe insurance and financial decisions should be clear, transparent, and built entirely around your personal goals—not sales quotas or high-pressure tactics. 
              </p>
              <p className="text-slate-600 leading-relaxed text-base">
                As an independent brokerage under the World Financial Group (WFG) platform, Angel Burgos is not captive to any single insurance company. This independence enables us to objectively shop and structure solutions from America’s premier institutions (including Nationwide, Transamerica, Pacific Life, Mutual of Omaha, and Everest Funeral Concierge), ensuring your portfolio gets top-tier benefits at optimal pricing.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-secondary font-bold text-lg">01. Independent Access</span>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    Unbiased recommendations comparing multiple A-rated carriers to match your exact financial blueprint.
                  </p>
                </div>
                <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-secondary font-bold text-lg">02. Engineering Precision</span>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    Data-backed policy illustrations showing guaranteed floors, cap rates, cash value projections, and tax implications.
                  </p>
                </div>
                <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-secondary font-bold text-lg">03. Bilingual Advisory</span>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    Clear, culturally attuned communication in English and Spanish for individuals and business owners across Florida.
                  </p>
                </div>
                <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-secondary font-bold text-lg">04. Lifelong Support</span>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    Annual policy reviews, beneficiary updates, and claims assistance when your family needs us most.
                  </p>
                </div>
              </div>
            </div>

            {/* Core Practice Areas */}
            <div className="bg-white p-8 md:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Comprehensive Solutions Spectrum</h2>
              <div className="space-y-4">
                <Link href="/services/life-insurance" className="block p-5 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">Life Insurance & Indexed Universal Life (IUL)</h3>
                    <span className="text-secondary font-bold text-sm">Learn More →</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">Tax-free death benefits, living benefit riders, and 0% floor market upside accumulation.</p>
                </Link>

                <Link href="/services/variable-annuities" className="block p-5 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">Variable & Fixed Indexed Annuities</h3>
                    <span className="text-secondary font-bold text-sm">Learn More →</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">Guaranteed lifetime income streams and 401(k) / IRA rollover strategies.</p>
                </Link>

                <Link href="/services/final-expense" className="block p-5 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">Final Expense & Everest Funeral Concierge</h3>
                    <span className="text-secondary font-bold text-sm">Learn More →</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">Immediate 24-48 hr payouts, 24/7 Everest concierge negotiation, and complete family relief.</p>
                </Link>

                <Link href="/services/health-insurance" className="block p-5 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">Health Coverage & Medicare Solutions</h3>
                    <span className="text-secondary font-bold text-sm">Learn More →</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">ACA marketplace subsidy navigation, private PPO coverage, and Medicare Supplement (Medigap) plans.</p>
                </Link>

                <Link href="/services/long-term-care" className="block p-5 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">Long-Term Care Planning (Cash-Indemnity)</h3>
                    <span className="text-secondary font-bold text-sm">Learn More →</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">Asset-based LTC solutions (Nationwide CareMatters Together) with flexible cash payouts.</p>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Office & Direct Contact Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm sticky top-28 space-y-6">
              <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">Office & Direct Access</h3>

              <div className="space-y-4 text-sm text-slate-700">
                <div>
                  <p className="font-semibold text-slate-900">Orlando Office Location:</p>
                  <p className="text-slate-600 mt-0.5">9501 Satellite Blvd, Suite 105</p>
                  <p className="text-slate-600">Orlando, FL 32837</p>
                </div>

                <div>
                  <p className="font-semibold text-slate-900">Direct Contact Numbers:</p>
                  <p className="mt-1">
                    📱 Mobile / Text: <a href="tel:3863331482" className="text-secondary font-bold hover:underline">(386) 333-1482</a>
                  </p>
                  <p>
                    📞 Office Phone: <a href="tel:4079306226" className="text-secondary font-bold hover:underline">(407) 930-6226</a>
                  </p>
                  <p>
                    📠 Office Fax: (407) 574-4621
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-slate-900">Verified Affiliations:</p>
                  <ul className="list-disc list-inside text-xs text-slate-600 space-y-1 mt-1">
                    <li>World Financial Group (WFG)</li>
                    <li>Transamerica Financial Advisors</li>
                    <li>WSG / Everest Funeral Concierge</li>
                    <li>Nationwide Financial</li>
                    <li>Pacific Life</li>
                  </ul>
                </div>
              </div>

              <div className="pt-2 space-y-3">
                <Link href="/#consultation" className="block w-full">
                  <Button variant="primary" className="w-full !bg-secondary !text-white !border-secondary hover:!bg-secondary/90 py-3 text-sm font-bold shadow-md">
                    Schedule Free Consultation
                  </Button>
                </Link>
                <a 
                  href="https://agents.worldfinancialgroup.com/Angel-Burgos-F6D9U" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block w-full text-center text-xs font-bold text-secondary bg-slate-100 hover:bg-slate-200 py-2.5 rounded transition-colors"
                >
                  Visit WFG Agent Directory Profile ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ComplianceDisclosure />
    </main>
  );
}
