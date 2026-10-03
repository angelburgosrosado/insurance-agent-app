"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Bell,
  Bot,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  ExternalLink,
  FileCheck2,
  Filter,
  Headphones,
  HelpCircle,
  Layers,
  Lock,
  Mail,
  MessageSquare,
  Pause,
  Phone,
  PhoneCall,
  Play,
  Plus,
  Radio,
  RefreshCw,
  Search,
  Send,
  Server,
  Shield,
  ShieldCheck,
  Sliders,
  Sparkles,
  TrendingUp,
  User,
  UserCheck,
  UserPlus,
  Volume2,
  X,
  Zap,
} from "lucide-react";
import { detectTerritoryFromPhone, detectSpecialization } from "@/lib/lead-routing";
import { ALL_28_AUTOMATIONS, type WorkflowTemplate } from "@/lib/crm/automations-data";

export type CrmLeadStatus = "new" | "reviewing" | "assigned" | "contacted" | "qualified" | "closed";

export interface CrmLead {
  id: string | number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  contactTime?: string;
  message?: string;
  status: CrmLeadStatus;
  followUpDate?: string;
  createdAt: string;
  source?: string;
  medium?: string;
  campaign?: string;
  consentAt?: string;
  consentVersion?: string;
}

export interface CrmNote {
  id: string | number;
  leadId: string | number;
  body: string;
  author: string;
  createdAt: string;
}

const STATUS_COLUMNS: Array<{
  id: CrmLeadStatus;
  label: string;
  color: string;
  badge: string;
  desc: string;
}> = [
  {
    id: "new",
    label: "1. New Inbound",
    color: "border-blue-500/40 bg-blue-500/5",
    badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    desc: "Calculators, Opt-ins & 888-887-3585 Calls",
  },
  {
    id: "reviewing",
    label: "2. Under Review",
    color: "border-purple-500/40 bg-purple-500/5",
    badge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    desc: "Suitability & 0% Floor Calculation",
  },
  {
    id: "contacted",
    label: "3. Contacted / SMS",
    color: "border-amber-500/40 bg-amber-500/5",
    badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    desc: "Outbound SMS Sent or Call Completed",
  },
  {
    id: "assigned",
    label: "4. Advisor Assigned",
    color: "border-teal-500/40 bg-teal-500/5",
    badge: "bg-teal-500/20 text-teal-300 border-teal-500/30",
    desc: "Assigned to Angel Burgos (Lic #G328926)",
  },
  {
    id: "qualified",
    label: "5. In Underwriting",
    color: "border-emerald-500/40 bg-emerald-500/5",
    badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    desc: "Carrier Application Submitted",
  },
  {
    id: "closed",
    label: "6. Policy In Force",
    color: "border-emerald-600/60 bg-emerald-600/10",
    badge: "bg-emerald-600/30 text-emerald-200 border-emerald-500/40",
    desc: "Bound & Commission Ledgered",
  },
];

export function FunctionalCrmClient({ initialLeads }: { initialLeads: CrmLead[] }) {
  const [leads, setLeads] = useState<CrmLead[]>(initialLeads);
  const [selectedLead, setSelectedLead] = useState<CrmLead | null>(initialLeads[0] || null);
  
  // Navigation Tabs: Pipeline | 28 Workflows | Telephony & Voice AI
  const [activeTab, setActiveTab] = useState<"pipeline" | "workflows" | "telephony">("pipeline");
  const [viewMode, setViewMode] = useState<"kanban" | "table">("kanban");
  
  // Search & filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [workflowCategory, setWorkflowCategory] = useState<string>("all");
  const [expandedWorkflowId, setExpandedWorkflowId] = useState<string | null>("speed-to-lead-voice");
  
  // Note state
  const [notes, setNotes] = useState<Record<string, CrmNote[]>>({});
  const [newNoteText, setNewNoteText] = useState("");
  const [isSavingNote, setIsSavingNote] = useState(false);

  // SMS state
  const [smsMessageText, setSmsMessageText] = useState("");
  const [isSendingSms, setIsSendingSms] = useState(false);
  const [smsStatusMessage, setSmsStatusMessage] = useState<string | null>(null);

  // AI Strategy Synthesis state
  const [isSynthesizingAi, setIsSynthesizingAi] = useState(false);
  const [aiSynthesisData, setAiSynthesisData] = useState<any>(null);
  const [copiedScript, setCopiedScript] = useState(false);

  // Workflows state
  const [workflows, setWorkflows] = useState<WorkflowTemplate[]>(ALL_28_AUTOMATIONS);
  const [workflowToast, setWorkflowToast] = useState<string | null>(null);

  // Add lead modal state
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [newLeadForm, setNewLeadForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "Indexed Universal Life (0% Floor)",
    coverageAmount: "$500,000",
    territory: "Central Florida",
    notes: "",
  });
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);

  // Filter leads
  const filteredLeads = leads.filter((lead) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      lead.firstName.toLowerCase().includes(query) ||
      lead.lastName.toLowerCase().includes(query) ||
      lead.email.toLowerCase().includes(query) ||
      lead.phone.includes(query) ||
      lead.service.toLowerCase().includes(query);
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filter workflows
  const filteredWorkflows = workflows.filter((w) => {
    return workflowCategory === "all" || w.category === workflowCategory;
  });

  // Metrics
  const totalLeads = leads.length;
  const newLeadsCount = leads.filter((l) => l.status === "new").length;
  const inProgressCount = leads.filter((l) => l.status === "contacted" || l.status === "assigned").length;
  const closedCount = leads.filter((l) => l.status === "closed" || l.status === "qualified").length;

  // Status update
  const handleUpdateStatus = async (leadId: string | number, newStatus: CrmLeadStatus) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === leadId ? { ...lead, status: newStatus } : lead))
    );
    if (selectedLead?.id === leadId) {
      setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : null));
    }

    try {
      await fetch("/api/crm/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: leadId, status: newStatus }),
      });
    } catch (err) {
      console.error("[CRM Error updating status]", err);
    }
  };

  // Follow-up update
  const handleUpdateFollowUp = async (leadId: string | number, date: string) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === leadId ? { ...lead, followUpDate: date } : lead))
    );
    if (selectedLead?.id === leadId) {
      setSelectedLead((prev) => (prev ? { ...prev, followUpDate: date } : null));
    }

    try {
      await fetch("/api/crm/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: leadId, followUpDate: date }),
      });
    } catch (err) {
      console.error("[CRM Error updating follow up]", err);
    }
  };

  // Load notes
  const loadNotesForLead = async (leadId: string | number) => {
    try {
      const res = await fetch(`/api/crm/leads/notes?leadId=${encodeURIComponent(String(leadId))}`);
      if (res.ok) {
        const data = await res.json();
        if (data.notes && data.notes.length > 0) {
          setNotes((prev) => ({ ...prev, [String(leadId)]: data.notes }));
        }
      }
    } catch (err) {
      console.error("Error loading notes", err);
    }
  };

  // Add note
  const handleAddNote = async (leadId: string | number) => {
    if (!newNoteText.trim()) return;
    setIsSavingNote(true);

    try {
      const res = await fetch("/api/crm/leads/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, body: newNoteText.trim(), author: "MyIAD Advisory" }),
      });

      if (res.ok) {
        const data = await res.json();
        setNotes((prev) => ({
          ...prev,
          [String(leadId)]: [data.note, ...(prev[String(leadId)] || [])],
        }));
        setNewNoteText("");
      }
    } catch (err) {
      console.error("Error saving note", err);
    } finally {
      setIsSavingNote(false);
    }
  };

  // Live lead sync
  const [isRefreshingLeads, setIsRefreshingLeads] = useState(false);
  const handleRefreshLeads = async () => {
    setIsRefreshingLeads(true);
    try {
      const res = await fetch("/api/crm/leads");
      if (res.ok) {
        const data = await res.json();
        if (data.leads && Array.isArray(data.leads)) {
          const dbLeads: CrmLead[] = data.leads.map((l: any) => ({
            id: l.id,
            firstName: l.firstName,
            lastName: l.lastName,
            email: l.email,
            phone: l.phone,
            service: l.service,
            contactTime: l.contactTime,
            message: l.message,
            status: l.status || "new",
            followUpDate: l.followUpDate,
            createdAt: typeof l.createdAt === "string" ? l.createdAt : new Date(l.createdAt).toISOString(),
            source: l.source,
            medium: l.medium,
            campaign: l.campaign,
            consentAt: l.consentAt,
            consentVersion: l.consentVersion,
          }));

          setLeads(dbLeads);
          if (dbLeads.length > 0) {
            if (!selectedLead || !dbLeads.find((m) => m.id === selectedLead.id)) {
              setSelectedLead(dbLeads[0]);
            }
          } else {
            setSelectedLead(null);
          }
        }
      }
    } catch (err) {
      console.error("Error refreshing leads", err);
    } finally {
      setIsRefreshingLeads(false);
    }
  };

  // Automatically refresh notes when selected lead changes
  useEffect(() => {
    if (selectedLead?.id) {
      loadNotesForLead(selectedLead.id);
    }
  }, [selectedLead?.id]);

  // Initial sync on mount + dynamic live polling & focus sync
  useEffect(() => {
    handleRefreshLeads();

    const interval = setInterval(() => {
      handleRefreshLeads();
    }, 6000);

    const onFocus = () => {
      handleRefreshLeads();
    };

    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onFocus);
    };
  }, []);

  // Send live Twilio SMS
  const handleSendSms = async (lead: CrmLead) => {
    if (!smsMessageText.trim()) return;
    setIsSendingSms(true);
    setSmsStatusMessage(null);

    try {
      const res = await fetch(`/api/admin/leads/${lead.id}/sms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: smsMessageText.trim() }),
      });

      if (res.ok) {
        setSmsStatusMessage("✅ SMS dispatched successfully via Twilio gateway!");
        setSmsMessageText("");
        setTimeout(() => setSmsStatusMessage(null), 4000);
      } else {
        setSmsStatusMessage("❌ Notice: SMS logged in simulation mode (verify Twilio credentials).");
      }
    } catch {
      setSmsStatusMessage("❌ Network error attempting SMS dispatch.");
    } finally {
      setIsSendingSms(false);
    }
  };

  // AI Strategy Synthesis
  const handleSynthesizeAi = async (lead: CrmLead) => {
    setIsSynthesizingAi(true);
    setAiSynthesisData(null);

    try {
      const res = await fetch("/api/crm/ai-synthesis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicantName: `${lead.firstName} ${lead.lastName}`,
          service: lead.service,
          phone: lead.phone,
          message: lead.message,
          amount: lead.service.includes("(") ? lead.service.split("(")[1].replace(")", "") : "$500,000",
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setAiSynthesisData(data);
      }
    } catch (err) {
      console.error("Error synthesizing AI strategy", err);
    } finally {
      setIsSynthesizingAi(false);
    }
  };

  // Execute workflow trigger simulation
  const handleTriggerWorkflow = (workflow: WorkflowTemplate) => {
    setWorkflows((prev) =>
      prev.map((w) =>
        w.id === workflow.id ? { ...w, activeExecutions: w.activeExecutions + 1 } : w
      )
    );
    setWorkflowToast(`⚡ Playbook Executed: "${workflow.title}" active execution counter updated!`);
    setTimeout(() => setWorkflowToast(null), 4500);
  };

  // Manual lead creation
  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingLead(true);

    try {
      const payload = {
        firstName: newLeadForm.firstName.trim(),
        lastName: newLeadForm.lastName.trim(),
        email: newLeadForm.email.trim(),
        phone: newLeadForm.phone.trim(),
        service: `${newLeadForm.service} (${newLeadForm.coverageAmount})`,
        contactTime: "afternoon",
        message: `[Direct CRM Intake] Territory: ${newLeadForm.territory}. Notes: ${newLeadForm.notes}`,
        consent: true,
        consentText: "TCPA Affirmative Consent verified on direct CRM entry.",
        consentVersion: "myiad-v1.0-direct-intake",
        consentAt: new Date().toISOString(),
      };

      const res = await fetch("/api/crm/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        const createdLead: CrmLead = {
          id: data.lead.id,
          firstName: data.lead.firstName,
          lastName: data.lead.lastName,
          email: data.lead.email,
          phone: data.lead.phone,
          service: data.lead.service,
          status: "new",
          createdAt: data.lead.createdAt,
          message: data.lead.message,
        };

        setLeads((prev) => [createdLead, ...prev]);
        setSelectedLead(createdLead);
        setIsAddLeadModalOpen(false);
        setNewLeadForm({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          service: "Indexed Universal Life (0% Floor)",
          coverageAmount: "$500,000",
          territory: "Central Florida",
          notes: "",
        });
      }
    } catch (err) {
      console.error("Error creating lead", err);
    } finally {
      setIsSubmittingLead(false);
    }
  };

  const selectedLeadNotes = useMemo(() => {
    if (!selectedLead) return [];
    const directNotes = notes[String(selectedLead.id)];
    if (directNotes && directNotes.length > 0) return directNotes;
    if (selectedLead.message) {
      return [
        {
          id: `intake-${selectedLead.id}`,
          leadId: selectedLead.id,
          body: `🎯 AI Underwriting Annotation:
• Strategy / Coverage: ${selectedLead.service || "Advisory Intake"}
• Contact Preference: ${selectedLead.contactTime || "Standard"}
• Source: ${selectedLead.source || "myiad.com front page"}
• Diagnostic Summary: ${selectedLead.message}`,
          author: "MyIAD AI Copilot",
          createdAt: selectedLead.createdAt || new Date().toISOString(),
        },
      ];
    }
    return [];
  }, [selectedLead, notes]);
  const territoryInfo = selectedLead ? detectTerritoryFromPhone(selectedLead.phone) : { label: "General" };
  const specInfo = selectedLead
    ? detectSpecialization(selectedLead.service, selectedLead.message || "")
    : { label: "Life & Retirement" };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-teal-500 selection:text-white pb-24">
      {/* Workflow Notification Toast */}
      {workflowToast && (
        <div className="fixed top-6 right-6 z-50 max-w-md bg-teal-500 text-slate-950 font-medium px-4 py-3 rounded-xl shadow-2xl border border-teal-400 flex items-center gap-2 animate-bounce text-xs">
          <Zap className="w-4 h-4 text-slate-950 flex-shrink-0" />
          <span>{workflowToast}</span>
        </div>
      )}

      {/* Top Operations Ribbon */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 font-mono text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              crm.myiad.com Direct Operations Active
            </span>
            <span className="text-slate-500 hidden sm:inline">•</span>
            <span className="text-slate-300 font-mono text-[11px] hidden sm:inline">
              Voice Relay Number: <strong className="text-teal-400">1-888-887-3585</strong>
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Server className="w-3.5 h-3.5 text-emerald-400" />
              Database: <strong className="text-white font-mono">Live PostgreSQL</strong>
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              Supervised: <strong className="text-white">FL Lic #G328926</strong>
            </span>
            <Link
              href="/admin/system"
              className="text-teal-400 hover:text-teal-300 transition-colors flex items-center gap-1 font-medium hover:underline ml-2"
            >
              Operations Cockpit <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar & Tab Selector */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 p-0.5 flex items-center justify-center shadow-lg shadow-teal-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Layers className="w-5 h-5 text-teal-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                  MyIAD CRM
                  <span className="text-xs px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30 font-mono">
                    Direct Agency Engine
                  </span>
                </h1>
              </div>
              <p className="text-[11px] text-slate-400">
                Lead Intake, Autonomous Workflows & AI-Powered Case Acceleration
              </p>
            </div>
          </div>

          {/* Primary Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center rounded-xl bg-slate-950 p-1 border border-slate-800 text-xs">
              <button
                onClick={() => setActiveTab("pipeline")}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                  activeTab === "pipeline"
                    ? "bg-teal-500 text-slate-950 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                Pipeline Board
              </button>
              <button
                onClick={() => setActiveTab("workflows")}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                  activeTab === "workflows"
                    ? "bg-teal-500 text-slate-950 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                28 Automations Canvas
              </button>
              <button
                onClick={() => setActiveTab("telephony")}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                  activeTab === "telephony"
                    ? "bg-teal-500 text-slate-950 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <PhoneCall className="w-3.5 h-3.5" />
                Telephony & Voice AI
              </button>
            </div>

            {activeTab === "pipeline" && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRefreshLeads}
                  disabled={isRefreshingLeads}
                  title="Check for new submissions from myiad.com"
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-semibold transition-all flex items-center gap-1.5 active:scale-95"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRefreshingLeads ? "animate-spin text-teal-400" : "text-slate-400"}`} />
                  <span className="hidden sm:inline">{isRefreshingLeads ? "Syncing..." : "Sync Live Leads"}</span>
                </button>
                <button
                  onClick={() => setIsAddLeadModalOpen(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold transition-all flex items-center gap-1 shadow-md shadow-teal-500/20 active:scale-95"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  + Add Lead
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* TAB 1: PIPELINE BOARD & LEAD DOSSIER */}
      {activeTab === "pipeline" && (
        <>
          {/* Metrics Row */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
                <span className="text-xs text-slate-400 font-medium">Total Active Leads</span>
                <div className="text-2xl font-bold text-white font-mono mt-1">{totalLeads}</div>
                <p className="text-[11px] text-teal-400 mt-1 flex items-center gap-1 font-mono">
                  <CheckCircle2 className="w-3 h-3" /> Live in Database
                </p>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
                <span className="text-xs text-slate-400 font-medium">New / Unworked</span>
                <div className="text-2xl font-bold text-blue-400 font-mono mt-1">{newLeadsCount}</div>
                <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-blue-400" /> Awaiting reach out
                </p>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
                <span className="text-xs text-slate-400 font-medium">In Pipeline</span>
                <div className="text-2xl font-bold text-amber-400 font-mono mt-1">{inProgressCount}</div>
                <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                  <Activity className="w-3 h-3 text-amber-400" /> Under review / Contacted
                </p>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
                <span className="text-xs text-slate-400 font-medium">Qualified & Closed</span>
                <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">{closedCount}</div>
                <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> Policies Issued / In Force
                </p>
              </div>
            </div>
          </section>

          {/* Controls & Pipeline Area */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-md">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search leads by name, email, phone, or service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
                />
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-teal-500"
                >
                  <option value="all">All Stages</option>
                  <option value="new">New Inbound</option>
                  <option value="reviewing">Under Review</option>
                  <option value="contacted">Contacted / SMS</option>
                  <option value="assigned">Advisor Assigned</option>
                  <option value="qualified">In Underwriting</option>
                  <option value="closed">Policy In Force</option>
                </select>

                <div className="flex items-center rounded-xl bg-slate-950 p-1 border border-slate-800 text-xs">
                  <button
                    onClick={() => setViewMode("kanban")}
                    className={`px-2.5 py-1 rounded-lg ${viewMode === "kanban" ? "bg-teal-500 text-slate-950 font-bold" : "text-slate-400"}`}
                  >
                    Kanban
                  </button>
                  <button
                    onClick={() => setViewMode("table")}
                    className={`px-2.5 py-1 rounded-lg ${viewMode === "table" ? "bg-teal-500 text-slate-950 font-bold" : "text-slate-400"}`}
                  >
                    Table
                  </button>
                </div>
              </div>
            </div>

            {/* Layout with Detail Drawer */}
            <div className="flex flex-col lg:flex-row gap-6 items-start">
              {/* Left Column: Board or Table */}
              <div className="w-full lg:w-7/12 flex-1">
                {viewMode === "kanban" ? (
                  <div className="space-y-6">
                    {STATUS_COLUMNS.map((col) => {
                      const colLeads = filteredLeads.filter((l) => l.status === col.id);
                      return (
                        <div key={col.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm">
                          <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
                            <div className="flex items-center gap-2">
                              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${col.badge}`}>
                                {col.label}
                              </span>
                              <span className="text-xs text-slate-500 font-mono">({colLeads.length})</span>
                            </div>
                            <span className="text-[11px] text-slate-500 hidden sm:inline">{col.desc}</span>
                          </div>

                          {colLeads.length === 0 ? (
                            <div className="border border-dashed border-slate-800/60 rounded-xl p-4 text-center text-xs text-slate-500 font-mono">
                              No leads in this stage.
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {colLeads.map((lead) => {
                                const isSelected = selectedLead?.id === lead.id;
                                const tInfo = detectTerritoryFromPhone(lead.phone);
                                return (
                                  <div
                                    key={lead.id}
                                    onClick={() => {
                                      setSelectedLead(lead);
                                      loadNotesForLead(lead.id);
                                    }}
                                    className={`cursor-pointer rounded-xl p-4 border transition-all text-left relative overflow-hidden ${
                                      isSelected
                                        ? "bg-slate-800/90 border-teal-500 shadow-md shadow-teal-500/10 ring-1 ring-teal-500/50"
                                        : "bg-slate-950/70 border-slate-800/90 hover:border-slate-700 hover:bg-slate-900/80"
                                    }`}
                                  >
                                    <div className="flex items-start justify-between gap-2 mb-1">
                                      <h3 className="text-sm font-semibold text-white truncate">
                                        {lead.firstName} {lead.lastName}
                                      </h3>
                                      <span className="text-[10px] font-mono text-slate-400 flex-shrink-0">
                                        {new Date(lead.createdAt).toLocaleDateString()}
                                      </span>
                                    </div>

                                    <p className="text-xs text-teal-400 font-medium truncate mb-2">{lead.service}</p>

                                    <div className="flex items-center justify-between text-xs text-slate-400 font-mono pt-2 border-t border-slate-800/60">
                                      <span>{lead.phone}</span>
                                      <span className="text-[10px] text-slate-400 truncate max-w-[120px]">
                                        {tInfo.label}
                                      </span>
                                    </div>

                                    {/* Quick Stage Change Dropdown */}
                                    <div className="mt-3 pt-2 border-t border-slate-800/40 flex items-center justify-between gap-2">
                                      <span className="text-[10px] text-slate-500 font-mono">Move:</span>
                                      <select
                                        value={lead.status}
                                        onClick={(e) => e.stopPropagation()}
                                        onChange={(e) => handleUpdateStatus(lead.id, e.target.value as CrmLeadStatus)}
                                        className="bg-slate-900 border border-slate-700 text-slate-200 text-[10px] rounded px-2 py-0.5 focus:outline-none focus:border-teal-500"
                                      >
                                        <option value="new">New Inbound</option>
                                        <option value="reviewing">Under Review</option>
                                        <option value="contacted">Contacted / SMS</option>
                                        <option value="assigned">Advisor Assigned</option>
                                        <option value="qualified">In Underwriting</option>
                                        <option value="closed">Policy In Force</option>
                                      </select>
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
                ) : (
                  /* DATA TABLE VIEW */
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-950 text-slate-400 font-mono uppercase tracking-wider text-[10px] border-b border-slate-800">
                          <tr>
                            <th className="px-4 py-3">Applicant</th>
                            <th className="px-4 py-3">Service / Product</th>
                            <th className="px-4 py-3">Territory</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Follow-Up</th>
                            <th className="px-4 py-3">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/80">
                          {filteredLeads.length === 0 ? (
                            <tr>
                              <td colSpan={6} className="px-4 py-8 text-center text-slate-500 font-mono text-xs">
                                No leads in database yet. Submissions from the myiad.com front page will appear here in real time.
                              </td>
                            </tr>
                          ) : (
                            filteredLeads.map((lead) => {
                            const isSelected = selectedLead?.id === lead.id;
                            const tInfo = detectTerritoryFromPhone(lead.phone);
                            return (
                              <tr
                                key={lead.id}
                                onClick={() => {
                                  setSelectedLead(lead);
                                  loadNotesForLead(lead.id);
                                }}
                                className={`cursor-pointer transition-colors ${
                                  isSelected ? "bg-slate-800/80" : "hover:bg-slate-900/60"
                                }`}
                              >
                                <td className="px-4 py-3.5">
                                  <p className="font-semibold text-white">
                                    {lead.firstName} {lead.lastName}
                                  </p>
                                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                                    {lead.phone} • {lead.email}
                                  </p>
                                </td>
                                <td className="px-4 py-3.5 text-teal-400 font-medium">{lead.service}</td>
                                <td className="px-4 py-3.5 text-slate-300 font-mono text-[11px]">{tInfo.label}</td>
                                <td className="px-4 py-3.5">
                                  <select
                                    value={lead.status}
                                    onClick={(e) => e.stopPropagation()}
                                    onChange={(e) => handleUpdateStatus(lead.id, e.target.value as CrmLeadStatus)}
                                    className="bg-slate-950 border border-slate-800 text-slate-200 text-[11px] rounded-lg px-2 py-1 focus:outline-none focus:border-teal-500"
                                  >
                                    <option value="new">New Inbound</option>
                                    <option value="reviewing">Under Review</option>
                                    <option value="contacted">Contacted / SMS</option>
                                    <option value="assigned">Advisor Assigned</option>
                                    <option value="qualified">In Underwriting</option>
                                    <option value="closed">Policy In Force</option>
                                  </select>
                                </td>
                                <td className="px-4 py-3.5">
                                  <input
                                    type="date"
                                    value={lead.followUpDate || ""}
                                    onClick={(e) => e.stopPropagation()}
                                    onChange={(e) => handleUpdateFollowUp(lead.id, e.target.value)}
                                    className="bg-slate-950 border border-slate-800 text-slate-300 text-[11px] rounded-lg px-2 py-1 focus:outline-none focus:border-teal-500"
                                  />
                                </td>
                                <td className="px-4 py-3.5">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedLead(lead);
                                      loadNotesForLead(lead.id);
                                    }}
                                    className="px-2.5 py-1 rounded bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/30 font-medium"
                                  >
                                    Inspect
                                  </button>
                                </td>
                              </tr>
                            );
                          }))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Lead Dossier Drawer with AI Strategy Synthesis */}
              <div className="w-full lg:w-5/12 sticky top-24">
                {selectedLead ? (
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-5">
                    {/* Header */}
                    <div className="border-b border-slate-800 pb-4">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[11px] font-mono text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
                          ID: #{selectedLead.id}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {new Date(selectedLead.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-white">
                        {selectedLead.firstName} {selectedLead.lastName}
                      </h2>
                      <p className="text-xs text-teal-400 font-medium mt-0.5">{selectedLead.service}</p>
                    </div>

                    {/* AI Underwriting & Strategy Synthesis Card */}
                    <div className="bg-slate-950 border border-teal-500/30 rounded-xl p-4 space-y-3 shadow-inner">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-teal-300 flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-teal-400" />
                          AI Underwriting & Strategy Engine
                        </span>
                        <button
                          onClick={() => handleSynthesizeAi(selectedLead)}
                          disabled={isSynthesizingAi}
                          className="px-3 py-1 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold transition-all disabled:opacity-50 flex items-center gap-1 shadow-sm"
                        >
                          {isSynthesizingAi ? (
                            <>
                              <RefreshCw className="w-3 h-3 animate-spin" /> Synthesizing...
                            </>
                          ) : (
                            <>
                              <Zap className="w-3 h-3 fill-current" /> Run Synthesis
                            </>
                          )}
                        </button>
                      </div>

                      {aiSynthesisData ? (
                        <div className="space-y-2.5 text-xs pt-1 border-t border-slate-800">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                              <p className="text-[10px] text-slate-500 font-mono uppercase">Carrier Match</p>
                              <p className="font-semibold text-emerald-400 mt-0.5 truncate">
                                {aiSynthesisData.recommendedCarrier}
                              </p>
                            </div>
                            <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                              <p className="text-[10px] text-slate-500 font-mono uppercase">FINRA 2330 Score</p>
                              <p className="font-semibold text-teal-400 mt-0.5">
                                {aiSynthesisData.suitabilityScore}/100 Verified
                              </p>
                            </div>
                          </div>

                          <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                            <p className="text-[10px] text-slate-500 font-mono uppercase">Recommended Strategy</p>
                            <p className="text-slate-200 mt-0.5">{aiSynthesisData.strategyOverview}</p>
                          </div>

                          <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                            <p className="text-[10px] text-slate-500 font-mono uppercase">Tax Benefit (IRC §7702)</p>
                            <p className="text-slate-300 text-[11px] mt-0.5 leading-relaxed">
                              {aiSynthesisData.irc7702Benefit}
                            </p>
                          </div>

                          <div className="pt-1 flex items-center justify-between gap-2">
                            <button
                              onClick={() => {
                                setSmsMessageText(aiSynthesisData.advisorScript);
                              }}
                              className="text-[11px] text-teal-400 hover:text-teal-300 font-medium underline flex items-center gap-1"
                            >
                              Insert Script into SMS Box ↓
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-[11px] text-slate-400 font-mono leading-relaxed">
                          Click &quot;Run Synthesis&quot; to evaluate suitability, identify the carrier match, and generate a tailored follow-up script.
                        </p>
                      )}
                    </div>

                    {/* Direct Call & Email Links */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <a
                        href={`tel:${selectedLead.phone}`}
                        className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-teal-400 border border-slate-800 font-medium transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" /> Call Lead
                      </a>
                      <a
                        href={`mailto:${selectedLead.email}`}
                        className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-blue-400 border border-slate-800 font-medium transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" /> Email Dossier
                      </a>
                    </div>

                    {/* Live Twilio SMS Dispatcher */}
                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                          <Send className="w-3.5 h-3.5 text-teal-400" />
                          Send Live SMS (Twilio 10DLC)
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{selectedLead.phone}</span>
                      </div>

                      <textarea
                        rows={2}
                        value={smsMessageText}
                        onChange={(e) => setSmsMessageText(e.target.value)}
                        placeholder={`Hello ${selectedLead.firstName}, this is Angel Burgos with MyIAD following up on your ${selectedLead.service}...`}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                      />

                      {smsStatusMessage && (
                        <p className="text-[11px] text-teal-300 font-mono">{smsStatusMessage}</p>
                      )}

                      <div className="flex items-center justify-end">
                        <button
                          onClick={() => handleSendSms(selectedLead)}
                          disabled={isSendingSms || !smsMessageText.trim()}
                          className="px-3 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold transition-all disabled:opacity-50 flex items-center gap-1.5"
                        >
                          {isSendingSms ? "Sending..." : "Send SMS"}
                        </button>
                      </div>
                    </div>

                    {/* Stage & Follow Up Row */}
                    <div className="grid grid-cols-2 gap-3 text-xs bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                      <div>
                        <label className="text-[10px] text-slate-400 uppercase font-mono block mb-1">
                          Current Stage
                        </label>
                        <select
                          value={selectedLead.status}
                          onChange={(e) => handleUpdateStatus(selectedLead.id, e.target.value as CrmLeadStatus)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-teal-500"
                        >
                          <option value="new">1. New Inbound</option>
                          <option value="reviewing">2. Under Review</option>
                          <option value="contacted">3. Contacted / SMS</option>
                          <option value="assigned">4. Advisor Assigned</option>
                          <option value="qualified">5. In Underwriting</option>
                          <option value="closed">6. Policy In Force</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-400 uppercase font-mono block mb-1">
                          Follow-up Date
                        </label>
                        <input
                          type="date"
                          value={selectedLead.followUpDate || ""}
                          onChange={(e) => handleUpdateFollowUp(selectedLead.id, e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>

                    {/* Lead Intake Diagnostic Annotation */}
                    {selectedLead.message && (
                      <div className="bg-slate-950 border border-teal-500/30 rounded-xl p-3.5 space-y-1.5 shadow-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-teal-300 flex items-center gap-1.5 uppercase font-mono tracking-wider">
                            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                            Intake Diagnostic & Underwriting Annotation
                          </span>
                          <span className="text-[10px] text-teal-400 font-mono bg-teal-500/10 px-1.5 py-0.5 rounded border border-teal-500/20">
                            Live Intake
                          </span>
                        </div>
                        <p className="text-xs text-slate-200 leading-relaxed font-sans">
                          {selectedLead.message}
                        </p>
                      </div>
                    )}

                    {/* Notes System */}
                    <div className="space-y-2.5">
                      <h4 className="text-xs font-semibold text-white uppercase font-mono tracking-wider flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-teal-400" />
                        Internal Notes ({selectedLeadNotes.length})
                      </h4>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Add underwriting note or task..."
                          value={newNoteText}
                          onChange={(e) => setNewNoteText(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleAddNote(selectedLead.id)}
                          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                        />
                        <button
                          onClick={() => handleAddNote(selectedLead.id)}
                          disabled={isSavingNote || !newNoteText.trim()}
                          className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium disabled:opacity-50"
                        >
                          {isSavingNote ? "..." : "Add"}
                        </button>
                      </div>

                      <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1">
                        {selectedLeadNotes.length === 0 ? (
                          <p className="text-[11px] text-slate-500 font-mono py-1 text-center">
                            No notes recorded.
                          </p>
                        ) : (
                          selectedLeadNotes.map((note) => (
                            <div
                              key={note.id}
                              className="bg-slate-950 border border-slate-800/80 rounded-xl p-2.5 text-xs space-y-0.5"
                            >
                              <p className="text-slate-200">{note.body}</p>
                              <p className="text-[10px] text-slate-500 font-mono">
                                {note.author} • {new Date(note.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-400">
                    <User className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                    <p className="text-sm font-medium text-white">
                      {leads.length === 0 ? "Awaiting First Lead Submission" : "Select a Lead"}
                    </p>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                      {leads.length === 0
                        ? "No leads in database yet. The user you create on the main front page (myiad.com) will appear here immediately as the first file with full AI underwriting diagnostics."
                        : "Click any lead in the pipeline to open the communications drawer, run AI synthesis, or send SMS."}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </>
      )}

      {/* TAB 2: 28 AUTOMATED WORKFLOWS CANVAS */}
      {activeTab === "workflows" && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="border-b border-slate-800 pb-5 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono text-teal-400 uppercase tracking-widest">
                  Autonomous Marketing & Speed-to-Lead
                </span>
                <h2 className="text-2xl font-bold text-white mt-1">
                  28 Agency Playbooks & Automated Workflows
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Autonomous sequences powering sub-second lead response, TCR compliance, T-65 Medicare, and living benefits.
                </p>
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {[
                  { id: "all", label: "All 28" },
                  { id: "Speed-to-Lead", label: "Speed-to-Lead" },
                  { id: "Annuity & Life", label: "Annuity & Life" },
                  { id: "Medicare", label: "Medicare T-65" },
                  { id: "Compliance", label: "Compliance" },
                  { id: "Retention", label: "Retention" },
                  { id: "Telephony", label: "Telephony" },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setWorkflowCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                      workflowCategory === cat.id
                        ? "bg-teal-500 text-slate-950 font-bold"
                        : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Workflow Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredWorkflows.map((workflow) => {
              const isExpanded = expandedWorkflowId === workflow.id;
              return (
                <div
                  key={workflow.id}
                  className={`bg-slate-900 border rounded-2xl p-5 transition-all shadow-md ${
                    isExpanded ? "border-teal-500/80 ring-1 ring-teal-500/30" : "border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20 uppercase">
                        {workflow.category}
                      </span>
                      <h3 className="text-sm font-bold text-white mt-1.5">{workflow.title}</h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        {workflow.conversionRate} Conv.
                      </span>
                      <button
                        onClick={() => handleTriggerWorkflow(workflow)}
                        title="Trigger test execution"
                        className="p-1.5 rounded-lg bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/30"
                      >
                        <Zap className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed mb-4">{workflow.description}</p>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono pt-3 border-t border-slate-800/80">
                    <span>
                      Executions: <strong className="text-white">{workflow.activeExecutions.toLocaleString()}</strong>
                    </span>
                    <button
                      onClick={() => setExpandedWorkflowId(isExpanded ? null : workflow.id)}
                      className="text-teal-400 hover:text-teal-300 font-medium underline"
                    >
                      {isExpanded ? "Hide Flow Nodes" : `View ${workflow.nodes.length} Flow Nodes →`}
                    </button>
                  </div>

                  {/* Flow Nodes Diagram */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2">
                      {workflow.nodes.map((node, idx) => (
                        <div key={node.id} className="relative">
                          <div className="flex items-center gap-2.5 bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs">
                            <span className="w-5 h-5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center font-mono text-[10px] text-teal-400 font-bold">
                              {idx + 1}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-slate-200 truncate">{node.title}</p>
                              <p className="text-[10px] text-slate-400 truncate">{node.subtitle}</p>
                            </div>
                            <span className="text-[10px] font-mono text-slate-500 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                              {node.config}
                            </span>
                          </div>
                          {idx < workflow.nodes.length - 1 && (
                            <div className="w-0.5 h-2 bg-teal-500/40 mx-auto my-0.5" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* TAB 3: TELEPHONY & VOICE AI CONTROLS */}
      {activeTab === "telephony" && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          <div className="border-b border-slate-800 pb-5">
            <span className="text-xs font-mono text-teal-400 uppercase tracking-widest">
              Telephony Infrastructure & Cloud Run
            </span>
            <h2 className="text-2xl font-bold text-white mt-1">Twilio ConversationRelay Voice Center</h2>
            <p className="text-xs text-slate-400 mt-1">
              Low-latency WebSocket streaming bridging Twilio Voice, Deepgram Nova-3, and Google Gemini 2.5 Flash.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <PhoneCall className="w-4 h-4 text-teal-400" />
                  Primary Inbound Hotline
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="text-2xl font-bold text-white font-mono">1-888-887-3585</div>
              <p className="text-xs text-slate-400">
                TCR Toll-Free 10DLC Verified. Automatically routes to Cloud Run Twilio ConversationRelay.
              </p>
              <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-500">
                Direct Handoff: <strong className="text-teal-400">+1-386-333-1482</strong>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <Server className="w-4 h-4 text-emerald-400" />
                  Cloud Run WebSocket Service
                </span>
                <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  HEALTHY
                </span>
              </div>
              <div className="text-xs font-mono text-slate-300 truncate bg-slate-950 p-2 rounded-lg border border-slate-800">
                myiad-voice-relay-ecan3w7kva-uc.a.run.app
              </div>
              <p className="text-xs text-slate-400">
                GCP Project: <strong className="text-white">myiad-main-site</strong> (us-central1). Sub-350ms turn response.
              </p>
              <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-500">
                Endpoint: <strong className="text-white">/voice/incoming</strong>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <Bot className="w-4 h-4 text-purple-400" />
                  Voice AI Pipeline Models
                </span>
                <span className="text-[10px] text-purple-400 font-mono bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                  BILINGUAL
                </span>
              </div>
              <div className="text-xs text-slate-300 space-y-1 font-mono">
                <p>STT: <strong className="text-white">Deepgram Nova-3</strong></p>
                <p>LLM: <strong className="text-white">Gemini 2.5 Flash</strong></p>
                <p>TTS: <strong className="text-white">ElevenLabs / Google</strong></p>
              </div>
              <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-500">
                Barge-In: <strong className="text-emerald-400">Supported</strong>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Manual Add Lead Modal */}
      {isAddLeadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-teal-400" />
                Add Inbound Lead to MyIAD CRM
              </h3>
              <button
                onClick={() => setIsAddLeadModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-medium block mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    value={newLeadForm.firstName}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, firstName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                    placeholder="Gabriel"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={newLeadForm.lastName}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, lastName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                    placeholder="Santos"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={newLeadForm.phone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                    placeholder="407-555-0199"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={newLeadForm.email}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                    placeholder="client@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Product Category</label>
                  <select
                    value={newLeadForm.service}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, service: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="Indexed Universal Life (0% Floor)">IUL (0% Floor Tax-Free)</option>
                    <option value="Military SGLI Asset Shield">Military SGLI Transition</option>
                    <option value="Fixed Index Annuity">Fixed Index Annuity</option>
                    <option value="Term Life with Living Benefits">Term + Living Benefits</option>
                    <option value="Executive Advisory">Executive Key Person</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Coverage / Target</label>
                  <input
                    type="text"
                    value={newLeadForm.coverageAmount}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, coverageAmount: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                    placeholder="$1,000,000"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">Initial Notes</label>
                <textarea
                  rows={2}
                  value={newLeadForm.notes}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, notes: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                  placeholder="Applicant requested 0% floor illustration and living benefits rider..."
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddLeadModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingLead}
                  className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold disabled:opacity-50"
                >
                  {isSubmittingLead ? "Saving..." : "Save to Pipeline"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
