import { getPrismaClient } from "./db";

export async function getDashboardMetrics() {
  const prisma = getPrismaClient();

  const now = new Date();
  const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
  
  // 1. Total Leads
  const totalLeads = await prisma.lead.count();

  // 2. New Leads This Week
  const newLeadsThisWeek = await prisma.lead.count({
    where: {
      createdAt: {
        gte: startOfWeek,
      },
    },
  });

  // 3. Conversion Rate (assuming 'qualified' or 'closed' status implies conversion)
  const convertedLeads = await prisma.lead.count({
    where: {
      status: {
        in: ["qualified", "closed"],
      },
    },
  });

  const conversionRate = totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0;

  // 4. Pending Tasks
  const pendingTasks = await prisma.followUpTask.count({
    where: {
      status: "pending",
    },
  });

  // 5. Recent Leads (limit 5)
  const recentLeads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return {
    totalLeads,
    newLeadsThisWeek,
    conversionRate: conversionRate.toFixed(1),
    pendingTasks,
    recentLeads,
  };
}
