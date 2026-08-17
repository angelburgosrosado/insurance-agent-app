import { createBrowserClient } from '@supabase/ssr'

const DEFAULT_SUPABASE_URL = "https://pgnnrmeisikhueadgitn.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnbm5ybWVpc2lraHVlYWRnaXRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU3OTgxMDMsImV4cCI6MjEwMTM3NDEwM30.Lwcnshdw6nJrioVGR17csKKYXs6n5WtZ5ojkXhYdtcQ";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || DEFAULT_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() || 
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() || 
    DEFAULT_SUPABASE_ANON_KEY;

  return createBrowserClient(url, anonKey);
}
