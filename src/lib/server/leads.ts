import { createDatabase, type Lead, type LeadCreateInput, type LeadNote, type LeadStatus } from "@/lib/db";
import { getPrismaClient, type ServerDatabase } from "@/lib/server/db";

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
};

type PrismaNoteRecord = { id: string; leadId: string; body: string; author?: { name: string | null } | null; createdAt: Date };

export type PrismaLeadClient = Pick<ServerDatabase, "$disconnect"> & {
  lead: {
    create(args: { data: Record<string, unknown>; include: { attribution: true } }): Promise<PrismaLeadRecord>;
    findMany(args: Record<string, unknown>): Promise<PrismaLeadRecord[]>;
    findUnique(args: Record<string, unknown>): Promise<PrismaLeadRecord | null>;
    update(args: Record<string, unknown>): Promise<PrismaLeadRecord>;
  };
  leadNote: {
    findMany(args: Record<string, unknown>): Promise<PrismaNoteRecord[]>;
    create(args: Record<string, unknown>): Promise<PrismaNoteRecord>;
  };
};

export type LeadRepository = {
  createLead(input: LeadCreateInput): Promise<Lead>;
  listLeads(): Promise<Lead[]>;
  getLead(id: LeadId): Promise<Lead | null>;
  updateLead(id: LeadId, changes: { status?: LeadStatus; followUpDate?: string }): Promise<Lead>;
  addNote(leadId: LeadId, body: string, author: string): Promise<LeadNote>;
  listNotes(leadId: LeadId): Promise<LeadNote[]>;
  close(): Promise<void>;
};

export function getPersistenceMode(env: Record<string, string | undefined> = process.env): "prisma" | "sqlite" {
  if (env.LEAD_PERSISTENCE === "sqlite") return "sqlite";
  if (env.LEAD_PERSISTENCE === "prisma" || env.DATABASE_URL) return "prisma";
  return "sqlite";
}

function text(value: string | null | undefined): string { return value ?? ""; }

export function mapPrismaLead(row: PrismaLeadRecord): Lead {
  return {
    id: row.id, firstName: row.firstName, lastName: row.lastName, email: row.email, phone: row.phone, service: row.service,
    contactTime: text(row.contactTime), message: text(row.message), consent: row.consent, consentText: row.consentText ?? "", consentVersion: row.consentVersion ?? "", consentAt: row.consentAt.toISOString(),
    source: text(row.attribution?.source), medium: text(row.attribution?.medium), campaign: text(row.attribution?.campaign), content: text(row.attribution?.content), term: text(row.attribution?.term),
    status: row.status as LeadStatus, followUpDate: "", createdAt: row.createdAt.toISOString(),
  };
}

function mapPrismaNote(row: PrismaNoteRecord): LeadNote {
  return { id: row.id, leadId: row.leadId, body: row.body, author: row.author?.name ?? "Marketing team", createdAt: row.createdAt.toISOString() };
}

function createPrismaRepository(prisma: PrismaLeadClient): LeadRepository {
  const include = { attribution: true } as const;
  return {
    async createLead(input) {
      const attribution = Object.fromEntries(Object.entries({ source: input.source, medium: input.medium, campaign: input.campaign, content: input.content, term: input.term }).filter(([, value]) => value));
      const row = await prisma.lead.create({ data: { firstName: input.firstName, lastName: input.lastName, email: input.email, phone: input.phone, service: input.service, contactTime: input.contactTime || "", message: input.message || "", consent: input.consent, consentText: input.consentText ?? "", consentVersion: input.consentVersion ?? "legacy", consentAt: new Date(input.consentAt ?? new Date().toISOString()), ...(Object.keys(attribution).length ? { attribution: { create: attribution } } : {}) }, include });
      return mapPrismaLead(row);
    },
    async listLeads() { return (await prisma.lead.findMany({ orderBy: [{ createdAt: "desc" }], include })).map(mapPrismaLead); },
    async getLead(id) {
      if (typeof id !== "string") return null;
      const row = await prisma.lead.findUnique({ where: { id }, include });
      return row ? mapPrismaLead(row) : null;
    },
    async updateLead(id, changes) { return mapPrismaLead(await prisma.lead.update({ where: { id: String(id) }, data: { ...(changes.status ? { status: changes.status } : {}) }, include })); },
    async addNote(leadId, body, author) {
      const email = `legacy-${author.toLowerCase().replace(/[^a-z0-9]+/g, "-")}@internal.invalid`;
      return mapPrismaNote(await prisma.leadNote.create({ data: { leadId: String(leadId), body, author: { connectOrCreate: { where: { email }, create: { email, name: author } } } } }));
    },
    async listNotes(leadId) { return (await prisma.leadNote.findMany({ where: { leadId: String(leadId) }, include: { author: { select: { name: true } } }, orderBy: [{ createdAt: "desc" }] })).map(mapPrismaNote); },
    async close() { await prisma.$disconnect(); },
  };
}

function createSqliteRepository(filename?: string): LeadRepository {
  const database = createDatabase(filename);
  function sqliteId(id: LeadId): number {
    if (typeof id === "number" && Number.isInteger(id)) return id;
    if (typeof id === "string" && /^\d+$/.test(id)) return Number(id);
    throw new Error("Invalid SQLite lead id");
  }
  return {
    async createLead(input) { return database.createLead(input); }, async listLeads() { return database.listLeads(); },
    async getLead(id) { return database.getLead(sqliteId(id)); }, async updateLead(id, changes) { return database.updateLead(sqliteId(id), changes); },
    async addNote(leadId, body, author) { return database.addNote(sqliteId(leadId), body, author); }, async listNotes(leadId) { return database.listNotes(sqliteId(leadId)); },
    async close() { database.close(); },
  };
}

export function createLeadRepository(options: { mode?: "prisma" | "sqlite"; prisma?: PrismaLeadClient; sqlitePath?: string } = {}): LeadRepository {
  const mode = options.mode ?? getPersistenceMode();
  if (mode === "sqlite") return createSqliteRepository(options.sqlitePath);
  return createPrismaRepository(options.prisma ?? (getPrismaClient() as unknown as PrismaLeadClient));
}

let repository: LeadRepository | undefined;
export function getLeadRepository(): LeadRepository { repository ??= createLeadRepository(); return repository; }
export function resetLeadRepository(): void { repository = undefined; }
