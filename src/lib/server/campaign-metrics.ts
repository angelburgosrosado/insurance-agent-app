import { getPrismaClient } from "@/lib/server/db";
import { getLeadRepository } from "@/lib/server/leads";

export type CampaignStat = {
  campaign: string;
  source: string;
  medium: string;
  totalLeads: number;
  qualifiedLeads: number;
};

export async function getCampaignMetrics(): Promise<CampaignStat[]> {
  const statsMap: Record<string, CampaignStat> = {};

  function recordLead(sourceVal?: string | null, mediumVal?: string | null, campaignVal?: string | null, status?: string) {
    const source = sourceVal || "direct";
    const medium = mediumVal || "none";
    const campaign = campaignVal || "unnamed";
    const key = `${source}|${medium}|${campaign}`;

    if (!statsMap[key]) {
      statsMap[key] = {
        campaign,
        source,
        medium,
        totalLeads: 0,
        qualifiedLeads: 0,
      };
    }

    statsMap[key].totalLeads += 1;
    if (status === "qualified" || status === "closed") {
      statsMap[key].qualifiedLeads += 1;
    }
  }

  // 1. Try Prisma if DATABASE_URL is configured
  if (process.env.DATABASE_URL) {
    try {
      const prisma = getPrismaClient();
      const leadsWithAttribution = await prisma.lead.findMany({
        where: {
          attribution: {
            isNot: null,
          },
        },
        include: {
          attribution: true,
        },
      });

      leadsWithAttribution.forEach((lead) => {
        const attr = lead.attribution;
        if (!attr) return;
        recordLead(attr.source, attr.medium, attr.campaign, lead.status);
      });

      return Object.values(statsMap).sort((a, b) => b.totalLeads - a.totalLeads);
    } catch (err) {
      console.warn("[CampaignMetrics] Prisma query failed, falling back to LeadRepository:", err);
    }
  }

  // 2. Resilient fallback to SQLite / in-memory repository
  try {
    const repository = getLeadRepository();
    const leads = await repository.listLeads();

    leads.forEach((lead) => {
      recordLead(lead.source, lead.medium, lead.campaign, lead.status);
    });

    return Object.values(statsMap).sort((a, b) => b.totalLeads - a.totalLeads);
  } catch (err) {
    console.error("[CampaignMetrics] Repository fallback failed:", err);
    return [];
  }
}
