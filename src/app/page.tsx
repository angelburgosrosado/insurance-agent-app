import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ComplianceDisclosure } from "@/components/ui/ComplianceDisclosure";
import { AgentProfileCard } from "@/components/ui/AgentProfileCard";
import { ConsultationForm } from "@/components/consultation-form";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* TopNavBar */}
      <header className="bg-surface-card border-b border-outline-light fixed top-0 w-full z-50">
        <nav className="flex justify-between items-center px-6 lg:px-10 w-full max-w-7xl mx-auto h-20">
          <div className="flex items-center gap-2">
            <span className="text-xl md:text-2xl font-bold text-primary tracking-tight">AB Global Consulting</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link className="text-sm font-semibold text-secondary border-b-2 border-secondary pb-1 transition-colors" href="#">Insurance</Link>
            <Link className="text-sm font-medium text-slate-600 hover:text-secondary transition-colors" href="#">LTC Planning</Link>
            <Link className="text-sm font-medium text-slate-600 hover:text-secondary transition-colors" href="#">Retirement</Link>
            <Link className="text-sm font-medium text-slate-600 hover:text-secondary transition-colors" href="#">Business</Link>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-sm font-semibold text-primary hover:text-secondary transition-colors">Español</button>
            <Button variant="primary" className="px-6 py-2.5 text-sm">Schedule Consultation</Button>
          </div>
        </nav>
      </header>

      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[700px] flex items-center overflow-hidden bg-[#001c38]">
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center py-20">
            <div className="flex flex-col gap-6 reveal">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary/10 border border-secondary/20 rounded-full w-fit">
                <span className="text-secondary text-sm font-bold">State Licensed 0215 Practitioner</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-[1.1] text-white tracking-tight">
                Expert-Led Assurance for Your Financial Future
              </h1>
              <p className="text-lg text-white/80 max-w-lg leading-relaxed">
                Preserving legacies through strategic Life, Health, and Annuity solutions. We specialize in protecting what matters most with precision and stability.
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                <Button variant="secondary" className="!bg-secondary !text-white !border-secondary hover:!bg-secondary/90 shadow-lg px-8 py-3.5">
                  Protect Your Future
                </Button>
                <Button variant="secondary" className="!text-white !border-white/30 hover:!bg-white/10 px-8 py-3.5">
                  Hablo Español
                </Button>
              </div>
            </div>
            <div className="hidden md:block reveal reveal-delay">
              <div className="relative h-[500px] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img 
                  className="w-full h-full object-cover" 
                  alt="A professional financial consultation scene" 
                  src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1000&auto=format&fit=crop" 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Product Bento Grid */}
        <section className="py-24 px-6 lg:px-10 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 reveal">
            <div>
              <h2 className="text-4xl font-bold text-primary mb-4 tracking-tight">Strategic Protection Tiers</h2>
              <p className="text-lg text-slate-600 max-w-2xl">Comprehensive advisory focused on growth, longevity, and legacy preservation. Our 0215-specific portfolio ensures regulatory precision.</p>
            </div>
            <div className="flex gap-2">
              <span className="px-4 py-2 bg-slate-100 rounded-full text-sm font-bold text-primary">0215 Certified</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Insurance Protection */}
            <div className="md:col-span-8 bg-surface-card border border-outline-light p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow reveal">
              <div className="flex justify-between items-start mb-8">
                <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-secondary uppercase tracking-widest">Insurance</p>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Insurance Protection</h3>
              <p className="text-slate-600 mb-8 leading-relaxed">Securing families with Life, Disability, and LTC solutions including Nationwide Heritage® and Effortless Life options.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 bg-slate-50 rounded-lg border border-transparent hover:border-secondary transition-colors cursor-pointer">
                  <p className="font-bold mb-1">Nationwide Heritage®</p>
                  <p className="text-sm text-slate-500">Legacy-focused permanent life protection.</p>
                </div>
                <div className="p-5 bg-slate-50 rounded-lg border border-transparent hover:border-secondary transition-colors cursor-pointer">
                  <p className="font-bold mb-1">Effortless Life</p>
                  <p className="text-sm text-slate-500">Simplified underwriting for modern lifestyles.</p>
                </div>
              </div>
            </div>

            {/* LTC Planning */}
            <div className="md:col-span-4 bg-primary text-white p-8 rounded-xl shadow-sm flex flex-col justify-between reveal">
              <div>
                <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center text-white mb-6">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">LTC Planning</h3>
                <p className="text-white/80 mb-6 leading-relaxed">Mastering the choice between Cash-Indemnity and Reimbursement models.</p>
                <div className="py-4 px-5 bg-white/10 rounded-lg border border-white/20 mb-4">
                  <p className="text-sm font-semibold">Nationwide CareMatters Together</p>
                </div>
              </div>
              <Link className="flex items-center gap-2 font-semibold text-secondary hover:text-white transition-colors" href="#">
                Compare Solutions &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section with Agent Profile and Lead Form */}
        <section className="py-24 bg-slate-50 border-t border-slate-200" id="consultation">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Left Column: Agent Profile and Pitch */}
              <div className="flex flex-col reveal">
                <div className="mb-12">
                  <h2 className="text-4xl font-bold text-primary mb-6 tracking-tight">Anchor Your Legacy with AB Global</h2>
                  <p className="text-lg text-slate-600 mb-8 leading-relaxed">Bilingual expertise across Florida. Licensed agent Angel Burgos (G328926) specializes in complex insurance and retirement structures.</p>
                </div>
                
                <div className="w-full">
                  <AgentProfileCard 
                    name="Angel Burgos"
                    title="Founder, F6D9U / FL License: G328926"
                    bilingual={true}
                  />
                </div>
              </div>
              
              {/* Right Column: Lead Form */}
              <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-slate-100 reveal reveal-delay">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-primary mb-2">Request a Consultation</h3>
                  <p className="text-slate-600">Tell us a little about what you are evaluating. A member of the AB Global Consulting team will follow up to understand what you need.</p>
                </div>
                <ConsultationForm />
              </div>
            </div>
          </div>
        </section>
      </div>

      <ComplianceDisclosure />
    </main>
  );
}
