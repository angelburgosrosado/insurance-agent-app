import { getPrismaClient } from "@/lib/server/db";

export type CampaignStat = {
  campaign: string;
  source: string;
  medium: string;
  totalLeads: number;
  qualifiedLeads: number;
};

export async function getCampaignMetrics() {
  const prisma = getPrismaClient();

  // Fetch leads that have attribution
  const leadsWithAttribution = await prisma.lead.findMany({
    where: {
      attribution: {
        isNot: null
      }
    },
    include: {
      attribution: true
    }
  });

  const statsMap: Record<string, CampaignStat> = {};

  leadsWithAttribution.forEach(lead => {
    const attr = lead.attribution;
    if (!attr) return;

    // We group by a composite key
    const source = attr.source || "direct";
    const medium = attr.medium || "none";
    const campaign = attr.campaign || "unnamed";
    
    const key = `${source}|${medium}|${campaign}`;

    if (!statsMap[key]) {
      statsMap[key] = {
        campaign,
        source,
        medium,
        totalLeads: 0,
        qualifiedLeads: 0
      };
    }

    statsMap[key].totalLeads += 1;
    
    // Consider it qualified if it moved past the initial stages
    if (lead.status === "qualified" || lead.status === "closed") {
      statsMap[key].qualifiedLeads += 1;
    }
  });

  return Object.values(statsMap).sort((a, b) => b.totalLeads - a.totalLeads);
}
