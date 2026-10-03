import { getPrismaClient } from "@/lib/server/db";
import { getLeadRepository } from "@/lib/server/leads";

export type DailyLeadCount = {
  date: string;
  count: number;
};

export type ServiceBreakdown = {
  service: string;
  count: number;
};

export async function getAnalyticsData(): Promise<{ timeSeries: DailyLeadCount[]; breakdown: ServiceBreakdown[] }> {
  let rawLeads: Array<{ createdAt: Date; service: string }> = [];

  // 1. Try Prisma if DATABASE_URL is configured
  if (process.env.DATABASE_URL) {
    try {
      const prisma = getPrismaClient();
      const leads = await prisma.lead.findMany({
        select: {
          createdAt: true,
          service: true,
        },
      });
      rawLeads = leads;
    } catch (err) {
      console.warn("[AnalyticsMetrics] Prisma query failed, falling back to LeadRepository:", err);
    }
  }

  // 2. Resilient fallback to SQLite / in-memory repository
  if (rawLeads.length === 0) {
    try {
      const repository = getLeadRepository();
      const leads = await repository.listLeads();
      rawLeads = leads.map((l) => ({
        createdAt: new Date(l.createdAt),
        service: l.service,
      }));
    } catch (err) {
      console.error("[AnalyticsMetrics] Repository fallback failed:", err);
    }
  }

  const last30Days = new Date();
  last30Days.setDate(last30Days.getDate() - 30);

  const dailyCounts: Record<string, number> = {};
  const serviceCounts: Record<string, number> = {};

  rawLeads.forEach((lead) => {
    const service = lead.service || "unknown";
    serviceCounts[service] = (serviceCounts[service] || 0) + 1;

    if (!Number.isNaN(lead.createdAt.getTime()) && lead.createdAt >= last30Days) {
      const dateStr = lead.createdAt.toISOString().split("T")[0];
      dailyCounts[dateStr] = (dailyCounts[dateStr] || 0) + 1;
    }
  });

  // Ensure all 30 days are represented, even if 0
  const timeSeries: DailyLeadCount[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    timeSeries.push({
      date: dateStr,
      count: dailyCounts[dateStr] || 0,
    });
  }

  const breakdown: ServiceBreakdown[] = Object.entries(serviceCounts)
    .map(([service, count]) => ({ service, count }))
    .sort((a, b) => b.count - a.count);

  return {
    timeSeries,
    breakdown,
  };
}
