"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

type ContentType = "article" | "resource" | "service";
type Status = "draft" | "published" | "archived";

interface ContentEditorProps {
  initialData?: {
    id: string;
    title: string;
    slug: string;
    type: ContentType;
    status: Status;
    summary: string | null;
    body: string;
  };
  isNew?: boolean;
}

export function ContentEditor({ initialData, isNew = false }: ContentEditorProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    type: initialData?.type || "resource",
    status: initialData?.status || "draft",
    summary: initialData?.summary || "",
    body: initialData?.body || "",
  });

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setFormData(prev => ({
      ...prev,
      title: newTitle,
      // Auto-generate slug only if it's new and user hasn't typed a custom slug
      slug: isNew && prev.slug === generateSlug(prev.title) ? generateSlug(newTitle) : prev.slug
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      const url = isNew ? "/api/admin/content" : `/api/admin/content/${initialData?.id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save content");
      }

      router.push("/admin/content");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/content" className="text-[var(--ink-soft)] hover:text-[var(--ink)]">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold">{isNew ? "Create Content" : "Edit Content"}</h1>
        </div>
        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center gap-2 bg-[var(--accent-deep)] text-white px-6 py-2.5 text-sm font-semibold disabled:opacity-50"
        >
          <Save size={16} />
          {isSaving ? "Saving..." : "Save Content"}
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 border border-[var(--line)]">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={handleTitleChange}
                  className="w-full px-3 py-2 border border-[var(--line)] focus:outline-none focus:border-[var(--accent)]"
                  placeholder="Article or Page Title"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Body Content (Markdown/Text)</label>
                <textarea
                  required
                  value={formData.body}
                  onChange={e => setFormData({ ...formData, body: e.target.value })}
                  rows={20}
                  className="w-full px-3 py-2 border border-[var(--line)] focus:outline-none focus:border-[var(--accent)] font-mono text-sm"
                  placeholder="Write your content here..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          <div className="bg-white p-6 border border-[var(--line)] space-y-4">
            <h3 className="font-semibold border-b border-[var(--line)] pb-2 mb-4">Publishing</h3>
            
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--ink-soft)] mb-1">Status</label>
              <select
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value as Status })}
                className="w-full px-3 py-2 border border-[var(--line)] focus:outline-none focus:border-[var(--accent)] text-sm"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--ink-soft)] mb-1">Content Type</label>
              <select
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value as ContentType })}
                className="w-full px-3 py-2 border border-[var(--line)] focus:outline-none focus:border-[var(--accent)] text-sm"
                disabled={!isNew}
              >
                <option value="resource">Resource / Article</option>
                <option value="service">Service Page</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--ink-soft)] mb-1">URL Slug</label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={e => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-3 py-2 border border-[var(--line)] focus:outline-none focus:border-[var(--accent)] text-sm font-mono"
                disabled={!isNew}
              />
            </div>
          </div>

          <div className="bg-white p-6 border border-[var(--line)] space-y-4">
            <h3 className="font-semibold border-b border-[var(--line)] pb-2 mb-4">SEO & Metadata</h3>
            
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--ink-soft)] mb-1">Summary (Meta Description)</label>
              <textarea
                value={formData.summary}
                onChange={e => setFormData({ ...formData, summary: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-[var(--line)] focus:outline-none focus:border-[var(--accent)] text-sm"
                placeholder="Brief description for search engines..."
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
