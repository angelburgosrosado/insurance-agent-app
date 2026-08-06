import { getLeadRepository } from "@/lib/server/leads";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function taskStatus(status: string) { return status.charAt(0).toUpperCase() + status.slice(1); }

export default async function TasksPage() {
  const repository = getLeadRepository();
  const [tasks, leadList] = await Promise.all([repository.listTasks(), repository.listLeads()]);
  const leads = new Map(leadList.map((lead) => [String(lead.id), lead]));
  return <main className="min-h-[100dvh] bg-[#eef1ef] text-[var(--ink)]">
    <header className="border-b border-[var(--line)] bg-white"><div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-5 lg:px-8"><div><p className="text-sm font-semibold">AB Global Consulting</p><p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-soft)]">Marketing operations</p></div><a href="/admin" className="text-sm text-[var(--accent-deep)]">Dashboard overview</a></div></header>
    <section className="mx-auto max-w-[1400px] p-5 lg:p-10"><div className="border-b border-[var(--line)] pb-8"><p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--accent-deep)]">Workspace</p><h1 className="mt-3 text-4xl font-semibold tracking-[-0.06em]">Follow-up tasks</h1><p className="mt-4 text-sm text-[var(--ink-soft)]">Track pending prospect follow-up work</p></div>
      <div className="mt-8 overflow-x-auto border-y border-[var(--line)]"><table className="w-full min-w-[760px] text-left text-sm"><thead className="border-b border-[var(--line)] text-xs uppercase tracking-[0.14em] text-[var(--ink-soft)]"><tr><th className="px-4 py-4 font-mono font-normal">Task</th><th className="px-4 py-4 font-mono font-normal">Prospect</th><th className="px-4 py-4 font-mono font-normal">Due</th><th className="px-4 py-4 font-mono font-normal">Status</th></tr></thead><tbody className="divide-y divide-[var(--line)]">{tasks.map((task) => { const lead = leads.get(String(task.leadId)); return <tr key={String(task.id)}><td className="px-4 py-5 font-medium">{task.title}</td><td className="px-4 py-5 text-[var(--ink-soft)]">{lead ? `${lead.firstName} ${lead.lastName}` : "Unknown lead"}</td><td className="px-4 py-5 text-[var(--ink-soft)]">{task.dueAt || "Unscheduled"}</td><td className="px-4 py-5"><span className="border border-[var(--line)] px-2 py-1 font-mono text-[10px] uppercase tracking-wider">{taskStatus(task.status)}</span></td></tr>; })}</tbody></table>{tasks.length === 0 && <p className="px-4 py-8 text-sm text-[var(--ink-soft)]">No follow-up tasks have been created</p>}</div>
    </section>
  </main>;
}
