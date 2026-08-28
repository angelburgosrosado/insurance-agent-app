import test from "node:test";
import assert from "node:assert/strict";
import { detectTerritoryFromPhone, detectSpecialization } from "../src/lib/lead-routing";

test("Lead Routing - Accurately detects Central Florida, South Florida, and Puerto Rico territories", () => {
  // Orlando / Daytona
  const orlando = detectTerritoryFromPhone("407-555-1234");
  assert.equal(orlando.territory, "central_fl");

  const daytona = detectTerritoryFromPhone("(386) 333-1482");
  assert.equal(daytona.territory, "central_fl");

  // Miami
  const miami = detectTerritoryFromPhone("305-123-4567");
  assert.equal(miami.territory, "south_fl");

  // Puerto Rico
  const sanJuan = detectTerritoryFromPhone("787-999-8888");
  assert.equal(sanJuan.territory, "puerto_rico");
  assert.equal(sanJuan.flag, "🇵🇷");
});

test("Lead Routing - Accurately detects product specializations", () => {
  const mil = detectSpecialization("Military Asset Shield", "I am separating from active duty SGLI");
  assert.equal(mil.specialization, "military");

  const annuity = detectSpecialization("Annuity Estimator", "Rolling over my 401k");
  assert.equal(annuity.specialization, "annuity");

  const iul = detectSpecialization("Florida IUL", "Looking for 0% floor and tax-free retirement");
  assert.equal(iul.specialization, "iul");

  const funeral = detectSpecialization("Final Expense", "Everest concierge savings");
  assert.equal(funeral.specialization, "final_expense");
});
