"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Bot,
  CheckCircle2,
  Clock,
  Database,
  ExternalLink,
  FileCheck2,
  Headphones,
  Layers,
  Lock,
  MessageSquare,
  Play,
  Pause,
  PhoneCall,
  Plus,
  RefreshCw,
  Search,
  Send,
  Server,
  Shield,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  User,
  Zap,
} from "lucide-react";

export type PipelineStage =
  | "inbound_intake"
  | "ai_voice_triage"
  | "suitability_underwriting"
  | "advisor_dispatched"
  | "policy_bound";

export interface DemoLead {
  id: string;
  name: string;
  phone: string;
  email: string;
  territory: string;
  category: string;
  productSubtype: string;
  amount: string;
  stage: PipelineStage;
  timestamp: string;
  tcpaVerified: boolean;
  aiScore: number;
  sentiment: "Very Receptive" | "Interested" | "High Intent" | "Evaluating";
  audioDuration?: string;
  transcript?: Array<{ speaker: "Agent" | "Caller"; text: string }>;
  financialSummary: {
    age: number;
    employment: string;
    monthlyBudget?: string;
    riskTolerance: "Zero Market Risk (0% Floor)" | "Moderate" | "Guaranteed Lifetime";
    targetRetirementAge?: number;
    recommendedCarrier: string;
  };
  smsAlertSnippet: string;
  isSimulated?: boolean;
}

const INITIAL_DEMO_LEADS: DemoLead[] = [
  {
    id: "MYIAD-2026-8841",
    name: "Maj. Gabriel Santos (Ret.)",
    phone: "813-555-0192",
    email: "g.santos.fl@veteranmail.org",
    territory: "Central Florida (MacDill AFB)",
    category: "Life & Living Benefits",
    productSubtype: "Military SGLI → Civilian Asset Shield",
    amount: "$500,000",
    stage: "advisor_dispatched",
    timestamp: "2 mins ago",
    tcpaVerified: true,
    aiScore: 98,
    sentiment: "High Intent",
    audioDuration: "03:12",
    transcript: [
      { speaker: "Agent", text: "Thank you for calling MyIAD Advisory. I understand you are transitioning out of active duty service at MacDill AFB?" },
      { speaker: "Caller", text: "Yes, exactly. My SGLI $400k policy terminates in 120 days. I need permanent coverage with living benefits that doesn't expire when I leave service." },
      { speaker: "Agent", text: "Understood Major Santos. Our Military Asset Shield locks in your civilian insurability immediately, including accelerated benefits for chronic illness and critical care, protected with a 0% market floor." },
      { speaker: "Caller", text: "That's exactly what I'm looking for. I have my DD-214 ready. Can an advisor review my numbers today?" },
      { speaker: "Agent", text: "Certainly. I am dispatching your verified case file directly to Principal Advisor Angel Burgos right now. You will receive a confirmation SMS in seconds." },
    ],
    financialSummary: {
      age: 38,
      employment: "USAF Veteran / Defense Contractor",
      monthlyBudget: "$280/mo",
      riskTolerance: "Zero Market Risk (0% Floor)",
      targetRetirementAge: 62,
      recommendedCarrier: "Mutual of Omaha - Guaranteed Protection",
    },
    smsAlertSnippet: "🎯 Advisor Dispatch: Maj. Gabriel Santos | SGLI Transition $500k | MacDill AFB FL | 813-555-0192 | TCPA Verified",
  },
  {
    id: "MYIAD-2026-9023",
    name: "Dr. Sofia Mendez",
    phone: "305-555-7714",
    email: "dr.mendez@coralgableshealth.com",
    territory: "South Florida (Coral Gables)",
    category: "Wealth & Executive Life",
    productSubtype: "Indexed Universal Life (0% Floor IUL)",
    amount: "$1,500,000",
    stage: "suitability_underwriting",
    timestamp: "8 mins ago",
    tcpaVerified: true,
    aiScore: 96,
    sentiment: "Very Receptive",
    audioDuration: "04:45",
    transcript: [
      { speaker: "Agent", text: "Welcome to MyIAD Executive Wealth. Are you looking to structure tax-advantaged retirement accumulation through IRC Section 7702?" },
      { speaker: "Caller", text: "Yes. I max out my 401(k) and back-door Roth. I want a contract with upside index potential but guaranteed zero market loss when equities pull back." },
      { speaker: "Agent", text: "Excellent. With our 0% floor IUL designs, your cash value is credited based on the S&P 500 up to an index cap, with annual reset so you never forfeit accrued principal or gains." },
      { speaker: "Caller", text: "Can we illustrate a $2,500 monthly premium contribution with tax-free loan retirement distributions?" },
      { speaker: "Agent", text: "Yes Doctor, that fits our FINRA suitability guidelines. Generating the illustration and routing to underwriting right now." },
    ],
    financialSummary: {
      age: 44,
      employment: "Physician & Surgical Director",
      monthlyBudget: "$2,500/mo",
      riskTolerance: "Zero Market Risk (0% Floor)",
      targetRetirementAge: 65,
      recommendedCarrier: "Allianz Life - Pro+ Elite Indexation",
    },
    smsAlertSnippet: "🎯 Advisor Dispatch: Dr. Sofia Mendez | IUL 0% Floor $1.5M | Coral Gables FL | 305-555-7714 | High Net Worth Tier",
  },
  {
    id: "MYIAD-2026-7712",
    name: "Hector & Carmen Rivera",
    phone: "787-555-3841",
    email: "hrivera.pr@caribbeandist.net",
    territory: "Puerto Rico (San Juan)",
    category: "Retirement & Annuities",
    productSubtype: "Fixed Index Annuity (Guaranteed Paycheck)",
    amount: "$350,000 Rollover",
    stage: "policy_bound",
    timestamp: "24 mins ago",
    tcpaVerified: true,
    aiScore: 99,
    sentiment: "High Intent",
    audioDuration: "02:50",
    transcript: [
      { speaker: "Agent", text: "Saludos y bienvenidos a MyIAD. ¿Desea estructurar un flujo de ingresos garantizado de por vida para su retiro en Puerto Rico?" },
      { speaker: "Caller", text: "Saludos. Tenemos un plan 401(k) y queremos transferir $350,000 para asegurar un cheque mensual garantizado sin riesgo de caídas en la bolsa." },
      { speaker: "Agent", text: "Completamente. La anualidad indexada fija garantiza su capital al 100% y genera ingresos predecibles de por vida bajo las directrices FINRA 2330." },
    ],
    financialSummary: {
      age: 63,
      employment: "Business Owner / Logistics",
      riskTolerance: "Guaranteed Lifetime",
      targetRetirementAge: 65,
      recommendedCarrier: "Allianz Guaranteed Income Paycheck",
    },
    smsAlertSnippet: "🎯 Case Bound: Hector Rivera | Annuity $350k Rollover | San Juan PR | Policy In Force Issued",
  },
  {
    id: "MYIAD-2026-6654",
    name: "Carlos Morales",
    phone: "407-555-8912",
    email: "carlos.morales@orlandologist.com",
    territory: "Central Florida (Orlando)",
    category: "Term & Living Benefits",
    productSubtype: "Term Life with Chronic Illness Rider",
    amount: "$750,000",
    stage: "ai_voice_triage",
    timestamp: "38 mins ago",
    tcpaVerified: true,
    aiScore: 91,
    sentiment: "Interested",
    audioDuration: "01:55",
    transcript: [
      { speaker: "Agent", text: "Hello Carlos, thanks for checking your term quote on MyIAD. What is your primary family protection goal?" },
      { speaker: "Caller", text: "We just bought a house in Lake Nona. I need a 30-year term to cover the mortgage and make sure my wife has living benefits if I suffer a stroke or heart attack." },
    ],
    financialSummary: {
      age: 34,
      employment: "Commercial Logistics Director",
      monthlyBudget: "$95/mo",
      riskTolerance: "Zero Market Risk (0% Floor)",
      targetRetirementAge: 67,
      recommendedCarrier: "Ethos Life / Banner Life",
    },
    smsAlertSnippet: "🎯 Voice Ingest: Carlos Morales | Term $750k | Lake Nona Orlando | Voice Relay Active",
  },
  {
    id: "MYIAD-2026-5542",
    name: "Elena Vance",
    phone: "305-555-2231",
    email: "elena@vancemedia.agency",
    territory: "South Florida (Miami Beach)",
    category: "Executive Advisory",
    productSubtype: "Key Person Corporate Protection",
    amount: "$2,000,000",
    stage: "inbound_intake",
    timestamp: "1 hour ago",
    tcpaVerified: true,
    aiScore: 89,
    sentiment: "Evaluating",
    financialSummary: {
      age: 41,
      employment: "CEO & Founder",
      monthlyBudget: "$1,800/mo",
      riskTolerance: "Moderate",
      recommendedCarrier: "Lincoln National / Nationwide",
    },
    smsAlertSnippet: "🎯 Webhook Intake: Elena Vance | Key Person $2.0M | Miami Beach FL | Awaiting Voice Follow-up",
  },
];

const STAGES: Array<{ id: PipelineStage; label: string; badgeColor: string; description: string }> = [
  {
    id: "inbound_intake",
    label: "1. Inbound Ingestion",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    description: "Web Calculators, TCR Opt-Ins, & 888-887-3585 Calls",
  },
  {
    id: "ai_voice_triage",
    label: "2. Voice AI Triage",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    description: "Deepgram STT & Gemini Intent Classification",
  },
  {
    id: "suitability_underwriting",
    label: "3. Suitability & Calc",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    description: "0% Floor IUL Modeling & FINRA 2330 Suitability",
  },
  {
    id: "advisor_dispatched",
    label: "4. Advisor Dispatched",
    badgeColor: "bg-teal-50 text-teal-700 border-teal-200",
    description: "Sub-Second SMS Alert Delivered to Angel Burgos",
  },
  {
    id: "policy_bound",
    label: "5. Policy In Force",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    description: "Carrier Underwritten & Commission Ledgered",
  },
];

export function CrmShowcaseClient() {
  const [leads, setLeads] = useState<DemoLead[]>(INITIAL_DEMO_LEADS);
  const [selectedLead, setSelectedLead] = useState<DemoLead | null>(INITIAL_DEMO_LEADS[0]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationToast, setSimulationToast] = useState<string | null>(null);

  // Filter leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.territory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.productSubtype.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || lead.category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  // Handle simulation of real-time lead
  const handleSimulateLead = (type: "iul" | "military" | "annuity") => {
    setIsSimulating(true);

    const simulationConfigs = {
      iul: {
        name: "Marcus Sterling (Simulated)",
        phone: "407-555-9382",
        email: "m.sterling.exec@example.com",
        territory: "Central Florida (Windermere)",
        category: "Wealth & Executive Life",
        productSubtype: "Indexed Universal Life (0% Floor IUL)",
        amount: "$1,250,000",
        stage: "inbound_intake" as PipelineStage,
        aiScore: 97,
        sentiment: "High Intent" as const,
        audioDuration: "02:18",
        transcript: [
          { speaker: "Agent" as const, text: "MyIAD Advisory. I see you just completed an IUL calculation for $1,250,000 coverage?" },
          { speaker: "Caller" as const, text: "Yes, I was verifying that 0% floor guarantee. I want to make sure if the S&P drops 20%, my account balance stays flat." },
          { speaker: "Agent" as const, text: "Correct Marcus. The insurance carrier absorbs the downside. Your credited floor is contractually 0.00%." },
        ],
        financialSummary: {
          age: 46,
          employment: "VP of Enterprise Software",
          monthlyBudget: "$1,500/mo",
          riskTolerance: "Zero Market Risk (0% Floor)" as const,
          targetRetirementAge: 62,
          recommendedCarrier: "Allianz Life - Pro+ Elite",
        },
        smsAlertSnippet: "⚡ Live Webhook Ingestion: Marcus Sterling | IUL $1.25M | Windermere FL | 0% Floor Target",
      },
      military: {
        name: "Capt. Jessica Alvarez (Simulated)",
        phone: "813-555-4491",
        email: "j.alvarez.mil@example.mil",
        territory: "Central Florida (Tampa)",
        category: "Life & Living Benefits",
        productSubtype: "Military SGLI → Civilian Asset Shield",
        amount: "$600,000",
        stage: "inbound_intake" as PipelineStage,
        aiScore: 95,
        sentiment: "Very Receptive" as const,
        audioDuration: "03:04",
        transcript: [
          { speaker: "Agent" as const, text: "MyIAD Military Transition Desk. Are you preparing to transition from active duty?" },
          { speaker: "Caller" as const, text: "Yes, separating in 60 days. Need to convert my $500k SGLI into a private policy with living benefits before terminal leave." },
        ],
        financialSummary: {
          age: 32,
          employment: "Active Duty Officer / Transitioning",
          monthlyBudget: "$220/mo",
          riskTolerance: "Zero Market Risk (0% Floor)" as const,
          targetRetirementAge: 60,
          recommendedCarrier: "Mutual of Omaha - Living Benefits",
        },
        smsAlertSnippet: "⚡ Live Webhook Ingestion: Capt. Jessica Alvarez | SGLI Transition $600k | Tampa FL | TCPA Verified",
      },
      annuity: {
        name: "Roberto & Marta Colon (Simulated)",
        phone: "787-555-6612",
        email: "rcolon.pr@example.com",
        territory: "Puerto Rico (Guaynabo)",
        category: "Retirement & Annuities",
        productSubtype: "Fixed Index Annuity (Guaranteed Paycheck)",
        amount: "$420,000 Rollover",
        stage: "inbound_intake" as PipelineStage,
        aiScore: 99,
        sentiment: "High Intent" as const,
        audioDuration: "02:40",
        transcript: [
          { speaker: "Agent" as const, text: "Saludos don Roberto. ¿Desea evaluar el cálculo de ingresos garantizados para su fondo de retiro?" },
          { speaker: "Caller" as const, text: "Sí, queremos asegurar una pensión privada que no dependa de la volatilidad del mercado en Wall Street." },
        ],
        financialSummary: {
          age: 64,
          employment: "Retired Civil Engineer",
          riskTolerance: "Guaranteed Lifetime" as const,
          targetRetirementAge: 65,
          recommendedCarrier: "Allianz Guaranteed Income",
        },
        smsAlertSnippet: "⚡ Live Webhook Ingestion: Roberto Colon | Annuity $420k Rollover | Guaynabo PR | Inbound Call Alert",
      },
    };

    const newLeadConfig = simulationConfigs[type];
    const newLead: DemoLead = {
      id: `SIM-${Date.now().toString().slice(-4)}`,
      ...newLeadConfig,
      timestamp: "Just now",
      tcpaVerified: true,
      isSimulated: true,
    };

    setTimeout(() => {
      setLeads((prev) => [newLead, ...prev]);
      setSelectedLead(newLead);
      setIsSimulating(false);
      setSimulationToast(`🎉 Real-time lead ingested: "${newLead.name}" dispatched to crm.myiad.com pipeline!`);
      setTimeout(() => setSimulationToast(null), 5000);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-teal-500 selection:text-white pb-20">
      {/* Simulation Alert Toast */}
      {simulationToast && (
        <div className="fixed top-6 right-6 z-50 max-w-md bg-emerald-500/90 text-white backdrop-blur-md px-5 py-4 rounded-xl shadow-2xl border border-emerald-400/40 flex items-center gap-3 animate-bounce">
          <Sparkles className="w-5 h-5 flex-shrink-0 text-emerald-100" />
          <p className="text-sm font-medium">{simulationToast}</p>
        </div>
      )}

      {/* Top Banner / System Status Ribbon */}
      <div className="bg-slate-900 border-b border-slate-800/80 px-4 py-2.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              crm.myiad.com Gateway Online
            </span>
            <span className="text-slate-400 hidden sm:inline">•</span>
            <span className="text-slate-300 font-mono text-[11px] hidden sm:inline">
              Twilio Relay: <strong className="text-teal-400">1-888-887-3585</strong>
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Server className="w-3.5 h-3.5 text-teal-400" />
              Latency: <strong className="text-white font-mono">640ms</strong>
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              TCR 10DLC: <strong className="text-white">CTIA Verified</strong>
            </span>
            <Link
              href="/admin"
              className="text-teal-400 hover:text-teal-300 transition-colors flex items-center gap-1 font-medium hover:underline ml-2"
            >
              Staff Portal <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-xl sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 p-0.5 flex items-center justify-center shadow-lg shadow-teal-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-teal-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                    MyIAD CRM
                    <span className="text-xs px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30 font-normal">
                      Capability Showcase
                    </span>
                  </h1>
                </div>
                <p className="text-xs text-slate-400">
                  Autonomous Lead Ingestion, Voice AI Triage & Case Acceleration Platform
                </p>
              </div>
            </div>
          </div>

          {/* Quick Simulator CTA Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-mono mr-1 hidden lg:inline">Live Simulator:</span>
            <button
              onClick={() => handleSimulateLead("iul")}
              disabled={isSimulating}
              className="px-3 py-1.5 rounded-lg bg-teal-600/20 hover:bg-teal-600/30 text-teal-300 border border-teal-500/30 text-xs font-medium transition-all flex items-center gap-1.5 shadow-sm active:scale-95 disabled:opacity-50"
            >
              <Zap className="w-3.5 h-3.5 text-teal-400" />
              + Simulate IUL Lead ($1.25M)
            </button>
            <button
              onClick={() => handleSimulateLead("military")}
              disabled={isSimulating}
              className="px-3 py-1.5 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 text-xs font-medium transition-all flex items-center gap-1.5 shadow-sm active:scale-95 disabled:opacity-50"
            >
              <Shield className="w-3.5 h-3.5 text-purple-400" />
              + Simulate Military SGLI Lead
            </button>
            <button
              onClick={() => handleSimulateLead("annuity")}
              disabled={isSimulating}
              className="px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-medium transition-all flex items-center gap-1.5 shadow-sm active:scale-95 disabled:opacity-50"
            >
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              + Simulate Annuity ($420k)
            </button>
          </div>
        </div>
      </header>

      {/* Hero Metrics Row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">Inbound Dispatch Speed</span>
              <Zap className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-2xl font-bold text-white font-mono">&lt; 850 ms</div>
            <p className="text-[11px] text-teal-400/90 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Twilio Relay to Webhook
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">FINRA Rule 2330 Audit</span>
              <FileCheck2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-white font-mono">100% Validated</div>
            <p className="text-[11px] text-emerald-400/90 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Automated Suitability Check
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">Voice AI Speech Model</span>
              <Headphones className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-white font-mono">Deepgram Nova-3</div>
            <p className="text-[11px] text-purple-400/90 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Bilingual (EN / ES) Real-Time
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">Zero PII Leakage</span>
              <Lock className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-white font-mono">AES-256-GCM</div>
            <p className="text-[11px] text-blue-400/90 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Encrypted at Rest & Transit
            </p>
          </div>
        </div>
      </section>

      {/* Main Showcase Layout: Pipeline Board & Detail Inspector */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Left Column: Kanban Pipeline Board */}
          <div className="w-full lg:w-7/12 flex-1">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
              {/* Controls bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-5 border-b border-slate-800">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search applicant name, territory, or product..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-teal-500"
                  >
                    <option value="all">All Product Lines</option>
                    <option value="life">IUL & Life</option>
                    <option value="military">Military SGLI</option>
                    <option value="annuit">Annuities</option>
                    <option value="term">Term & Living</option>
                  </select>
                  <button
                    onClick={() => setLeads(INITIAL_DEMO_LEADS)}
                    title="Reset to default showcase leads"
                    className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Kanban Stage Headers & Columns */}
              <div className="mt-5 space-y-6">
                {STAGES.map((stage) => {
                  const stageLeads = filteredLeads.filter((l) => l.stage === stage.id);
                  return (
                    <div key={stage.id} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${stage.badgeColor}`}>
                            {stage.label}
                          </span>
                          <span className="text-xs text-slate-500 font-mono">({stageLeads.length})</span>
                        </div>
                        <span className="text-[11px] text-slate-500 hidden sm:inline">{stage.description}</span>
                      </div>

                      {stageLeads.length === 0 ? (
                        <div className="border border-dashed border-slate-800/80 rounded-xl p-4 text-center text-xs text-slate-500 font-mono">
                          No leads in this stage. Use the simulator above to inject live data.
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {stageLeads.map((lead) => {
                            const isSelected = selectedLead?.id === lead.id;
                            return (
                              <div
                                key={lead.id}
                                onClick={() => setSelectedLead(lead)}
                                className={`cursor-pointer rounded-xl p-4 border transition-all text-left relative overflow-hidden ${
                                  isSelected
                                    ? "bg-slate-800/90 border-teal-500 shadow-md shadow-teal-500/10 ring-1 ring-teal-500/50"
                                    : "bg-slate-950/70 border-slate-800/90 hover:border-slate-700 hover:bg-slate-900/80"
                                }`}
                              >
                                {lead.isSimulated && (
                                  <div className="absolute top-0 right-0 bg-teal-500 text-slate-950 font-bold text-[9px] uppercase px-2 py-0.5 rounded-bl-lg font-mono">
                                    Live Ingest
                                  </div>
                                )}
                                <div className="flex items-start justify-between gap-2 mb-1.5">
                                  <h3 className="text-sm font-semibold text-white truncate">{lead.name}</h3>
                                  <span className="text-[10px] font-mono text-slate-400 flex-shrink-0">
                                    {lead.timestamp}
                                  </span>
                                </div>

                                <p className="text-xs text-teal-400 font-medium truncate mb-2">
                                  {lead.productSubtype}
                                </p>

                                <div className="flex items-center justify-between text-xs text-slate-400 font-mono pt-2 border-t border-slate-800/60">
                                  <span className="font-semibold text-slate-200">{lead.amount}</span>
                                  <span className="text-[10px] text-slate-500 truncate max-w-[130px]">
                                    {lead.territory.split("(")[0]}
                                  </span>
                                </div>

                                <div className="mt-2.5 flex items-center justify-between text-[11px]">
                                  <span className="inline-flex items-center gap-1 text-slate-400">
                                    <Bot className="w-3 h-3 text-teal-400" />
                                    AI Score: <strong className="text-white">{lead.aiScore}%</strong>
                                  </span>
                                  <span className="text-emerald-400 text-[10px] font-mono flex items-center gap-1">
                                    <ShieldCheck className="w-3 h-3" />
                                    TCPA Valid
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Case File & Voice AI Inspector */}
          <div className="w-full lg:w-5/12 sticky top-24">
            {selectedLead ? (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
                {/* Dossier Header */}
                <div className="border-b border-slate-800 pb-5">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[11px] font-mono text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
                      ID: {selectedLead.id}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium border border-slate-700">
                      {selectedLead.stage.replace("_", " ").toUpperCase()}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-white mt-2">{selectedLead.name}</h2>
                  <p className="text-xs text-slate-400 mt-1">
                    {selectedLead.territory} • {selectedLead.phone}
                  </p>
                </div>

                {/* Voice Call Audio & Transcript Player */}
                {selectedLead.transcript && (
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-teal-500/20 flex items-center justify-center text-teal-400">
                          <PhoneCall className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-white">Twilio Voice Agent Session</p>
                          <p className="text-[10px] text-slate-400 font-mono">
                            Duration: {selectedLead.audioDuration || "02:30"} • Sentiment:{" "}
                            <span className="text-emerald-400 font-medium">{selectedLead.sentiment}</span>
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                        className="px-2.5 py-1 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-semibold transition-all flex items-center gap-1"
                      >
                        {isPlayingAudio ? (
                          <>
                            <Pause className="w-3 h-3" /> Pause
                          </>
                        ) : (
                          <>
                            <Play className="w-3 h-3 fill-current" /> Play Audio
                          </>
                        )}
                      </button>
                    </div>

                    {/* Audio Waveform Animation */}
                    <div className="h-8 bg-slate-900 rounded-lg flex items-center justify-center gap-1 px-3">
                      {Array.from({ length: 28 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-1 rounded-full bg-teal-500 transition-all duration-300 ${
                            isPlayingAudio ? "animate-pulse" : "opacity-40"
                          }`}
                          style={{
                            height: isPlayingAudio
                              ? `${Math.max(20, (Math.sin(i * 0.8) + 1) * 45)}%`
                              : `${(i % 5) * 15 + 20}%`,
                            animationDelay: `${i * 40}ms`,
                          }}
                        />
                      ))}
                    </div>

                    {/* Transcript Dialogue */}
                    <div className="max-h-48 overflow-y-auto space-y-2.5 pr-1 text-xs pt-1 border-t border-slate-800/80">
                      {selectedLead.transcript.map((line, idx) => (
                        <div
                          key={idx}
                          className={`p-2.5 rounded-lg text-xs leading-relaxed ${
                            line.speaker === "Agent"
                              ? "bg-slate-900 text-slate-200 border-l-2 border-teal-500"
                              : "bg-slate-900/60 text-slate-300 border-l-2 border-slate-600"
                          }`}
                        >
                          <span
                            className={`font-semibold mr-2 font-mono text-[10px] ${
                              line.speaker === "Agent" ? "text-teal-400" : "text-slate-400"
                            }`}
                          >
                            [{line.speaker}]:
                          </span>
                          {line.text}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Financial Diagnostic & Suitability */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <FileCheck2 className="w-3.5 h-3.5 text-teal-400" />
                    FINRA 2330 & Underwriting Diagnostic
                  </h4>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <p className="text-[10px] text-slate-500 uppercase font-mono">Applicant Age</p>
                      <p className="font-semibold text-white mt-0.5">{selectedLead.financialSummary.age} years old</p>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <p className="text-[10px] text-slate-500 uppercase font-mono">Target Retirement</p>
                      <p className="font-semibold text-white mt-0.5">
                        Age {selectedLead.financialSummary.targetRetirementAge || 65}
                      </p>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 col-span-2">
                      <p className="text-[10px] text-slate-500 uppercase font-mono">Risk Profile / Floor</p>
                      <p className="font-semibold text-teal-400 mt-0.5">
                        {selectedLead.financialSummary.riskTolerance}
                      </p>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 col-span-2">
                      <p className="text-[10px] text-slate-500 uppercase font-mono">Underwriting Carrier Match</p>
                      <p className="font-semibold text-emerald-400 mt-0.5">
                        {selectedLead.financialSummary.recommendedCarrier}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Real-time Advisor SMS Dispatch Alert */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-white flex items-center gap-1.5">
                      <Send className="w-3 h-3 text-teal-400" />
                      Advisor Outbound SMS Dispatch (TCR 10DLC)
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono">Delivered &lt;640ms</span>
                  </div>
                  <div className="bg-slate-900 rounded-lg p-2.5 font-mono text-[11px] text-slate-300 border border-slate-800 leading-relaxed">
                    {selectedLead.smsAlertSnippet}
                  </div>
                </div>

                {/* Action footer */}
                <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-800">
                  <Link
                    href={`/admin/leads`}
                    className="flex-1 text-center py-2.5 px-4 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    Open in Staff Workspace <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    onClick={() => {
                      alert(`Case file ${selectedLead.id} exported in AMS360 / AgencyBloc JSON format.`);
                    }}
                    className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
                  >
                    Export AMS
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-400">
                <User className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                <p className="text-sm font-medium text-white">Select a Lead to Inspect</p>
                <p className="text-xs text-slate-500 mt-1">
                  Click on any card in the pipeline board to view the voice transcript, audio player, and suitability report.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Enterprise Capabilities & Integration Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="border-t border-slate-800 pt-10">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-mono text-teal-400 uppercase tracking-widest">Enterprise Architecture</span>
            <h3 className="text-2xl font-bold text-white mt-1">
              Built for IMOs, Agency Networks & Enterprise Distributors
            </h3>
            <p className="text-xs text-slate-400 mt-2">
              Everything in this demonstration operates on a unified, high-concurrency Node.js and Next.js engine with zero third-party data leaks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center mb-4">
                <PhoneCall className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-white">Twilio ConversationRelay Voice AI</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Direct WebSocket streaming with Deepgram Nova-3 speech recognition, ElevenLabs neural voice synthesis, and Google Gemini reasoning. Supports live human transfer to licensed agents in seconds.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-800 font-mono text-[11px] text-teal-400">
                Number: 1-888-887-3585
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-white">Carrier & AMS Integrations</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Pre-configured data pipeline hooks for Mutual of Omaha, Allianz Life, Ethos, and Banner Life, with automated export contracts for AMS360, AgencyBloc, and Salesforce Financial Services Cloud.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-800 font-mono text-[11px] text-emerald-400">
                Format: JSON & ACORD Standard
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
                <Database className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-white">Statutory & TCR Compliance</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Immutable affirmative TCPA consent logging with client IP, user agent, and timestamp. Compliant with FINRA Rule 2330 suitability obligations, IRC §7702 guidelines, and CTIA Campaign Registry.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-800 font-mono text-[11px] text-purple-400">
                Supervised: Angel Burgos Lic #G328926
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
