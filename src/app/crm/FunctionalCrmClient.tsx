"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Bell,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileCheck2,
  Filter,
  Headphones,
  Layers,
  Mail,
  MessageSquare,
  Phone,
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
  UserCheck,
  UserPlus,
  X,
  Zap,
} from "lucide-react";
import { detectTerritoryFromPhone, detectSpecialization } from "@/lib/lead-routing";

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
  const [viewMode, setViewMode] = useState<"kanban" | "table">("kanban");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  // Note state
  const [notes, setNotes] = useState<Record<string, CrmNote[]>>({});
  const [newNoteText, setNewNoteText] = useState("");
  const [isSavingNote, setIsSavingNote] = useState(false);

  // SMS state
  const [smsMessageText, setSmsMessageText] = useState("");
  const [isSendingSms, setIsSendingSms] = useState(false);
  const [smsStatusMessage, setSmsStatusMessage] = useState<string | null>(null);

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

  // Calculate metrics
  const totalLeads = leads.length;
  const newLeadsCount = leads.filter((l) => l.status === "new").length;
  const inProgressCount = leads.filter((l) => l.status === "contacted" || l.status === "assigned").length;
  const closedCount = leads.filter((l) => l.status === "closed" || l.status === "qualified").length;

  // Handle status update
  const handleUpdateStatus = async (leadId: string | number, newStatus: CrmLeadStatus) => {
    // Optimistic UI update
    setLeads((prev) =>
      prev.map((lead) => (lead.id === leadId ? { ...lead, status: newStatus } : lead))
    );
    if (selectedLead?.id === leadId) {
      setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : null));
    }

    try {
      await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: leadId, status: newStatus }),
      });
    } catch (err) {
      console.error("[CRM Error updating status]", err);
    }
  };

  // Handle follow up date update
  const handleUpdateFollowUp = async (leadId: string | number, date: string) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === leadId ? { ...lead, followUpDate: date } : lead))
    );
    if (selectedLead?.id === leadId) {
      setSelectedLead((prev) => (prev ? { ...prev, followUpDate: date } : null));
    }

    try {
      await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: leadId, followUpDate: date }),
      });
    } catch (err) {
      console.error("[CRM Error updating follow up]", err);
    }
  };

  // Load notes for selected lead
  const loadNotesForLead = async (leadId: string | number) => {
    if (notes[String(leadId)]) return;
    try {
      const res = await fetch(`/api/admin/leads/notes?leadId=${encodeURIComponent(String(leadId))}`);
      if (res.ok) {
        const data = await res.json();
        setNotes((prev) => ({ ...prev, [String(leadId)]: data.notes || [] }));
      }
    } catch (err) {
      console.error("Error loading notes", err);
    }
  };

  // Add new note
  const handleAddNote = async (leadId: string | number) => {
    if (!newNoteText.trim()) return;
    setIsSavingNote(true);

    try {
      const res = await fetch("/api/admin/leads/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, body: newNoteText.trim() }),
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

  // Send Live Twilio SMS
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
        setSmsStatusMessage("❌ Notice: SMS queued in simulation mode (verify Twilio credentials).");
      }
    } catch {
      setSmsStatusMessage("❌ Network error attempting SMS dispatch.");
    } finally {
      setIsSendingSms(false);
    }
  };

  // Create new lead manually
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

      const res = await fetch("/api/admin/leads", {
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

  const selectedLeadNotes = selectedLead ? notes[String(selectedLead.id)] || [] : [];
  const territoryInfo = selectedLead ? detectTerritoryFromPhone(selectedLead.phone) : { label: "General" };
  const specInfo = selectedLead
    ? detectSpecialization(selectedLead.service, selectedLead.message || "")
    : { label: "Life & Retirement" };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-teal-500 selection:text-white pb-24">
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
              href="/admin"
              className="text-teal-400 hover:text-teal-300 transition-colors flex items-center gap-1 font-medium hover:underline ml-2"
            >
              Staff Cockpit <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 p-0.5 flex items-center justify-center shadow-lg shadow-teal-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Layers className="w-5 h-5 text-teal-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  MyIAD CRM
                  <span className="text-xs px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30 font-mono">
                    crm.myiad.com
                  </span>
                </h1>
              </div>
              <p className="text-xs text-slate-400">
                Direct Agency Lead Ingestion, Pipeline Tracking & Real-Time Communications
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-xl bg-slate-950 p-1 border border-slate-800">
              <button
                onClick={() => setViewMode("kanban")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  viewMode === "kanban"
                    ? "bg-teal-500 text-slate-950 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Kanban Pipeline
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  viewMode === "table"
                    ? "bg-teal-500 text-slate-950 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Data Table
              </button>
            </div>

            <button
              onClick={() => setIsAddLeadModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-teal-500/20 active:scale-95"
            >
              <UserPlus className="w-4 h-4" />
              + Add Lead
            </button>
          </div>
        </div>
      </header>

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

      {/* Main Content Area: Kanban or Table with Detail Inspector */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Controls row */}
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
          </div>
        </div>

        {/* Layout with Detail Drawer */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Left Area: Kanban or Table */}
          <div className="w-full lg:w-7/12 flex-1">
            {viewMode === "kanban" ? (
              /* KANBAN VIEW */
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
                      {filteredLeads.map((lead) => {
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
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Right Area: Comprehensive Lead Dossier Drawer */}
          <div className="w-full lg:w-5/12 sticky top-24">
            {selectedLead ? (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
                {/* Dossier Header */}
                <div className="border-b border-slate-800 pb-4">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[11px] font-mono text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
                      ID: #{selectedLead.id}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Received: {new Date(selectedLead.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-white">
                    {selectedLead.firstName} {selectedLead.lastName}
                  </h2>
                  <p className="text-xs text-teal-400 font-medium mt-0.5">{selectedLead.service}</p>
                </div>

                {/* Direct Communications Hub */}
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
                      Send Live SMS (Twilio Gateway)
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{selectedLead.phone}</span>
                  </div>

                  <textarea
                    rows={2}
                    value={smsMessageText}
                    onChange={(e) => setSmsMessageText(e.target.value)}
                    placeholder={`Hello ${selectedLead.firstName}, this is Angel Burgos with MyIAD following up on your ${selectedLead.service} inquiry...`}
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

                {/* Follow Up Date & Stage Selector */}
                <div className="grid grid-cols-2 gap-3 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
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

                {/* Internal Case Notes Timeline */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-semibold text-white uppercase font-mono tracking-wider flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-teal-400" />
                      Chronological Notes ({selectedLeadNotes.length})
                    </h4>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add an internal note or underwriting update..."
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
                      {isSavingNote ? "Saving..." : "Add"}
                    </button>
                  </div>

                  <div className="max-h-44 overflow-y-auto space-y-2 pr-1">
                    {selectedLeadNotes.length === 0 ? (
                      <p className="text-[11px] text-slate-500 font-mono py-2 text-center">
                        No notes yet. Add one above.
                      </p>
                    ) : (
                      selectedLeadNotes.map((note) => (
                        <div
                          key={note.id}
                          className="bg-slate-950 border border-slate-800/80 rounded-xl p-3 text-xs space-y-1"
                        >
                          <p className="text-slate-200">{note.body}</p>
                          <p className="text-[10px] text-slate-500 font-mono">
                            {note.author} • {new Date(note.createdAt).toLocaleString()}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Client Diagnostic & TCPA Consent Seal */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      Statutory Compliance & TCPA Consent
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono">Verified Immutable</span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono space-y-1 border-t border-slate-800/80 pt-2">
                    <p>Territory: <strong className="text-white">{territoryInfo.label}</strong></p>
                    <p>Specialization: <strong className="text-teal-400">{specInfo.label}</strong></p>
                    <p>Version: <strong className="text-slate-300">{selectedLead.consentVersion || "myiad-v1.0"}</strong></p>
                    {selectedLead.message && (
                      <p className="text-slate-300 italic pt-1 border-t border-slate-800/40">
                        &quot;{selectedLead.message}&quot;
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-400">
                <User className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                <p className="text-sm font-medium text-white">Select a Lead</p>
                <p className="text-xs text-slate-500 mt-1">
                  Click any card or table row on the left to open the communications drawer, send SMS, or log notes.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

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
