"use client";

import { createContext, useContext, useEffect } from "react";
import { usePathname } from "next/navigation";
import { dispatchEvent } from "@/lib/analytics/dispatcher";
import { createEvent, EventName } from "@/lib/analytics/events";

interface AnalyticsContextType {
  track: (name: EventName, properties?: Record<string, any>) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Automatically track page views when the route changes
  useEffect(() => {
    if (pathname) {
      dispatchEvent(createEvent("page_view", { path: pathname }));
    }
  }, [pathname]);

  const track = (name: EventName, properties?: Record<string, any>) => {
    dispatchEvent(createEvent(name, properties));
  };

  return (
    <AnalyticsContext.Provider value={{ track }}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error("useAnalytics must be used within an AnalyticsProvider");
  }
  return context;
}
