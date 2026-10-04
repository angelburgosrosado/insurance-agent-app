import Link from "next/link";
import { getDashboardMetrics } from "@/lib/server/admin-metrics";
import { LogoutButton } from "@/components/auth/logout-button";
import { 
  Activity, 
  FileText, 
  Users, 
  CheckSquare, 
  BarChart3, 
  Sparkles, 
  ExternalLink,
  PhoneCall,
  ShieldCheck,
  Radio,
  Layers
} from "lucide-react";

const statusLabels: Record<string, string> = {
  new: "New", reviewing: "Reviewing", assigned: "Assigned", contacted: "Contacted", qualified: "Qualified", closed: "Closed",
};

function serviceLabel(value: string) { return value.replaceAll("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase()); }

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminPage() {
  const data = await getDashboardMetrics();
  
  const metrics = [
    ["Total Inbound Leads", String(data.totalLeads), "All-time CRM pipeline"],
    ["New Leads This Week", String(data.newLeadsThisWeek), "Last 7 days dynamic intake"],
    ["Conversion Rate", `${data.conversionRate}%`, "Qualified & Closed deals"],
    ["Follow-Up Tasks", String(data.pendingTasks), "Pending advisor outreach"],
  ];

  return (
    <main className="min-h-[100dvh] bg-[#f0f3f5] text-slate-900">
      {/* Top Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-30 shadow-xs">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-sm">
              AB
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">MyIAD &amp; AB Global Consulting</p>
              <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                Executive Operations &amp; Administration
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <Link
              href="/crm"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 text-teal-800 border border-teal-200 font-bold hover:bg-teal-100 transition-colors"
            >
              <Users size={13} className="text-teal-600" />
              <span>CRM Pipeline</span>
            </Link>

            <Link
              href="/admin/system"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold hover:bg-emerald-100 transition-colors"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Systems: Online</span>
            </Link>

            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1 font-semibold text-slate-600 hover:text-slate-900"
            >
              <span>Live Site</span>
              <ExternalLink size={12} />
            </Link>

            <LogoutButton className="font-bold text-red-600 hover:text-red-800 px-3 py-1.5 rounded-lg border border-red-200 hover:bg-red-50 transition-colors cursor-pointer">
              Sign Out
            </LogoutButton>
          </div>
        </div>
      </header>

      {/* Main Grid: Sidebar + Body */}
      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[240px_1fr]">
        
        {/* Sidebar Nav */}
        <aside className="hidden border-r border-slate-200 bg-white/70 p-6 lg:block space-y-6">
          <div className="space-y-1 text-xs">
            <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400 font-bold px-3 mb-2">
              Operations &amp; Health
            </p>
            <Link
              href="/admin/system"
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-bold bg-slate-900 text-white shadow-xs transition-colors"
            >
              <Activity size={16} className="text-teal-400" />
              <span>Operations Cockpit</span>
            </Link>
            <Link
              href="/admin/verbiage"
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <FileText size={16} className="text-slate-500" />
              <span>Scripts &amp; Verbiage</span>
            </Link>
          </div>

          <div className="space-y-1 text-xs">
            <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400 font-bold px-3 mb-2">
              Advisory Pipeline
            </p>
            <Link
              href="/crm"
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-bold bg-teal-50 text-teal-900 border border-teal-200 hover:bg-teal-100 transition-colors"
            >
              <Users size={16} className="text-teal-600" />
              <span>CRM Pipeline Portal</span>
            </Link>
            <Link
              href="/admin"
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <Layers size={16} className="text-slate-500" />
              <span>Overview</span>
            </Link>
            <Link
              href="/admin/leads"
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <Users size={16} className="text-slate-500" />
              <span>Leads Dossier</span>
            </Link>
            <Link
              href="/admin/tasks"
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <CheckSquare size={16} className="text-slate-500" />
              <span>Follow-Up Tasks</span>
            </Link>
            <Link
              href="/admin/campaigns"
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <Sparkles size={16} className="text-slate-500" />
              <span>Campaigns</span>
            </Link>
            <Link
              href="/admin/analytics"
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <BarChart3 size={16} className="text-slate-500" />
              <span>Analytics</span>
            </Link>
          </div>

          <div className="space-y-1 text-xs pt-4 border-t border-slate-200">
            <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400 font-bold px-3 mb-2">
              Compliance &amp; Verification
            </p>
            <Link
              href="/opt-in"
              target="_blank"
              className="flex items-center justify-between px-3 py-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <span>SMS Opt-In (/opt-in)</span>
              <ExternalLink size={12} />
            </Link>
            <Link
              href="/privacy"
              target="_blank"
              className="flex items-center justify-between px-3 py-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <span>Privacy Policy</span>
              <ExternalLink size={12} />
            </Link>
            <Link
              href="/disclosures"
              target="_blank"
              className="flex items-center justify-between px-3 py-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <span>FINRA 2330 / Disclosures</span>
              <ExternalLink size={12} />
            </Link>
          </div>
        </aside>

        {/* Dashboard Body */}
        <section className="p-6 lg:p-10 space-y-8">
          
          {/* Live Operational Status Banner */}
          <div className="p-6 rounded-2xl bg-slate-900 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-slate-800">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold font-mono">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>SYSTEM HEALTH: 100% OPERATIONAL</span>
              </div>
              <h1 className="text-xl md:text-2xl font-black tracking-tight">
                MyIAD Operations &amp; Performance Cockpit
              </h1>
              <p className="text-xs text-slate-400 max-w-xl">
                Google Cloud Run Voice Relay (`1-888-887-3585`), live agent warm transfer (`386-333-1482`), and lead dispatch are actively serving traffic.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/crm"
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all shadow flex items-center gap-2"
              >
                <Users size={15} />
                <span>Open CRM Pipeline</span>
              </Link>

              <Link
                href="/admin/system"
                className="px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-xl transition-all shadow flex items-center gap-2"
              >
                <Activity size={15} />
                <span>Open Operations Cockpit</span>
              </Link>

              <Link
                href="/admin/verbiage"
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-all flex items-center gap-2"
              >
                <FileText size={15} />
                <span>Scripts &amp; Verbiage</span>
              </Link>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {metrics.map(([label, value, change]) => (
              <div key={label} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</p>
                <p className="text-3xl font-black text-slate-900">{value}</p>
                <p className="font-mono text-[11px] text-teal-600 font-semibold">{change}</p>
              </div>
            ))}
          </div>

          {/* Quick Sub-Systems Status Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-xs text-slate-800">
                  <PhoneCall size={16} className="text-blue-600" />
                  <span>Voice Relay (Cloud Run)</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  ONLINE
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-mono truncate">
                myiad-voice-relay-ecan3w7kva-uc.a.run.app
              </p>
              <div className="text-[11px] text-slate-600 flex justify-between pt-1">
                <span>Toll-Free: 1-888-887-3585</span>
                <span className="text-teal-600 font-bold">Deepgram + Gemini</span>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-xs text-slate-800">
                  <ShieldCheck size={16} className="text-teal-600" />
                  <span>Toll-Free Verification</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-100 text-teal-800">
                  VERIFIED PASS
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-mono truncate">
                https://myiad.com/opt-in
              </p>
              <div className="text-[11px] text-slate-600 flex justify-between pt-1">
                <span>CTIA Non-Sharing</span>
                <span className="text-emerald-600 font-bold">Compliant</span>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-xs text-slate-800">
                  <Radio size={16} className="text-purple-600" />
                  <span>Enterprise CRM Webhook</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800">
                  READY
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-mono truncate">
                https://crm.myiad.com
              </p>
              <div className="text-[11px] text-slate-600 flex justify-between pt-1">
                <span>Encryption</span>
                <span className="text-purple-700 font-bold">AES-256-GCM</span>
              </div>
            </div>
          </div>

          {/* Recent Leads Table */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">Recent Inbound Lead Intake</h2>
                <p className="text-xs text-slate-500">Live prospect submissions routed from web and mobile assessments</p>
              </div>
              <Link href="/admin/leads" className="text-xs font-bold text-teal-600 hover:text-teal-700">
                View All Leads →
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {data.recentLeads.map((lead) => (
                <div key={lead.id} className="grid gap-3 py-4 sm:grid-cols-[1.5fr_1.2fr_1fr_auto] sm:items-center text-xs">
                  <div>
                    <Link href={`/admin/leads/${lead.id}`} className="font-bold text-slate-900 hover:text-teal-600">
                      {lead.firstName} {lead.lastName}
                    </Link>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                      {new Date(lead.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <p className="text-slate-600">{serviceLabel(lead.service)}</p>
                  <p className="text-slate-500 font-mono">{(lead as any).source || "Direct Website"}</p>
                  <span className="w-fit px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                    {statusLabels[lead.status] || lead.status}
                  </span>
                </div>
              ))}
            </div>

            {data.recentLeads.length === 0 && (
              <p className="py-8 text-center text-xs text-slate-400">No leads have been received yet</p>
            )}
          </div>

        </section>
      </div>
    </main>
  );
}
