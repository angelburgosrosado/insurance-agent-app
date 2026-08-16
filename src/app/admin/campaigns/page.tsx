import { getCampaignMetrics } from "@/lib/server/campaign-metrics";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function CampaignsDashboardPage() {
  const data = await getCampaignMetrics();

  return (
    <main className="min-h-screen bg-[#eef1ef] text-[var(--ink)]">
      <header className="border-b border-[var(--line)] bg-white">
        <div className="mx-auto flex max-w-[1400px] items-center px-5 py-5 lg:px-8 gap-4">
          <Link href="/admin" className="text-[var(--ink-soft)] hover:text-[var(--ink)]">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Campaign Tracking</h1>
            <p className="text-xs text-[var(--ink-soft)]">UTM-attributed lead generation</p>
          </div>
        </div>
      </header>
      
      <div className="p-5 lg:p-10 max-w-[1400px] mx-auto space-y-6">
        <div className="bg-white border border-[var(--line)] shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#fcfdfd] border-b border-[var(--line)] text-[var(--ink-soft)]">
              <tr>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-[10px]">Campaign</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-[10px]">Source</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-[10px]">Medium</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-[10px] text-right">Total Leads</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-[10px] text-right">Qualified</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-[10px] text-right">Conversion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--line)]">
              {data.map((stat, i) => {
                const conversionRate = stat.totalLeads > 0 
                  ? Math.round((stat.qualifiedLeads / stat.totalLeads) * 100) 
                  : 0;

                return (
                  <tr key={i} className="hover:bg-[#fcfdfd] transition-colors">
                    <td className="px-6 py-4 font-medium text-[var(--ink)]">
                      {stat.campaign}
                    </td>
                    <td className="px-6 py-4 text-[var(--ink-soft)]">
                      {stat.source}
                    </td>
                    <td className="px-6 py-4 text-[var(--ink-soft)]">
                      {stat.medium}
                    </td>
                    <td className="px-6 py-4 text-[var(--ink)] font-mono text-right">
                      {stat.totalLeads}
                    </td>
                    <td className="px-6 py-4 text-[var(--ink)] font-mono text-right">
                      {stat.qualifiedLeads}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`inline-flex px-2 py-1 text-[11px] font-semibold rounded-full ${
                        conversionRate > 20 ? 'bg-green-100 text-green-800' :
                        conversionRate > 5 ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {conversionRate}%
                      </span>
                    </td>
                  </tr>
                );
              })}
              
              {data.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-[var(--ink-soft)]">
                    No campaign data available. Leads must be submitted with UTM parameters (e.g. ?utm_source=facebook).
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export const dynamic = "force-dynamic";
