import { createServerClient } from "@supabase/ssr";
import { getSupabaseConfig } from "@/lib/supabase/env";
import { cookies } from "next/headers";
import { getPrismaClient } from "@/lib/server/db";
import { Calendar, Clock, CheckCircle } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PortalDashboard() {
  const cookieStore = await cookies();
  const config = getSupabaseConfig();
  
  if (!config.configured) {
    return <div>Configuration missing</div>;
  }

  const supabase = createServerClient(config.url, config.publishableKey, {
    cookies: {
      getAll() { return cookieStore.getAll(); },
      setAll() { /* handled by middleware/proxy */ }
    }
  });

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return <div>Unauthorized</div>;

  const prisma = getPrismaClient();
  const lead = await prisma.lead.findFirst({
    where: { email: user.email! }
  });

  return (
    <div className="space-y-8">
      <header className="border-b border-[var(--line)] pb-6">
        <h1 className="text-3xl font-bold tracking-tight">Welcome, {user.user_metadata?.full_name || lead?.firstName || "Client"}</h1>
        <p className="mt-2 text-[var(--ink-soft)]">Manage your consultation requests and profile.</p>
      </header>

      {/* Quick Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 border border-[var(--line)] shadow-sm">
          <div className="flex items-center gap-3 mb-4 text-[var(--accent-deep)]">
            <CheckCircle size={24} />
            <h2 className="font-semibold text-lg text-[var(--ink)]">Current Status</h2>
          </div>
          <p className="text-[var(--ink-soft)] text-sm mb-2">Your application status:</p>
          <span className="inline-block px-3 py-1 bg-[#eef1ef] rounded-full text-sm font-medium capitalize">
            {lead ? lead.status.replace("_", " ") : "No profile found"}
          </span>
        </div>

        <div className="bg-white p-6 border border-[var(--line)] shadow-sm md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3 text-[var(--accent-deep)]">
              <Calendar size={24} />
              <h2 className="font-semibold text-lg text-[var(--ink)]">Upcoming Consultations</h2>
            </div>
            <Link href="/portal/appointments/new" className="text-sm font-medium text-[var(--accent)] hover:underline">
              Request New
            </Link>
          </div>
          
          <div className="text-sm text-[var(--ink-soft)] bg-[#fcfdfd] border border-[var(--line)] p-4 text-center rounded-sm">
            <Clock size={20} className="mx-auto mb-2 opacity-50" />
            <p>You have no scheduled consultations at this time.</p>
          </div>
        </div>
      </div>

      {/* Information Boundary Notice */}
      <div className="bg-blue-50 border border-blue-200 p-6 text-sm text-blue-900 rounded-sm">
        <h3 className="font-bold mb-2">Important Information</h3>
        <p className="leading-relaxed">
          This portal is designed exclusively for managing your contact preferences and scheduling initial or follow-up consultations. 
          For security and privacy reasons, this system <strong>does not</strong> handle policy administration, claims processing, 
          or coverage details. Please contact your advisor directly for specific policy inquiries.
        </p>
      </div>
    </div>
  );
}
