import type { Metadata } from "next";
import { CrmShowcaseClient } from "./CrmShowcaseClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "MyIAD CRM • Lead Pipeline & Voice AI Capability Showcase",
  description:
    "Interactive enterprise demonstration of MyIAD autonomous insurance lead intake, Twilio ConversationRelay voice AI triage, 0% floor suitability analysis, and real-time advisor dispatch.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function CrmPage() {
  return <CrmShowcaseClient />;
}
