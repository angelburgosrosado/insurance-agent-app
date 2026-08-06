import { NextResponse } from "next/server";
import { getLeadRepository, type LeadId } from "@/lib/server/leads";
import { requireApiStaffAccess } from "@/lib/auth/server";
import type { FollowUpTaskStatus } from "@/lib/db";

const statuses: FollowUpTaskStatus[] = ["pending", "completed", "cancelled"];

async function denied() {
  const authorization = await requireApiStaffAccess();
  if (!authorization.authenticated) return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  if (!authorization.authorized) return NextResponse.json({ error: "Staff access required" }, { status: 403 });
  return null;
}

function id(value: unknown): LeadId | null {
  if (typeof value === "number" && Number.isSafeInteger(value) && value > 0) return value;
  if (typeof value === "string" && value.trim()) return value.trim();
  return null;
}

function date(value: unknown): string | undefined {
  if (value === undefined) return undefined;
  if (typeof value !== "string" || (value && !/^\d{4}-\d{2}-\d{2}$/.test(value))) return undefined;
  return value;
}

export async function GET() {
  const response = await denied();
  if (response) return response;
  return NextResponse.json({ tasks: await getLeadRepository().listTasks() });
}

export async function POST(request: Request) {
  const response = await denied();
  if (response) return response;
  const body = await request.json().catch(() => null) as { leadId?: unknown; title?: unknown; dueAt?: unknown } | null;
  const leadId = id(body?.leadId);
  const title = typeof body?.title === "string" ? body.title.trim() : "";
  const dueAt = date(body?.dueAt);
  if (leadId === null || !title || title.length > 200 || body?.dueAt !== undefined && dueAt === undefined) return NextResponse.json({ error: "Valid leadId and title are required" }, { status: 422 });
  try { return NextResponse.json({ task: await getLeadRepository().createTask({ leadId, title, dueAt }) }, { status: 201 }); }
  catch { return NextResponse.json({ error: "Lead not found" }, { status: 404 }); }
}

export async function PATCH(request: Request) {
  const response = await denied();
  if (response) return response;
  const body = await request.json().catch(() => null) as { id?: unknown; title?: unknown; dueAt?: unknown; status?: unknown } | null;
  const taskId = id(body?.id);
  const dueAt = date(body?.dueAt);
  const title = body?.title === undefined ? undefined : typeof body.title === "string" ? body.title.trim() : "";
  if (taskId === null || title === "" || title && title.length > 200 || body?.dueAt !== undefined && dueAt === undefined || body?.status !== undefined && !statuses.includes(body.status as FollowUpTaskStatus)) return NextResponse.json({ error: "Invalid task update" }, { status: 422 });
  try { return NextResponse.json({ task: await getLeadRepository().updateTask(taskId, { title, dueAt, status: body?.status as FollowUpTaskStatus | undefined }) }); }
  catch { return NextResponse.json({ error: "Task not found" }, { status: 404 }); }
}
