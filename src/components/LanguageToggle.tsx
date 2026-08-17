"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLanguage();

  return (
    <div className={`inline-flex items-center p-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-inner ${className}`}>
      <button
        onClick={() => setLang("en")}
        type="button"
        className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
          lang === "en"
            ? "bg-white text-slate-900 shadow-md scale-105"
            : "text-white/80 hover:text-white"
        }`}
        title="Switch to English"
      >
        <span>🇺🇸</span>
        <span>English</span>
      </button>

      <button
        onClick={() => setLang("es")}
        type="button"
        className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
          lang === "es"
            ? "bg-secondary text-white shadow-md scale-105"
            : "text-white/80 hover:text-white"
        }`}
        title="Cambiar a Español (Puerto Rico / Florida)"
      >
        <span>🇵🇷</span>
        <span>Español</span>
      </button>
    </div>
  );
}
