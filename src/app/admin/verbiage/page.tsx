"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  FileText, 
  PhoneCall, 
  Globe, 
  Cpu, 
  MessageSquare, 
  Shield, 
  FileCode, 
  Copy, 
  Check, 
  ArrowLeft,
  Search,
  ExternalLink,
  Terminal,
  BookOpen
} from "lucide-react";

interface ScriptCategory {
  id: string;
  title: string;
  shortDesc: string;
  icon: React.ElementType;
  filePath: string;
  lines: string;
  keyPhrases: string[];
  explanation: string;
  codeSnippet: string;
  editInstructions: string[];
}

const SCRIPT_CATEGORIES: ScriptCategory[] = [
  {
    id: "voice-ai",
    title: "1. AI Voice Receptionist & Twilio Call Flow",
    shortDesc: "Phone greetings, Gemini system prompt, and live agent transfer triggers",
    icon: PhoneCall,
    filePath: "voice-relay/server.ts",
    lines: "Lines 48–140",
    keyPhrases: [
      "Greeting script for callers on 1-888-887-3585",
      "Gemini AI prompt instructions and tone",
      "Live handoff keywords ('Angel', 'operator', 'agent')",
      "Transfer target: +1-386-333-1482"
    ],
    explanation: "Controls what callers hear when dialing 1-888-887-3585. It orchestrates the Gemini 2.5 Flash prompt, conversation rules, bilingual greeting detection, and triggers the warm phone transfer to Angel Burgos.",
    codeSnippet: `// voice-relay/server.ts (approx. line 50)
const GREETING_EN = "Thank you for calling MyIAD National Insurance Solutions. I am your AI insurance assistant. How can I help you today?";
const GREETING_ES = "Gracias por llamar a MyIAD Soluciones Nacionales de Seguros. Soy su asistente de seguros con IA. ¿En qué le puedo orientar hoy?";

// System Prompt for Gemini (approx. line 110)
const SYSTEM_PROMPT = \`You are the MyIAD National Insurance Solutions AI Voice Receptionist...
Key rules:
1. Provide concise, friendly answers (under 2 sentences for natural speech).
2. If caller asks for Angel Burgos, a human agent, or operator, invoke live transfer.
3. Emphasize the contractual 0% floor and Living Benefits for life insurance.\`;`,
    editInstructions: [
      "Open voice-relay/server.ts in your editor.",
      "Search for GREETING_EN or SYSTEM_PROMPT.",
      "Modify the text to refine your phone greeting or instructions.",
      "Deploy updates to Cloud Run using: ./voice-relay/deploy-cloud-run.sh"
    ]
  },
  {
    id: "web-copy",
    title: "2. Bilingual Web Content & Card Verbiage",
    shortDesc: "English & Spanish headlines, core offerings, D.I.M.E. math, and button labels",
    icon: Globe,
    filePath: "src/lib/i18n/myiad-dict.ts",
    lines: "Lines 1–418",
    keyPhrases: [
      "Hero titles, badges, and taglines",
      "Core Offerings (IUL, Living Benefits, Annuities, Medicare)",
      "Interactive assessment field placeholders",
      "English (en) and Spanish (es) parallel dictionaries"
    ],
    explanation: "Central repository for every headline, subtitle, button, card, and modal description on the portal. Both English ('en') and Spanish ('es') versions are defined side-by-side.",
    codeSnippet: `// src/lib/i18n/myiad-dict.ts
export const myiadDict = {
  en: {
    hero_title: "Smart Insurance Solutions for Modern Protection",
    hero_desc: "Empowering consumers with 0% floor index growth and tax-free retirement...",
    offering_1_title: "Indexed Universal Life (IUL)",
    offering_1_desc: "Capital preservation with S&P 500 index upside and 0% floor guarantee.",
    // ...
  },
  es: {
    hero_title: "Soluciones de Seguros Inteligentes para Protección Moderna",
    hero_desc: "Capacitando a los consumidores con crecimiento indexado con piso del 0%...",
    offering_1_title: "Vida Universal Indexada (IUL)",
    offering_1_desc: "Preservación de capital con rendimiento del S&P 500 y garantía de piso 0%.",
    // ...
  }
};`,
    editInstructions: [
      "Open src/lib/i18n/myiad-dict.ts.",
      "Find the key you want to change (e.g. hero_title, offering_1_desc).",
      "Update both the 'en' and 'es' blocks so translations stay synchronized.",
      "Also check src/lib/i18n/translations.ts for main-site landing page strings."
    ]
  },
  {
    id: "copilot-prompt",
    title: "3. AI Copilot & Financial Diagnostic Heuristics",
    shortDesc: "Rules for 0% floor volatility, IRC §7702, and FINRA 2330 suitability advice",
    icon: Cpu,
    filePath: "src/app/api/myiad/copilot/route.ts",
    lines: "Lines 35–120",
    keyPhrases: [
      "0% Floor market downside protection explanations",
      "IRC §7702 tax-free policy loan mechanisms",
      "FINRA Rule 2330 suitability warnings for annuities",
      "Military asset transition (SGLI/VGLI) heuristics"
    ],
    explanation: "Powers the web-based interactive AI Insurance Copilot that answers user queries on the landing pages, explaining market volatility protection, policy loans, and variable annuities.",
    codeSnippet: `// src/app/api/myiad/copilot/route.ts
const COPILOT_SYSTEM_INSTRUCTIONS = \`You are the MyIAD AI Financial Copilot...
Explain financial principles clearly:
- 0% Floor: Contractual guarantee that negative S&P 500 returns never reduce credited interest.
- IRC §7702: Life insurance cash values grow tax-deferred; loans are accessible tax-free.
- FINRA Rule 2330: Variable annuities require supervisory suitability evaluation.
Always maintain compliance and encourage booking with Angel Burgos.\`;`,
    editInstructions: [
      "Open src/app/api/myiad/copilot/route.ts.",
      "Search for COPILOT_SYSTEM_INSTRUCTIONS or the prompt template.",
      "Adjust advisory guidelines or specific product parameters as needed."
    ]
  },
  {
    id: "sms-messages",
    title: "4. SMS Messages, Auto-Replies & Dispatch Alerts",
    shortDesc: "Welcome text, lead notifications to Angel (386-333-1482), and STOP/HELP texts",
    icon: MessageSquare,
    filePath: "src/lib/integrations/sms.ts",
    lines: "Lines 30–120",
    keyPhrases: [
      "Client welcome text upon form submission",
      "Internal advisor SMS dispatch sent to (386) 333-1482",
      "Mandatory STOP / HELP automated replies",
      "Toll-free sender: 1-888-887-3585"
    ],
    explanation: "Controls the automated text messages sent via Twilio to both prospective clients and to Angel Burgos when a new lead enters the pipeline.",
    codeSnippet: `// src/lib/integrations/sms.ts
export function buildWelcomeSMS(name: string, lang: "en" | "es") {
  if (lang === "es") {
    return \`Hola \${name}, gracias por contactar a MyIAD / AB Global Consulting. Su solicitud ha sido asignada al asesor Angel Burgos. Frecuencia variable. Responda STOP para cancelar, HELP para ayuda (1-888-887-3585).\`;
  }
  return \`Hello \${name}, thank you for contacting MyIAD National Insurance Solutions. Your request has been assigned to advisor Angel Burgos. Msg frequency varies. Reply STOP to cancel, HELP for help (1-888-887-3585).\`;
}

export function buildAdvisorAlertSMS(lead: LeadPayload) {
  return \`🎯 Advisor Dispatch Alert: \${lead.firstName} \${lead.lastName}\\nService: \${lead.service}\\nPhone: \${lead.phone}\\nTerritory: \${lead.territory}\`;
}`,
    editInstructions: [
      "Open src/lib/integrations/sms.ts.",
      "Update buildWelcomeSMS() or buildAdvisorAlertSMS() functions.",
      "Keep standard TCPA keywords ('STOP to cancel, HELP for help (1-888-887-3585)') intact."
    ]
  },
  {
    id: "legal-verbiage",
    title: "5. Legal, Disclosures & Carrier Compliance Copy",
    shortDesc: "TCPA unchecked consent checkbox, mobile non-sharing clause, and FINRA disclosures",
    icon: Shield,
    filePath: "src/app/opt-in/page.tsx, src/app/privacy/page.tsx, src/app/terms/page.tsx",
    lines: "Multiple pages",
    keyPhrases: [
      "Mandatory Carrier Mobile Data Non-Sharing Clause",
      "TCPA Unchecked Consent Checkbox copy",
      "FINRA Rule 2330 Deferred Variable Annuity Disclosure",
      "Florida License: Angel Burgos #G328926 (WFG: F6D9U)"
    ],
    explanation: "Maintains all compliance texts required for Toll-Free verification (1-888-887-3585), carrier registries, and state insurance licensing regulations.",
    codeSnippet: `// Verbatim Carrier Mobile Non-Sharing Statement:
"No mobile information will be shared with third parties/affiliates for marketing/promotional purposes. All other categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties."

// Verbatim Form Consent Checkbox Disclosure:
"By checking this box and providing your telephone number, you agree to receive conversational and informational SMS text messages from MyIAD National Insurance Solutions regarding your quote request. Message frequency varies. Message and data rates may apply. Reply STOP to cancel at any time. Reply HELP for help, or call toll-free 1-888-887-3585. Consent is not a condition of purchase."`,
    editInstructions: [
      "For SMS Opt-In & Carrier Verification: edit src/app/opt-in/page.tsx.",
      "For Privacy Policy: edit src/app/privacy/page.tsx.",
      "For Terms of Service: edit src/app/terms/page.tsx.",
      "For Statutory Disclosures: edit src/app/disclosures/page.tsx."
    ]
  },
  {
    id: "pdf-reports",
    title: "6. Client PDF Reports & Illustrations",
    shortDesc: "Titles, scenario summaries, and mathematical disclosures in downloadable reports",
    icon: FileCode,
    filePath: "src/lib/pdf/report-generator.ts",
    lines: "Lines 1–320",
    keyPhrases: [
      "MyIAD AI Protection Blueprint titles and branding",
      "Military Asset Shield SGLI vs VGLI cost comparison text",
      "Florida IUL Report 0% floor illustration disclaimers",
      "Annuity Guaranteed Paycheck text"
    ],
    explanation: "Generates high-resolution branded PDF reports sent to prospects and available for immediate download upon completing interactive assessments.",
    codeSnippet: `// src/lib/pdf/report-generator.ts
export function generateMilitaryAssetReport(data: MilitaryScenarioData) {
  // Configures headers, SGLI vs VGLI transition savings tables,
  // SBP maximization disclosures, and Angel Burgos's contact card.
}

export function generateFloridaIULReport(data: IULScenarioData) {
  // Configures S&P 500 index modeling, 0% floor explanation,
  // and tax-free retirement distribution notes.
}`,
    editInstructions: [
      "Open src/lib/pdf/report-generator.ts.",
      "Update report header titles, legal disclaimers, or formula explanation notes.",
      "Run 'npm test' to verify that PDF tests continue to pass cleanly."
    ]
  }
];

export default function AdminVerbiagePage() {
  const [selectedId, setSelectedId] = useState<string>("voice-ai");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const currentCategory = SCRIPT_CATEGORIES.find((c) => c.id === selectedId) || SCRIPT_CATEGORIES[0];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredCategories = SCRIPT_CATEGORIES.filter((c) => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.filePath.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.keyPhrases.some((kp) => kp.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between">
      <div>
        {/* Navigation & Header */}
        <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/admin"
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                title="Back to Admin Dashboard"
              >
                <ArrowLeft size={18} />
              </Link>
              <div>
                <div className="flex items-center gap-2">
                  <BookOpen size={16} className="text-teal-400" />
                  <h1 className="text-base font-bold text-white tracking-tight">
                    MyIAD Application Scripts &amp; Verbiage Reference
                  </h1>
                </div>
                <p className="text-[11px] font-mono text-slate-400">
                  Exact Code Locations &amp; How to Update Voice Prompts, Bilingual Copy &amp; Disclosures
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/admin/system"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition-colors"
              >
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <span>Operations Cockpit</span>
              </Link>

              <Link
                href="/"
                target="_blank"
                className="text-xs text-teal-400 hover:underline inline-flex items-center gap-1"
              >
                <span>Live Site ↗</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
          
          {/* Overview Hero Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 shadow-xl space-y-3">
            <h2 className="text-xl md:text-2xl font-black text-white">
              Where to Update Scripts, Prompts &amp; Website Verbiage
            </h2>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Every message, AI telephone prompt, bilingual translation, and disclosure in the MyIAD application is cleanly modularized. Select a category below to see its exact file location, sample snippet, and step-by-step editing instructions.
            </p>

            <div className="pt-2 max-w-md relative">
              <Search size={15} className="absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search scripts, files, or keywords (e.g. Gemini, Spanish, STOP)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono"
              />
            </div>
          </div>

          {/* Two-Column Explorer: Left Category List, Right Detail Inspector */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Nav Column */}
            <div className="lg:col-span-4 space-y-2">
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-1 font-bold">
                Script &amp; Content Modules ({filteredCategories.length})
              </p>

              {filteredCategories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = cat.id === currentCategory.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedId(cat.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer space-y-1.5 ${
                      isSelected
                        ? "bg-slate-800 border-teal-500 shadow-md ring-1 ring-teal-500/50"
                        : "bg-slate-950/60 border-slate-800/80 hover:bg-slate-850 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-lg ${isSelected ? "bg-teal-500/20 text-teal-300" : "bg-slate-800 text-slate-400"}`}>
                        <Icon size={16} />
                      </div>
                      <span className="font-bold text-xs text-white">{cat.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 pl-8 leading-snug">{cat.shortDesc}</p>
                    <div className="pl-8 pt-1 flex items-center justify-between text-[10px] font-mono text-teal-400">
                      <span>{cat.filePath}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Detail Inspector */}
            <div className="lg:col-span-8 bg-slate-950/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-teal-500/10 text-teal-300 border border-teal-500/20 text-xs font-mono font-bold">
                    <span>File: {currentCategory.filePath}</span>
                    <span>•</span>
                    <span>{currentCategory.lines}</span>
                  </div>
                  <h3 className="text-xl font-black text-white">{currentCategory.title}</h3>
                </div>

                <button
                  onClick={() => handleCopy(currentCategory.codeSnippet, currentCategory.id)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-semibold rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                >
                  {copiedId === currentCategory.id ? (
                    <>
                      <Check size={14} className="text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy Snippet</span>
                    </>
                  )}
                </button>
              </div>

              {/* Purpose & Explanation */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                  Module Purpose:
                </h4>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                  {currentCategory.explanation}
                </p>
              </div>

              {/* Key Elements List */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-slate-300 font-mono">Key Verbiage &amp; Parameters Controlled:</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-400">
                  {currentCategory.keyPhrases.map((phrase, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-teal-400 font-bold">✓</span>
                      <span>{phrase}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Code Snippet Box */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Terminal size={14} className="text-teal-400" />
                    <span>Exact Code Snippet in {currentCategory.filePath}:</span>
                  </span>
                  <span>TypeScript</span>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 overflow-x-auto text-xs font-mono text-teal-200 leading-relaxed">
                  <pre>{currentCategory.codeSnippet}</pre>
                </div>
              </div>

              {/* How to Update Steps */}
              <div className="space-y-3 pt-2 border-t border-slate-800/80">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                  How to Update this Verbiage in Your Repository:
                </h4>
                <ol className="space-y-2 text-xs text-slate-300 list-decimal pl-5">
                  {currentCategory.editInstructions.map((instruction, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {instruction}
                    </li>
                  ))}
                </ol>
              </div>

            </div>

          </div>

          {/* Quick Summary Reference Cheat-Sheet */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <FileCode size={16} className="text-teal-400" />
              <span>Full Repository Verbiage &amp; Script Map (Quick Cheat-Sheet)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <p className="text-white font-bold">AI Voice &amp; Twilio Phone</p>
                <p className="text-teal-400 truncate">voice-relay/server.ts</p>
                <p className="text-slate-400 text-[11px]">Phone greeting, Gemini reasoning prompt &amp; warm transfer</p>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <p className="text-white font-bold">Portal Bilingual Copy (EN/ES)</p>
                <p className="text-teal-400 truncate">src/lib/i18n/myiad-dict.ts</p>
                <p className="text-slate-400 text-[11px]">Headlines, core offerings, D.I.M.E. text, and buttons</p>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <p className="text-white font-bold">Main Site Copy (EN/ES)</p>
                <p className="text-teal-400 truncate">src/lib/i18n/translations.ts</p>
                <p className="text-slate-400 text-[11px]">AB Global Consulting landing pages &amp; advisor profile</p>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <p className="text-white font-bold">AI Copilot Diagnostic Heuristics</p>
                <p className="text-teal-400 truncate">src/app/api/myiad/copilot/route.ts</p>
                <p className="text-slate-400 text-[11px]">0% floor math, IRC §7702, and FINRA Rule 2330</p>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <p className="text-white font-bold">SMS Text &amp; Dispatch Alerts</p>
                <p className="text-teal-400 truncate">src/lib/integrations/sms.ts</p>
                <p className="text-slate-400 text-[11px]">Welcome text, STOP/HELP replies, advisor notifications</p>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <p className="text-white font-bold">Toll-Free Verification Compliance</p>
                <p className="text-teal-400 truncate">src/app/opt-in/page.tsx</p>
                <p className="text-slate-400 text-[11px]">Mandatory carrier non-sharing text &amp; demo checkbox</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
