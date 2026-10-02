import test from "node:test";
import assert from "node:assert/strict";
import {
  generateScenarioDiagnostic,
  generateCopilotResponse,
  type AssessmentScenario,
} from "../src/lib/myiad-ai-copilot";

test("MyIAD AI Copilot - Generates accurate Scenario Diagnostic in English", () => {
  const scenario: AssessmentScenario = {
    goal: "iul_wealth",
    age: 40,
    annualIncome: 120000,
    dependents: 2,
    debt: 300000,
  };

  const result = generateScenarioDiagnostic(scenario, "en");

  assert.ok(result.headline.includes("Age 40"));
  assert.ok(result.executiveSummary.includes("120,000"));
  assert.ok(result.vulnerabilityGaps.length >= 2);
  const debtGap = result.vulnerabilityGaps.find((g) => g.title.includes("Mortgage"));
  assert.ok(debtGap, "Should identify debt exposure vulnerability");
  assert.equal(debtGap?.severity, "critical");

  assert.ok(result.strategicPillars.some((p) => p.statutoryRef.includes("IRC §7702")));
  assert.ok(result.strategicPillars.some((p) => p.name.includes("0% Downside Floor")));
  assert.ok(result.complianceNote.includes("educational purposes only"));
});

test("MyIAD AI Copilot - Generates accurate Scenario Diagnostic in Spanish", () => {
  const scenario: AssessmentScenario = {
    goal: "family_protection",
    age: 35,
    annualIncome: 90000,
    dependents: 3,
    debt: 200000,
  };

  const result = generateScenarioDiagnostic(scenario, "es");

  assert.ok(result.headline.includes("35 años"));
  assert.ok(result.executiveSummary.includes("IRC §7702"));
  assert.ok(result.vulnerabilityGaps.some((g) => g.title.includes("Deuda")));
  assert.ok(result.strategicPillars.some((p) => p.name.includes("Piso de Mercado del 0%")));
  assert.ok(result.complianceNote.includes("educativo"));
});

test("MyIAD AI Copilot - Responds to 0% floor market volatility inquiry", async () => {
  const response = await generateCopilotResponse({
    query: "How does the 0% floor protect against a market crash like 2008?",
    lang: "en",
  });

  assert.ok(response.content.includes("0% Floor"));
  assert.ok(response.content.includes("S&P 500"));
  assert.ok(response.content.includes("Annual Reset"));
  assert.ok(response.suggestedPrompts.length > 0);
  assert.ok(response.actionCta);
  assert.equal(response.actionCta?.action, "open_assessment");
});

test("MyIAD AI Copilot - Responds to tax-free IRC 7702 inquiry", async () => {
  const response = await generateCopilotResponse({
    query: "Explain tax-free policy loans under IRC 7702",
    lang: "en",
  });

  assert.ok(response.content.includes("IRC §7702"));
  assert.ok(response.content.includes("IRC §101(a)"));
  assert.ok(response.content.includes("Non-MEC"));
  assert.ok(response.suggestedPrompts.length > 0);
});

test("MyIAD AI Copilot - Responds to living benefits inquiry", async () => {
  const response = await generateCopilotResponse({
    query: "What illnesses are covered under living benefits?",
    lang: "en",
  });

  assert.ok(response.content.includes("Living Benefits"));
  assert.ok(response.content.includes("Chronic Illness"));
  assert.ok(response.content.includes("Critical Illness"));
  assert.ok(response.content.includes("80%"));
});

test("MyIAD AI Copilot - Responds to FINRA Rule 2330 annuity suitability inquiry", async () => {
  const response = await generateCopilotResponse({
    query: "What are the FINRA Rule 2330 requirements for variable annuities?",
    lang: "en",
  });

  assert.ok(response.content.includes("FINRA Rule 2330"));
  assert.ok(response.content.includes("Suitability"));
  assert.ok(response.content.includes("GLWB") || response.content.includes("Guaranteed"));
  assert.ok(response.content.includes("prospectus"));
});

test("MyIAD AI Copilot - Incorporates client assessment scenario context", async () => {
  const scenario: AssessmentScenario = {
    goal: "iul_wealth",
    age: 48,
    annualIncome: 180000,
    dependents: 1,
    debt: 450000,
    calculatedCoverageNeed: 1200000,
  };

  const response = await generateCopilotResponse({
    query: "Hello, what can you help me with?",
    scenario,
    lang: "en",
  });

  assert.ok(response.content.includes("48"));
  assert.ok(response.content.includes("180,000"));
});
