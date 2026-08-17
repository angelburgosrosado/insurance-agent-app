import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ComplianceDisclosure } from "@/components/ui/ComplianceDisclosure";
import { AgentProfileCard } from "@/components/ui/AgentProfileCard";
import { ConsultationForm } from "@/components/consultation-form";
import { Navbar } from "@/components/Navbar";
import { LeadMagnetSection } from "@/components/LeadMagnetSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FloatingMobileBar } from "@/components/FloatingMobileBar";

export default function Home() {
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
                State Licensed 0215 Practitioner • Agent F6D9U
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] text-white tracking-tight">
              Engineering Certainty for Your Financial Future
            </h1>
            
            <p className="text-base sm:text-lg text-white/85 max-w-xl leading-relaxed">
              Preserving family legacies through data-backed Life Insurance, Variable Annuities, Health Solutions, and Everest Funeral Concierge planning. Independent, analytical guidance with zero sales pressure.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/#consultation">
                <Button variant="secondary" className="!bg-secondary !text-white !border-secondary hover:!bg-secondary/90 shadow-xl px-8 py-4 text-sm md:text-base font-bold">
                  Schedule Free Consultation
                </Button>
              </Link>
              <Link href="/#interactive-tools">
                <Button variant="secondary" className="!text-white !border-white/30 hover:!bg-white/10 px-6 py-4 text-sm md:text-base font-medium">
                  Try Interactive Simulators ↓
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-6 pt-3 text-xs text-white/70">
              <span className="flex items-center gap-1.5">
                <span className="text-emerald-400 font-bold">✓</span> 100% Independent Brokerage
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-emerald-400 font-bold">✓</span> Bilingual (English / Español)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-emerald-400 font-bold">✓</span> FL License #G328926
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
                <p className="font-bold text-sm">Strategic Family Protection & Wealth Preservation</p>
                <p className="text-white/80">Tailored 0215 Life, Health & Variable Annuity Solutions</p>
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
            Authorized Carrier Network & Partnerships:
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

      {/* NEW SECTION: Interactive Financial Mini-Apps Showcase */}
      <section className="py-20 px-6 lg:px-10 bg-slate-50 border-b border-slate-200" id="interactive-tools">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 border border-secondary/20 rounded-full text-secondary text-xs font-bold uppercase tracking-wider mb-2">
                Exportable Client Tools
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                Interactive Financial Simulators
              </h2>
              <p className="text-slate-600 text-sm md:text-base max-w-2xl mt-1">
                Explore real-time data models and export customized scenarios via SMS, Email, or personalized links.
              </p>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
              Live Mathematical Projections
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tool Card 1: IUL Wealth Simulator */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary text-2xl mb-6">
                  📊
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-secondary">Life & Retirement</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">Shareable</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-secondary transition-colors">
                  IUL Wealth & 0% Floor Engine
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  Simulate compounding index upside, test the 0% market crash protection floor, and estimate tax-free retirement loan payouts.
                </p>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1 mb-6">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Tax-Free Income:</span>
                    <strong className="text-slate-900">IRS Section 7702</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Downside Risk:</span>
                    <strong className="text-emerald-600 font-bold">Guaranteed 0% Floor</strong>
                  </div>
                </div>
              </div>
              <Link href="/tools/iul-calculator" className="block w-full">
                <Button variant="primary" className="w-full !bg-slate-900 hover:!bg-secondary text-xs font-bold py-3 transition-colors">
                  Launch IUL Simulator →
                </Button>
              </Link>
            </div>

            {/* Tool Card 2: Annuity Paycheck Estimator */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary text-2xl mb-6">
                  📈
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-secondary">Private Pension</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">Shareable</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-secondary transition-colors">
                  Guaranteed Annuity Paycheck Tool
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  Calculate guaranteed lifetime monthly paychecks from 401(k) / IRA rollovers and eliminate longevity risk.
                </p>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1 mb-6">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Paycheck Guarantee:</span>
                    <strong className="text-slate-900">Lifetime Paycheck</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Rollover Tax Status:</span>
                    <strong className="text-emerald-600 font-bold">100% Tax-Deferred</strong>
                  </div>
                </div>
              </div>
              <Link href="/tools/annuity-estimator" className="block w-full">
                <Button variant="primary" className="w-full !bg-slate-900 hover:!bg-secondary text-xs font-bold py-3 transition-colors">
                  Launch Annuity Estimator →
                </Button>
              </Link>
            </div>

            {/* Tool Card 3: Everest Funeral Concierge Savings */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary text-2xl mb-6">
                  🕊️
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-secondary">Everest / WSG Concierge</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">Shareable</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-secondary transition-colors">
                  Funeral Concierge Savings Calculator
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  Compare retail mortuary prices against Everest negotiated rates and review 24-48 hour expedited claim funding.
                </p>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1 mb-6">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Average Savings:</span>
                    <strong className="text-emerald-600 font-bold">$3,500+ / family</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Claim Payout:</span>
                    <strong className="text-slate-900">24 to 48 Hours</strong>
                  </div>
                </div>
              </div>
              <Link href="/tools/funeral-cost-savings" className="block w-full">
                <Button variant="primary" className="w-full !bg-slate-900 hover:!bg-secondary text-xs font-bold py-3 transition-colors">
                  Launch Funeral Calculator →
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
              Comprehensive Portfolio
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
              Strategic Protection Pillars
            </h2>
            <p className="text-base text-slate-600 max-w-2xl mt-1">
              Every plan is built using institutional-grade carriers tailored to Florida regulatory frameworks and individual financial goals.
            </p>
          </div>
          <div className="flex gap-2">
            <span className="px-4 py-2 bg-slate-100 rounded-full text-xs font-bold text-primary border border-slate-200">
              0215 Certified Advisory
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
                  Wealth & Protection
                </span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Life Insurance & Indexed Universal Life (IUL)</h3>
              <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                Permanent insurance structured with market index growth, guaranteed 0% downside protection, accelerated living benefits, and tax-free policy loans.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <Link href="/services/life-insurance" className="p-4 bg-slate-50 rounded-2xl border border-slate-200 hover:border-secondary transition-colors block">
                  <p className="font-bold text-sm text-slate-900 mb-1">Nationwide Heritage®</p>
                  <p className="text-xs text-slate-500">Legacy-focused permanent protection with cash accumulation.</p>
                </Link>
                <Link href="/services/life-insurance" className="p-4 bg-slate-50 rounded-2xl border border-slate-200 hover:border-secondary transition-colors block">
                  <p className="font-bold text-sm text-slate-900 mb-1">Effortless Life</p>
                  <p className="text-xs text-slate-500">Fast digital underwriting without invasive exams.</p>
                </Link>
              </div>
            </div>
            <Link className="inline-flex items-center gap-2 font-bold text-secondary hover:underline text-sm" href="/services/life-insurance">
              Explore Life Insurance & IUL Solutions &rarr;
            </Link>
          </div>

          {/* 2. Variable Annuities */}
          <div className="md:col-span-5 bg-[#001c38] text-white p-8 rounded-3xl shadow-sm flex flex-col justify-between reveal">
            <div>
              <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center text-white text-xl mb-6">
                📈
              </div>
              <h3 className="text-2xl font-bold mb-2">Variable & Indexed Annuities</h3>
              <p className="text-white/80 mb-6 leading-relaxed text-sm">
                Contractually guaranteed lifetime paychecks and 401(k) / IRA rollovers to eliminate longevity and sequence-of-returns risks.
              </p>
              <div className="p-4 bg-white/10 rounded-2xl border border-white/20 mb-6 space-y-1">
                <p className="text-xs uppercase font-bold text-secondary">Lifetime Income Rider (GLWB)</p>
                <p className="text-xs text-white/70">Pacific Life & Transamerica Principal Optimizer</p>
              </div>
            </div>
            <Link className="inline-flex items-center gap-2 font-bold text-secondary hover:text-white transition-colors text-sm" href="/services/variable-annuities">
              Review Annuity Strategies &rarr;
            </Link>
          </div>

          {/* 3. Final Expense & Everest Concierge */}
          <div className="md:col-span-6 bg-white border border-slate-200 p-8 rounded-3xl shadow-sm hover:shadow-md transition-all reveal flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="h-12 w-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary text-xl">
                  🕊️
                </div>
                <span className="text-xs font-bold text-secondary uppercase tracking-widest bg-secondary/10 px-3 py-1 rounded-full">
                  Everest / WSG Partner
                </span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Final Expense & Everest Concierge</h3>
              <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                Shield your family from sudden funeral costs with expedited 24-48 hour payouts and 24/7 Everest Concierge price negotiation.
              </p>
            </div>
            <Link className="inline-flex items-center gap-2 font-bold text-secondary hover:underline text-sm" href="/services/final-expense">
              Learn About Funeral Concierge Services &rarr;
            </Link>
          </div>

          {/* 4. Health & Medicare & LTC */}
          <div className="md:col-span-6 bg-white border border-slate-200 p-8 rounded-3xl shadow-sm hover:shadow-md transition-all reveal flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="h-12 w-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary text-xl">
                  🏥
                </div>
                <span className="text-xs font-bold text-secondary uppercase tracking-widest bg-secondary/10 px-3 py-1 rounded-full">
                  Healthcare & LTC
                </span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Health Coverage & LTC Asset Shield</h3>
              <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                Navigating Medicare Supplements (Medigap Plan G/N), ACA subsidies, and Nationwide CareMatters Together Cash-Indemnity Long-Term Care.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link className="font-bold text-secondary hover:underline text-sm" href="/services/health-insurance">
                Health & Medicare &rarr;
              </Link>
              <span className="text-slate-300">•</span>
              <Link className="font-bold text-secondary hover:underline text-sm" href="/services/long-term-care">
                Long-Term Care Planning &rarr;
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
              Why Families & Professionals Choose AB Global
            </h2>
            <p className="text-white/75 text-sm md:text-base leading-relaxed">
              We reject high-pressure sales and proprietary quotas. Our process is rooted in engineering logic, transparency, and fiduciary-grade care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-3">
              <span className="text-secondary text-2xl font-bold">01</span>
              <h3 className="text-lg font-bold text-white">Independent Brokerage</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Direct access to multiple tier-1 carriers, allowing us to find the most favorable underwriting and lowest cost.
              </p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-3">
              <span className="text-secondary text-2xl font-bold">02</span>
              <h3 className="text-lg font-bold text-white">Engineering Precision</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Clear cash value illustrations, guaranteed floor models, and stress-tested market simulations.
              </p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-3">
              <span className="text-secondary text-2xl font-bold">03</span>
              <h3 className="text-lg font-bold text-white">Bilingual Advisory</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Complete advisory provided fluently in English and Spanish across Florida and beyond.
              </p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-3">
              <span className="text-secondary text-2xl font-bold">04</span>
              <h3 className="text-lg font-bold text-white">Lifelong Support</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Dedicated claims assistance, policy reviews, and beneficiary updates over the life of your contract.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Agent Profile and Lead Form */}
      <section className="py-24 bg-slate-50 border-t border-slate-200" id="consultation">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Column: Agent Profile and Pitch */}
            <div className="flex flex-col reveal space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 border border-secondary/20 rounded-full text-secondary text-xs font-bold uppercase tracking-wider mb-3">
                  Direct Advisor Access
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-4">
                  Anchor Your Legacy with AB Global
                </h2>
                <p className="text-base text-slate-600 leading-relaxed">
                  Bilingual independent advisory across Florida. Licensed agent Angel Burgos (G328926 / WFG F6D9U) provides transparent, analytical guidance.
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
                <p className="font-bold text-slate-900 text-sm">Direct Office Contact Details:</p>
                <p>📍 <strong>Orlando Office:</strong> 9501 Satellite Blvd, Suite 105, Orlando, FL 32837</p>
                <p>📱 <strong>Mobile / Text:</strong> <a href="tel:3863331482" className="text-secondary font-bold hover:underline">(386) 333-1482</a></p>
                <p>📞 <strong>Office Phone:</strong> <a href="tel:4079306226" className="text-secondary font-bold hover:underline">(407) 930-6226</a></p>
              </div>
            </div>
            
            {/* Right Column: Lead Form */}
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-200 reveal reveal-delay">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-primary mb-2">Request a Personalized Consultation</h3>
                <p className="text-slate-600 text-sm">Tell us what you are evaluating. Angel Burgos and the AB Global Consulting team will follow up promptly.</p>
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
