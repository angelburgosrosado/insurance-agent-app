import { LeadsTable } from "@/components/leads-table";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function LeadsPage() {
  return (
    <main className="min-h-[100dvh] bg-[#eef1ef] text-[var(--ink)]">
      <header className="border-b border-[var(--line)] bg-white"><div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-5 lg:px-8"><div><p className="text-sm font-semibold">AB Global Consulting</p><p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-soft)]">Marketing operations</p></div><a href="/admin" className="text-sm text-[var(--accent-deep)]">Dashboard overview</a></div></header>
      <section className="mx-auto max-w-[1400px] p-5 lg:p-10"><div className="border-b border-[var(--line)] pb-8"><p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--accent-deep)]">Workspace</p><h1 className="mt-3 text-4xl font-semibold tracking-[-0.06em]">Leads</h1><p className="mt-4 text-sm text-[var(--ink-soft)]">Manage consultation requests received through the public site</p></div><div className="mt-8"><LeadsTable initialLeads={db.listLeads()} /></div></section>
    </main>
  );
}
