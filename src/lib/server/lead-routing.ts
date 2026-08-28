export interface TerritoryMatch {
  territory: "central_fl" | "south_fl" | "north_fl" | "puerto_rico" | "out_of_state";
  specialization: "military" | "iul" | "annuity" | "final_expense" | "general";
  suggestedAgentEmail?: string;
  notes: string;
}

/**
 * Detects territory from phone area code or location cues
 */
export function detectTerritoryFromPhone(phone: string): TerritoryMatch["territory"] {
  const cleanPhone = phone.replace(/\D/g, "");
  const areaCode = cleanPhone.length >= 10 ? cleanPhone.slice(-10, -7) : "";

  // Puerto Rico
  if (["787", "939"].includes(areaCode)) {
    return "puerto_rico";
  }

  // Central Florida (Orlando, Daytona, Sanford, Brevard, Tampa)
  if (["407", "321", "386", "813", "727", "863", "352"].includes(areaCode)) {
    return "central_fl";
  }

  // South Florida (Miami, Fort Lauderdale, Palm Beach)
  if (["305", "786", "954", "754", "561"].includes(areaCode)) {
    return "south_fl";
  }

  // North Florida (Jacksonville, Tallahassee, Pensacola)
  if (["904", "850"].includes(areaCode)) {
    return "north_fl";
  }

  return "out_of_state";
}

/**
 * Detects product specialization from requested service name
 */
export function detectSpecialization(service: string, message?: string): TerritoryMatch["specialization"] {
  const combined = `${service} ${message || ""}`.toLowerCase();

  if (combined.includes("military") || combined.includes("sgli") || combined.includes("vgli") || combined.includes("sbp") || combined.includes("veteran") || combined.includes("militar")) {
    return "military";
  }
  if (combined.includes("annuity") || combined.includes("401k") || combined.includes("ira") || combined.includes("anualidad") || combined.includes("rollover")) {
    return "annuity";
  }
  if (combined.includes("iul") || combined.includes("universal") || combined.includes("index") || combined.includes("7702")) {
    return "iul";
  }
  if (combined.includes("funeral") || combined.includes("everest") || combined.includes("final") || combined.includes("gasto final")) {
    return "final_expense";
  }

  return "general";
}

/**
 * Evaluates full routing decision for a new lead
 */
export function evaluateLeadRouting(lead: {
  phone: string;
  service: string;
  message?: string;
}): TerritoryMatch {
  const territory = detectTerritoryFromPhone(lead.phone);
  const specialization = detectSpecialization(lead.service, lead.message);

  const notes = `Territory: ${territory.replace("_", " ").toUpperCase()} • Specialization: ${specialization.toUpperCase()}`;

  // Default principal advisor
  const defaultAgent = "angelburgosrosado@gmail.com";

  return {
    territory,
    specialization,
    suggestedAgentEmail: defaultAgent,
    notes,
  };
}
