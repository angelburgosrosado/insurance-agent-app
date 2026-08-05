import Link from "next/link";
import { disclosuresContent } from "@/lib/policy-content";

export const metadata = { title: "Disclosures" };

export default function DisclosuresPage() {
  return <main className="min-h-screen"><header className="border-b border-[var(--line)] bg-[var(--paper)]"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8"><Link href="/" className="text-base font-semibold tracking-[-0.03em]">AB Global <span className="font-normal text-[var(--ink-soft)]">Consulting</span></Link><Link href="/" className="text-sm text-[var(--ink-soft)] hover:text-[var(--ink)]">Back to home</Link></div></header><section className="mx-auto max-w-3xl px-5 py-20 lg:px-8 lg:py-28"><p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent-deep)]">Information</p><h1 className="mt-5 text-5xl font-semibold leading-tight tracking-[-0.06em]">Disclosures</h1><p className="mt-6 text-lg leading-8 text-[var(--ink-soft)]">What an initial insurance consultation does and does not represent.</p><div className="mt-12 space-y-6 border-t border-[var(--line)] pt-8 text-base leading-8 text-[var(--ink-soft)]">{disclosuresContent.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></section></main>;
}