import { createDatabase, type LeadDatabase } from "../src/lib/db";
import { PrismaClient } from "@prisma/client";

async function migrateLeads() {
  console.log("Starting migration of SQLite draft leads to PostgreSQL...");
  const prisma = new PrismaClient();
  let sqliteDb: LeadDatabase;
  
  try {
    sqliteDb = createDatabase();
    const leads = sqliteDb.listLeads();
    console.log(`Found ${leads.length} leads in SQLite database.`);

    for (const lead of leads) {
      // Check if lead already exists by email to prevent duplicates
      const existing = await prisma.lead.findFirst({
        where: { email: lead.email }
      });
      if (existing) {
        console.log(`Lead ${lead.email} already exists, skipping.`);
        continue;
      }
      
      const created = await prisma.lead.create({
        data: {
          firstName: lead.firstName,
          lastName: lead.lastName,
          email: lead.email,
          phone: lead.phone,
          service: lead.service,
          contactTime: lead.contactTime,
          message: lead.message,
          consent: lead.consent,
          consentText: lead.consentText || "",
          consentVersion: lead.consentVersion || "legacy",
          consentAt: lead.consentAt ? new Date(lead.consentAt) : new Date(),
          status: lead.status,
          createdAt: lead.createdAt ? new Date(lead.createdAt) : new Date(),
          attribution: (lead.source || lead.medium || lead.campaign) ? {
            create: {
              source: lead.source,
              medium: lead.medium,
              campaign: lead.campaign,
              content: lead.content,
              term: lead.term,
            }
          } : undefined
        }
      });
      console.log(`Migrated lead: ${created.email}`);
    }

    console.log("Migration complete!");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await prisma.$disconnect();
    if (sqliteDb!) sqliteDb.close();
  }
}

migrateLeads().catch(console.error);
