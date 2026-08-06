// node:sqlite is available in the pinned local Node runtime; the project does not ship a native database dependency
// @ts-expect-error Node 22 exposes this experimental module without bundled TypeScript declarations
import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";

export type LeadStatus = "new" | "reviewing" | "assigned" | "contacted" | "qualified" | "closed";
export type FollowUpTaskStatus = "pending" | "completed" | "cancelled";

type LeadInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  contactTime: string;
  message: string;
  consent: boolean;
  source: string;
  medium: string;
  campaign: string;
  consentText?: string;
  consentVersion?: string;
  consentAt?: string;
  content?: string;
  term?: string;
};

export type Lead = LeadInput & {
  id: number | string;
  status: LeadStatus;
  followUpDate: string;
  createdAt: string;
};

export type LeadNote = {
  id: number | string;
  leadId: number | string;
  body: string;
  author: string;
  createdAt: string;
};

export type FollowUpTask = {
  id: number | string;
  leadId: number | string;
  title: string;
  dueAt: string;
  status: FollowUpTaskStatus;
  createdAt: string;
  updatedAt: string;
};

export type LeadDatabase = {
  createLead(input: LeadInput): Lead;
  listLeads(): Lead[];
  getLead(id: number): Lead | null;
  updateLead(id: number, changes: { status?: LeadStatus; followUpDate?: string }): Lead;
  addNote(leadId: number, body: string, author: string): LeadNote;
  listNotes(leadId: number): LeadNote[];
  listTasks(): FollowUpTask[];
  createTask(input: { leadId: number; title: string; dueAt?: string }): FollowUpTask;
  updateTask(id: number, changes: { status?: FollowUpTaskStatus; title?: string; dueAt?: string }): FollowUpTask;
  close(): void;
};

function rowToLead(row: Record<string, unknown>): Lead {
  return {
    id: Number(row.id),
    firstName: String(row.first_name),
    lastName: String(row.last_name),
    email: String(row.email),
    phone: String(row.phone),
    service: String(row.service),
    contactTime: String(row.contact_time),
    message: String(row.message),
    consent: Boolean(row.consent),
    source: String(row.source),
    medium: String(row.medium),
    campaign: String(row.campaign),
    status: row.status as LeadStatus,
    followUpDate: String(row.follow_up_date ?? ""),
    createdAt: String(row.created_at),
  };
}

function rowToNote(row: Record<string, unknown>): LeadNote {
  return {
    id: Number(row.id),
    leadId: Number(row.lead_id),
    body: String(row.body),
    author: String(row.author),
    createdAt: String(row.created_at),
  };
}

function rowToTask(row: Record<string, unknown>): FollowUpTask {
  return { id: Number(row.id), leadId: Number(row.lead_id), title: String(row.title), dueAt: String(row.due_at ?? ""), status: row.status as FollowUpTaskStatus, createdAt: String(row.created_at), updatedAt: String(row.updated_at) };
}

export function createDatabase(filename = process.env.DATABASE_PATH ?? ".data/leads.sqlite"): LeadDatabase {
  if (filename !== ":memory:") mkdirSync(dirname(filename), { recursive: true });
  const database = new DatabaseSync(filename);
  database.exec(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      service TEXT NOT NULL,
      contact_time TEXT NOT NULL DEFAULT '',
      message TEXT NOT NULL DEFAULT '',
      consent INTEGER NOT NULL,
      source TEXT NOT NULL DEFAULT '',
      medium TEXT NOT NULL DEFAULT '',
      campaign TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT 'new',
      follow_up_date TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS lead_notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lead_id INTEGER NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
      body TEXT NOT NULL,
      author TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS follow_up_tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lead_id INTEGER NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      due_at TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  return {
    createLead(input) {
      const createdAt = new Date().toISOString();
      const result = database.prepare(`INSERT INTO leads (first_name,last_name,email,phone,service,contact_time,message,consent,source,medium,campaign,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`).run(
        input.firstName, input.lastName, input.email, input.phone, input.service, input.contactTime, input.message, input.consent ? 1 : 0, input.source, input.medium, input.campaign, createdAt,
      );
      return rowToLead(database.prepare("SELECT * FROM leads WHERE id = ?").get(Number(result.lastInsertRowid)) as Record<string, unknown>);
    },
    listLeads() {
      return (database.prepare("SELECT * FROM leads ORDER BY datetime(created_at) DESC, id DESC").all() as Record<string, unknown>[]).map(rowToLead);
    },
    getLead(id) {
      const row = database.prepare("SELECT * FROM leads WHERE id = ?").get(id) as Record<string, unknown> | undefined;
      return row ? rowToLead(row) : null;
    },
    updateLead(id, changes) {
      const current = this.getLead(id);
      if (!current) throw new Error("Lead not found");
      database.prepare("UPDATE leads SET status = ?, follow_up_date = ? WHERE id = ?").run(changes.status ?? current.status, changes.followUpDate ?? current.followUpDate, id);
      return this.getLead(id) as Lead;
    },
    addNote(leadId, body, author) {
      if (!this.getLead(leadId)) throw new Error("Lead not found");
      const result = database.prepare("INSERT INTO lead_notes (lead_id,body,author,created_at) VALUES (?,?,?,?)").run(leadId, body, author, new Date().toISOString());
      return rowToNote(database.prepare("SELECT * FROM lead_notes WHERE id = ?").get(Number(result.lastInsertRowid)) as Record<string, unknown>);
    },
    listNotes(leadId) {
      return (database.prepare("SELECT * FROM lead_notes WHERE lead_id = ? ORDER BY datetime(created_at) DESC, id DESC").all(leadId) as Record<string, unknown>[]).map(rowToNote);
    },
    listTasks() {
      return (database.prepare("SELECT * FROM follow_up_tasks ORDER BY CASE WHEN due_at = '' THEN 1 ELSE 0 END, datetime(due_at), datetime(created_at) DESC, id DESC").all() as Record<string, unknown>[]).map(rowToTask);
    },
    createTask(input) {
      if (!this.getLead(input.leadId)) throw new Error("Lead not found");
      const now = new Date().toISOString();
      const result = database.prepare("INSERT INTO follow_up_tasks (lead_id,title,due_at,created_at,updated_at) VALUES (?,?,?,?,?)").run(input.leadId, input.title, input.dueAt ?? "", now, now);
      return rowToTask(database.prepare("SELECT * FROM follow_up_tasks WHERE id = ?").get(Number(result.lastInsertRowid)) as Record<string, unknown>);
    },
    updateTask(id, changes) {
      const current = database.prepare("SELECT * FROM follow_up_tasks WHERE id = ?").get(id) as Record<string, unknown> | undefined;
      if (!current) throw new Error("Task not found");
      database.prepare("UPDATE follow_up_tasks SET title = ?, due_at = ?, status = ?, updated_at = ? WHERE id = ?").run(changes.title ?? current.title, changes.dueAt ?? current.due_at, changes.status ?? current.status, new Date().toISOString(), id);
      return rowToTask(database.prepare("SELECT * FROM follow_up_tasks WHERE id = ?").get(id) as Record<string, unknown>);
    },
    close() { database.close(); },
  };
}

export const db = createDatabase();
export type LeadCreateInput = LeadInput;

export function seedDatabase(database: LeadDatabase) {
  if (database.listLeads().length > 0) return;
  const demo = [
    ["Marisol", "Vega", "marisol@example.com", "555-0100", "business-insurance", "organic", "search"],
    ["Darius", "Coleman", "darius@example.com", "555-0101", "life-insurance", "referral", ""],
    ["Leah", "Okafor", "leah@example.com", "555-0102", "personal-insurance", "google", "cpc"],
    ["Thomas", "Nguyen", "thomas@example.com", "555-0103", "not-sure", "direct", ""],
  ];
  demo.forEach(([firstName, lastName, email, phone, service, source, medium], index) => {
    const lead = database.createLead({ firstName, lastName, email, phone, service, contactTime: "", message: "Demo record", consent: true, source, medium, campaign: "" });
    if (index === 1) database.updateLead(lead.id as number, { status: "reviewing" });
    if (index === 2) database.updateLead(lead.id as number, { status: "assigned" });
    if (index === 3) database.updateLead(lead.id as number, { status: "contacted" });
  });
}

if (process.env.SEED_DEMO_DATA === "true") seedDatabase(db);

export function leadInputFromUnknown(body: Record<string, unknown>): LeadCreateInput {
  return {
    firstName: String(body.firstName ?? "").trim(), lastName: String(body.lastName ?? "").trim(), email: String(body.email ?? "").trim().toLowerCase(), phone: String(body.phone ?? "").trim(), service: String(body.service ?? "").trim(), contactTime: String(body.contactTime ?? "").trim(), message: String(body.message ?? "").trim(), consent: body.consent === true, consentText: String(body.consentText ?? "").trim(), consentVersion: String(body.consentVersion ?? "").trim(), consentAt: String(body.consentAt ?? new Date().toISOString()).trim(), source: String(body.source ?? "").trim().toLowerCase(), medium: String(body.medium ?? "").trim().toLowerCase(), campaign: String(body.campaign ?? "").trim().toLowerCase(), content: String(body.content ?? "").trim().toLowerCase(), term: String(body.term ?? "").trim().toLowerCase(),
  };
}

export const validStatuses: LeadStatus[] = ["new", "reviewing", "assigned", "contacted", "qualified", "closed"];
export function isLeadStatus(value: unknown): value is LeadStatus { return typeof value === "string" && validStatuses.includes(value as LeadStatus); }

export function closeDatabase() { db.close(); }
