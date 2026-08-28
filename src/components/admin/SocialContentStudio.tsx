"use client";

import React, { useState, useCallback, useEffect } from "react";
import {
  Sparkles,
  Video,
  Share2,
  Megaphone,
  Mail,
  Layers,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  PlaySquare,
  UserCheck,
  ListChecks,
} from "lucide-react";
import {
  generateCampaignPack,
  GeneratedCampaignPack,
  CampaignRequest,
  UNIVERSAL_SOCIAL_BIOS,
} from "@/lib/ai-content-generator";

export function SocialContentStudio() {
  const [product, setProduct] = useState<CampaignRequest["product"]>("military");
  const [persona, setPersona] = useState<CampaignRequest["persona"]>("veterans");
  const [trigger, setTrigger] = useState<CampaignRequest["trigger"]>("engineering_clarity");
  const [tone, setTone] = useState<CampaignRequest["tone"]>("analytical");
  const [lang, setLang] = useState<"es" | "en">("es");

  const [activeTab, setActiveTab] = useState<"video" | "youtube" | "linkedin" | "ad" | "email" | "carousel">("video");
  const [activeSection, setActiveSection] = useState<"studio" | "bios" | "launchpad">("studio");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // 30-Day Launchpad Milestones
  const [launchMilestones, setLaunchMilestones] = useState<Record<string, boolean>>({
    m1: true, // LinkedIn headline & About updated
    m2: false, // Banners & logo aligned across LinkedIn, FB, IG, YT
    m3: true, // abglco.com and intro video added to Featured section
    m4: false, // Introduction post announcing AB Global mission
    m5: false, // 2 weekly posts scheduled (Protection/Health & Retirement/Legacy)
    m6: true, // Protection Planning Checklist PDF pinned
    m7: true, // Call to Action unified to abglco.com
  });

  const [campaignData, setCampaignData] = useState<GeneratedCampaignPack>(() =>
    generateCampaignPack({
      product: "military",
      persona: "veterans",
      trigger: "engineering_clarity",
      tone: "analytical",
      lang: "es",
    })
  );

  const handleGenerate = useCallback(() => {
    setIsGenerating(true);
    setTimeout(() => {
      const pack = generateCampaignPack({
        product,
        persona,
        trigger,
        tone,
        lang,
      });
      setCampaignData(pack);
      setIsGenerating(false);
    }, 250);
  }, [product, persona, trigger, tone, lang]);

  useEffect(() => {
    handleGenerate();
  }, [handleGenerate]);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const toggleMilestone = (id: string) => {
    setLaunchMilestones((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="bg-white border border-[var(--line)] shadow-sm rounded-3xl overflow-hidden space-y-6">
      {/* Header Banner */}
      <div className="bg-[#001c38] text-white p-6 lg:p-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shadow-inner">
              <Sparkles size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold tracking-tight">AI Autonomous Campaign & Content Studio</h2>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
                  PE Engineering Precision
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Multi-channel video scripts, YouTube authority outlines, LinkedIn posts & paid ads aligned with Angel Burgos, PE.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang((prev) => (prev === "es" ? "en" : "es"))}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <span>{lang === "es" ? "🇵🇷 Idioma: Español" : "🇺🇸 Language: English"}</span>
            </button>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="px-5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl text-xs font-black uppercase tracking-wider shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw size={14} className={isGenerating ? "animate-spin" : ""} />
              <span>{isGenerating ? "Synthesizing..." : "✨ Regenerate AI Pack"}</span>
            </button>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
          <button
            onClick={() => setActiveSection("studio")}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSection === "studio"
                ? "bg-amber-500 text-slate-950 shadow-md font-black"
                : "bg-white/10 text-white hover:bg-white/15"
            }`}
          >
            <Sparkles size={13} />
            <span>AI Multi-Channel Studio</span>
          </button>

          <button
            onClick={() => setActiveSection("bios")}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSection === "bios"
                ? "bg-amber-500 text-slate-950 shadow-md font-black"
                : "bg-white/10 text-white hover:bg-white/15"
            }`}
          >
            <UserCheck size={13} />
            <span>Universal Social Bios & Brand Kit</span>
          </button>

          <button
            onClick={() => setActiveSection("launchpad")}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSection === "launchpad"
                ? "bg-amber-500 text-slate-950 shadow-md font-black"
                : "bg-white/10 text-white hover:bg-white/15"
            }`}
          >
            <ListChecks size={13} />
            <span>30-Day Social Launchpad Tracker</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: AI STUDIO */}
      {activeSection === "studio" && (
        <div className="p-6 lg:p-8 space-y-6">
          {/* Strategic Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
            {/* 1. Product */}
            <div>
              <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1.5">
                1. Target Solution / Mini-App:
              </label>
              <select
                value={product}
                onChange={(e) => setProduct(e.target.value as any)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 shadow-sm cursor-pointer"
              >
                <option value="military">🎖️ Military Asset Shield (VGLI / SBP)</option>
                <option value="iul">📊 Florida IUL (0% Floor / IRS 7702)</option>
                <option value="annuity">📈 Guaranteed Lifetime Annuity</option>
                <option value="funeral">🕊️ Everest Funeral Concierge 24/7</option>
                <option value="dime">🛡️ D.I.M.E. Life Needs Framework</option>
                <option value="ltc">🏥 CareMatters LTC Cash Indemnity</option>
              </select>
            </div>

            {/* 2. Persona */}
            <div>
              <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1.5">
                2. Target Audience Persona:
              </label>
              <select
                value={persona}
                onChange={(e) => setPersona(e.target.value as any)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 shadow-sm cursor-pointer"
              >
                <option value="veterans">🎖️ Active Duty & Veterans</option>
                <option value="hispanic_families">🌴 Hispanic & Puerto Rico Families</option>
                <option value="business_owners">💼 Florida LLC & 1099 Business Owners</option>
                <option value="pre_retirees">📈 Pre-Retirees (Age 50–65)</option>
                <option value="young_families">🛡️ Young Families & Parents</option>
              </select>
            </div>

            {/* 3. 5 Core Themes */}
            <div>
              <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1.5">
                3. Repeatable Content Theme:
              </label>
              <select
                value={trigger}
                onChange={(e) => setTrigger(e.target.value as any)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 shadow-sm cursor-pointer"
              >
                <option value="engineering_clarity">📐 5. Engineering Clarity (Math & Decision Trees)</option>
                <option value="protection">🛡️ 1. Protection (D.I.M.E. & Family Readiness)</option>
                <option value="retirement_income">📈 2. Retirement Income (IUL 0% Floor & Annuities)</option>
                <option value="health_medicare">🏥 3. Health & LTC (Medicare & Cash Care)</option>
                <option value="legacy_planning">🕊️ 4. Legacy (Everest Funeral Concierge)</option>
                <option value="military_transition">🎖️ Military Transition & Pension Max</option>
              </select>
            </div>

            {/* 4. Tone */}
            <div>
              <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1.5">
                4. Copy Tone & Framing:
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value as any)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 shadow-sm cursor-pointer"
              >
                <option value="analytical">📊 Analytical & Math-Driven (PE Style)</option>
                <option value="direct_response">⚡ Urgent Direct-Response (AIDA)</option>
                <option value="executive">💼 Executive Authority</option>
                <option value="empathetic">🤝 Empathetic & Family-Centered</option>
              </select>
            </div>
          </div>

          {/* Dynamic Tracked URL Bar */}
          <div className="flex flex-wrap items-center justify-between p-3.5 bg-amber-50/60 rounded-2xl border border-amber-200/80 text-xs gap-3">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="font-bold text-amber-900 shrink-0">📍 Auto-Tracked Link:</span>
              <code className="text-[11px] text-amber-800 truncate font-mono bg-white px-2 py-0.5 rounded border border-amber-200">
                {campaignData.trackedUrl}
              </code>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => copyToClipboard(campaignData.trackedUrl, "url")}
                className="px-3 py-1 bg-white hover:bg-amber-100 border border-amber-300 rounded-lg font-bold text-amber-900 flex items-center gap-1 shadow-sm transition-all cursor-pointer"
              >
                {copiedKey === "url" ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                <span>{copiedKey === "url" ? "Copied!" : "Copy Link"}</span>
              </button>

              <a
                href={campaignData.trackedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg font-bold flex items-center gap-1 shadow-sm transition-all"
              >
                <ExternalLink size={12} />
                <span>Test Link</span>
              </a>
            </div>
          </div>

          {/* Channel Output Tabs */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
              <button
                onClick={() => setActiveTab("video")}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === "video"
                    ? "bg-[#001c38] text-amber-400 shadow-md"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                <Video size={14} />
                <span>🎬 Short Video Script (TikTok / Reels)</span>
              </button>

              <button
                onClick={() => setActiveTab("youtube")}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === "youtube"
                    ? "bg-[#001c38] text-amber-400 shadow-md"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                <PlaySquare size={14} className="text-red-500" />
                <span>📺 YouTube Long-Form Masterclass</span>
              </button>

              <button
                onClick={() => setActiveTab("linkedin")}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === "linkedin"
                    ? "bg-[#001c38] text-amber-400 shadow-md"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                <Share2 size={14} />
                <span>💼 LinkedIn Authority Post</span>
              </button>

              <button
                onClick={() => setActiveTab("ad")}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === "ad"
                    ? "bg-[#001c38] text-amber-400 shadow-md"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                <Megaphone size={14} />
                <span>🎯 Meta / TikTok Paid Ad</span>
              </button>

              <button
                onClick={() => setActiveTab("email")}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === "email"
                    ? "bg-[#001c38] text-amber-400 shadow-md"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                <Mail size={14} />
                <span>✉️ Email Broadcast</span>
              </button>

              <button
                onClick={() => setActiveTab("carousel")}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === "carousel"
                    ? "bg-[#001c38] text-amber-400 shadow-md"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                <Layers size={14} />
                <span>📸 5-Slide Carousel Deck</span>
              </button>
            </div>

            {/* TAB 1: Short Video Script */}
            {activeTab === "video" && (
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <Video size={16} className="text-blue-600" />
                    <span>{campaignData.videoScript.title}</span>
                  </h3>
                  <button
                    onClick={() => copyToClipboard(campaignData.videoScript.fullText, "video")}
                    className="px-3.5 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    {copiedKey === "video" ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                    <span>{copiedKey === "video" ? "Copied Script!" : "Copy Full Script"}</span>
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3.5 bg-white rounded-xl border border-slate-200">
                    <p className="font-bold text-blue-800 uppercase tracking-wider text-[10px] mb-1">🎯 0–3s Visual Hook:</p>
                    <p className="text-slate-800 font-medium">{campaignData.videoScript.hook}</p>
                  </div>

                  <div className="p-3.5 bg-white rounded-xl border border-slate-200">
                    <p className="font-bold text-amber-800 uppercase tracking-wider text-[10px] mb-1">📱 4–20s On-Screen Demonstration:</p>
                    <p className="text-slate-800 font-medium">{campaignData.videoScript.demonstration}</p>
                  </div>

                  <div className="p-3.5 bg-white rounded-xl border border-slate-200">
                    <p className="font-bold text-emerald-800 uppercase tracking-wider text-[10px] mb-1">💡 21–35s The Solution & Numbers:</p>
                    <p className="text-slate-800 font-medium">{campaignData.videoScript.solution}</p>
                  </div>

                  <div className="p-3.5 bg-white rounded-xl border border-slate-200">
                    <p className="font-bold text-purple-800 uppercase tracking-wider text-[10px] mb-1">📣 36–45s Call To Action (CTA):</p>
                    <p className="text-slate-800 font-medium">{campaignData.videoScript.cta}</p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: YouTube Long-Form Masterclass */}
            {activeTab === "youtube" && (
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-5">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <PlaySquare size={18} className="text-red-600" />
                      <span>{campaignData.youtubeVideo.title}</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">{campaignData.youtubeVideo.concept}</p>
                  </div>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `TITLE:\n${campaignData.youtubeVideo.title}\n\nDESCRIPTION:\n${campaignData.youtubeVideo.description}`,
                        "yt"
                      )
                    }
                    className="px-3.5 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    {copiedKey === "yt" ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                    <span>{copiedKey === "yt" ? "Copied!" : "Copy Description & Outline"}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 text-xs">
                  {/* Chapter Timestamps */}
                  <div className="lg:col-span-7 space-y-2.5">
                    <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block">
                      📌 Video Chapters & Script Walkthrough:
                    </span>
                    {campaignData.youtubeVideo.chapters.map((ch, i) => (
                      <div key={i} className="p-3 bg-white rounded-xl border border-slate-200">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 bg-red-100 text-red-800 font-mono font-bold rounded text-[10px]">
                            {ch.timestamp}
                          </span>
                          <strong className="text-slate-900">{ch.title}</strong>
                        </div>
                        <p className="text-slate-600 pl-1">{ch.talkingPoints}</p>
                      </div>
                    ))}
                  </div>

                  {/* Visual Aids & Ready Description */}
                  <div className="lg:col-span-5 space-y-3">
                    <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-2">
                      <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block">
                        🎬 On-Screen Visual Plan:
                      </span>
                      <ul className="space-y-1 text-slate-700">
                        {campaignData.youtubeVideo.visualAids.map((aid, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-amber-500">•</span>
                            <span>{aid}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1.5">
                      <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block">
                        📝 SEO Description Box:
                      </span>
                      <pre className="font-sans text-[11px] text-slate-700 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                        {campaignData.youtubeVideo.description}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: LinkedIn Post */}
            {activeTab === "linkedin" && (
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <Share2 size={16} className="text-blue-700" />
                    <span>LinkedIn Executive Thought Leadership Post</span>
                  </h3>
                  <button
                    onClick={() => copyToClipboard(campaignData.linkedInPost, "linkedin")}
                    className="px-3.5 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    {copiedKey === "linkedin" ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                    <span>{copiedKey === "linkedin" ? "Copied!" : "Copy Post"}</span>
                  </button>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 font-sans text-xs text-slate-800 whitespace-pre-wrap leading-relaxed">
                  {campaignData.linkedInPost}
                </div>
              </div>
            )}

            {/* TAB 4: Paid Ad */}
            {activeTab === "ad" && (
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <Megaphone size={16} className="text-amber-600" />
                    <span>Meta (FB/IG) & TikTok Paid Direct-Response Ad Package</span>
                  </h3>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `HEADLINE:\n${campaignData.paidAd.headline}\n\nPRIMARY TEXT:\n${campaignData.paidAd.primaryText}\n\nDESCRIPTION:\n${campaignData.paidAd.description}\n\nLINK:\n${campaignData.trackedUrl}`,
                        "ad"
                      )
                    }
                    className="px-3.5 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    {copiedKey === "ad" ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                    <span>{copiedKey === "ad" ? "Copied Ad!" : "Copy Full Ad Package"}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                    <p className="font-bold text-slate-500 uppercase text-[10px]">Ad Headline:</p>
                    <p className="font-extrabold text-slate-900 text-sm">{campaignData.paidAd.headline}</p>
                    <p className="font-bold text-slate-500 uppercase text-[10px] pt-2">Primary Text:</p>
                    <p className="text-slate-800 leading-relaxed">{campaignData.paidAd.primaryText}</p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                    <p className="font-bold text-slate-500 uppercase text-[10px]">A/B Hook Variations:</p>
                    <ul className="space-y-1.5">
                      {campaignData.paidAd.hooks.map((h, i) => (
                        <li key={i} className="p-2 bg-slate-50 rounded-lg text-slate-800 border border-slate-100">
                          {i + 1}. {h}
                        </li>
                      ))}
                    </ul>
                    <p className="font-bold text-slate-500 uppercase text-[10px] pt-2">CTA Button:</p>
                    <span className="inline-block px-3 py-1 bg-amber-500 text-slate-950 font-bold rounded-lg text-xs">
                      {campaignData.paidAd.ctaButton}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: Email Broadcast */}
            {activeTab === "email" && (
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <Mail size={16} className="text-emerald-600" />
                    <span>Email Broadcast & Newsletter Follow-Up</span>
                  </h3>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `SUBJECT A: ${campaignData.emailBroadcast.subjectA}\nSUBJECT B: ${campaignData.emailBroadcast.subjectB}\n\nPREVIEW: ${campaignData.emailBroadcast.previewText}\n\nBODY:\n${campaignData.emailBroadcast.body}`,
                        "email"
                      )
                    }
                    className="px-3.5 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    {copiedKey === "email" ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                    <span>{copiedKey === "email" ? "Copied Email!" : "Copy Email"}</span>
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded-xl border border-slate-200">
                      <span className="font-bold text-slate-500 uppercase text-[10px] block">Subject Line (Option A):</span>
                      <strong className="text-slate-900">{campaignData.emailBroadcast.subjectA}</strong>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200">
                      <span className="font-bold text-slate-500 uppercase text-[10px] block">Subject Line (Option B):</span>
                      <strong className="text-slate-900">{campaignData.emailBroadcast.subjectB}</strong>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-slate-200 whitespace-pre-wrap leading-relaxed text-slate-800">
                    {campaignData.emailBroadcast.body}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: Carousel Deck */}
            {activeTab === "carousel" && (
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <Layers size={16} className="text-purple-600" />
                    <span>5-Slide Carousel Breakdown (Instagram / LinkedIn)</span>
                  </h3>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        campaignData.carouselSlides
                          .map((s) => `SLIDE ${s.slideNumber}: ${s.title}\nVISUAL: ${s.visualCue}\nCONTENT:\n${s.content}\n---`)
                          .join("\n\n"),
                        "carousel"
                      )
                    }
                    className="px-3.5 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    {copiedKey === "carousel" ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                    <span>{copiedKey === "carousel" ? "Copied Carousel!" : "Copy Carousel"}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
                  {campaignData.carouselSlides.map((slide) => (
                    <div key={slide.slideNumber} className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2 flex flex-col justify-between shadow-sm">
                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="h-5 w-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px] font-bold">
                            {slide.slideNumber}
                          </span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase">Slide {slide.slideNumber}</span>
                        </div>
                        <h4 className="font-bold text-slate-900">{slide.title}</h4>
                        <div className="p-2 bg-purple-50 rounded-lg text-[10px] text-purple-900 font-medium my-2">
                          🎨 {slide.visualCue}
                        </div>
                        <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{slide.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Compliance Footer Box */}
            <div className="p-4 bg-slate-100 rounded-2xl border border-slate-200 text-[11px] text-slate-600 flex items-start gap-2.5">
              <ShieldCheck size={16} className="text-slate-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800 block mb-0.5">Automated Compliance & Fiduciary Audit:</strong>
                <span>{campaignData.complianceDisclosure}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: UNIVERSAL SOCIAL BIOS & BRAND ASSET KIT */}
      {activeSection === "bios" && (
        <div className="p-6 lg:p-8 space-y-6">
          {/* Brand Identity Tokens */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Primary Navy</span>
                <div className="flex items-center gap-2 mt-1">
                  <div className="h-6 w-6 rounded-lg bg-[#001c38] border border-slate-300" />
                  <code className="text-xs font-mono font-bold text-slate-900">#001c38</code>
                </div>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Accent Gold</span>
                <div className="flex items-center gap-2 mt-1">
                  <div className="h-6 w-6 rounded-lg bg-[#c89d56] border border-slate-300" />
                  <code className="text-xs font-mono font-bold text-slate-900">#c89d56</code>
                </div>
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Official Tagline</span>
              <strong className="text-xs text-slate-900 font-bold">&ldquo;Clear guidance beyond the policy&rdquo;</strong>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Universal Call to Action</span>
              <strong className="text-xs text-emerald-700 font-bold">&ldquo;Schedule a complimentary consultation at abglco.com&rdquo;</strong>
            </div>
          </div>

          {/* Social Bio Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            {/* 1. Universal Quick Bio */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-900 flex items-center gap-2">
                  <span>📱 Universal Social Bio (All Platforms)</span>
                </h4>
                <button
                  onClick={() =>
                    copyToClipboard(
                      `${UNIVERSAL_SOCIAL_BIOS.universal.headline}\n${UNIVERSAL_SOCIAL_BIOS.universal.body}`,
                      "bio_univ"
                    )
                  }
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-800 font-bold flex items-center gap-1 cursor-pointer"
                >
                  {copiedKey === "bio_univ" ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                  <span>{copiedKey === "bio_univ" ? "Copied!" : "Copy"}</span>
                </button>
              </div>
              <p className="text-slate-500 text-[11px]">Character count: {UNIVERSAL_SOCIAL_BIOS.universal.characterCount} chars</p>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 font-mono text-[11px] whitespace-pre-wrap text-slate-800">
                <strong className="text-slate-900">{UNIVERSAL_SOCIAL_BIOS.universal.headline}</strong>
                {"\n"}
                {UNIVERSAL_SOCIAL_BIOS.universal.body}
              </div>
            </div>

            {/* 2. LinkedIn Bio */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-900 flex items-center gap-2">
                  <Share2 size={14} className="text-blue-700" />
                  <span>LinkedIn Headline & About Section</span>
                </h4>
                <button
                  onClick={() =>
                    copyToClipboard(
                      `HEADLINE:\n${UNIVERSAL_SOCIAL_BIOS.linkedin.headline}\n\nABOUT:\n${UNIVERSAL_SOCIAL_BIOS.linkedin.about}`,
                      "bio_li"
                    )
                  }
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-800 font-bold flex items-center gap-1 cursor-pointer"
                >
                  {copiedKey === "bio_li" ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                  <span>{copiedKey === "bio_li" ? "Copied!" : "Copy"}</span>
                </button>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] space-y-2 text-slate-800">
                <p><strong>Headline:</strong> {UNIVERSAL_SOCIAL_BIOS.linkedin.headline}</p>
                <div className="border-t border-slate-200 pt-2 whitespace-pre-wrap leading-relaxed">
                  {UNIVERSAL_SOCIAL_BIOS.linkedin.about}
                </div>
              </div>
            </div>

            {/* 3. Instagram Bio */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-900 flex items-center gap-2">
                  <span>📸 Instagram Profile Bio</span>
                </h4>
                <button
                  onClick={() => copyToClipboard(UNIVERSAL_SOCIAL_BIOS.instagram.bio, "bio_ig")}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-800 font-bold flex items-center gap-1 cursor-pointer"
                >
                  {copiedKey === "bio_ig" ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                  <span>{copiedKey === "bio_ig" ? "Copied!" : "Copy"}</span>
                </button>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] whitespace-pre-wrap text-slate-800 leading-relaxed font-mono">
                {UNIVERSAL_SOCIAL_BIOS.instagram.bio}
              </div>
            </div>

            {/* 4. YouTube Channel Description */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-900 flex items-center gap-2">
                  <PlaySquare size={16} className="text-red-600" />
                  <span>YouTube Channel Description</span>
                </h4>
                <button
                  onClick={() => copyToClipboard(UNIVERSAL_SOCIAL_BIOS.youtube.about, "bio_yt")}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-800 font-bold flex items-center gap-1 cursor-pointer"
                >
                  {copiedKey === "bio_yt" ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                  <span>{copiedKey === "bio_yt" ? "Copied!" : "Copy"}</span>
                </button>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] whitespace-pre-wrap text-slate-800 leading-relaxed">
                {UNIVERSAL_SOCIAL_BIOS.youtube.about}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: 30-DAY LAUNCHPAD TRACKER */}
      {activeSection === "launchpad" && (
        <div className="p-6 lg:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">First 30-Day Social Alignment & Authority Launchpad</h3>
              <p className="text-xs text-slate-500">
                Execute these high-leverage milestones to establish market presence and drive daily consultations.
              </p>
            </div>
            <span className="text-xs font-bold bg-amber-100 text-amber-900 px-3 py-1 rounded-full border border-amber-200">
              {Object.values(launchMilestones).filter(Boolean).length} of 7 Completed
            </span>
          </div>

          <div className="space-y-3">
            {[
              {
                id: "m1",
                day: "Day 1–3",
                title: "Update LinkedIn Profile (Headline, About, Licenses, Skills)",
                desc: "Set title to 'Strategic Financial Advisor | PE', add FL License #G328926, and link AB Global Consulting.",
              },
              {
                id: "m2",
                day: "Day 4–7",
                title: "Synchronize Visual Banners & Branding",
                desc: "Upload matching navy/gold banners across LinkedIn, Facebook page, and YouTube using AB Global logo and tagline.",
              },
              {
                id: "m3",
                day: "Day 8–10",
                title: "Pin abglco.com and Introductory Video in Featured",
                desc: "Add direct links to the 7 interactive mini-apps and protection checklist in the LinkedIn Featured portfolio.",
              },
              {
                id: "m4",
                day: "Day 11–14",
                title: "Publish Official Mission Announcement Post",
                desc: "Introduce AB Global Consulting's engineering-grade clarity and client protection philosophy.",
              },
              {
                id: "m5",
                day: "Day 15–21",
                title: "Begin 2x Weekly Content Publishing Routine",
                desc: "Publish 1 Protection/Health topic and 1 Retirement/Legacy topic every week using the AI Studio generators.",
              },
              {
                id: "m6",
                day: "Day 22–25",
                title: "Promote Protection Planning Checklist Lead Magnet",
                desc: "Drive inbound downloads for the 4-page client audit PDF with direct links to the D.I.M.E. calculator.",
              },
              {
                id: "m7",
                day: "Day 26–30",
                title: "Audit Single Unified Call to Action",
                desc: "Ensure every post, bio, and video description directs traffic to 'Schedule a consultation at abglco.com'.",
              },
            ].map((m) => {
              const isDone = launchMilestones[m.id];
              return (
                <div
                  key={m.id}
                  onClick={() => toggleMilestone(m.id)}
                  className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 cursor-pointer ${
                    isDone
                      ? "bg-emerald-50/70 border-emerald-200/80"
                      : "bg-white border-slate-200 hover:border-slate-300 shadow-sm"
                  }`}
                >
                  <div
                    className={`h-6 w-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isDone ? "bg-emerald-600 text-white" : "border-2 border-slate-300 bg-white"
                    }`}
                  >
                    {isDone && <Check size={14} />}
                  </div>

                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-slate-100 rounded text-slate-700">
                        {m.day}
                      </span>
                      <strong className={`text-xs ${isDone ? "line-through text-slate-500" : "text-slate-900"}`}>
                        {m.title}
                      </strong>
                    </div>
                    <p className="text-xs text-slate-600">{m.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
