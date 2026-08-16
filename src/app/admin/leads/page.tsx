import { LeadsTable } from "@/components/leads-table";
import { LeadFilters } from "@/components/lead-filters";
import { getPrismaClient } from "@/lib/server/db";
import { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; status?: string; page?: string }>;
}) {
  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);
  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  const prisma = getPrismaClient();

  const where: Prisma.LeadWhereInput = {};
  
  if (params.search) {
    where.OR = [
      { firstName: { contains: params.search, mode: "insensitive" } },
      { lastName: { contains: params.search, mode: "insensitive" } },
      { email: { contains: params.search, mode: "insensitive" } },
    ];
  }
  
  if (params.status) {
    where.status = params.status;
  }

  const [leads, totalLeads] = await Promise.all([
    prisma.lead.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
      include: {
        attribution: true,
      },
    }),
    prisma.lead.count({ where }),
  ]);

  const totalPages = Math.ceil(totalLeads / pageSize);

  // Map to the format expected by the frontend
  const serializedLeads = leads.map(l => ({
    ...l,
    consentAt: l.consentAt.toISOString(),
    createdAt: l.createdAt.toISOString(),
    updatedAt: l.updatedAt?.toISOString(),
    // Include attribution fields if they exist
    source: l.attribution?.source || "",
    medium: l.attribution?.medium || "",
    campaign: l.attribution?.campaign || "",
  }));

  return (
    <main className="min-h-[100dvh] bg-[#eef1ef] text-[var(--ink)]">
      <header className="border-b border-[var(--line)] bg-white">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-5 lg:px-8">
          <div>
            <p className="text-sm font-semibold">AB Global Consulting</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-soft)]">Marketing operations</p>
          </div>
          <a href="/admin" className="text-sm text-[var(--accent-deep)] hover:underline">Dashboard overview</a>
        </div>
      </header>
      <section className="mx-auto max-w-[1400px] p-5 lg:p-10">
        <div className="border-b border-[var(--line)] pb-8">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--accent-deep)]">Workspace</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.06em]">Leads</h1>
          <p className="mt-4 text-sm text-[var(--ink-soft)]">Manage consultation requests received through the public site</p>
        </div>
        
        <div className="mt-8">
          <LeadFilters />
          
          <LeadsTable initialLeads={serializedLeads as any} />
          
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-[var(--ink-soft)]">
                Showing {skip + 1} to {Math.min(skip + pageSize, totalLeads)} of {totalLeads} leads
              </p>
              <div className="flex gap-2">
                {page > 1 && (
                  <a 
                    href={`/admin/leads?page=${page - 1}${params.search ? `&search=${params.search}` : ''}${params.status ? `&status=${params.status}` : ''}`}
                    className="px-3 py-1 border border-[var(--line)] text-sm hover:bg-white"
                  >
                    Previous
                  </a>
                )}
                {page < totalPages && (
                  <a 
                    href={`/admin/leads?page=${page + 1}${params.search ? `&search=${params.search}` : ''}${params.status ? `&status=${params.status}` : ''}`}
                    className="px-3 py-1 border border-[var(--line)] text-sm hover:bg-white"
                  >
                    Next
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
