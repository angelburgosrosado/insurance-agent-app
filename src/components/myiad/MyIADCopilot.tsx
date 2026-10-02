"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Sparkles,
  X,
  Send,
  ArrowRight,
  RefreshCw,
  Lock,
  Mic,
} from "lucide-react";
import type { CopilotMessage, AssessmentScenario } from "@/lib/myiad-ai-copilot";
import { useLanguage } from "@/context/LanguageContext";

interface MyIADCopilotProps {
  initialScenario?: AssessmentScenario;
  onScheduleClick?: () => void;
  onRequestQuoteClick?: () => void;
}

export function MyIADCopilot({
  initialScenario,
  onScheduleClick,
  onRequestQuoteClick,
}: MyIADCopilotProps) {
  const { lang: globalLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<"en" | "es">(globalLang || "en");
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeScenario, setActiveScenario] = useState<AssessmentScenario | undefined>(
    initialScenario
  );

  useEffect(() => {
    if (globalLang) {
      setLang(globalLang);
    }
  }, [globalLang]);

  const initialWelcome =
    lang === "es"
      ? `### 👋 Bienvenido a MyIAD AI Copilot

Soy su asistente de asesoría e ingeniería de casos para **MyIAD National Insurance Solutions**.

Puedo responder con precisión sobre:
- **Piso del 0% en IUL:** Cómo proteger su capital sin riesgo de caída bursátil.
- **Beneficios en Vida:** Aceleración por cáncer, infarto o incapacidad crónica.
- **Distribuciones Libres de Impuestos:** Estrategia No-MEC bajo **IRC §7702**.
- **Anualidades con Idoneidad FINRA 2330:** Ingresos garantizados de por vida.

*¿Qué escenario patrimonial le gustaría explorar hoy?*`
      : `### 👋 Welcome to MyIAD AI Copilot

I am your case design and advisory intelligence assistant for **MyIAD National Insurance Solutions**.

I can provide precision analysis on:
- **0% Floor Market Shield:** How IUL eliminates portfolio downside drag.
- **Living Benefits:** Accelerating death benefits tax-free for critical/chronic illness.
- **IRC §7702 Tax-Free Income:** Accessing policy loans without IRS early penalties.
- **FINRA Rule 2330 Suitability:** Guaranteed lifetime income annuities.

*What protection scenario would you like to model today?*`;

  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      id: "msg_welcome",
      role: "assistant",
      content: initialWelcome,
      timestamp: new Date().toISOString(),
      suggestedPrompts:
        lang === "es"
          ? [
              "¿Cómo funciona el piso del 0% en caídas del mercado?",
              "¿Cómo retiro dinero libre de impuestos bajo IRC §7702?",
              "¿Qué enfermedades cubren los beneficios en vida?",
            ]
          : [
              "How does the 0% floor protect against market crashes?",
              "How do tax-free policy loans work under IRC §7702?",
              "What illnesses qualify for accelerated living benefits?",
            ],
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = useCallback(
    async (textToSend: string, scenarioContext?: AssessmentScenario) => {
      const trimmed = textToSend.trim();
      if (!trimmed || isLoading) return;

      const userMsg: CopilotMessage = {
        id: `msg_user_${Date.now()}`,
        role: "user",
        content: trimmed,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsLoading(true);

      try {
        const res = await fetch("/api/myiad/copilot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: trimmed,
            history: messages.slice(-6),
            scenario: scenarioContext || activeScenario,
            lang,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data?.error || "Error contacting copilot engine");
        }

        const botMsg: CopilotMessage = {
          id: `msg_bot_${Date.now()}`,
          role: "assistant",
          content: data.answer,
          timestamp: new Date().toISOString(),
          suggestedPrompts: data.suggestedPrompts || [],
          actionCta: data.actionCta,
        };

        setMessages((prev) => [...prev, botMsg]);
      } catch (err: unknown) {
        console.error("[MyIAD Copilot] Message transmission error:", err);
        const fallbackContent =
          lang === "es"
            ? "⚠️ No se pudo conectar con el motor de IA en este momento. Por favor llame a nuestra línea sin costo al **(888) 887-3585** para hablar directamente con un asesor con licencia."
            : "⚠️ Unable to connect to the advisory engine. Please call our toll-free specialist desk at **(888) 887-3585** for immediate assistance.";

        setMessages((prev) => [
          ...prev,
          {
            id: `msg_err_${Date.now()}`,
            role: "assistant",
            content: fallbackContent,
            timestamp: new Date().toISOString(),
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, messages, activeScenario, lang]
  );

  // Listen for custom global events to trigger copilot from anywhere on page
  useEffect(() => {
    const handleOpenCopilot = (e: Event) => {
      const customEvent = e as CustomEvent<{ query?: string; scenario?: AssessmentScenario }>;
      setIsOpen(true);
      if (customEvent.detail?.scenario) {
        setActiveScenario(customEvent.detail.scenario);
      }
      if (customEvent.detail?.query) {
        void sendMessage(customEvent.detail.query, customEvent.detail.scenario);
      }
    };

    window.addEventListener("open-myiad-copilot" as any, handleOpenCopilot);
    return () => {
      window.removeEventListener("open-myiad-copilot" as any, handleOpenCopilot);
    };
  }, [sendMessage]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleActionClick = (action: string) => {
    if (action === "schedule_call") {
      if (onScheduleClick) {
        onScheduleClick();
      } else {
        window.open(
          "https://calendly.com/abglobalconsulting/15-min-consultation-abglobalceo",
          "_blank",
          "noopener,noreferrer"
        );
      }
    } else if (action === "open_assessment") {
      setIsOpen(false);
      const el = document.getElementById("ai-assessment");
      el?.scrollIntoView({ behavior: "smooth" });
    } else if (action === "request_quote") {
      if (onRequestQuoteClick) {
        onRequestQuoteClick();
      } else {
        setIsOpen(false);
        const el = document.getElementById("lead-intake");
        el?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handlePromptClick = (prompt: string) => {
    sendMessage(prompt);
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-40 print:hidden">
        {!isOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-3 px-5 py-3.5 rounded-full bg-gradient-to-r from-[#0B1F3A] to-[#1E3A8A] text-white font-bold text-xs sm:text-sm shadow-2xl border-2 border-[#14B8A6]/60 hover:border-[#14B8A6] hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-xl"
            aria-label="Open MyIAD AI Copilot"
          >
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-[#2563EB] to-[#14B8A6] text-white shadow-md">
              <Sparkles className="w-4 h-4 animate-spin-slow" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#0B1F3A] animate-ping" />
            </div>
            <div className="text-left">
              <span className="block leading-none text-white font-black tracking-tight">
                My<span className="text-[#14B8A6]">IAD</span> Copilot
              </span>
              <span className="block text-[10px] text-slate-300 font-medium mt-0.5">
                AI Advisory Intelligence
              </span>
            </div>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-[#14B8A6]/20 text-[#14B8A6] text-[10px] uppercase font-bold border border-[#14B8A6]/40">
              Live
            </span>
          </button>
        )}
      </div>

      {/* Floating Modal / Drawer */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[94vw] sm:w-[440px] max-h-[85vh] h-[650px] flex flex-col bg-[#071324]/95 backdrop-blur-2xl border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200">
          {/* Header */}
          <div className="px-5 py-4 bg-[#0B1F3A] border-b border-slate-700/80 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#14B8A6] flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-black text-white tracking-tight">
                    My<span className="text-[#14B8A6]">IAD</span> AI Copilot
                  </h3>
                  <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Active
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Case Design &bullet; 50-State Network &bullet; FINRA 2330
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Language Switcher */}
              <button
                type="button"
                onClick={() => setLang(lang === "en" ? "es" : "en")}
                className="px-2 py-1 rounded-md text-[10px] font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-600 transition-colors"
                title="Switch Language"
              >
                {lang === "en" ? "Español" : "English"}
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Close Copilot"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Active Context Banner if scenario exists */}
          {activeScenario && (
            <div className="px-4 py-2 bg-[#2563EB]/15 border-b border-blue-500/20 flex items-center justify-between text-[11px] text-blue-200 shrink-0">
              <span className="truncate">
                📊 <strong>Active Case:</strong> Age {activeScenario.age} &bull; $
                {activeScenario.annualIncome.toLocaleString()}/yr &bull; $
                {(activeScenario.calculatedCoverageNeed || 500000).toLocaleString()} Target Need
              </span>
              <button
                type="button"
                onClick={() => setActiveScenario(undefined)}
                className="text-blue-300 hover:text-white underline text-[10px] ml-2 shrink-0"
              >
                Clear
              </button>
            </div>
          )}

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs sm:text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[88%] p-3.5 rounded-2xl ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-[#2563EB] to-blue-700 text-white rounded-br-xs shadow-md"
                      : "bg-slate-900/90 text-slate-200 border border-slate-800 rounded-bl-xs shadow-md prose-invert leading-relaxed"
                  }`}
                >
                  <div className="space-y-2 whitespace-pre-line break-words text-xs sm:text-sm">
                    {msg.content}
                  </div>

                  {/* Action CTA Button inside message */}
                  {msg.actionCta && (
                    <div className="mt-3 pt-3 border-t border-slate-800">
                      <button
                        type="button"
                        onClick={() => handleActionClick(msg.actionCta!.action)}
                        className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#14B8A6] hover:opacity-95 text-white font-bold text-xs shadow transition-all cursor-pointer"
                      >
                        <span>{msg.actionCta.label}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Suggested Follow-up Prompt Chips */}
                {msg.suggestedPrompts && msg.suggestedPrompts.length > 0 && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5 max-w-[95%]">
                    {msg.suggestedPrompts.map((prompt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handlePromptClick(prompt)}
                        className="text-left px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-[#2563EB]/30 border border-slate-700/80 text-[11px] text-slate-300 hover:text-white transition-all cursor-pointer"
                      >
                        &rarr; {prompt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 p-3 bg-slate-900/80 rounded-2xl border border-slate-800 text-slate-400 text-xs w-fit">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#14B8A6]" />
                <span>MyIAD Advisory Engine synthesizing case scenario...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-[#0B1F3A] border-t border-slate-800 shrink-0 space-y-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  lang === "es"
                    ? "Pregunte sobre IUL, piso 0%, beneficios en vida o anualidades..."
                    : "Ask about 0% floor IUL, tax-free loans, or FINRA 2330..."
                }
                className="flex-1 bg-slate-900/90 text-white placeholder-slate-500 text-xs sm:text-sm rounded-xl px-3.5 py-2.5 border border-slate-700 focus:outline-none focus:border-[#14B8A6] transition-colors"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => {
                  window.dispatchEvent(
                    new CustomEvent("open-myiad-voice", {
                      detail: { scenario: activeScenario },
                    })
                  );
                }}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-[#14B8A6]/20 border border-slate-700 hover:border-[#14B8A6]/50 text-slate-300 hover:text-[#14B8A6] transition-colors shrink-0 cursor-pointer shadow"
                title="Switch to Deepgram Voice Agent"
              >
                <Mic className="w-4 h-4 text-[#14B8A6]" />
              </button>
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-2.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#14B8A6] hover:opacity-95 text-white disabled:opacity-40 transition-opacity shrink-0 cursor-pointer shadow"
                aria-label="Send query"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="flex items-center justify-between text-[10px] text-slate-400 px-1">
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3 text-[#14B8A6]" />
                Educational case illustration &bull; SEC & FINRA Rule 2330 Guardrails
              </span>
              <a
                href="tel:18888873585"
                className="text-[#14B8A6] font-bold hover:underline"
              >
                (888) 887-3585
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
