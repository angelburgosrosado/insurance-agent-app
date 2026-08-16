import { getPrismaClient } from "@/lib/server/db";
import { notFound } from "next/navigation";
import { LeadDetail } from "@/components/lead-detail";
import { LeadNotes } from "@/components/lead-notes";
import { FollowUpTaskForm } from "@/components/follow-up-task-form";

export const dynamic = "force-dynamic";

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const prisma = getPrismaClient();

  const lead = await prisma.lead.findUnique({
    where: { id },
    include: {
      attribution: true,
      notes: {
        orderBy: { createdAt: "desc" },
        include: { author: true }
      },
      followUpTasks: {
        orderBy: { dueAt: "asc" },
      }
    },
  });

  if (!lead) {
    notFound();
  }

  // Convert dates for serialization
  const serializedLead = {
    ...lead,
    consentAt: lead.consentAt.toISOString(),
    createdAt: lead.createdAt.toISOString(),
    updatedAt: lead.updatedAt?.toISOString(),
  };

  const serializedNotes = lead.notes.map(note => ({
    ...note,
    createdAt: note.createdAt.toISOString(),
  }));

  const serializedTasks = lead.followUpTasks.map(task => ({
    ...task,
    dueAt: task.dueAt?.toISOString(),
    createdAt: task.createdAt.toISOString(),
    updatedAt: task.updatedAt.toISOString(),
  }));

  return (
    <main className="min-h-[100dvh] bg-[#eef1ef] text-[var(--ink)]">
      <header className="border-b border-[var(--line)] bg-white">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-5 lg:px-8">
          <div>
            <p className="text-sm font-semibold">AB Global Consulting</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-soft)]">Lead Details</p>
          </div>
          <div className="flex items-center gap-5">
             <a href="/admin/leads" className="text-sm text-[var(--accent-deep)] hover:underline">&larr; Back to Leads</a>
          </div>
        </div>
      </header>
      
      <section className="mx-auto max-w-[1400px] p-5 lg:p-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
           <LeadDetail lead={serializedLead as any} />
           <LeadNotes notes={serializedNotes as any} leadId={id} />
        </div>
        
        <div className="space-y-8">
           <FollowUpTaskForm tasks={serializedTasks as any} leadId={id} />
        </div>
      </section>
    </main>
  );
}
