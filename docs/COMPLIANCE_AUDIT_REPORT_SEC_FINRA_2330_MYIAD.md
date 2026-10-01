# Compliance & Risk Audit Report: SEC & FINRA Rule 2330 Suitability & Disclaimers for MyIAD.com

**Document Version:** 1.0.0 (Formal Regulatory Audit)  
**Date:** September 30, 2026  
**Auditor / Reviewer:** QA & Risk Reviewer (Agent `05ee81ed-a5ce-4cb0-ac24-0c075ffbedec`)  
**Target Domain:** `https://myiad.com`  
**Pipeline Target:** `https://crm.myiad.net/api/webhooks/leads`  
**Licensee of Record:** Angel Burgos, Florida State 0215 Life, Health & Variable Annuity Broker (License `#G328926`)  
**Governing Issue:** ABGA-13 (Parent: ABGA-10)  
**Related Issues:** ABGA-4, ABGA-11, ABGA-12, ABGA-14, ABGA-15  

---

## Executive Summary & Review Decision

- **Review Decision:** **REVISE** (Remediation Required Prior to Production Publishing)
- **Risk Level:** **HIGH**
- **Primary Risk Drivers:**
  1. **Statutory TCPA Non-Compliance:** Pre-checked consent checkbox in `MyIADLeadForm.tsx` (`useState(true)`) and default `consent: true` in `useQuoteAndLeadRouting.ts` violate Federal Communications Commission (FCC) 47 CFR § 64.1200 regulations requiring affirmative, un-checked Prior Express Written Consent (PEWC).
  2. **Improper Regulatory Conflation under FINRA Rule 2330:** `validateMyIADLeadPayload` in `src/lib/integrations/crm-myiad.ts` automatically forces `finraAcknowledged = true` whenever TCPA marketing consent is present. Conflating marketing contact consent with mandatory securities risk disclosures is a material supervisory defect.
  3. **Unqualified Guarantee Phrasing:** Unconditional claims regarding "Guaranteed lifetime income streams... regardless of market volatility" in `src/components/myiad/tokens.ts` lack proximate disclosure regarding the claims-paying ability of the issuing insurer and separate account investment risk (FINRA Rule 2210 / SEC Reg BI).
  4. **Unspecified Broker-Dealer Supervision:** Variable annuities are securities; marketing materials fail to identify the supervising registered broker-dealer firm or clarify that AB Global Consulting is an independent insurance agency rather than a broker-dealer.
  5. **Missing 36-Month Exchange / Replacement Inquiries:** FINRA Rule 2330(b)(1)(A)(viii) requires determining whether a variable annuity exchange has occurred within the preceding 36 months before a transaction recommendation or application is processed.

---

## Audit Matrix & Acceptance Criteria Verification

| ID | Acceptance Criterion | Audit Finding | Status |
| :--- | :--- | :--- | :--- |
| **AC-1** | Full suitability audit of variable annuity promotional claims under SEC and FINRA Rule 2330. | Promotional claims in `tokens.ts` and `MyIADHero.tsx` contain unqualified guarantees. Backend validation auto-acknowledges FINRA suitability without affirmative prospect action. Missing 36-month replacement check. | **FAIL (REMEDIATE)** |
| **AC-2** | Required supervisory and non-guaranteed return disclaimers explicitly drafted and placed. | Excellent drafting in `MyIADTrustAndCompliance.tsx` and `tokens.ts`, but completely absent from `MyIADLeadForm.tsx` (lead form tab) and lacking prospectus delivery warnings. | **FAIL (REMEDIATE)** |
| **AC-3** | Clear state licensing disclosures and agent/broker-dealer relationship disclaimers defined. | Angel Burgos FL Lic #G328926 is properly cited. However, national territory claims lack reciprocity disclosures, and the broker-dealer entity overseeing securities transactions is undefined. | **FAIL (REMEDIATE)** |
| **AC-4** | Consumer privacy, TCPA consent, and PII protection compliance review. | Critical TCPA defect: consent checkbox is pre-checked (`useState(true)`). Error logging dumps unmasked PII. Privacy page lists "HubSpot" instead of `crm.myiad.net`. | **FAIL (REMEDIATE)** |
| **AC-5** | Formal PASS / FAIL / REMEDIATION findings recorded on copy decks and intake forms before production release. | Comprehensive audit findings recorded with exact line citations and remediation code patches across all affected files. | **PASS** |

---

## Detailed Regulatory Findings

### 1. SEC & FINRA Rule 2330 Variable Annuity Suitability

#### Finding 1.1: Automated Regulatory Auto-Binding in Lead Ingestion
- **Location:** `src/lib/integrations/crm-myiad.ts`, lines 136–141:
  ```ts
  if (category === "variable_annuity") {
    // If not explicitly set, flag warning if strict, or auto-bind if user confirmed terms
    if (data.consent) {
      finraAcknowledged = true;
    }
  }
  ```
- **Regulatory Standard:** Under FINRA Rule 2330(b) and SEC Regulation Best Interest (Exchange Act Rule 15l-1), suitability evaluations and customer risk acknowledgments must represent genuine, conscious affirmative customer receipt.
- **Defect:** TCPA marketing consent (allowing phone calls/SMS) is automatically transformed by backend logic into affirmative acknowledgment of variable annuity risk and supervisory disclosures.
- **Required Remediation:** Remove this auto-binding. `finraDisclosureAcknowledged` must be explicitly transmitted as `true` from the client interface only when the customer affirmatively checks or acknowledges the specific variable annuity disclosure.

#### Finding 1.2: Default Value in Client State Machine
- **Location:** `src/lib/hooks/useQuoteAndLeadRouting.ts`, line 46:
  ```ts
  finraDisclosureAcknowledged: true,
  ```
- **Defect:** The default state for variable annuity quote parameters pre-populates `finraDisclosureAcknowledged` as `true`.
- **Required Remediation:** Set default `finraDisclosureAcknowledged` to `false` in `defaultQuoteParams.variable_annuity`.

#### Finding 1.3: Promissory and Unqualified Guarantee Copy
- **Location:** `src/components/myiad/tokens.ts`, line 77:
  ```ts
  "Guaranteed lifetime income streams that you cannot outlive, regardless of market volatility"
  ```
- **Regulatory Standard:** FINRA Rule 2210(d)(1)(B) prohibits false, exaggerated, unwarranted, promissory or misleading statements or claims in public communications.
- **Defect:** Promising guaranteed income "regardless of market volatility" without immediate proximity disclosure that guarantees depend on the claims-paying ability of the issuing insurer and that variable subaccounts fluctuate with market risk violates communication rules.
- **Required Remediation:** Update to:
  *"Contractually guaranteed lifetime income streams backed by the claims-paying ability of the issuing insurer, engineered with optional withdrawal benefit riders to protect against longevity exhaustion while underlying subaccounts remain subject to market fluctuation."*

#### Finding 1.4: Omission of FINRA Rule 2330 36-Month Exchange Inquiry
- **Location:** `src/components/QuoteSelectorForm.tsx` (Step 2C) and `docs/MYIAD_INTAKE_LEAD_FLOW_SPECIFICATION.md`.
- **Regulatory Standard:** FINRA Rule 2330(b)(1)(A)(viii) mandates an inquiry as to whether the customer has had another deferred variable annuity exchange within the preceding 36 months.
- **Defect:** The intake questionnaire asks for rollover type (401k/IRA) but omits whether the applicant has completed a 1035 exchange or variable annuity replacement in the last 36 months.
- **Required Remediation:** Add an intake parameter:
  `hasAnnuityExchangePast36Months: "no" | "yes" | "unsure"`.

---

### 2. Disclaimers & Broker-Dealer Relationship Disclosures

#### Finding 2.1: Missing Broker-Dealer of Record Disclosure
- **Location:** `src/components/myiad/MyIADFooter.tsx`, `tokens.ts`, `docs/MYIAD_COPY_DECK_AND_CONVERSION_HOOKS.md`.
- **Regulatory Standard:** Under SEC and FINRA rules, variable annuities are classified as securities. Variable annuity transactions cannot be executed by an independent insurance agency alone; they require registration through a broker-dealer member of FINRA/SIPC.
- **Defect:** The site mentions "Angel Burgos, FL Lic #G328926 (0215 Life, Health & VA)" and "AB Global Consulting LLC", but fails to identify the supervising broker-dealer or state that securities are offered through an affiliated broker-dealer.
- **Required Remediation:** Add mandatory statutory broker-dealer disclosure across footer, disclosures page, and variable annuity copy:
  ```text
  "Securities and Variable Annuities offered through [Supervisory Broker-Dealer Name], Member FINRA/SIPC. AB Global Consulting LLC and MyIAD are not registered broker-dealers. Insurance advisory, fixed indexed annuities, and life insurance services are offered through Angel Burgos, Florida Licensed 0215 Agent (#G328926)."
  ```

#### Finding 2.2: Missing Variable Annuity Prospectus Legend
- **Location:** `src/components/myiad/MyIADLeadForm.tsx` & `src/components/QuoteSelectorForm.tsx`.
- **Regulatory Standard:** SEC Rule 482 / FINRA Rule 2210 require that any communication offering variable annuities or variable insurance products state clearly that they are sold by prospectus only.
- **Defect:** The forms allow a prospect to request variable annuity illustrations without displaying the mandatory prospectus legend.
- **Required Remediation:** Insert the statutory prospectus notice directly above the submission action:
  *"Variable annuities are sold by prospectus only. Investors should carefully consider the investment objectives, risks, charges, and expenses before investing. The contract and summary prospectus contain this and other important information. Contact your licensed representative to obtain a prospectus."*

#### Finding 2.3: Discrepancy on `/disclosures` Page
- **Location:** `src/app/disclosures/page.tsx` and `src/lib/policy-content.ts`.
- **Defect:** `/disclosures` relies on two outdated generic paragraphs that omit FINRA Rule 2330, variable annuities, state licensing `#G328926`, Medicare disclaimers, and broker-dealer relationship notices.
- **Required Remediation:** Update `src/lib/policy-content.ts` or replace `src/app/disclosures/page.tsx` with comprehensive statutory text.

---

### 3. TCPA Consent, Consumer Privacy & PII Protection

#### Finding 3.1: Pre-Checked Consent Checkbox (CRITICAL DEFECT)
- **Location 1:** `src/components/myiad/MyIADLeadForm.tsx`, line 24:
  ```tsx
  const [consent, setConsent] = useState(true);
  ```
- **Location 2:** `src/lib/hooks/useQuoteAndLeadRouting.ts`, line 59:
  ```ts
  consent: true,
  ```
- **Regulatory Standard:** Under FCC 47 C.F.R. § 64.1200 (Telephone Consumer Protection Act) and FTC guidelines, "Prior Express Written Consent" (PEWC) requires an affirmative voluntary act by the consumer. Pre-checked consent boxes do not constitute valid legal consent. Telemarketing calls or automated SMS sent on pre-checked leads subject the firm to statutory damages of $500 to $1,500 per message/call.
- **Required Remediation:**
  - Change `useState(true)` to `useState(false)` in `MyIADLeadForm.tsx`.
  - Change `consent: true` to `consent: false` in `defaultContact` within `useQuoteAndLeadRouting.ts`.

#### Finding 3.2: Omission of Mandatory Carrier SMS Terms in Microcopy
- **Location:** `src/components/QuoteSelectorForm.tsx`, line 752.
- **Defect:** The consent microcopy omits mobile carrier frequency rules and direct opt-out instructions.
- **Required Remediation:** Update consent text to:
  *"By checking this box, I express affirmative consent to receive insurance and annuity quote information, phone calls, and automated SMS messages from licensed advisor Angel Burgos (FL Lic #G328926) and AB Global Consulting / MyIAD at the number provided above. Message frequency varies. Standard carrier message and data rates may apply. Reply STOP to cancel at any time, HELP for help. Consent is not a condition of purchase."*

#### Finding 3.3: Inaccurate CRM Infrastructure Citation in Privacy Policy
- **Location:** `src/app/privacy/page.tsx`, line 141.
- **Defect:** The privacy policy states: "HubSpot CRM: Confidential client management...". The production architecture routes all leads directly to `crm.myiad.net` (self-hosted / internal PostgreSQL pipeline). Citing an uncontracted third-party CRM misrepresents data handling under GLBA and state privacy statutes.
- **Required Remediation:** Update `src/app/privacy/page.tsx` section 4 to cite `crm.myiad.net` secure pipeline with PostgreSQL and Row-Level Security.

#### Finding 3.4: PII Redaction in Telemetry and Error Handlers
- **Location:** `src/lib/integrations/crm-myiad.ts`, line 333:
  ```ts
  console.error("[crm.myiad.net Webhook Error]", response.status, errorText);
  ```
- **Defect:** Error logs print unredacted error strings that may mirror prospect payload data back to application console output.
- **Required Remediation:** Implement PII masking for error logs (e.g. masking phone numbers `(***) ***-1234` and email addresses `a***@example.com`).

---

## Detailed Remediation Action Plan

### Action Item 1: Correct TCPA Consent Default State
- **Owner:** Engineering Lead (ABGA-14 / ABGA-15)
- **Files:**
  - `src/components/myiad/MyIADLeadForm.tsx`: Change line 24 to `const [consent, setConsent] = useState(false);`
  - `src/lib/hooks/useQuoteAndLeadRouting.ts`: Change line 59 to `consent: false,`

### Action Item 2: Decouple FINRA 2330 Acknowledgment from TCPA Consent
- **Owner:** Engineering Lead (ABGA-14)
- **Files:**
  - `src/lib/integrations/crm-myiad.ts`: Remove lines 136-141 auto-binding logic. Enforce that `category === "variable_annuity"` strictly checks `data.quoteParameters?.finraDisclosureAcknowledged === true`.
  - `src/lib/hooks/useQuoteAndLeadRouting.ts`: Set `finraDisclosureAcknowledged: false` in `defaultQuoteParams.variable_annuity`.

### Action Item 3: Update Variable Annuity Marketing Copy & Guarantees
- **Owner:** Growth & Content Lead (ABGA-12) & Engineering Lead (ABGA-14)
- **Files:**
  - `src/components/myiad/tokens.ts`: Update line 77 guarantee description to condition claims on insurer claims-paying ability and separate account market risk.
  - `docs/MYIAD_COPY_DECK_AND_CONVERSION_HOOKS.md`: Add broker-dealer supervisory notice and prospectus delivery legend.

### Action Item 4: Enhance Statutory Disclosures on Portal
- **Owner:** Engineering Lead (ABGA-14)
- **Files:**
  - `src/app/disclosures/page.tsx` & `src/lib/policy-content.ts`: Add full FINRA Rule 2330 text, FL Lic #G328926, Medicare CMS disclaimer, and broker-dealer supervisory statement.
  - `src/app/privacy/page.tsx`: Replace "HubSpot CRM" with `crm.myiad.net` and append FINRA 6-year books & records retention policy.

---

## Sign-Off and Release Gate

- **QA & Risk Reviewer Disposition:** **REVISE**  
- **Reviewer Signature:** QA & Risk Reviewer (`05ee81ed-a5ce-4cb0-ac24-0c075ffbedec`)  
- **Required Next Owner:** Engineering Lead (`036d0be9-b467-4d7a-af3b-8d1933ba67fc`) to execute Action Items 1, 2, and 4; Growth & Content Lead (`0fe7ce2a-550a-490e-8a60-a72b420f78a8`) to execute Action Item 3.  
- **Final Approval Gate:** Production release and domain publishing require explicit sign-off from Angel Burgos (CEO & Principal Advisor).
