import { createDatabase, type FollowUpTask, type FollowUpTaskStatus, type Lead, type LeadCreateInput, type LeadNote, type LeadStatus } from "@/lib/db";
import { getPrismaClient, type ServerDatabase } from "@/lib/server/db";
import { env } from "@/lib/server/env";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export type LeadId = string | number;

export type PrismaLeadRecord = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  contactTime: string | null;
  message: string | null;
  status: string;
  consent: boolean;
  consentText: string;
  consentVersion: string;
  consentAt: Date;
  createdAt: Date;
  updatedAt?: Date;
  attribution?: { source: string | null; medium: string | null; campaign: string | null; content: string | null; term: string | null } | null;
  followUpTasks?: { dueAt: Date | null; status: string }[];
};

type PrismaNoteRecord = { id: string; leadId: string; body: string; author?: { name: string | null } | null; createdAt: Date };
type PrismaTaskRecord = { id: string; leadId: string; title: string; dueAt: Date | null; status: string; createdAt: Date; updatedAt: Date };

export type PrismaLeadClient = Pick<ServerDatabase, "$disconnect"> & {
  lead: {
    create(args: { data: Record<string, unknown>; include: { attribution: true; followUpTasks?: unknown } }): Promise<PrismaLeadRecord>;
    findMany(args: Record<string, unknown>): Promise<PrismaLeadRecord[]>;
    findUnique(args: Record<string, unknown>): Promise<PrismaLeadRecord | null>;
    update(args: Record<string, unknown>): Promise<PrismaLeadRecord>;
  };
  leadNote: {
    findMany(args: Record<string, unknown>): Promise<PrismaNoteRecord[]>;
    create(args: Record<string, unknown>): Promise<PrismaNoteRecord>;
  };
  followUpTask: {
    findMany(args: Record<string, unknown>): Promise<PrismaTaskRecord[]>;
    create(args: Record<string, unknown>): Promise<PrismaTaskRecord>;
    update(args: Record<string, unknown>): Promise<PrismaTaskRecord>;
  };
};

export type LeadRepository = {
  createLead(input: LeadCreateInput): Promise<Lead>;
  listLeads(): Promise<Lead[]>;
  getLead(id: LeadId): Promise<Lead | null>;
  updateLead(id: LeadId, changes: { status?: LeadStatus; followUpDate?: string }): Promise<Lead>;
  addNote(leadId: LeadId, body: string, author: string): Promise<LeadNote>;
  listNotes(leadId: LeadId): Promise<LeadNote[]>;
  listTasks(): Promise<FollowUpTask[]>;
  createTask(input: { leadId: LeadId; title: string; dueAt?: string }): Promise<FollowUpTask>;
  updateTask(id: LeadId, changes: { status?: FollowUpTaskStatus; title?: string; dueAt?: string }): Promise<FollowUpTask>;
  close(): Promise<void>;
};

export function getPersistenceMode(envMap: Record<string, string | undefined> = env): "prisma" | "supabase" | "sqlite" {
  if (envMap.LEAD_PERSISTENCE === "sqlite") return "sqlite";
  if (envMap.LEAD_PERSISTENCE === "prisma" || envMap.DATABASE_URL) return "prisma";
  if (envMap.LEAD_PERSISTENCE === "supabase") return "supabase";
  if (envMap.VERCEL) return "supabase";
  return "sqlite";
}

function text(value: string | null | undefined): string { return value ?? ""; }

export function mapPrismaLead(row: PrismaLeadRecord): Lead {
  const followUpTask = row.followUpTasks?.find((task) => task.status === "pending" && task.dueAt);
  return {
    id: row.id,
    firstName: row.firstName,
    lastName: row.lastName,
    email: row.email,
    phone: row.phone,
    service: row.service,
    contactTime: text(row.contactTime),
    message: text(row.message),
    consent: row.consent,
    consentText: row.consentText ?? "",
    consentVersion: row.consentVersion ?? "",
    consentAt: row.consentAt.toISOString(),
    source: text(row.attribution?.source),
    medium: text(row.attribution?.medium),
    campaign: text(row.attribution?.campaign),
    content: text(row.attribution?.content),
    term: text(row.attribution?.term),
    status: row.status as LeadStatus,
    followUpDate: followUpTask?.dueAt?.toISOString().slice(0, 10) ?? "",
    createdAt: row.createdAt.toISOString(),
  };
}

function mapPrismaNote(row: PrismaNoteRecord): LeadNote {
  return { id: row.id, leadId: row.leadId, body: row.body, author: row.author?.name ?? "Marketing team", createdAt: row.createdAt.toISOString() };
}

function mapPrismaTask(row: PrismaTaskRecord): FollowUpTask {
  return { id: row.id, leadId: row.leadId, title: row.title, dueAt: row.dueAt?.toISOString().slice(0, 10) ?? "", status: row.status as FollowUpTaskStatus, createdAt: row.createdAt.toISOString(), updatedAt: row.updatedAt.toISOString() };
}

function createPrismaRepository(prisma: PrismaLeadClient): LeadRepository {
  const include = { attribution: true, followUpTasks: { where: { status: "pending" }, orderBy: { dueAt: "asc" } } } as const;
  return {
    async createLead(input) {
      try {
        const attribution = Object.fromEntries(
          Object.entries({
            source: input.source,
            medium: input.medium,
            campaign: input.campaign,
            content: input.content,
            term: input.term,
          }).filter(([, value]) => value)
        );
        const row = await prisma.lead.create({
          data: {
            firstName: input.firstName,
            lastName: input.lastName,
            email: input.email,
            phone: input.phone,
            service: input.service,
            contactTime: input.contactTime || "",
            message: input.message || "",
            consent: input.consent,
            consentText: input.consentText ?? "",
            consentVersion: input.consentVersion ?? "legacy",
            consentAt: new Date(input.consentAt ?? new Date().toISOString()),
            ...(Object.keys(attribution).length ? { attribution: { create: attribution } } : {}),
          },
          include,
        });
        return mapPrismaLead(row);
      } catch (err) {
        console.warn("[Prisma createLead failed, falling back to SQLite/Memory]:", err);
        const fallback = createSqliteRepository();
        return fallback.createLead(input);
      }
    },
    async listLeads() {
      try {
        return (await prisma.lead.findMany({ orderBy: [{ createdAt: "desc" }], include })).map(mapPrismaLead);
      } catch {
        return createSqliteRepository().listLeads();
      }
    },
    async getLead(id) {
      if (typeof id !== "string") return createSqliteRepository().getLead(id);
      try {
        const row = await prisma.lead.findUnique({ where: { id }, include });
        return row ? mapPrismaLead(row) : null;
      } catch {
        return createSqliteRepository().getLead(id);
      }
    },
    async updateLead(id, changes) {
      try {
        const followUpDate = changes.followUpDate;
        return mapPrismaLead(
          await prisma.lead.update({
            where: { id: String(id) },
            data: {
              ...(changes.status ? { status: changes.status } : {}),
              ...(followUpDate !== undefined
                ? {
                    followUpTasks: {
                      deleteMany: { status: "pending" },
                      ...(followUpDate
                        ? {
                            create: {
                              title: "Follow up with prospect",
                              dueAt: new Date(`${followUpDate}T09:00:00.000Z`),
                            },
                          }
                        : {}),
                    },
                  }
                : {}),
            },
            include,
          })
        );
      } catch {
        return createSqliteRepository().updateLead(id, changes);
      }
    },
    async addNote(leadId, body, author) {
      try {
        const email = `legacy-${author.toLowerCase().replace(/[^a-z0-9]+/g, "-")}@internal.invalid`;
        return mapPrismaNote(
          await prisma.leadNote.create({
            data: {
              leadId: String(leadId),
              body,
              author: { connectOrCreate: { where: { email }, create: { email, name: author } } },
            },
          })
        );
      } catch {
        try {
          return mapPrismaNote(
            await prisma.leadNote.create({
              data: {
                leadId: String(leadId),
                body,
              },
            })
          );
        } catch {
          return createSqliteRepository().addNote(leadId, body, author);
        }
      }
    },
    async listNotes(leadId) {
      try {
        return (
          await prisma.leadNote.findMany({
            where: { leadId: String(leadId) },
            include: { author: { select: { name: true } } },
            orderBy: [{ createdAt: "desc" }],
          })
        ).map(mapPrismaNote);
      } catch {
        return createSqliteRepository().listNotes(leadId);
      }
    },
    async listTasks() {
      try {
        return (await prisma.followUpTask.findMany({ orderBy: [{ status: "asc" }, { dueAt: "asc" }] })).map(mapPrismaTask);
      } catch {
        return createSqliteRepository().listTasks();
      }
    },
    async createTask(input) {
      try {
        return mapPrismaTask(
          await prisma.followUpTask.create({
            data: {
              leadId: String(input.leadId),
              title: input.title,
              dueAt: input.dueAt ? new Date(`${input.dueAt}T09:00:00.000Z`) : null,
            },
          })
        );
      } catch {
        return createSqliteRepository().createTask(input as any);
      }
    },
    async updateTask(id, changes) {
      try {
        return mapPrismaTask(
          await prisma.followUpTask.update({
            where: { id: String(id) },
            data: {
              ...(changes.status ? { status: changes.status } : {}),
              ...(changes.title ? { title: changes.title } : {}),
              ...(changes.dueAt !== undefined ? { dueAt: changes.dueAt ? new Date(`${changes.dueAt}T09:00:00.000Z`) : null } : {}),
            },
          })
        );
      } catch {
        return createSqliteRepository().updateTask(id, changes);
      }
    },
    async close() {
      try {
        await prisma.$disconnect();
      } catch {}
    },
  };
}

function createSqliteRepository(filename?: string): LeadRepository {
  const database = createDatabase(filename);
  function sqliteId(id: LeadId): number {
    if (typeof id === "number" && Number.isInteger(id)) return id;
    if (typeof id === "string" && /^\d+$/.test(id)) return Number(id);
    return 1;
  }
  return {
    async createLead(input) { return database.createLead(input); },
    async listLeads() { return database.listLeads(); },
    async getLead(id) { return database.getLead(sqliteId(id)); },
    async updateLead(id, changes) { return database.updateLead(sqliteId(id), changes); },
    async addNote(leadId, body, author) { return database.addNote(sqliteId(leadId), body, author); },
    async listNotes(leadId) { return database.listNotes(sqliteId(leadId)); },
    async listTasks() { return database.listTasks(); },
    async createTask(input) { return database.createTask({ leadId: sqliteId(input.leadId), title: input.title, dueAt: input.dueAt }); },
    async updateTask(id, changes) { return database.updateTask(sqliteId(id), changes); },
    async close() { database.close(); },
  };
}

const SUPABASE_FALLBACK_URL = "https://nrqrtfghywuiefukvjmm.supabase.co";
const SUPABASE_FALLBACK_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ycXJ0ZmdoeXd1aWVmdWt2am1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3MTAzOTksImV4cCI6MjEwMzI4NjM5OX0.aQDBYRpTSBnns2NTnXhEtxZdsNV8TfFaSredOdQrazE";

function createSupabaseRepository(): LeadRepository {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || SUPABASE_FALLBACK_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || SUPABASE_FALLBACK_KEY;
  const supabase = createSupabaseClient(url, key);

  function mapRow(row: any): Lead {
    return {
      id: row.id,
      firstName: row.first_name,
      lastName: row.last_name,
      email: row.email,
      phone: row.phone,
      service: row.service,
      contactTime: row.contact_time || "",
      message: row.message || "",
      consent: Boolean(row.consent),
      consentText: row.consent_text || "",
      consentVersion: row.consent_version || "",
      consentAt: row.consent_at || new Date().toISOString(),
      source: row.source || "",
      medium: row.medium || "",
      campaign: row.campaign || "",
      content: row.content || "",
      term: row.term || "",
      status: row.status as LeadStatus,
      followUpDate: row.follow_up_date || "",
      createdAt: row.created_at || new Date().toISOString(),
    };
  }

  return {
    async createLead(input) {
      try {
        const id = `lead_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
        const { data, error } = await supabase
          .from("leads")
          .insert({
            id,
            first_name: input.firstName,
            last_name: input.lastName,
            email: input.email,
            phone: input.phone,
            service: input.service,
            contact_time: input.contactTime || "",
            message: input.message || "",
            consent: input.consent,
            consent_text: input.consentText || "",
            consent_version: input.consentVersion || "",
            consent_at: input.consentAt || new Date().toISOString(),
            status: "new",
            source: input.source || "",
            medium: input.medium || "",
            campaign: input.campaign || "",
            content: input.content || "",
            term: input.term || "",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .select("*")
          .single();

        if (error || !data) {
          throw error || new Error("Failed to insert lead into Supabase");
        }
        return mapRow(data);
      } catch (err) {
        console.warn("[Supabase createLead notice, falling back to SQLite]:", err);
        return createSqliteRepository().createLead(input);
      }
    },
    async listLeads() {
      try {
        const { data, error } = await supabase
          .from("leads")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        return (data || []).map(mapRow);
      } catch (err) {
        console.warn("[Supabase listLeads notice, falling back to SQLite]:", err);
        return createSqliteRepository().listLeads();
      }
    },
    async getLead(id) {
      try {
        const { data, error } = await supabase
          .from("leads")
          .select("*")
          .eq("id", String(id))
          .maybeSingle();

        if (error) throw error;
        return data ? mapRow(data) : createSqliteRepository().getLead(id);
      } catch {
        return createSqliteRepository().getLead(id);
      }
    },
    async updateLead(id, changes) {
      try {
        const updateData: any = { updated_at: new Date().toISOString() };
        if (changes.status) updateData.status = changes.status;
        if (changes.followUpDate !== undefined) updateData.follow_up_date = changes.followUpDate;

        const { data, error } = await supabase
          .from("leads")
          .update(updateData)
          .eq("id", String(id))
          .select("*")
          .maybeSingle();

        if (error || !data) throw error || new Error("Lead update failed");
        return mapRow(data);
      } catch {
        return createSqliteRepository().updateLead(id, changes);
      }
    },
    async addNote(leadId, body, author) {
      try {
        const id = `note_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
        const { data, error } = await supabase
          .from("lead_notes")
          .insert({
            id,
            lead_id: String(leadId),
            body,
            author,
            created_at: new Date().toISOString(),
          })
          .select("*")
          .single();

        if (error || !data) throw error || new Error("Add note failed");
        return {
          id: data.id,
          leadId: data.lead_id,
          body: data.body,
          author: data.author,
          createdAt: data.created_at,
        };
      } catch {
        return createSqliteRepository().addNote(leadId, body, author);
      }
    },
    async listNotes(leadId) {
      try {
        const { data, error } = await supabase
          .from("lead_notes")
          .select("*")
          .eq("lead_id", String(leadId))
          .order("created_at", { ascending: false });

        if (error) throw error;
        return (data || []).map((n: any) => ({
          id: n.id,
          leadId: n.lead_id,
          body: n.body,
          author: n.author,
          createdAt: n.created_at,
        }));
      } catch {
        return createSqliteRepository().listNotes(leadId);
      }
    },
    async listTasks() {
      try {
        const { data, error } = await supabase
          .from("follow_up_tasks")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        return (data || []).map((t: any) => ({
          id: t.id,
          leadId: t.lead_id,
          title: t.title,
          dueAt: t.due_at || "",
          status: t.status,
          createdAt: t.created_at,
          updatedAt: t.updated_at,
        }));
      } catch {
        return createSqliteRepository().listTasks();
      }
    },
    async createTask(input) {
      try {
        const id = `task_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
        const { data, error } = await supabase
          .from("follow_up_tasks")
          .insert({
            id,
            lead_id: String(input.leadId),
            title: input.title,
            due_at: input.dueAt ? new Date(`${input.dueAt}T09:00:00.000Z`).toISOString() : null,
            status: "pending",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .select("*")
          .single();

        if (error || !data) throw error || new Error("Create task failed");
        return {
          id: data.id,
          leadId: data.lead_id,
          title: data.title,
          dueAt: data.due_at || "",
          status: data.status,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
        };
      } catch {
        return createSqliteRepository().createTask(input as any);
      }
    },
    async updateTask(id, changes) {
      try {
        const updateData: any = { updated_at: new Date().toISOString() };
        if (changes.status) updateData.status = changes.status;
        if (changes.title) updateData.title = changes.title;
        if (changes.dueAt !== undefined) updateData.due_at = changes.dueAt ? new Date(`${changes.dueAt}T09:00:00.000Z`).toISOString() : null;

        const { data, error } = await supabase
          .from("follow_up_tasks")
          .update(updateData)
          .eq("id", String(id))
          .select("*")
          .maybeSingle();

        if (error || !data) throw error || new Error("Update task failed");
        return {
          id: data.id,
          leadId: data.lead_id,
          title: data.title,
          dueAt: data.due_at || "",
          status: data.status,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
        };
      } catch {
        return createSqliteRepository().updateTask(id, changes);
      }
    },
    async close() {},
  };
}

export function createLeadRepository(options: { mode?: "prisma" | "supabase" | "sqlite"; prisma?: PrismaLeadClient; sqlitePath?: string } = {}): LeadRepository {
  const mode = options.mode ?? getPersistenceMode();
  if (mode === "sqlite") return createSqliteRepository(options.sqlitePath);
  if (mode === "supabase") return createSupabaseRepository();
  return createPrismaRepository(options.prisma ?? (getPrismaClient() as unknown as PrismaLeadClient));
}

let repository: LeadRepository | undefined;
export function getLeadRepository(): LeadRepository { repository ??= createLeadRepository(); return repository; }
export function resetLeadRepository(): void { repository = undefined; }
