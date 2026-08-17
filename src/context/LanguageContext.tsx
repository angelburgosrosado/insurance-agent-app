"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "es";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
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
    // Optional: update URL search param smoothly without full page reload
    const url = new URL(window.location.href);
    url.searchParams.set("lang", newLang);
    window.history.replaceState({}, "", url.toString());
  };

  const t = (key: string): string => {
    // Will be backed by dictionary
    return key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
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
      setLang: () => {},
      t: (k: string) => k,
    };
  }
  return context;
}
