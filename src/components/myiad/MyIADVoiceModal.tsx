"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Mic,
  MicOff,
  Volume2,
  X,
  Sparkles,
  Radio,
  Calendar,
  Phone,
  Lock,
  AlertCircle,
  Square,
} from "lucide-react";
import { useMyIADVoiceAgent } from "@/lib/hooks/useMyIADVoiceAgent";
import type { AssessmentScenario } from "@/lib/myiad-ai-copilot";

interface MyIADVoiceModalProps {
  initialScenario?: AssessmentScenario;
  onScheduleClick?: () => void;
}

export function MyIADVoiceModal({
  initialScenario,
  onScheduleClick,
}: MyIADVoiceModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scenario, setScenario] = useState<AssessmentScenario | undefined>(
    initialScenario
  );

  const {
    status,
    errorMessage,
    conversation,
    audioVolume,
    startListening,
    stopListening,
    interrupt,
    stopSession,
  } = useMyIADVoiceAgent(scenario);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Listen for global open voice modal event
  useEffect(() => {
    const handleOpenVoice = (e: Event) => {
      const customEvent = e as CustomEvent<{ scenario?: AssessmentScenario }>;
      setIsOpen(true);
      if (customEvent.detail?.scenario) {
        setScenario(customEvent.detail.scenario);
      }
    };

    window.addEventListener("open-myiad-voice" as any, handleOpenVoice);
    return () => {
      window.removeEventListener("open-myiad-voice" as any, handleOpenVoice);
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [conversation, status]);

  const handleClose = () => {
    stopSession();
    setIsOpen(false);
  };

  const handleToggleMic = () => {
    if (status === "listening") {
      stopListening();
    } else {
      startListening();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#071324] border border-slate-700/80 rounded-3xl shadow-2xl shadow-blue-950/60 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#0B1F3A] border-b border-slate-700/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#14B8A6] flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-white tracking-tight">
                  My<span className="text-[#14B8A6]">IAD</span> Voice Agent
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Deepgram AI
                </span>
              </div>
              <p className="text-xs text-slate-300">
                50-State Network &bull; Hands-Free Conversational Diagnostic
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close voice consultation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Central Visualizer Area */}
        <div className="p-8 flex flex-col items-center justify-center bg-gradient-to-b from-[#0B1F3A]/60 to-[#071324] shrink-0 border-b border-slate-800">
          {/* Animated Audio-Reactive Orb */}
          <div className="relative flex items-center justify-center">
            {/* Outer pulse ring */}
            <div
              className="absolute rounded-full bg-[#14B8A6]/20 transition-all duration-75"
              style={{
                width: `${120 + audioVolume * 1.2}px`,
                height: `${120 + audioVolume * 1.2}px`,
              }}
            />
            {/* Second pulse ring */}
            <div
              className="absolute rounded-full bg-[#2563EB]/25 transition-all duration-100"
              style={{
                width: `${100 + audioVolume * 0.8}px`,
                height: `${100 + audioVolume * 0.8}px`,
              }}
            />

            {/* Core Mic / Orb Button */}
            <button
              type="button"
              onClick={handleToggleMic}
              disabled={status === "thinking"}
              className={`relative z-10 w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-2xl transition-all cursor-pointer ${
                status === "listening"
                  ? "bg-red-600 hover:bg-red-700 text-white scale-105 shadow-red-600/40"
                  : status === "speaking"
                  ? "bg-gradient-to-tr from-[#2563EB] to-[#14B8A6] text-white shadow-teal-500/40 animate-pulse"
                  : status === "thinking"
                  ? "bg-slate-800 text-slate-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-white hover:scale-105 shadow-blue-600/40"
              }`}
            >
              {status === "listening" ? (
                <>
                  <MicOff className="w-8 h-8" />
                  <span className="text-[10px] font-bold uppercase mt-1">Tap to Stop</span>
                </>
              ) : status === "speaking" ? (
                <>
                  <Volume2 className="w-8 h-8 animate-bounce" />
                  <span className="text-[10px] font-bold uppercase mt-1">Speaking...</span>
                </>
              ) : status === "thinking" ? (
                <>
                  <Sparkles className="w-8 h-8 animate-spin" />
                  <span className="text-[10px] font-bold uppercase mt-1">Thinking...</span>
                </>
              ) : (
                <>
                  <Mic className="w-8 h-8" />
                  <span className="text-[10px] font-bold uppercase mt-1">Tap to Speak</span>
                </>
              )}
            </button>
          </div>

          {/* Status Badge */}
          <div className="mt-5 text-center">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${
                status === "listening"
                  ? "bg-red-500/20 text-red-300 border border-red-500/30"
                  : status === "speaking"
                  ? "bg-teal-500/20 text-teal-300 border border-teal-500/30"
                  : status === "thinking"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  : "bg-slate-800 text-slate-300 border border-slate-700"
              }`}
            >
              {status === "listening"
                ? "🎙️ Listening to you..."
                : status === "speaking"
                ? "🔊 Deepgram Aura Voice Speaking"
                : status === "thinking"
                ? "⚡ Synthesizing Insurance Solution..."
                : "Ready &bull; Tap Mic to Begin"}
            </span>

            {/* Barge-in Stop Button when speaking */}
            {status === "speaking" && (
              <button
                type="button"
                onClick={interrupt}
                className="mt-2.5 mx-auto flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
              >
                <Square className="w-3 h-3 fill-current text-amber-400" />
                <span>Interrupt Audio (Barge-In)</span>
              </button>
            )}
          </div>
        </div>

        {/* Live Conversation Transcript */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[140px] max-h-[220px] text-xs bg-slate-900/60"
        >
          {conversation.length === 0 ? (
            <div className="text-center py-6 text-slate-400 space-y-1">
              <p className="font-semibold text-slate-300">
                &ldquo;Speak naturally about your insurance scenario...&rdquo;
              </p>
              <p className="text-[11px] text-slate-500">
                Try asking: &ldquo;How does the 0% floor protect against market drops?&rdquo;
              </p>
            </div>
          ) : (
            conversation.map((msg) => (
              <div
                key={msg.id}
                className={`p-3 rounded-2xl ${
                  msg.role === "user"
                    ? "bg-[#2563EB]/30 border border-blue-500/30 text-white ml-auto max-w-[85%]"
                    : "bg-slate-800/80 border border-slate-700 text-slate-200 mr-auto max-w-[85%]"
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1 text-[10px] font-bold text-slate-400 uppercase">
                  {msg.role === "user" ? "You" : "MyIAD Advisory Agent"}
                </div>
                <div className="whitespace-pre-line leading-relaxed">{msg.text}</div>
              </div>
            ))
          )}
        </div>

        {/* Error message banner */}
        {errorMessage && (
          <div className="p-3 bg-red-950/80 border-t border-red-800 text-xs text-red-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Action Bottom Bar */}
        <div className="p-4 bg-[#0B1F3A] border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <Lock className="w-3.5 h-3.5 text-[#14B8A6]" />
            <span>Encrypted WebRTC Audio &bull; FINRA 2330 Guardrails</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                handleClose();
                if (onScheduleClick) {
                  onScheduleClick();
                } else {
                  window.open(
                    "https://calendly.com/abglobalconsulting/15-min-consultation-abglobalceo",
                    "_blank",
                    "noopener,noreferrer"
                  );
                }
              }}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#14B8A6] hover:opacity-95 text-white font-bold text-xs shadow cursor-pointer transition-all"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book 15-Min Review</span>
            </button>
            <a
              href="tel:18888873585"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-[#14B8A6] transition-colors"
              title="Call Toll-Free"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
