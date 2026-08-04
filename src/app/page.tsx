import Link from "next/link";
import { ConsultationForm } from "@/components/consultation-form";

const services = [
  { number: "01", title: "Personal insurance", text: "A clearer view of the protection decisions that affect your home, vehicle, and everyday life" },
  { number: "02", title: "Business insurance", text: "Practical guidance for business owners managing people, property, and operational exposure" },
  { number: "03", title: "Life and health", text: "Thoughtful conversations about the coverage priorities that support your family and future" },
];

export default function Home() {
  return (
    <main>
      <header className="border-b border-[var(--line)] bg-[var(--paper)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
          <Link href="/" className="text-base font-semibold tracking-[-0.03em]">AB Global <span className="font-normal text-[var(--ink-soft)]">Consulting</span></Link>
          <nav className="hidden items-center gap-8 text-sm text-[var(--ink-soft)] md:flex" aria-label="Primary navigation">
            <a href="#services" className="transition-colors hover:text-[var(--ink)]">Services</a>
            <a href="#approach" className="transition-colors hover:text-[var(--ink)]">Our approach</a>
            <a href="#resources" className="transition-colors hover:text-[var(--ink)]">Resources</a>
          </nav>
          <Link href="#consultation" className="border border-[var(--ink)] px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--ink)] hover:text-white">Start a conversation</Link>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-[var(--line)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1.25fr_.75fr] lg:items-end lg:px-8 lg:py-28">
          <div className="reveal">
            <p className="mb-7 font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent-deep)]">Insurance guidance for what comes next</p>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.07em] text-[var(--ink)] sm:text-7xl">Make important coverage decisions with a clearer view</h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-[var(--ink-soft)]">AB Global Consulting helps individuals, families, and businesses understand their insurance options and take the next step with confidence</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="#consultation" className="bg-[var(--accent)] px-6 py-4 text-center text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-deep)]">Request a consultation</Link>
              <Link href="#services" className="border border-[var(--line)] px-6 py-4 text-center text-sm font-semibold transition-colors hover:border-[var(--ink)]">Explore services</Link>
            </div>
          </div>
          <div className="reveal reveal-delay border-l-2 border-[var(--accent)] pl-6 lg:mb-2">
            <p className="max-w-xs text-xl leading-8 tracking-[-0.03em]">“The right conversation starts with understanding what matters to you”</p>
            <p className="mt-5 text-sm text-[var(--ink-soft)]">Angel Burgos<br />Founder, AB Global Consulting</p>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[var(--sage)] opacity-70 blur-3xl" />
      </section>

      <section id="services" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <div><p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent-deep)]">Areas of guidance</p><h2 className="mt-5 max-w-sm text-4xl font-semibold leading-tight tracking-[-0.06em]">A practical starting point for the decisions ahead</h2></div>
          <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {services.map((service) => <article key={service.number} className="grid gap-4 py-7 sm:grid-cols-[70px_1fr] sm:gap-8"><span className="font-mono text-sm text-[var(--accent-deep)]">{service.number}</span><div><h3 className="text-xl font-semibold tracking-[-0.03em]">{service.title}</h3><p className="mt-2 max-w-xl leading-7 text-[var(--ink-soft)]">{service.text}</p></div></article>)}
          </div>
        </div>
      </section>

      <section id="approach" className="bg-[var(--ink)] text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[.8fr_1.2fr] lg:px-8 lg:py-28">
          <div><p className="font-mono text-xs uppercase tracking-[0.22em] text-[#d9aa8a]">The approach</p><h2 className="mt-5 max-w-md text-4xl font-semibold leading-tight tracking-[-0.06em]">Clarity before complexity</h2></div>
          <div className="grid gap-8 sm:grid-cols-3"><div><p className="font-mono text-sm text-[#d9aa8a]">01</p><h3 className="mt-5 text-lg font-semibold">Listen first</h3><p className="mt-3 text-sm leading-6 text-[#c1ccd0]">We start with your circumstances, priorities, and questions</p></div><div><p className="font-mono text-sm text-[#d9aa8a]">02</p><h3 className="mt-5 text-lg font-semibold">Explain plainly</h3><p className="mt-3 text-sm leading-6 text-[#c1ccd0]">We organize the conversation so decisions are easier to evaluate</p></div><div><p className="font-mono text-sm text-[#d9aa8a]">03</p><h3 className="mt-5 text-lg font-semibold">Plan the next step</h3><p className="mt-3 text-sm leading-6 text-[#c1ccd0]">You leave with a practical direction, not a pile of jargon</p></div></div>
        </div>
      </section>

      <section id="resources" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"><div className="flex flex-col justify-between gap-5 border-b border-[var(--line)] pb-8 sm:flex-row sm:items-end"><div><p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent-deep)]">Resources</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em]">Useful context, without the noise</h2></div><p className="max-w-sm text-sm leading-6 text-[var(--ink-soft)]">A resource center for people who want to understand the basics before making a decision</p></div><div className="grid gap-6 pt-8 md:grid-cols-3"><article className="border-t-2 border-[var(--accent)] pt-5"><p className="font-mono text-xs text-[var(--ink-soft)]">GUIDE / 05 MIN</p><h3 className="mt-4 text-xl font-semibold">Questions to ask before reviewing coverage</h3><p className="mt-3 text-sm leading-6 text-[var(--ink-soft)]">A straightforward framework for preparing for an insurance conversation</p></article><article className="border-t-2 border-[var(--accent)] pt-5"><p className="font-mono text-xs text-[var(--ink-soft)]">ARTICLE / 04 MIN</p><h3 className="mt-4 text-xl font-semibold">Where business protection conversations begin</h3><p className="mt-3 text-sm leading-6 text-[var(--ink-soft)]">The first areas business owners often need to clarify</p></article><article className="border-t-2 border-[var(--accent)] pt-5"><p className="font-mono text-xs text-[var(--ink-soft)]">FAQ / 03 MIN</p><h3 className="mt-4 text-xl font-semibold">What happens in an initial consultation</h3><p className="mt-3 text-sm leading-6 text-[var(--ink-soft)]">What to expect before, during, and after the first conversation</p></article></div></section>

      <section id="consultation" className="bg-[#e7eee9]"><div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[.8fr_1.2fr] lg:px-8 lg:py-28"><div><p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent-deep)]">Start here</p><h2 className="mt-5 max-w-md text-4xl font-semibold leading-tight tracking-[-0.06em]">Bring your questions. We will bring structure</h2><p className="mt-6 max-w-md leading-7 text-[var(--ink-soft)]">Tell us a little about what you are evaluating. A member of the AB Global Consulting team will follow up to understand what you need</p></div><div className="bg-white p-6 sm:p-10"><ConsultationForm /></div></div></section>

      <footer className="border-t border-[var(--line)]"><div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 text-sm text-[var(--ink-soft)] sm:flex-row sm:items-center sm:justify-between lg:px-8"><p><span className="font-semibold text-[var(--ink)]">AB Global Consulting</span> · Founded by Angel Burgos</p><div className="flex gap-5"><Link href="/privacy" className="hover:text-[var(--ink)]">Privacy</Link><Link href="/disclosures" className="hover:text-[var(--ink)]">Disclosures</Link><Link href="/admin" className="hover:text-[var(--ink)]">Internal access</Link></div></div></footer>
    </main>
  );
}
