"use client";

import React, { useState, useCallback } from "react";
import { Sparkles, Video, Share2, Megaphone, Mail, Layers, Copy, Check, ExternalLink, ShieldCheck, RefreshCw } from "lucide-react";
import { GeneratedCampaignPack, CampaignRequest } from "@/lib/server/ai-content-generator";

export function SocialContentStudio() {
  const [product, setProduct] = useState<CampaignRequest["product"]>("military");
  const [persona, setPersona] = useState<CampaignRequest["persona"]>("veterans");
  const [trigger, setTrigger] = useState<CampaignRequest["trigger"]>("military_transition");
  const [tone, setTone] = useState<CampaignRequest["tone"]>("analytical");
  const [lang, setLang] = useState<"es" | "en">("es");

  const [activeTab, setActiveTab] = useState<"video" | "linkedin" | "ad" | "email" | "carousel">("video");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const [campaignData, setCampaignData] = useState<GeneratedCampaignPack | null>(null);

  const handleGenerate = useCallback(async () => {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/admin/content/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product,
          persona,
          trigger,
          tone,
          lang,
        }),
      });
      if (res.ok) {
        const json = await res.json();
        setCampaignData(json.campaignPack);
      } else {
        alert("❌ Error synthesizing AI content.");
      }
    } catch {
      alert("❌ Network error connecting to AI engine.");
    } finally {
      setIsGenerating(false);
    }
  }, [product, persona, trigger, tone, lang]);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Initial automatic load
  React.useEffect(() => {
    handleGenerate();
  }, [handleGenerate]);

  return (
    <div className="bg-white border border-[var(--line)] shadow-sm rounded-3xl overflow-hidden space-y-6">
      {/* Header Banner */}
      <div className="bg-[#001c38] text-white p-6 lg:p-8 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center">
              <Sparkles size={16} />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">AI Autonomous Campaign & Content Studio</h2>
              <p className="text-xs text-slate-300">
                Multi-channel video scripts, paid ads, LinkedIn authority copy & email broadcasts with Florida 0215 compliance.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === "es" ? "en" : "es")}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>{lang === "es" ? "🇵🇷 Idioma: Español" : "🇺🇸 Language: English"}</span>
            </button>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="px-5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl text-xs font-black uppercase tracking-wider shadow-lg transition-all flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw size={13} className={isGenerating ? "animate-spin" : ""} />
              <span>{isGenerating ? "Synthesizing..." : "✨ Regenerate AI Pack"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Strategic Configuration Controls */}
      <div className="p-6 lg:p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
          {/* 1. Product */}
          <div>
            <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1.5">
              1. Target Solution / Mini-App:
            </label>
            <select
              value={product}
              onChange={(e) => setProduct(e.target.value as any)}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 shadow-sm"
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
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 shadow-sm"
            >
              <option value="veterans">🎖️ Active Duty & Veterans</option>
              <option value="hispanic_families">🌴 Hispanic & Puerto Rico Families</option>
              <option value="business_owners">💼 Florida LLC & 1099 Business Owners</option>
              <option value="pre_retirees">📈 Pre-Retirees (Age 50–65)</option>
              <option value="young_families">🛡️ Young Families & Parents</option>
            </select>
          </div>

          {/* 3. Market Trigger */}
          <div>
            <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1.5">
              3. Strategic Market Angle:
            </label>
            <select
              value={trigger}
              onChange={(e) => setTrigger(e.target.value as any)}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 shadow-sm"
            >
              <option value="military_transition">🎖️ Military Separation & Pension Max</option>
              <option value="market_volatility">📉 Market Crashes & 0% Floor</option>
              <option value="tax_season">💸 Tax Season & IRS Sec 7702</option>
              <option value="retirement_cliff">⌛ Sequence of Returns Risk</option>
              <option value="general_planning">🛡️ Comprehensive Family Defense</option>
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
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 shadow-sm"
            >
              <option value="analytical">📊 Analytical & Math-Driven</option>
              <option value="direct_response">⚡ Urgent Direct-Response (AIDA)</option>
              <option value="executive">💼 Executive Authority</option>
              <option value="empathetic">🤝 Empathetic & Family-Centered</option>
            </select>
          </div>
        </div>

        {/* Dynamic Tracked URL Bar */}
        {campaignData && (
          <div className="flex flex-wrap items-center justify-between p-3.5 bg-amber-50/60 rounded-2xl border border-amber-200/80 text-xs gap-3">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="font-bold text-amber-900 shrink-0">📍 Auto-Tracked UTM Link:</span>
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
        )}

        {/* Multi-Channel Content Tabs */}
        {campaignData && (
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

            {/* TAB 1: Video Script */}
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

            {/* TAB 2: LinkedIn Post */}
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

            {/* TAB 3: Paid Ad */}
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

            {/* TAB 4: Email Broadcast */}
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

            {/* TAB 5: Carousel Deck */}
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
        )}
      </div>
    </div>
  );
}
