import { createServerClient } from "@supabase/ssr";
import { getSupabaseConfig } from "@/lib/supabase/env";
import { cookies } from "next/headers";
import { getPrismaClient } from "@/lib/server/db";
import { Save } from "lucide-react";
import { redirect } from "next/navigation";

export default async function PortalProfilePage() {
  const cookieStore = await cookies();
  const config = getSupabaseConfig();
  
  if (!config.configured) return <div>Configuration missing</div>;

  const supabase = createServerClient(config.url, config.publishableKey, {
    cookies: {
      getAll() { return cookieStore.getAll(); },
      setAll() {}
    }
  });

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const prisma = getPrismaClient();
  let lead = await prisma.lead.findFirst({
    where: { email: user.email! }
  });

  // If no lead exists for this registered user, they signed up but didn't submit the intake form.
  // We can just show their basic auth info for now, or prompt them to complete intake.
  
  return (
    <div className="space-y-8 max-w-3xl">
      <header className="border-b border-[var(--line)] pb-6">
        <h1 className="text-3xl font-bold tracking-tight">Profile & Consent</h1>
        <p className="mt-2 text-[var(--ink-soft)]">Manage your personal information and communication preferences.</p>
      </header>

      <form className="space-y-8" action="/api/portal/profile" method="POST">
        {/* Personal Info */}
        <section className="bg-white p-6 border border-[var(--line)] shadow-sm">
          <h2 className="font-semibold text-lg border-b border-[var(--line)] pb-4 mb-6">Personal Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-1">First Name</label>
              <input 
                type="text" 
                name="firstName"
                defaultValue={lead?.firstName || user.user_metadata?.first_name || ""} 
                className="w-full px-3 py-2 border border-[var(--line)] focus:outline-none focus:border-[var(--accent)]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Last Name</label>
              <input 
                type="text" 
                name="lastName"
                defaultValue={lead?.lastName || user.user_metadata?.last_name || ""} 
                className="w-full px-3 py-2 border border-[var(--line)] focus:outline-none focus:border-[var(--accent)]"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-1">Email Address</label>
              <input 
                type="email" 
                defaultValue={user.email!} 
                disabled
                className="w-full px-3 py-2 border border-[var(--line)] bg-[#fcfdfd] text-[var(--ink-soft)] cursor-not-allowed"
              />
              <p className="text-xs text-[var(--ink-soft)] mt-1">Email cannot be changed directly. Contact support if needed.</p>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-1">Phone Number</label>
              <input 
                type="tel" 
                name="phone"
                defaultValue={lead?.phone || ""} 
                className="w-full px-3 py-2 border border-[var(--line)] focus:outline-none focus:border-[var(--accent)]"
              />
            </div>
          </div>
        </section>

        {/* Consent Preferences */}
        <section className="bg-white p-6 border border-[var(--line)] shadow-sm">
          <h2 className="font-semibold text-lg border-b border-[var(--line)] pb-4 mb-6">Communication Consent</h2>
          
          <div className="space-y-4">
            <label className="flex items-start gap-3">
              <input 
                type="checkbox" 
                name="consent" 
                defaultChecked={lead?.consent === true}
                className="mt-1 border-[var(--line)] text-[var(--accent-deep)] focus:ring-[var(--accent)]" 
              />
              <span className="text-sm text-[var(--ink)]">
                I consent to receive communications from AB Global Consulting regarding services and consultations.
                I understand I can opt-out at any time.
              </span>
            </label>
            
            {lead?.consentVersion && (
              <p className="text-xs text-[var(--ink-soft)] font-mono">
                Consent Version: {lead.consentVersion} | Last Updated: {lead.consentTimestamp?.toLocaleDateString()}
              </p>
            )}
          </div>
        </section>

        {/* Danger Zone */}
        <section className="bg-red-50 p-6 border border-red-200">
          <h2 className="font-semibold text-red-900 text-lg mb-2">Data Privacy & Account Deletion</h2>
          <p className="text-sm text-red-800 mb-4">
            Under our data retention policy, you have the right to request deletion (anonymization) of your personal record.
            This action is irreversible.
          </p>
          <button type="button" className="px-4 py-2 bg-white text-red-700 border border-red-300 text-sm font-semibold hover:bg-red-50">
            Request Data Deletion
          </button>
        </section>

        <div className="flex justify-end">
          <button type="submit" className="inline-flex items-center gap-2 bg-[var(--accent-deep)] text-white px-6 py-2.5 font-semibold hover:bg-opacity-90">
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
