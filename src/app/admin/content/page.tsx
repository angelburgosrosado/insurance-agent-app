import { getPrismaClient } from "@/lib/server/db";
import Link from "next/link";
import { PlusCircle, Search, Edit } from "lucide-react";
import { DashboardLayout } from "@/components/admin/layout";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminContentPage() {
  const prisma = getPrismaClient();
  const contents = await prisma.contentEntry.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Content Management</h1>
          <p className="text-[var(--ink-soft)] text-sm">Manage resources and service pages</p>
        </div>
        
        <Link 
          href="/admin/content/new" 
          className="inline-flex items-center gap-2 bg-[var(--accent-deep)] text-white px-4 py-2 text-sm font-medium hover:bg-opacity-90 rounded-sm"
        >
          <PlusCircle size={16} />
          <span>New Content</span>
        </Link>
      </div>

      <div className="bg-white border border-[var(--line)] overflow-hidden">
        {/* Search & Filter Header (UI only for now) */}
        <div className="p-4 border-b border-[var(--line)] flex gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--ink-soft)]" size={16} />
            <input 
              type="text" 
              placeholder="Search content..." 
              className="w-full pl-9 pr-4 py-2 text-sm border border-[var(--line)] focus:outline-none focus:border-[var(--accent)]"
            />
          </div>
          <select className="border border-[var(--line)] text-sm px-3 py-2 bg-transparent focus:outline-none focus:border-[var(--accent)]">
            <option value="">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#fcfdfd] text-[var(--ink-soft)] uppercase tracking-wider text-[11px] font-semibold border-b border-[var(--line)]">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Created</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--line)]">
              {contents.map((item) => (
                <tr key={item.id} className="hover:bg-[#fcfdfd] transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-[var(--ink)]">{item.title}</div>
                    <div className="text-xs text-[var(--ink-soft)]">/{item.slug}</div>
                  </td>
                  <td className="px-6 py-4 capitalize">{item.type}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider ${
                      item.status === 'published' ? 'bg-green-100 text-green-800' : 
                      item.status === 'archived' ? 'bg-gray-100 text-gray-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[var(--ink-soft)]">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link 
                      href={`/admin/content/${item.id}`}
                      className="inline-flex items-center gap-1 text-[var(--accent-deep)] hover:underline text-xs font-medium"
                    >
                      <Edit size={14} />
                      <span>Edit</span>
                    </Link>
                  </td>
                </tr>
              ))}
              {contents.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-[var(--ink-soft)]">
                    No content entries found. Create your first post to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
