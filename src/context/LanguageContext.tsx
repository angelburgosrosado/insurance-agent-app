"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

import { dictionary } from "@/lib/i18n/translations";
import { myiadDict } from "@/lib/i18n/myiad-dict";

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
    // 1. Check MyIAD dictionary for current language
    const myiadLang = (myiadDict as Record<string, Record<string, string>>)[lang];
    if (myiadLang && myiadLang[key]) {
      return myiadLang[key];
    }
    // 2. Check general dictionary for current language
    const langDict = (dictionary as Record<string, Record<string, string>>)[lang];
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    // 3. Fallback to English MyIAD dictionary
    const myiadEn = myiadDict.en as Record<string, string>;
    if (myiadEn && myiadEn[key]) {
      return myiadEn[key];
    }
    // 4. Fallback to English general dictionary
    const enDict = dictionary.en as Record<string, string>;
    if (enDict && enDict[key]) {
      return enDict[key];
    }
    return key;
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
      t: (k: string) => {
        const myiadVal = (myiadDict.en as Record<string, string>)[k];
        if (myiadVal) return myiadVal;
        const dictVal = (dictionary.en as Record<string, string>)[k];
        if (dictVal) return dictVal;
        return k;
      },
    };
  }
  return context;
}
