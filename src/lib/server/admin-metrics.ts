import { getPrismaClient } from "./db";
import { getLeadRepository } from "./leads";

export type RecentLeadSummary = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  source?: string;
  status: string;
  createdAt: Date | string;
};

export type DashboardMetrics = {
  totalLeads: number;
  newLeadsThisWeek: number;
  conversionRate: string;
  pendingTasks: number;
  recentLeads: RecentLeadSummary[];
};

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const now = new Date();
  const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());

  // 1. Try Prisma if DATABASE_URL is configured
  if (process.env.DATABASE_URL) {
    try {
      const prisma = getPrismaClient();

      const [totalLeads, newLeadsThisWeek, convertedLeads, pendingTasks, recentLeads] = await Promise.all([
        prisma.lead.count(),
        prisma.lead.count({ where: { createdAt: { gte: startOfWeek } } }),
        prisma.lead.count({ where: { status: { in: ["qualified", "closed"] } } }),
        prisma.followUpTask.count({ where: { status: "pending" } }),
        prisma.lead.findMany({
          orderBy: { createdAt: "desc" },
          take: 5,
          include: { attribution: true },
        }),
      ]);

      const conversionRate = totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0;

      return {
        totalLeads,
        newLeadsThisWeek,
        conversionRate: conversionRate.toFixed(1),
        pendingTasks,
        recentLeads: recentLeads.map((l) => ({
          id: l.id,
          firstName: l.firstName,
          lastName: l.lastName,
          email: l.email,
          phone: l.phone,
          service: l.service,
          source: l.attribution?.source || "Direct Website",
          status: l.status,
          createdAt: l.createdAt,
        })),
      };
    } catch (err) {
      console.warn("[AdminMetrics] Prisma query failed, falling back to LeadRepository:", err);
    }
  }

  // 2. Resilient fallback to SQLite / in-memory repository
  try {
    const repository = getLeadRepository();
    const [leads, tasks] = await Promise.all([
      repository.listLeads(),
      repository.listTasks(),
    ]);

    const totalLeads = leads.length;
    const newLeadsThisWeek = leads.filter((l) => {
      const created = new Date(l.createdAt);
      return !Number.isNaN(created.getTime()) && created >= startOfWeek;
    }).length;

    const convertedLeads = leads.filter((l) => l.status === "qualified" || l.status === "closed").length;
    const conversionRate = totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0;
    const pendingTasks = tasks.filter((t) => t.status === "pending").length;

    const recentLeads: RecentLeadSummary[] = leads.slice(0, 5).map((l) => ({
      id: String(l.id),
      firstName: l.firstName,
      lastName: l.lastName,
      email: l.email,
      phone: l.phone,
      service: l.service,
      source: l.source || "Direct Website",
      status: l.status,
      createdAt: l.createdAt,
    }));

    return {
      totalLeads,
      newLeadsThisWeek,
      conversionRate: conversionRate.toFixed(1),
      pendingTasks,
      recentLeads,
    };
  } catch (err) {
    console.error("[AdminMetrics] Fallback repository query failed:", err);
    return {
      totalLeads: 0,
      newLeadsThisWeek: 0,
      conversionRate: "0.0",
      pendingTasks: 0,
      recentLeads: [],
    };
  }
}
