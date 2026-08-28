import { getPrismaClient } from "@/lib/server/db";

export type DailyLeadCount = {
  date: string;
  count: number;
};

export type ServiceBreakdown = {
  service: string;
  count: number;
};

export async function getAnalyticsData() {
  const prisma = getPrismaClient();

  // Get all leads to aggregate in JS (since Prisma SQLite doesn't support advanced grouping easily, 
  // and we want this to work regardless of DB engine for now, pulling all lightweight leads is fine for prototype scale).
  const leads = await prisma.lead.findMany({
    select: {
      createdAt: true,
      service: true,
    }
  });

  const last30Days = new Date();
  last30Days.setDate(last30Days.getDate() - 30);

  const dailyCounts: Record<string, number> = {};
  const serviceCounts: Record<string, number> = {};

  leads.forEach((lead) => {
    // Breakdown by service
    const service = lead.service || "unknown";
    serviceCounts[service] = (serviceCounts[service] || 0) + 1;

    // Time-series (last 30 days only)
    if (lead.createdAt >= last30Days) {
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
    breakdown
  };
}
