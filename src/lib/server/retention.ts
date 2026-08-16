import { getPrismaClient } from "./db";

// 1 year retention policy
const RETENTION_PERIOD_DAYS = 365;

export async function getLeadsToAnonymize() {
  const prisma = getPrismaClient();
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - RETENTION_PERIOD_DAYS);

  return prisma.lead.findMany({
    where: {
      createdAt: {
        lt: cutoffDate,
      },
      // We might only want to anonymize closed leads, or all leads past retention?
      // Assuming all leads older than 1 year for privacy compliance.
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      createdAt: true,
    }
  });
}

export async function anonymizeLead(leadId: string) {
  const prisma = getPrismaClient();
  
  // Replace PII with anonymized data, but keep the record for analytics
  return prisma.lead.update({
    where: { id: leadId },
    data: {
      firstName: "[Anonymized]",
      lastName: "[Anonymized]",
      email: `anonymized-${leadId}@example.com`,
      phone: "[Anonymized]",
      message: "[Anonymized message content]",
      // Optionally remove notes or tasks
    },
  });
}
