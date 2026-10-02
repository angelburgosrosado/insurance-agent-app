export interface WorkflowNode {
  id: string;
  type: "trigger" | "delay" | "sms" | "voice_ai" | "email" | "task" | "compliance";
  title: string;
  subtitle: string;
  config: string;
}

export interface WorkflowTemplate {
  id: string;
  title: string;
  category: "Speed-to-Lead" | "Annuity & Life" | "Medicare" | "Compliance" | "Retention" | "Telephony";
  description: string;
  activeExecutions: number;
  conversionRate: string;
  status: "active" | "paused";
  nodes: WorkflowNode[];
}

export const ALL_28_AUTOMATIONS: WorkflowTemplate[] = [
  // --- 1. SPEED-TO-LEAD & TELEPHONY (6 Playbooks) ---
  {
    id: "speed-to-lead-voice",
    title: "1. Sub-Second Autonomous Voice AI Call Back",
    category: "Speed-to-Lead",
    description: "Instantly initiates a Twilio ConversationRelay voice call when a high-intent IUL or Annuity calculator lead is submitted.",
    activeExecutions: 384,
    conversionRate: "58.2%",
    status: "active",
    nodes: [
      { id: "1", type: "trigger", title: "Trigger: Inbound Webhook / Calculator Lead", subtitle: "Fires when lead is ingested with phone number", config: "Event: New Lead ($250k+ Coverage)" },
      { id: "2", type: "task", title: "Action: Compute AI Lead Score", subtitle: "Evaluates territory, age, and coverage amount", config: "Model: Gemini 2.5 Flash Triage" },
      { id: "3", type: "delay", title: "Delay: Wait 45 Seconds", subtitle: "Simulates human advisor review window", config: "Duration: 45s" },
      { id: "4", type: "voice_ai", title: "Action: Twilio AI Voice Call (1-888-887-3585)", subtitle: "Deepgram STT & ElevenLabs AI Voice Assistant", config: "Prompt: MyIAD_Voice_Receptionist_v2" },
      { id: "5", type: "task", title: "Action: Live Transfer to Angel Burgos", subtitle: "Transfers to direct phone when caller says 'Yes'", config: "Destination: +1-386-333-1482" },
    ],
  },
  {
    id: "speed-to-lead-sms",
    title: "2. 2-Minute 10DLC Verified SMS Strike Sequence",
    category: "Speed-to-Lead",
    description: "TCR-compliant welcoming text delivering personalized illustration numbers directly to the applicant's mobile phone.",
    activeExecutions: 612,
    conversionRate: "44.7%",
    status: "active",
    nodes: [
      { id: "1", type: "trigger", title: "Trigger: TCPA Affirmative Consent Verified", subtitle: "Unchecked consent box verified at submission", config: "Filter: TCPA_Consent == true" },
      { id: "2", type: "sms", title: "Action: Send Personalized Quote Summary SMS", subtitle: "Delivers coverage amount & 0% floor guarantee", config: "Template: Quote_Welcome_EN_ES" },
      { id: "3", type: "delay", title: "Delay: Wait 15 Minutes for Reply", subtitle: "Monitors inbound SMS webhook for keyword", config: "Timeout: 15m" },
      { id: "4", type: "task", title: "Action: Dispatch Advisor SMS Alert", subtitle: "Alerts Angel Burgos with contact dossier", config: "Channel: E.164 Twilio REST" },
    ],
  },
  {
    id: "missed-call-recovery",
    title: "3. Inbound Missed Call Instant Text Recovery",
    category: "Telephony",
    description: "Triggers immediate SMS when a caller disconnects on 1-888-887-3585 before speaking to an advisor.",
    activeExecutions: 195,
    conversionRate: "39.1%",
    status: "active",
    nodes: [
      { id: "1", type: "trigger", title: "Trigger: Twilio Call Status 'no-answer' / 'busy'", subtitle: "Caller hung up or line engaged", config: "Webhook: /api/webhooks/telephony" },
      { id: "2", type: "sms", title: "Action: Instant Concierge SMS", subtitle: "'Hi! Angel Burgos here with MyIAD. Saw we just missed your call...'", config: "Template: Missed_Call_Concierge" },
      { id: "3", type: "task", title: "Action: Cal.com VIP Booking Link Attached", subtitle: "Offers direct 15-minute priority calendar slot", config: "URL: cal.com/angelburgos/15min" },
    ],
  },
  {
    id: "after-hours-ai",
    title: "4. After-Hours Autonomous Voice Receptionist",
    category: "Telephony",
    description: "Handles evening and weekend calls with conversational AI intake and automatic morning follow-up scheduling.",
    activeExecutions: 248,
    conversionRate: "31.0%",
    status: "active",
    nodes: [
      { id: "1", type: "trigger", title: "Trigger: Inbound Call Outside 8am-7pm EST", subtitle: "Clock evaluation against Florida timezone", config: "Schedule: Mon-Sun After Hours" },
      { id: "2", type: "voice_ai", title: "Action: After-Hours AI Voice Attendant", subtitle: "Collects needs, coverage, and preferred callback time", config: "Voice: Deepgram + Gemini" },
      { id: "3", type: "task", title: "Action: Create High-Priority Follow-Up Task", subtitle: "Queues 9:00 AM follow-up task on CRM dashboard", config: "Assignee: Angel Burgos" },
    ],
  },
  {
    id: "bilingual-routing",
    title: "5. Autonomous Spanish / English Language Branching",
    category: "Telephony",
    description: "Detects caller language in first 3 seconds of voice interaction and switches TTS voice and transcripts to Spanish.",
    activeExecutions: 410,
    conversionRate: "52.6%",
    status: "active",
    nodes: [
      { id: "1", type: "trigger", title: "Trigger: Deepgram Nova-3 Language Detection", subtitle: "Speech model flags Spanish audio tokens", config: "Confidence: > 0.85 Spanish" },
      { id: "2", type: "voice_ai", title: "Action: Switch to ElevenLabs Spanish Neural Voice", subtitle: "Answers with Puerto Rico / Florida Spanish accent", config: "Voice: es-US-Neural" },
      { id: "3", type: "task", title: "Action: Tag Lead as 'Bilingual-ES'", subtitle: "Pre-configures advisor notes and follow-up templates in Spanish", config: "Tag: Idioma_Espanol" },
    ],
  },
  {
    id: "producer-hotline",
    title: "6. Producer & Agency Hotline Direct Handoff",
    category: "Telephony",
    description: "Recognizes licensed producer NPN entries and routes directly to Angel Burgos without consumer qualification steps.",
    activeExecutions: 82,
    conversionRate: "76.8%",
    status: "active",
    nodes: [
      { id: "1", type: "trigger", title: "Trigger: Caller Enters 6-10 Digit NPN", subtitle: "Caller self-identifies as licensed insurance agent", config: "IVR Keypad / Voice NPN" },
      { id: "2", type: "task", title: "Action: Verify NPN against Registry", subtitle: "Verifies producer standing in Florida / PR", config: "Registry: NIPR API" },
      { id: "3", type: "task", title: "Action: Immediate Direct Transfer", subtitle: "Bypasses consumer AI and rings Angel Burgos directly", config: "Destination: +1-386-333-1482" },
    ],
  },

  // --- 2. ANNUITY & 0% FLOOR LIFE (6 Playbooks) ---
  {
    id: "iul-volatility-defense",
    title: "7. S&P 500 Market Volatility 0% Floor Alert",
    category: "Annuity & Life",
    description: "Educates equity-conscious investors on how Indexed Universal Life guarantees $0 loss during market drawdowns.",
    activeExecutions: 520,
    conversionRate: "48.3%",
    status: "active",
    nodes: [
      { id: "1", type: "trigger", title: "Trigger: Client Selects '0% Floor' in Calculator", subtitle: "Applicant expresses concern over market volatility", config: "Product: IUL_Floor_Option" },
      { id: "2", type: "sms", title: "Action: Send 0% Floor vs S&P 500 Comparison", subtitle: "Interactive graph showing annual reset mechanics", config: "Asset: IUL_Floor_Guide.pdf" },
      { id: "3", type: "delay", title: "Delay: Wait 24 Hours", subtitle: "Allow client to inspect numbers", config: "Duration: 24h" },
      { id: "4", type: "email", title: "Action: Send IRC §7702 Tax-Free Retirement Blueprint", subtitle: "Details tax-free loan distribution strategies", config: "Template: IRC_7702_Blueprint" },
    ],
  },
  {
    id: "sgli-military-transition",
    title: "8. Military SGLI Separation to Civilian Asset Shield",
    category: "Annuity & Life",
    description: "Dedicated transition campaign for veterans leaving service at MacDill AFB, Mayport, or PR National Guard.",
    activeExecutions: 310,
    conversionRate: "61.5%",
    status: "active",
    nodes: [
      { id: "1", type: "trigger", title: "Trigger: Veteran Tags Separation Window < 180 Days", subtitle: "SGLI termination date logged in intake", config: "Window: 120-180 Days" },
      { id: "2", type: "sms", title: "Action: Veteran Asset Shield Briefing", subtitle: "Locks in civilian insurability without medical exams", config: "Template: Military_Asset_Shield" },
      { id: "3", type: "task", title: "Action: Direct Case Review by Angel Burgos (USAF Veteran)", subtitle: "Veteran-to-veteran advisory consultation assigned", config: "Advisor: Angel Burgos (0215)" },
    ],
  },
  {
    id: "annuity-paycheck-rollover",
    title: "9. 401(k) / IRA to Guaranteed Lifetime Paycheck Rollover",
    category: "Annuity & Life",
    description: "Nurtures pre-retirees ages 55-68 through transferring volatile qualified assets into a contractual lifetime income stream.",
    activeExecutions: 440,
    conversionRate: "41.9%",
    status: "active",
    nodes: [
      { id: "1", type: "trigger", title: "Trigger: Client Age 55+ with $100k+ Rollover", subtitle: "Calculates monthly payout starting age 65", config: "Amount: > $100,000" },
      { id: "2", type: "task", title: "Action: FINRA Rule 2330 Suitability Calculation", subtitle: "Evaluates liquidity needs and investment horizon", config: "Standard: FINRA_2330_Suitability" },
      { id: "3", type: "sms", title: "Action: Send Projected Monthly Paycheck Breakdown", subtitle: "Shows guaranteed income rider illustration", config: "Carrier: Allianz / Mutual of Omaha" },
    ],
  },
  {
    id: "living-benefits-accelerator",
    title: "10. Living Benefits Chronic & Critical Care Rider Nurture",
    category: "Annuity & Life",
    description: "Highlights accelerated death benefits allowing policyholders to access up to 80% of face value for illness.",
    activeExecutions: 290,
    conversionRate: "45.0%",
    status: "active",
    nodes: [
      { id: "1", type: "trigger", title: "Trigger: Client Inquires About Long-Term Care / Illness", subtitle: "Applicant checks living benefits box", config: "Tag: Living_Benefits_Interest" },
      { id: "2", type: "sms", title: "Action: Deliver Living Benefits Case Study", subtitle: "Explains heart attack, stroke, and cancer acceleration", config: "Template: Living_Benefits_Overview" },
      { id: "3", type: "task", title: "Action: Assign Mutual of Omaha / Ethos Underwriting Match", subtitle: "Generates no-medical-exam approval options", config: "Carrier: Tier-1 Living Benefits" },
    ],
  },
  {
    id: "key-person-executive",
    title: "11. Key Person Corporate Protection Sequence",
    category: "Annuity & Life",
    description: "Corporate advisory sequence for business owners in South Florida protecting vital executives and partners.",
    activeExecutions: 115,
    conversionRate: "36.2%",
    status: "active",
    nodes: [
      { id: "1", type: "trigger", title: "Trigger: Executive Coverage > $1,000,000 Requested", subtitle: "Corporate tax identification number or entity provided", config: "Category: Strategic Advisory" },
      { id: "2", type: "email", title: "Action: Deliver Corporate Buy-Sell & Key Person Kit", subtitle: "Cross-purchase vs entity purchase agreement templates", config: "Template: Executive_Buy_Sell" },
      { id: "3", type: "task", title: "Action: Schedule Private Director Consultation", subtitle: "Executive briefing with Angel Burgos", config: "Duration: 30m Zoom" },
    ],
  },
  {
    id: "infinite-banking-concept",
    title: "12. Tax-Free Cash Value Banking Accumulation",
    category: "Annuity & Life",
    description: "Illustrates maximum-funded minimum-death-benefit IUL contracts designed for tax-free collateralized wealth storage.",
    activeExecutions: 380,
    conversionRate: "50.1%",
    status: "active",
    nodes: [
      { id: "1", type: "trigger", title: "Trigger: Client Selects 'Cash Value Accumulation'", subtitle: "Focus on living wealth rather than purely term protection", config: "Goal: Tax-Free Growth" },
      { id: "2", type: "sms", title: "Action: Deliver Cash Flow & Loan Mechanics Guide", subtitle: "Explains wash loans vs variable rate arbitrage", config: "Template: IUL_Cash_Value_Guide" },
      { id: "3", type: "delay", title: "Delay: Wait 48 Hours", subtitle: "Client digest window", config: "Duration: 48h" },
    ],
  },

  // --- 3. MEDICARE & TURNING 65 (5 Playbooks) ---
  {
    id: "t65-iep-nurture",
    title: "13. Turning 65 Initial Enrollment Period (IEP) Countdown",
    category: "Medicare",
    description: "180-Day educational sequence helping seniors navigate Part A, Part B, Medigap Plan G, and Advantage choices.",
    activeExecutions: 720,
    conversionRate: "39.4%",
    status: "active",
    nodes: [
      { id: "1", type: "trigger", title: "Trigger: Client Turns 64.5 (Birthday - 180d)", subtitle: "Official 7-month IEP begins approaching", config: "Event: Age == 64.5" },
      { id: "2", type: "sms", title: "Action: Deliver Turning 65 Roadmap PDF", subtitle: "Avoids late enrollment penalties and explains timeline", config: "Template: T65_Medicare_Roadmap" },
      { id: "3", type: "task", title: "Action: CMS Scope of Appointment (SOA) Electronic Sign", subtitle: "Compliant consent generated prior to plan consultation", config: "Compliance: CMS_SOA_Mandatory" },
    ],
  },
  {
    id: "medicare-aep-annual",
    title: "14. Annual Enrollment Period (AEP) Drug & Plan Review",
    category: "Medicare",
    description: "Oct 15 - Dec 7 automated outreach reviewing annual formulary changes, copay increases, and max out-of-pocket limits.",
    activeExecutions: 940,
    conversionRate: "55.8%",
    status: "active",
    nodes: [
      { id: "1", type: "trigger", title: "Trigger: October 1st AEP Pre-Season Alert", subtitle: "Prepares existing and prospective Medicare clients", config: "Schedule: Oct 1 - Dec 7" },
      { id: "2", type: "sms", title: "Action: Check Prescription Formulary Changes", subtitle: "Collects updated medication list for Part D audit", config: "Template: AEP_Formulary_Audit" },
      { id: "3", type: "task", title: "Action: Auto-Compare Local HMO vs PPO Networks", subtitle: "Runs carrier network check across Florida & PR", config: "Tool: Medicare_Quote_Engine" },
    ],
  },
  {
    id: "part-b-working-past-65",
    title: "15. Working Past 65 Employer Group Coverage Verification",
    category: "Medicare",
    description: "Advises beneficiaries working past 65 on whether to delay Part B or pause HSA contributions compliantly.",
    activeExecutions: 190,
    conversionRate: "42.0%",
    status: "active",
    nodes: [
      { id: "1", type: "trigger", title: "Trigger: Client Age 65+ with Active Employer Coverage", subtitle: "Company size verification (over/under 20 employees)", config: "Creditable: Employer_Group" },
      { id: "2", type: "email", title: "Action: HSA & Part B Coordination Memo", subtitle: "Explains tax implications of enrolling in Part A while funding HSA", config: "Template: HSA_Medicare_Memo" },
    ],
  },
  {
    id: "dsnp-dual-eligible",
    title: "16. Dual-Eligible Special Needs Plan (D-SNP) Extra Help",
    category: "Medicare",
    description: "Identifies seniors receiving Medicaid and Medicare to unlock grocery allowances, dental, and OTC benefits.",
    activeExecutions: 260,
    conversionRate: "63.2%",
    status: "active",
    nodes: [
      { id: "1", type: "trigger", title: "Trigger: Low Income Subsidy (LIS) / Medicaid Flagged", subtitle: "Income thresholds matched for Extra Help", config: "Medicaid: Eligible" },
      { id: "2", type: "sms", title: "Action: D-SNP Utility & Food Card Benefit Briefing", subtitle: "Explains quarterly OTC allowance and zero copay dental", config: "Template: DSNP_Extra_Help" },
    ],
  },
  {
    id: "medigap-plan-g-guaranteed-issue",
    title: "17. Medigap Plan G Guaranteed Issue Window Protection",
    category: "Medicare",
    description: "Secures Medigap Plan G without medical underwriting during the 6-month Part B open enrollment window.",
    activeExecutions: 380,
    conversionRate: "47.1%",
    status: "active",
    nodes: [
      { id: "1", type: "trigger", title: "Trigger: Part B Effective Date Within 6 Months", subtitle: "Guaranteed Issue window active", config: "Rule: Medigap_GI_Period" },
      { id: "2", type: "sms", title: "Action: Plan G Freedom of Doctor Choice Memo", subtitle: "Zero copays after small Part B deductible", config: "Template: Medigap_Plan_G" },
    ],
  },

  // --- 4. COMPLIANCE & TCR 10DLC (5 Playbooks) ---
  {
    id: "tcr-consent-audit",
    title: "18. Immutable TCPA Affirmative Consent Logging",
    category: "Compliance",
    description: "Captures IP address, user-agent, timestamp, and verbatim disclosures to guarantee 100% CTIA compliance.",
    activeExecutions: 1840,
    conversionRate: "99.8%",
    status: "active",
    nodes: [
      { id: "1", type: "trigger", title: "Trigger: Consumer Clicks Submit with Unchecked Box", subtitle: "Affirmative action required under FCC rules", config: "Checkbox: Unchecked_Default" },
      { id: "2", type: "compliance", title: "Action: Store Audit Payload in PostgreSQL", subtitle: "Records IP, timestamp, and agreement version", config: "Table: leads (consentAt, consentVersion)" },
      { id: "3", type: "sms", title: "Action: 10DLC Confirmation SMS with Opt-Out Syntax", subtitle: "Includes mandatory 'Reply STOP to cancel' verbiage", config: "Compliance: TCR_10DLC_Strict" },
    ],
  },
  {
    id: "finra-2330-suitability",
    title: "19. FINRA Rule 2330 Annuity Suitability Verification",
    category: "Compliance",
    description: "Evaluates liquidity needs, age, net worth, and risk tolerance prior to annuity contract illustration delivery.",
    activeExecutions: 410,
    conversionRate: "94.2%",
    status: "active",
    nodes: [
      { id: "1", type: "trigger", title: "Trigger: Annuity Quote Request Created", subtitle: "Contract recommendation pending", config: "Category: Variable/Fixed Annuity" },
      { id: "2", type: "compliance", title: "Action: Run 7-Point FINRA 2330 Suitability Matrix", subtitle: "Checks investment objective and time horizon", config: "Rule: FINRA_2330_Suitability" },
      { id: "3", type: "task", title: "Action: Store Suitability Disclosure Acknowledgment", subtitle: "Records client acknowledgment in CRM database", config: "Table: lead_notes / tasks" },
    ],
  },
  {
    id: "opt-out-stop-handler",
    title: "20. Real-Time Carrier STOP / Opt-Out Enforcement",
    category: "Compliance",
    description: "Instantly suppresses outgoing telephony and SMS when an applicant texts STOP, CANCEL, or END.",
    activeExecutions: 45,
    conversionRate: "100.0%",
    status: "active",
    nodes: [
      { id: "1", type: "trigger", title: "Trigger: Inbound SMS Matches /^(stop|cancel|end|unsubscribe)$/i", subtitle: "CTIA universal opt-out command", config: "Webhook: /api/webhooks/sms" },
      { id: "2", type: "compliance", title: "Action: Set optOutStatus = true in Database", subtitle: "Suppresses all automated campaigns immediately", config: "State: SUPPRESSED" },
      { id: "3", type: "sms", title: "Action: Send Mandatory One-Time Opt-Out Confirmation", subtitle: "'You have successfully unsubscribed. No further messages will be sent.'", config: "CTIA: Mandatory_Final_Text" },
    ],
  },
  {
    id: "carrier-supervisory-notice",
    title: "21. Principal Broker Statutory Supervisory Log",
    category: "Compliance",
    description: "Dispatches compliance snapshot to Angel Burgos (FL Lic #G328926) for all replacement and exchange cases.",
    activeExecutions: 89,
    conversionRate: "98.0%",
    status: "active",
    nodes: [
      { id: "1", type: "trigger", title: "Trigger: Section 1035 Exchange or Policy Replacement Flagged", subtitle: "Existing contract replacement initiated", config: "IRC: Section_1035_Exchange" },
      { id: "2", type: "compliance", title: "Action: Generate Replacement Comparison Matrix", subtitle: "Compares surrender charges, fees, and death benefits", config: "Rule: FL_Replacement_Notice" },
      { id: "3", type: "task", title: "Action: Log Supervisory Sign-off Task", subtitle: "Direct compliance docket in Angel's admin dashboard", config: "Assignee: Angel Burgos (0215)" },
    ],
  },
  {
    id: "data-pii-redaction",
    title: "22. Automated Zero-PII Server Logging Enforcement",
    category: "Compliance",
    description: "Redacts social security numbers, phone numbers, and full names before writing to server telemetry or logs.",
    activeExecutions: 3400,
    conversionRate: "100.0%",
    status: "active",
    nodes: [
      { id: "1", type: "trigger", title: "Trigger: Server Log / Error Dispatch", subtitle: "Any console.log or console.error in Next.js backend", config: "Interceptor: pii-guard.ts" },
      { id: "2", type: "compliance", title: "Action: AES-256-GCM Encryption / Masking", subtitle: "Masks phone as (***) ***-1234 and email as a***@domain", config: "Method: redactPiiFromText" },
    ],
  },

  // --- 5. CLIENT RETENTION & CROSS-SELL (6 Playbooks) ---
  {
    id: "annual-policy-review",
    title: "23. Annual Policy & Beneficiary Audit Anniversary",
    category: "Retention",
    description: "Automated 11-month review inviting policyholders to update beneficiaries, review cash value, and check riders.",
    activeExecutions: 480,
    conversionRate: "62.4%",
    status: "active",
    nodes: [
      { id: "1", type: "trigger", title: "Trigger: Policy Issue Date + 330 Days", subtitle: "1 month prior to policy anniversary", config: "Event: Policy_Anniversary - 30d" },
      { id: "2", type: "sms", title: "Action: Annual Checkup Concierge SMS", subtitle: "Offers quick 10-minute policy performance checkup", config: "Template: Annual_Review_Invite" },
      { id: "3", type: "task", title: "Action: Pre-Fill Beneficiary Review Form", subtitle: "Verifies contingent beneficiaries and trust allocations", config: "Form: Beneficiary_Audit" },
    ],
  },
  {
    id: "term-conversion-alert",
    title: "24. Term-to-Permanent Conversion Expiration Alert",
    category: "Retention",
    description: "Alerts term policyholders when their contractual right to convert to permanent IUL without medical exam is ending.",
    activeExecutions: 190,
    conversionRate: "44.2%",
    status: "active",
    nodes: [
      { id: "1", type: "trigger", title: "Trigger: Term Year 8 (for 10-Yr) or Year 18 (for 20-Yr)", subtitle: "Contractual conversion period approaching deadline", config: "Event: Conversion_Deadline - 180d" },
      { id: "2", type: "sms", title: "Action: Guaranteed Insurability Conversion Notice", subtitle: "Lock in permanent cash value without a physical exam", config: "Template: Term_Conversion_Notice" },
    ],
  },
  {
    id: "orphan-policy-recovery",
    title: "25. Orphan Policyholder Re-Engagement Sequence",
    category: "Retention",
    description: "Re-engages clients whose writing agent left the agency, establishing Angel Burgos as the servicing broker.",
    activeExecutions: 310,
    conversionRate: "37.5%",
    status: "active",
    nodes: [
      { id: "1", type: "trigger", title: "Trigger: Lead Unassigned > 60 Days", subtitle: "Orphan status detected in database", config: "Filter: assignedTo == null" },
      { id: "2", type: "sms", title: "Action: Introduction from Principal Broker Angel Burgos", subtitle: "Offers direct contact line for policy service & claims", config: "Template: Servicing_Broker_Intro" },
    ],
  },
  {
    id: "birthday-milestone",
    title: "26. Birthday Insurance Age Change Savings Alert",
    category: "Retention",
    description: "Notifies clients 30 days before their insurance age changes, enabling them to lock in lower premium rates.",
    activeExecutions: 820,
    conversionRate: "48.9%",
    status: "active",
    nodes: [
      { id: "1", type: "trigger", title: "Trigger: Client Nearest Birthday - 30 Days", subtitle: "Insurance age advances by 1 year", config: "Event: Age_Change_Date - 30d" },
      { id: "2", type: "sms", title: "Action: Rate Lock Savings Notice", subtitle: "Save up to 8% annually by binding coverage before age changes", config: "Template: Age_Change_Savings" },
    ],
  },
  {
    id: "claim-concierge-dispatch",
    title: "27. Living Benefits & Death Claim Priority Concierge",
    category: "Retention",
    description: "Fast-tracks beneficiary and family claims with priority routing and expedited carrier death certificate processing.",
    activeExecutions: 28,
    conversionRate: "100.0%",
    status: "active",
    nodes: [
      { id: "1", type: "trigger", title: "Trigger: Tag 'Claim_Inquiry' or 'Living_Benefits_Claim'", subtitle: "Client or beneficiary requests claim packet", config: "Tag: Claim_Priority" },
      { id: "2", type: "task", title: "Action: Urgent Priority Alert to Angel Burgos", subtitle: "Triggers instant SMS to Angel's personal mobile", config: "Channel: Immediate_SMS" },
      { id: "3", type: "email", title: "Action: Dispatch Carrier Expedited Claim Packet", subtitle: "Pre-fills claimant statement and instructions", config: "Carrier: Expedited_Claims" },
    ],
  },
  {
    id: "cross-sell-annuity-to-life",
    title: "28. Annuity Payout to Asset Protection Cross-Sell",
    category: "Retention",
    description: "Suggests using a portion of guaranteed annuity payouts to fund a tax-free permanent life asset shield for heirs.",
    activeExecutions: 240,
    conversionRate: "41.6%",
    status: "active",
    nodes: [
      { id: "1", type: "trigger", title: "Trigger: Annuity In-Force > 180 Days", subtitle: "Guaranteed monthly income payments established", config: "Product: Annuity_Active" },
      { id: "2", type: "sms", title: "Action: Legacy Wealth Multiplication Briefing", subtitle: "Fund a tax-free inheritance for grandchildren using annuity dividends", config: "Template: Annuity_To_Life_Legacy" },
    ],
  },
];
