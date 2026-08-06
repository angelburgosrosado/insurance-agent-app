import assert from "node:assert/strict";
import test from "node:test";
import { createDatabase } from "../src/lib/db.ts";

test("creates a lead and returns it with a new status", () => {
  const database = createDatabase(":memory:");
  const lead = database.createLead({
    firstName: "Marisol",
    lastName: "Vega",
    email: "marisol@example.com",
    phone: "555-0100",
    service: "business-insurance",
    contactTime: "morning",
    message: "Need a review",
    consent: true,
    source: "organic",
    medium: "search",
    campaign: "",
  });

  assert.equal(lead.status, "new");
  assert.equal(database.listLeads()[0].email, "marisol@example.com");

  const updated = database.updateLead(lead.id, { status: "contacted", followUpDate: "2026-08-05" });
  assert.equal(updated.status, "contacted");
  assert.equal(updated.followUpDate, "2026-08-05");
});

test("stores and returns internal notes", () => {
  const database = createDatabase(":memory:");
  const lead = database.createLead({
    firstName: "Darius",
    lastName: "Coleman",
    email: "darius@example.com",
    phone: "555-0101",
    service: "life-insurance",
    contactTime: "afternoon",
    message: "",
    consent: true,
    source: "referral",
    medium: "",
    campaign: "",
  });

  const note = database.addNote(lead.id, "Review coverage questions", "Angel Burgos");
  assert.equal(note.body, "Review coverage questions");
  assert.equal(database.listNotes(lead.id)[0].author, "Angel Burgos");
});

test("creates, lists, and updates follow-up tasks", () => {
  const database = createDatabase(":memory:");
  const lead = database.createLead({
    firstName: "Leah",
    lastName: "Okafor",
    email: "leah@example.com",
    phone: "555-0102",
    service: "personal-insurance",
    contactTime: "",
    message: "",
    consent: true,
    source: "",
    medium: "",
    campaign: "",
  });

  const task = database.createTask({ leadId: lead.id, title: "Call prospect", dueAt: "2026-08-12" });
  assert.equal(task.status, "pending");
  assert.equal(database.listTasks()[0].title, "Call prospect");

  const updated = database.updateTask(task.id, { status: "completed" });
  assert.equal(updated.status, "completed");
  assert.equal(updated.dueAt, "2026-08-12");
});
