export interface TerritoryMatch {
  territory: "central_fl" | "south_fl" | "north_fl" | "puerto_rico" | "out_of_state";
  specialization: "military" | "iul" | "annuity" | "final_expense" | "general";
  suggestedAgentEmail?: string;
  notes: string;
}

/**
 * Detects territory from phone area code or location cues
 */
export function detectTerritoryFromPhone(phone?: string): { territory: string; label: string; flag: string } {
  if (!phone) {
    return { territory: "out_of_state", label: "National / Out of State", flag: "🇺🇸" };
  }

  const cleanPhone = phone.replace(/\D/g, "");
  const areaCode = cleanPhone.length >= 10 ? cleanPhone.slice(-10, -7) : "";

  // Puerto Rico
  if (["787", "939"].includes(areaCode)) {
    return { territory: "puerto_rico", label: "Puerto Rico", flag: "🇵🇷" };
  }

  // Central Florida (Orlando, Daytona, Sanford, Brevard, Tampa)
  if (["407", "321", "386", "813", "727", "863", "352"].includes(areaCode)) {
    return { territory: "central_fl", label: "Central Florida (Orlando/Tampa)", flag: "🌴" };
  }

  // South Florida (Miami, Fort Lauderdale, Palm Beach)
  if (["305", "786", "954", "754", "561"].includes(areaCode)) {
    return { territory: "south_fl", label: "South Florida (Miami/Ft Lauderdale)", flag: "🏖️" };
  }

  // North Florida (Jacksonville, Tallahassee, Pensacola)
  if (["904", "850"].includes(areaCode)) {
    return { territory: "north_fl", label: "North Florida (Jacksonville)", flag: "☀️" };
  }

  return { territory: "out_of_state", label: "National / Out of State", flag: "🇺🇸" };
}

/**
 * Detects product specialization from requested service name
 */
export function detectSpecialization(service?: string, message?: string): { specialization: string; label: string; icon: string } {
  const combined = `${service || ""} ${message || ""}`.toLowerCase();

  if (combined.includes("military") || combined.includes("sgli") || combined.includes("vgli") || combined.includes("sbp") || combined.includes("veteran") || combined.includes("militar")) {
    return { specialization: "military", label: "Military & Veteran Wealth Shield", icon: "🎖️" };
  }
  if (combined.includes("annuity") || combined.includes("401k") || combined.includes("ira") || combined.includes("anualidad") || combined.includes("rollover")) {
    return { specialization: "annuity", label: "401(k) / IRA Annuity Rollover", icon: "📈" };
  }
  if (combined.includes("iul") || combined.includes("universal") || combined.includes("index") || combined.includes("7702")) {
    return { specialization: "iul", label: "Florida IUL (0% Floor / IRS 7702)", icon: "📊" };
  }
  if (combined.includes("funeral") || combined.includes("everest") || combined.includes("final") || combined.includes("gasto final")) {
    return { specialization: "final_expense", label: "Everest Funeral Concierge", icon: "🕊️" };
  }

  return { specialization: "general", label: "General Insurance Planning", icon: "🛡️" };
}
