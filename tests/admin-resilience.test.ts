import assert from "node:assert/strict";
import test from "node:test";
import { getDashboardMetrics } from "../src/lib/server/admin-metrics";
import { getCampaignMetrics } from "../src/lib/server/campaign-metrics";
import { getAnalyticsData } from "../src/lib/server/analytics-metrics";
import { resolveStaffAuthorization } from "../src/lib/auth/authorization";

test("Admin Dashboard Metrics - executes safely with resilient fallback when DATABASE_URL is unset", async () => {
  const metrics = await getDashboardMetrics();
  assert.ok(metrics, "Metrics object should be defined");
  assert.equal(typeof metrics.totalLeads, "number");
  assert.equal(typeof metrics.newLeadsThisWeek, "number");
  assert.equal(typeof metrics.conversionRate, "string");
  assert.equal(typeof metrics.pendingTasks, "number");
  assert.ok(Array.isArray(metrics.recentLeads), "Recent leads should be an array");
});

test("Admin Campaign Metrics - executes safely with resilient fallback", async () => {
  const campaigns = await getCampaignMetrics();
  assert.ok(Array.isArray(campaigns), "Campaign metrics should return an array");
});

test("Admin Analytics Metrics - executes safely with resilient fallback", async () => {
  const data = await getAnalyticsData();
  assert.ok(data, "Analytics data should be defined");
  assert.ok(Array.isArray(data.timeSeries), "timeSeries should be an array");
  assert.equal(data.timeSeries.length, 30, "timeSeries should span 30 days");
  assert.ok(Array.isArray(data.breakdown), "breakdown should be an array");
});

test("Admin Staff Auth - Angel Burgos Master Admin bypass succeeds even if repository throws error", async () => {
  const faultyRepository = {
    user: {
      findUnique: async () => {
        throw new Error("Database connection refused");
      },
    },
  };

  const auth = await resolveStaffAuthorization(
    { id: "admin_angel_burgos", email: "angelburgosrosado@gmail.com" },
    faultyRepository
  );

  assert.equal(auth.authenticated, true);
  assert.equal(auth.authorized, true);
  if (auth.authorized) {
    assert.equal(auth.role, "superadmin");
  }
});
