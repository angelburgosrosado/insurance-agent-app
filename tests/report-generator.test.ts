import test from "node:test";
import assert from "node:assert/strict";
import { generateExecutiveReportHtml } from "../src/lib/pdf/report-generator";

test("Report Generator - Generates Military Asset Shield report in EN and ES", () => {
  const enReport = generateExecutiveReportHtml({
    reportType: "military",
    clientName: "SGT John Miller",
    lang: "en",
  });
  assert.match(enReport, /Military & Veteran Transition/);
  assert.match(enReport, /SGT John Miller/);
  assert.match(enReport, /VGLI/);
  assert.match(enReport, /Angel Burgos/);

  const esReport = generateExecutiveReportHtml({
    reportType: "military",
    clientName: "Sargento Carlos Ortiz",
    lang: "es",
  });
  assert.match(esReport, /Diagnóstico de Transición Militar/);
  assert.match(esReport, /Sargento Carlos Ortiz/);
  assert.match(esReport, /pensi[oó]n/i);
});

test("Report Generator - Generates Florida IUL report", () => {
  const iulReport = generateExecutiveReportHtml({
    reportType: "iul",
    clientName: "Maria Rodriguez",
    lang: "es",
  });
  assert.match(iulReport, /Seguro Indexado Universal/);
  assert.match(iulReport, /IRS 7702/);
  assert.match(iulReport, /Maria Rodriguez/);
});
