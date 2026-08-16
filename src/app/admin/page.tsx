import { getDashboardMetrics } from "@/lib/server/admin-metrics";
import { type LeadStatus } from "@/lib/db";

const statusLabels: Record<string, string> = {
  new: "New", reviewing: "Reviewing", assigned: "Assigned", contacted: "Contacted", qualified: "Qualified", closed: "Closed",
};

function serviceLabel(value: string) { return value.replaceAll("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase()); }

export default async function AdminPage() {
  const data = await getDashboardMetrics();
  
  const metrics = [
    ["Total Leads", String(data.totalLeads), "All-time"],
    ["New This Week", String(data.newLeadsThisWeek), "Last 7 days"],
    ["Conversion", `${data.conversionRate}%`, "Qualified & Closed"],
    ["Pending Tasks", String(data.pendingTasks), "Follow-ups needed"],
  ];

  return (
    <main className="min-h-[100dvh] bg-[#eef1ef] text-[var(--ink)]">
      <header className="border-b border-[var(--line)] bg-white">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-5 lg:px-8">
          <div>
            <p className="text-sm font-semibold">AB Global Consulting</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-soft)]">Marketing operations</p>
          </div>
          <div className="flex items-center gap-5 text-sm text-[var(--ink-soft)]">
            <span>Angel Burgos</span>
            <span className="h-8 w-8 rounded-full bg-[var(--ink)] text-center leading-8 text-white">AB</span>
          </div>
        </div>
      </header>
      <div className="mx-auto grid max-w-[1400px] lg:grid-cols-[220px_1fr]">
        <aside className="hidden border-r border-[var(--line)] bg-[#eef1ef] p-6 lg:block">
          <nav className="space-y-1 text-sm" aria-label="Admin navigation">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-soft)]">Workspace</p>
            <a className="block border-l-2 border-[var(--accent)] bg-white px-3 py-3 font-medium" href="/admin">Overview</a>
            <a className="block px-3 py-3 text-[var(--ink-soft)]" href="/admin/leads">Leads</a>
            <a className="block px-3 py-3 text-[var(--ink-soft)]" href="/admin/tasks">Follow-up tasks</a>
            <p className="mb-4 mt-10 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-soft)]">Growth</p>
            <a className="block px-3 py-3 text-[var(--ink-soft)]" href="/admin/campaigns">Campaigns</a>
            <a className="block px-3 py-3 text-[var(--ink-soft)]" href="/admin/content">Content</a>
            <a className="block px-3 py-3 text-[var(--ink-soft)]" href="/admin/analytics">Analytics</a>
          </nav>
        </aside>
        <section className="p-5 lg:p-10">
          <div className="flex flex-col justify-between gap-4 border-b border-[var(--line)] pb-8 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--accent-deep)]">Overview</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.06em]">Marketing dashboard</h1>
            </div>
            <p className="text-sm text-[var(--ink-soft)]">Production environment</p>
          </div>
          <div className="grid gap-px border-b border-x border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 xl:grid-cols-4">
            {metrics.map(([label, value, change]) => (
              <div key={label} className="bg-[#eef1ef] p-6">
                <p className="text-sm text-[var(--ink-soft)]">{label}</p>
                <p className="mt-4 text-4xl font-semibold tracking-[-0.06em]">{value}</p>
                <p className="mt-3 font-mono text-xs text-[var(--accent-deep)]">{change}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <div className="flex items-end justify-between border-b border-[var(--line)] pb-4">
              <h2 className="text-xl font-semibold tracking-[-0.03em]">Recent leads</h2>
              <a href="/admin/leads" className="text-sm text-[var(--accent-deep)]">View all</a>
            </div>
            <div className="divide-y divide-[var(--line)]">
              {data.recentLeads.map((lead) => (
                <div key={lead.id} className="grid gap-3 py-5 sm:grid-cols-[1.2fr_1.2fr_1fr_auto] sm:items-center">
                  <div>
                    <a href={`/admin/leads/${lead.id}`} className="font-medium hover:underline">
                      {lead.firstName} {lead.lastName}
                    </a>
                    <p className="mt-1 text-xs text-[var(--ink-soft)]">{new Date(lead.createdAt).toLocaleString()}</p>
                  </div>
                  <p className="text-sm text-[var(--ink-soft)]">{serviceLabel(lead.service)}</p>
                  <p className="text-sm text-[var(--ink-soft)]">{(lead as any).source || "Direct"}</p>
                  <span className="w-fit border border-[var(--line)] px-2 py-1 font-mono text-[10px] uppercase tracking-wider">
                    {statusLabels[lead.status] || lead.status}
                  </span>
                </div>
              ))}
            </div>
            {data.recentLeads.length === 0 && (
              <p className="py-8 text-sm text-[var(--ink-soft)]">No leads have been received</p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export const dynamic = "force-dynamic";
export const revalidate = 0;
