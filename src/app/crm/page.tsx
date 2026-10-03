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
    console.warn("[CRM Page] Database query notice:", (error as any)?.message);
  }

  return <FunctionalCrmClient initialLeads={leads} />;
}

