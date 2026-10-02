"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

import { dictionary } from "@/lib/i18n/translations";

export type Language = "en" | "es";

interface LanguageContextType {
  lang: Language;
  language: Language;
  setLang: (lang: Language) => void;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");

  useEffect(() => {
    // Check localStorage or URL query param
    const savedLang = localStorage.getItem("ab_lang") as Language;
    const urlParams = new URLSearchParams(window.location.search);
    const queryLang = urlParams.get("lang") as Language;

    if (queryLang === "es" || queryLang === "en") {
      setLangState(queryLang);
      localStorage.setItem("ab_lang", queryLang);
    } else if (savedLang === "es" || savedLang === "en") {
      setLangState(savedLang);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("ab_lang", newLang);
    // update URL search param smoothly without full page reload
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("lang", newLang);
      window.history.replaceState({}, "", url.toString());
      // Also notify any listening components or custom events
      window.dispatchEvent(new CustomEvent("ab_lang_changed", { detail: { lang: newLang } }));
    }
  };

  const t = (key: string): string => {
    const langDict = (dictionary as Record<string, Record<string, string>>)[lang];
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    const enDict = dictionary.en as Record<string, string>;
    return enDict[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, language: lang, setLang, setLanguage: setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Return safe fallback for server or unmounted components
    return {
      lang: "en" as Language,
      language: "en" as Language,
      setLang: () => {},
      setLanguage: () => {},
      t: (k: string) => k,
    };
  }
  return context;
}
