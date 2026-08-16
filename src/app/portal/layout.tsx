import Link from "next/link";
import { User, LogOut, Settings, Calendar } from "lucide-react";
import { LogoutButton } from "@/components/auth/logout-button";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#eef1ef] text-[var(--ink)] flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-sentinel-navy text-white flex flex-col border-r border-[#1a2c4d]">
        <div className="p-6 border-b border-[#1a2c4d]">
          <Link href="/portal" className="text-xl font-bold tracking-tight">
            Client Portal
          </Link>
          <p className="text-xs text-[#a0aec0] mt-1">AB Global Consulting</p>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link 
            href="/portal" 
            className="flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium hover:bg-[#1a2c4d] transition-colors"
          >
            <Calendar size={18} />
            My Consultations
          </Link>
          <Link 
            href="/portal/profile" 
            className="flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium hover:bg-[#1a2c4d] transition-colors"
          >
            <User size={18} />
            Profile & Consent
          </Link>
        </nav>
        
        <div className="p-4 border-t border-[#1a2c4d]">
          <LogoutButton className="flex w-full items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium hover:bg-[#1a2c4d] transition-colors text-red-400 hover:text-red-300">
            <LogOut size={18} />
            Sign Out
          </LogoutButton>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 lg:p-10">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
