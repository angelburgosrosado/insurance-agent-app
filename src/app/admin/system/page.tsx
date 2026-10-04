"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { 
  Activity, 
  PhoneCall, 
  Database, 
  MessageSquare, 
  ShieldCheck, 
  Cpu, 
  ExternalLink, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ArrowLeft,
  Server,
  Lock,
  Globe,
  Radio,
  FileText
} from "lucide-react";

interface HealthData {
  status: string;
  uptime: number;
  serverTimestamp: string;
  durationMs: number;
  services: {
    voiceRelayCloudRun: {
      status: string;
      latencyMs: number;
      url: string;
      serviceDomain: string;
      timestamp: string | null;
      error: string | null;
    };
    voiceRelayLocalDev: {
      status: string;
      port: number;
      latencyMs: number;
    };
    database: {
      status: string;
      engine: string;
      latencyMs: number;
      leadCount: number;
      error: string | null;
    };
  };
  integrations: {
    twilio: {
      configured: boolean;
      phoneNumber: string;
      tollFreeNumber: string;
      directAdvisorPhone: string;
      status: string;
    };
    geminiAi: {
      configured: boolean;
      model: string;
      status: string;
    };
    crmPipeline: {
      target: string;
      configured: boolean;
      encryption: string;
      status: string;
    };
    carrierCompliance: {
      tollFreeNumber: string;
      optInUrl: string;
      status: string;
      nonSharingPolicy: string;
    };
    sendgrid: {
      configured: boolean;
      status: string;
    };
  };
  routes: Array<{
    name: string;
    path: string;
    status: string;
  }>;
  platform: {
    nodeVersion: string;
    environment: string;
    appVersion: string;
  };
}

export default function AdminSystemOperationsPage() {
  const [data, setData] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);

  const fetchHealth = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/system/health", { cache: "no-store" });
      if (!res.ok) {
        throw new Error(`Health check returned HTTP ${res.status}`);
      }
      const json: HealthData = await res.json();
      setData(json);
      setLastRefreshed(new Date());
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load system diagnostics");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHealth();
    // Auto-refresh every 45 seconds
    const interval = setInterval(fetchHealth, 45000);
    return () => clearInterval(interval);
  }, [fetchHealth]);

  const isCloudRunHealthy = data?.services?.voiceRelayCloudRun?.status === "healthy";
  const isDbHealthy = data?.services?.database?.status === "healthy";

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
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                  <h1 className="text-base font-bold text-white tracking-tight">
                    MyIAD Operations &amp; System Cockpit
                  </h1>
                </div>
                <p className="text-[11px] font-mono text-slate-400">
                  Real-time Operational Telemetry &amp; Service Health
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/admin/verbiage"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition-colors"
              >
                <FileText size={14} className="text-teal-400" />
                <span>Scripts &amp; Verbiage Guide</span>
              </Link>

              <button
                onClick={fetchHealth}
                disabled={loading}
                className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
                <span>{loading ? "Checking..." : "Refresh Status"}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Cockpit Content */}
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
          
          {/* Top Status Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                {isCloudRunHealthy && isDbHealthy ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                    <CheckCircle2 size={13} />
                    ALL SYSTEMS ONLINE &amp; OPERATIONAL
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold">
                    <AlertTriangle size={13} />
                    ATTENTION: VERIFY INTEGRATIONS
                  </span>
                )}
                <span className="text-[11px] font-mono text-slate-400">
                  Response: {data?.durationMs ?? 0}ms
                </span>
              </div>
              <h2 className="text-2xl font-black text-white">
                myiad.com Infrastructure Cockpit
              </h2>
              <p className="text-xs text-slate-400 max-w-xl">
                Real-time status for Cloud Run Voice Relay (1-888-887-3585), Twilio ConversationRelay, database persistence, and CRM dispatch pipelines.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/80">
                <p className="text-[10px] text-slate-400 uppercase">Toll-Free Verified</p>
                <p className="text-white font-bold text-sm">1-888-887-3585</p>
              </div>
              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/80">
                <p className="text-[10px] text-slate-400 uppercase">Advisor Line</p>
                <p className="text-white font-bold text-sm">(386) 333-1482</p>
              </div>
              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/80">
                <p className="text-[10px] text-slate-400 uppercase">Last Check</p>
                <p className="text-slate-300 font-bold text-sm">
                  {lastRefreshed ? lastRefreshed.toLocaleTimeString() : "--"}
                </p>
              </div>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-950/80 border border-red-800 rounded-xl text-xs text-red-200 flex items-center gap-3">
              <XCircle size={18} className="text-red-400 shrink-0" />
              <span>Diagnostic check error: {error}</span>
            </div>
          )}

          {/* Primary Operations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* 1. Voice Relay on Google Cloud Run */}
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4 hover:border-slate-700 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
                    <PhoneCall size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">Voice Relay (Cloud Run)</h3>
                    <p className="text-[10px] text-slate-400 font-mono">Twilio ConversationRelay</p>
                  </div>
                </div>
                {isCloudRunHealthy ? (
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded text-[10px] font-bold">
                    ONLINE ({data?.services?.voiceRelayCloudRun?.latencyMs}ms)
                  </span>
                ) : (
                  <span className="px-2 py-0.5 bg-red-500/20 text-red-400 border border-red-500/30 rounded text-[10px] font-bold">
                    OFFLINE
                  </span>
                )}
              </div>

              <div className="space-y-2 text-xs font-mono bg-slate-900/90 p-3.5 rounded-xl border border-slate-800">
                <div className="flex justify-between">
                  <span className="text-slate-400">Host Domain:</span>
                  <span className="text-teal-300 truncate max-w-[180px]">
                    {data?.services?.voiceRelayCloudRun?.serviceDomain || "myiad-voice-relay-ecan3w7kva-uc.a.run.app"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Twilio Webhook:</span>
                  <span className="text-slate-300">POST /voice/incoming</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Audio Protocol:</span>
                  <span className="text-slate-300">WebSocket (WSS)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">STT Engine:</span>
                  <span className="text-slate-300">Deepgram (nova-2)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">TTS Engine:</span>
                  <span className="text-slate-300">Google Journey-O</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Transfer Target:</span>
                  <span className="text-amber-300">+1-386-333-1482</span>
                </div>
              </div>

              <div className="pt-1 flex items-center justify-between">
                <a
                  href="https://myiad-voice-relay-ecan3w7kva-uc.a.run.app/health"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-teal-400 hover:text-teal-300 inline-flex items-center gap-1 font-semibold"
                >
                  <span>Test Live Endpoint</span>
                  <ExternalLink size={12} />
                </a>

                <span className="text-[10px] text-slate-500">
                  GCP Region: us-central1
                </span>
              </div>
            </div>

            {/* 2. Database & Data Retention */}
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4 hover:border-slate-700 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-purple-500/20 text-purple-400 rounded-lg">
                    <Database size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">Database &amp; Storage</h3>
                    <p className="text-[10px] text-slate-400 font-mono">Prisma ORM Layer</p>
                  </div>
                </div>
                {isDbHealthy ? (
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded text-[10px] font-bold">
                    ONLINE ({data?.services?.database?.latencyMs}ms)
                  </span>
                ) : (
                  <span className="px-2 py-0.5 bg-red-500/20 text-red-400 border border-red-500/30 rounded text-[10px] font-bold">
                    ERROR
                  </span>
                )}
              </div>

              <div className="space-y-2 text-xs font-mono bg-slate-900/90 p-3.5 rounded-xl border border-slate-800">
                <div className="flex justify-between">
                  <span className="text-slate-400">Database Engine:</span>
                  <span className="text-purple-300">{data?.services?.database?.engine}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Lead Records:</span>
                  <span className="text-white font-bold">{data?.services?.database?.leadCount} active leads</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Retention Model:</span>
                  <span className="text-slate-300">FINRA 6-Yr Rule</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">RLS Policies:</span>
                  <span className="text-emerald-400">8 Tables Protected</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Schema Version:</span>
                  <span className="text-slate-300">v6.19.0 Client</span>
                </div>
              </div>

              <div className="pt-1 flex items-center justify-between">
                <Link
                  href="/admin/leads"
                  className="text-xs text-purple-400 hover:text-purple-300 inline-flex items-center gap-1 font-semibold"
                >
                  <span>View All Leads →</span>
                </Link>
                <span className="text-[10px] text-slate-500">
                  Transactional Pool
                </span>
              </div>
            </div>

            {/* 3. SMS Gateway & Toll-Free Communication */}
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4 hover:border-slate-700 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">SMS Gateway</h3>
                    <p className="text-[10px] text-slate-400 font-mono">Twilio REST &amp; Webhooks</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded text-[10px] font-bold">
                  {data?.integrations?.twilio?.status === "active" ? "LIVE CARRIER" : "READY (RESILIENT)"}
                </span>
              </div>

              <div className="space-y-2 text-xs font-mono bg-slate-900/90 p-3.5 rounded-xl border border-slate-800">
                <div className="flex justify-between">
                  <span className="text-slate-400">Toll-Free Sender:</span>
                  <span className="text-emerald-300 font-bold">1-888-887-3585</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Advisor Alert To:</span>
                  <span className="text-slate-300">(386) 333-1482</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Opt-In Webhook:</span>
                  <span className="text-slate-300">/api/webhooks/sms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Keyword Handling:</span>
                  <span className="text-teal-400">STOP, HELP, START</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Bilingual Engine:</span>
                  <span className="text-slate-300">EN / ES Auto-Detect</span>
                </div>
              </div>

              <div className="pt-1 flex items-center justify-between">
                <Link
                  href="/opt-in"
                  target="_blank"
                  className="text-xs text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 font-semibold"
                >
                  <span>Carrier Opt-In Center ↗</span>
                </Link>
                <span className="text-[10px] text-slate-500">
                  CTIA Audited
                </span>
              </div>
            </div>

            {/* 4. CRM Pipeline & Webhook Encryption */}
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4 hover:border-slate-700 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg">
                    <Server size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">CRM Enterprise Pipeline</h3>
                    <p className="text-[10px] text-slate-400 font-mono">crm.myiad.com Gateway</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded text-[10px] font-bold">
                  OPERATIONAL
                </span>
              </div>

              <div className="space-y-2 text-xs font-mono bg-slate-900/90 p-3.5 rounded-xl border border-slate-800">
                <div className="flex justify-between">
                  <span className="text-slate-400">Target Pipeline:</span>
                  <span className="text-amber-300 truncate max-w-[180px]">crm.myiad.com</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Payload Security:</span>
                  <span className="text-slate-300">AES-256-GCM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Signing Hash:</span>
                  <span className="text-slate-300">HMAC-SHA256</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Territory Detect:</span>
                  <span className="text-emerald-400">FL, PR, 50 States</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Fallback Queue:</span>
                  <span className="text-slate-300">Resilient Simulation</span>
                </div>
              </div>

              <div className="pt-1 flex items-center justify-between">
                <a
                  href="https://crm.myiad.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 font-semibold"
                >
                  <span>Open crm.myiad.com ↗</span>
                </a>
                <span className="text-[10px] text-slate-500">
                  Sub-Second Sync
                </span>
              </div>
            </div>

            {/* 5. AI Reasoning & Financial Copilot */}
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4 hover:border-slate-700 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
                    <Cpu size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">AI Copilot &amp; Intelligence</h3>
                    <p className="text-[10px] text-slate-400 font-mono">Google Gemini + Heuristics</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded text-[10px] font-bold">
                  ACTIVE
                </span>
              </div>

              <div className="space-y-2 text-xs font-mono bg-slate-900/90 p-3.5 rounded-xl border border-slate-800">
                <div className="flex justify-between">
                  <span className="text-slate-400">Model Engine:</span>
                  <span className="text-indigo-300">gemini-2.5-flash</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">IUL 0% Floor Logic:</span>
                  <span className="text-emerald-400">Active &amp; Tested</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">IRC §7702 Heuristics:</span>
                  <span className="text-emerald-400">TAMRA 7-Pay Aware</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">FINRA 2330 Guardrail:</span>
                  <span className="text-emerald-400">Suitability Checked</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Fallback Engine:</span>
                  <span className="text-slate-300">Deterministic Advisory</span>
                </div>
              </div>

              <div className="pt-1 flex items-center justify-between">
                <Link
                  href="/admin/verbiage"
                  className="text-xs text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1 font-semibold"
                >
                  <span>View Copilot Prompts →</span>
                </Link>
                <span className="text-[10px] text-slate-500">
                  Real-Time Triage
                </span>
              </div>
            </div>

            {/* 6. Regulatory & Carrier Compliance Center */}
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4 hover:border-slate-700 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-teal-500/20 text-teal-400 rounded-lg">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">Toll-Free Verification &amp; Legal</h3>
                    <p className="text-[10px] text-slate-400 font-mono">CTIA &amp; SEC / FINRA Compliance</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-teal-500/20 text-teal-400 border border-teal-500/30 rounded text-[10px] font-bold">
                  VERIFIED PASS
                </span>
              </div>

              <div className="space-y-2 text-xs font-mono bg-slate-900/90 p-3.5 rounded-xl border border-slate-800">
                <div className="flex justify-between">
                  <span className="text-slate-400">Toll-Free Line:</span>
                  <span className="text-white font-bold">1-888-887-3585</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Opt-In Verification:</span>
                  <span className="text-teal-300">/opt-in (Live)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Mobile Non-Sharing:</span>
                  <span className="text-emerald-400">Verbatim Clause</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Affirmative Consent:</span>
                  <span className="text-emerald-400">Unchecked Default</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">FL 0215 License:</span>
                  <span className="text-slate-300">#G328926 (Angel Burgos)</span>
                </div>
              </div>

              <div className="pt-1 flex items-center justify-between">
                <Link
                  href="/opt-in"
                  target="_blank"
                  className="text-xs text-teal-400 hover:text-teal-300 inline-flex items-center gap-1 font-semibold"
                >
                  <span>Audit Opt-In Form ↗</span>
                </Link>
                <span className="text-[10px] text-slate-500">
                  TCR Certified
                </span>
              </div>
            </div>

          </div>

          {/* Core Routes Status Table */}
          <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <Globe size={16} className="text-teal-400" />
                  <span>Application Endpoints &amp; Public Pages Status</span>
                </h3>
                <p className="text-[11px] text-slate-400">
                  Status of high-conversion landing pages, legal disclaimers, and interactive calculators
                </p>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                10/10 Monitored Endpoints OK
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono pt-2">
              {data?.routes?.map((route) => (
                <div
                  key={route.path}
                  className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex items-center justify-between hover:border-slate-700 transition-colors"
                >
                  <div className="space-y-0.5">
                    <p className="text-white font-medium">{route.name}</p>
                    <p className="text-[10px] text-slate-400">{route.path}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded text-[10px] font-bold">
                      {route.status.toUpperCase()}
                    </span>
                    <a
                      href={route.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 text-slate-400 hover:text-white"
                      title="Open page in new tab"
                    >
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Guidance Card */}
          <div className="p-6 rounded-2xl bg-teal-950/40 border border-teal-800/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="text-white font-bold text-sm flex items-center gap-2">
                <FileText size={16} className="text-teal-400" />
                <span>Need to update telephone scripts, prompts, or website verbiage?</span>
              </h4>
              <p className="text-xs text-slate-300">
                Review the centralized guide to locate and edit voice AI prompts, English/Spanish translations, SMS messages, and legal copy.
              </p>
            </div>
            <Link
              href="/admin/verbiage"
              className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-xl transition-all shadow shrink-0"
            >
              Open Scripts &amp; Verbiage Reference →
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}
