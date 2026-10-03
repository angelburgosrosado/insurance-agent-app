import { createBrowserClient } from '@supabase/ssr'

const DEFAULT_SUPABASE_URL = "https://nrqrtfghywuiefukvjmm.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ycXJ0ZmdoeXd1aWVmdWt2am1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3MTAzOTksImV4cCI6MjEwMzI4NjM5OX0.aQDBYRpTSBnns2NTnXhEtxZdsNV8TfFaSredOdQrazE";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || DEFAULT_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() || 
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() || 
    DEFAULT_SUPABASE_ANON_KEY;

  return createBrowserClient(url, anonKey);
}
