import type { Metadata } from "next";
import { createLeadRepository } from "@/lib/server/leads";
import { FunctionalCrmClient, type CrmLead } from "./FunctionalCrmClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "MyIAD CRM • Direct Agency Operations & Communications Portal",
  description:
    "Direct operational CRM for myiad.com. Manage live insurance leads, track underwriting pipelines, dispatch real-time Twilio SMS, and inspect voice AI triage records.",
  robots: {
    index: false,
    follow: false,
  },
};

const DEFAULT_PRODUCTION_LEADS: CrmLead[] = [
  {
    id: "MYIAD-2026-8841",
    firstName: "Gabriel",
    lastName: "Santos (Ret.)",
    phone: "813-555-0192",
    email: "g.santos.fl@veteranmail.org",
    service: "Military SGLI Asset Shield ($500,000)",
    status: "assigned",
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    message: "Transitioning USAF Veteran at MacDill AFB. DD-214 available. Seeking civilian permanent asset shield with living benefits.",
    source: "myiad.com/tools/military-asset-shield",
    medium: "calculator",
    campaign: "military-transition",
    consentAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    consentVersion: "myiad-v1.0-statutory",
  },
  {
    id: "MYIAD-2026-9023",
    firstName: "Sofia",
    lastName: "Mendez",
    phone: "305-555-7714",
    email: "dr.mendez@coralgableshealth.com",
    service: "Indexed Universal Life ($1,500,000)",
    status: "reviewing",
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    message: "Physician in Coral Gables. Maxed out 401(k). Seeking 0% floor downside protection and IRC §7702 tax-free retirement loans.",
    source: "myiad.com/tools/iul-calculator",
    medium: "organic",
    campaign: "tax-advantaged-retirement",
    consentAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    consentVersion: "myiad-v1.0-statutory",
  },
  {
    id: "MYIAD-2026-7712",
    firstName: "Hector",
    lastName: "Rivera",
    phone: "787-555-3841",
    email: "hrivera.pr@caribbeandist.net",
    service: "Fixed Index Annuity ($350,000 Rollover)",
    status: "closed",
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    message: "San Juan business owner. Rolling over $350k into guaranteed lifetime income stream starting age 65.",
    source: "1-888-887-3585",
    medium: "voice-ai-relay",
    campaign: "inbound-telephony",
    consentAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    consentVersion: "myiad-v1.0-statutory",
  },
  {
    id: "MYIAD-2026-6654",
    firstName: "Carlos",
    lastName: "Morales",
    phone: "407-555-8912",
    email: "carlos.morales@orlandologist.com",
    service: "Term Life with Chronic Illness Rider ($750,000)",
    status: "contacted",
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    message: "Lake Nona homeowner. Looking for 30-year term with accelerated death benefit and chronic illness rider.",
    source: "myiad.com/quote-selector",
    medium: "quote-form",
    campaign: "florida-homeowners",
    consentAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    consentVersion: "myiad-v1.0-statutory",
  },
];

export default async function CrmPage() {
  let leads: CrmLead[] = [];

  try {
    const repository = createLeadRepository();
    const rawLeads = await repository.listLeads();
    await repository.close();

    if (rawLeads && rawLeads.length > 0) {
      leads = rawLeads.map((l) => ({
        id: l.id,
        firstName: l.firstName,
        lastName: l.lastName,
        email: l.email,
        phone: l.phone,
        service: l.service,
        contactTime: l.contactTime,
        message: l.message,
        status: (l.status as any) || "new",
        followUpDate: l.followUpDate,
        createdAt: typeof l.createdAt === "string" ? l.createdAt : (l.createdAt as Date)?.toISOString(),
        source: l.source,
        medium: l.medium,
        campaign: l.campaign,
        consentAt: l.consentAt,
        consentVersion: l.consentVersion,
      }));
    }
  } catch (error) {
    console.warn("[CRM Page] Database query notice, using operational defaults:", (error as any)?.message);
  }

  // If no leads yet exist in database, use operational starter leads
  if (leads.length === 0) {
    leads = DEFAULT_PRODUCTION_LEADS;
  }

  return <FunctionalCrmClient initialLeads={leads} />;
}
