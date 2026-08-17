import { getAnalyticsData } from "@/lib/server/analytics-metrics";
import { TimeSeriesChart, ServicePieChart } from "@/components/analytics-charts";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AnalyticsDashboardPage() {
  const data = await getAnalyticsData();

  const total30Days = data.timeSeries.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <main className="min-h-screen bg-[#eef1ef] text-[var(--ink)]">
      <header className="border-b border-[var(--line)] bg-white">
        <div className="mx-auto flex max-w-[1400px] items-center px-5 py-5 lg:px-8 gap-4">
          <Link href="/admin" className="text-[var(--ink-soft)] hover:text-[var(--ink)]">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Internal Analytics</h1>
            <p className="text-xs text-[var(--ink-soft)]">Lead performance over the last 30 days</p>
          </div>
        </div>
      </header>
      
      <div className="p-5 lg:p-10 max-w-[1400px] mx-auto space-y-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white border border-[var(--line)] p-6 shadow-sm">
            <div className="flex justify-between items-end mb-6 border-b border-[var(--line)] pb-4">
              <div>
                <h2 className="font-semibold text-lg">Lead Generation (30 Days)</h2>
                <p className="text-sm text-[var(--ink-soft)]">Total leads: <span className="font-bold text-[var(--ink)]">{total30Days}</span></p>
              </div>
            </div>
            <TimeSeriesChart data={data.timeSeries} />
          </div>

          <div className="bg-white border border-[var(--line)] p-6 shadow-sm">
            <h2 className="font-semibold text-lg border-b border-[var(--line)] pb-4 mb-6">Service Breakdown</h2>
            <ServicePieChart data={data.breakdown} />
          </div>
        </div>
      </div>
    </main>
  );
}
