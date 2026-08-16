"use client";

import { useState } from "react";
import { saveEnvironmentVariables } from "./actions";

export default function SetupWizard() {
  const [step, setStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [dbUrl, setDbUrl] = useState("");
  const [supaUrl, setSupaUrl] = useState("");
  const [supaKey, setSupaKey] = useState("");
  const [sendgrid, setSendgrid] = useState("");
  const [webhook, setWebhook] = useState("");

  const handleSave = async () => {
    setIsSaving(true);
    const fd = new FormData();
    fd.append("DATABASE_URL", dbUrl);
    fd.append("NEXT_PUBLIC_SUPABASE_URL", supaUrl);
    fd.append("NEXT_PUBLIC_SUPABASE_ANON_KEY", supaKey);
    fd.append("SENDGRID_API_KEY", sendgrid);
    fd.append("CRM_WEBHOOK_URL", webhook);
    
    try {
      await saveEnvironmentVariables(fd);
      setStep(3);
    } catch (e: any) {
      alert("Failed to save variables: " + e.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#eef1ef] flex flex-col items-center justify-center p-4">
      <div className="bg-white max-w-2xl w-full p-8 rounded-lg shadow-sm border border-[var(--line)]">
        
        <div className="mb-8 border-b border-[var(--line)] pb-4">
          <h1 className="text-2xl font-bold tracking-tight text-[var(--ink)]">Application Setup</h1>
          <p className="text-sm text-[var(--ink-soft)] mt-1">
            Configure your environment variables for local testing and generate your deployment config.
          </p>
        </div>

        {/* STEP 1: Database */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div>
              <h2 className="text-lg font-semibold mb-4">Step 1: Database (Supabase)</h2>
              <p className="text-sm text-[var(--ink-soft)] mb-6">
                Enter your Supabase connection strings. Make sure to use the connection pooling URI for `DATABASE_URL`.
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">DATABASE_URL</label>
                <input 
                  type="text" 
                  value={dbUrl}
                  onChange={e => setDbUrl(e.target.value)}
                  placeholder="postgres://postgres.xxx:password@aws-0-us-east-1.pooler.supabase.com:6543/postgres" 
                  className="w-full border border-[var(--line)] p-2 rounded text-sm font-mono"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">NEXT_PUBLIC_SUPABASE_URL</label>
                <input 
                  type="text" 
                  value={supaUrl}
                  onChange={e => setSupaUrl(e.target.value)}
                  placeholder="https://xxx.supabase.co" 
                  className="w-full border border-[var(--line)] p-2 rounded text-sm font-mono"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">NEXT_PUBLIC_SUPABASE_ANON_KEY</label>
                <input 
                  type="text" 
                  value={supaKey}
                  onChange={e => setSupaKey(e.target.value)}
                  placeholder="eyJhbGci..." 
                  className="w-full border border-[var(--line)] p-2 rounded text-sm font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button 
                onClick={() => setStep(2)}
                className="bg-[var(--accent)] text-white px-4 py-2 rounded-sm text-sm font-medium hover:bg-[var(--accent-deep)]"
              >
                Next Step
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Integrations */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div>
              <h2 className="text-lg font-semibold mb-4">Step 2: Integrations</h2>
              <p className="text-sm text-[var(--ink-soft)] mb-6">
                Configure SendGrid for email and GoHighLevel/CRM webhook URLs.
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">SENDGRID_API_KEY</label>
                <input 
                  type="text" 
                  value={sendgrid}
                  onChange={e => setSendgrid(e.target.value)}
                  placeholder="SG.xxx" 
                  className="w-full border border-[var(--line)] p-2 rounded text-sm font-mono"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">CRM_WEBHOOK_URL</label>
                <input 
                  type="text" 
                  value={webhook}
                  onChange={e => setWebhook(e.target.value)}
                  placeholder="https://services.leadconnectorhq.com/hooks/..." 
                  className="w-full border border-[var(--line)] p-2 rounded text-sm font-mono"
                />
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button 
                onClick={() => setStep(1)}
                className="border border-[var(--line)] px-4 py-2 rounded-sm text-sm font-medium hover:bg-[#eef1ef]"
              >
                Back
              </button>
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="bg-[var(--accent)] text-white px-4 py-2 rounded-sm text-sm font-medium hover:bg-[var(--accent-deep)] disabled:opacity-50"
              >
                {isSaving ? "Saving..." : "Save to .env.local"}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Summary & Firebase Command */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div>
              <h2 className="text-lg font-semibold mb-2">🎉 Setup Complete</h2>
              <p className="text-sm text-[var(--ink-soft)]">
                Your variables have been written to `.env.local`. You can now restart your development server to load them.
              </p>
            </div>
            
            <div className="bg-[#1a2c4d] p-4 rounded-md text-white">
              <p className="text-xs uppercase tracking-wider mb-2 font-semibold text-[#8ab1f5]">Firebase Deployment</p>
              <p className="text-sm mb-4">
                To deploy to Firebase App Hosting with these exact variables, you must add them via the Firebase Console when creating your App Hosting backend, or use the following Firebase CLI command if deploying Firebase Functions/Hosting manually (depending on your setup method).
              </p>
              <div className="bg-black/30 p-3 rounded text-xs font-mono break-all selection:bg-[var(--accent)]">
                {`# Reference values for Firebase App Hosting Console Environment Variables:`}
                <br /><br />
                DATABASE_URL={dbUrl || '...'}
                <br />
                NEXT_PUBLIC_SUPABASE_URL={supaUrl || '...'}
                <br />
                NEXT_PUBLIC_SUPABASE_ANON_KEY={supaKey || '...'}
                <br />
                SENDGRID_API_KEY={sendgrid || '...'}
                <br />
                CRM_WEBHOOK_URL={webhook || '...'}
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button 
                onClick={() => window.location.href = "/"}
                className="bg-[var(--ink)] text-white px-4 py-2 rounded-sm text-sm font-medium"
              >
                Go to Home
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
