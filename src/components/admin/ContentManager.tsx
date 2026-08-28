"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PlusCircle, Search, Edit, ExternalLink, Trash2, FileText, Sparkles } from "lucide-react";
import { UnifiedContentItem } from "@/lib/server/content-service";

interface ContentManagerProps {
  initialContents: UnifiedContentItem[];
}

export function ContentManager({ initialContents }: ContentManagerProps) {
  const [contents, setContents] = useState<UnifiedContentItem[]>(initialContents);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);

  const filteredContents = contents.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.slug.toLowerCase().includes(search.toLowerCase()) ||
      (item.summary && item.summary.toLowerCase().includes(search.toLowerCase()));

    const matchesType = typeFilter ? item.type === typeFilter : true;
    const matchesStatus = statusFilter ? item.status === statusFilter : true;

    return matchesSearch && matchesType && matchesStatus;
  });

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    setIsDeletingId(id);
    try {
      const res = await fetch(`/api/admin/content/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setContents((prev) => prev.filter((c) => c.id !== id));
      } else {
        alert("Failed to delete content");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting content");
    } finally {
      setIsDeletingId(null);
    }
  };

  const getPublicUrl = (item: UnifiedContentItem) => {
    if (item.type === "service") {
      return `/services/${item.slug}`;
    }
    return `/resources/${item.slug}`;
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Content Management System</h1>
          <p className="text-slate-500 text-sm">
            Manage, edit, and publish strategy guides, planning resources, and service pages.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/campaigns"
            className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-900 border border-amber-300 px-4 py-2 text-xs font-bold hover:bg-amber-500/20 rounded-xl transition-all shadow-sm"
          >
            <Sparkles size={14} className="text-amber-600" />
            <span>AI Campaign Studio</span>
          </Link>

          <Link
            href="/admin/content/new"
            className="inline-flex items-center gap-2 bg-[#001c38] text-white px-4 py-2 text-xs font-bold hover:bg-[#002d5a] rounded-xl transition-all shadow-sm"
          >
            <PlusCircle size={15} />
            <span>Create New Content</span>
          </Link>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-wrap gap-3 items-center justify-between">
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, slug, or keywords..."
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium text-slate-900 shadow-inner"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border border-slate-300 rounded-xl px-3 py-2 bg-white text-slate-700 font-bold focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer shadow-sm"
          >
            <option value="">All Types (Resources & Services)</option>
            <option value="resource">Resources & Strategy Guides</option>
            <option value="service">Service Pages</option>
            <option value="article">Blog / Articles</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-slate-300 rounded-xl px-3 py-2 bg-white text-slate-700 font-bold focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer shadow-sm"
          >
            <option value="">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Content Table Card */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-bold border-b border-slate-200">
              <tr>
                <th className="px-6 py-3.5">Title & Path</th>
                <th className="px-6 py-3.5">Type</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Last Updated</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredContents.map((item) => {
                const publicUrl = getPublicUrl(item);
                return (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900 flex items-center gap-2">
                        <FileText size={15} className="text-slate-400 shrink-0" />
                        <span className="truncate max-w-sm sm:max-w-md">{item.title}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono pl-6 mt-0.5">
                        {publicUrl}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-700 font-bold rounded-lg uppercase text-[10px] tracking-wider border border-slate-200">
                        {item.type}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                          item.status === "published"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                            : item.status === "archived"
                            ? "bg-slate-100 text-slate-600"
                            : "bg-amber-100 text-amber-800 border border-amber-200"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-slate-500 font-medium">
                      {new Date(item.updatedAt || item.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={publicUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold inline-flex items-center gap-1 transition-all"
                          title="View Live Public Page"
                        >
                          <ExternalLink size={12} />
                          <span>View Live</span>
                        </a>

                        <Link
                          href={`/admin/content/${item.id}`}
                          className="px-2.5 py-1 bg-[#001c38] hover:bg-[#002d5a] text-white rounded-lg font-bold inline-flex items-center gap-1 transition-all"
                        >
                          <Edit size={12} />
                          <span>Edit</span>
                        </Link>

                        <button
                          onClick={() => handleDelete(item.id, item.title)}
                          disabled={isDeletingId === item.id}
                          className="px-2 py-1 text-red-600 hover:bg-red-50 rounded-lg font-bold inline-flex items-center gap-1 transition-all disabled:opacity-50 cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredContents.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500 font-medium">
                    No content entries match your search or filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
