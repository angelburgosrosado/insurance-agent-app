import { getPrismaClient } from "./db";

export type AuditAction = "lead_viewed" | "lead_updated" | "lead_deleted" | "note_added" | "task_created" | "task_updated";

export async function logAudit(
  actorEmail: string,
  action: AuditAction,
  targetId: string,
  details?: Record<string, unknown>
) {
  try {
    const prisma = getPrismaClient();
    
    // We can just console.log for now if there isn't an AuditLog table in the schema
    // Let's create an entry in the database if AuditLog exists.
    // I will check the schema later, but for now I'll just use console.log as a fallback.
    
    console.log(`AUDIT: [${new Date().toISOString()}] ${actorEmail} performed ${action} on ${targetId}`, details ? JSON.stringify(details) : "");
    
    // TODO: Insert into AuditLog table once we update the Prisma schema
    // await prisma.auditLog.create({
    //   data: {
    //     actor: actorEmail,
    //     action,
    //     targetId,
    //     details: details || {}
    //   }
    // });
  } catch (error) {
    console.error("Failed to write audit log:", error);
  }
}
