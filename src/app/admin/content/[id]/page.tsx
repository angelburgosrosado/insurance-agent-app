import { DashboardLayout } from "@/components/admin/layout";
import { ContentEditor } from "@/components/admin/content-editor";
import { getPrismaClient } from "@/lib/server/db";
import { notFound } from "next/navigation";

type ContentType = "article" | "resource" | "service";
type Status = "draft" | "published" | "archived";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function EditContentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let content = null;

  if (process.env.DATABASE_URL) {
    try {
      const prisma = getPrismaClient();
      content = await prisma.contentEntry.findUnique({
        where: { id },
      });
    } catch (err) {
      console.warn("[EditContentPage] Failed to fetch content entry:", err);
    }
  }

  if (!content) {
    notFound();
  }

  // Map to the exact types expected by the ContentEditor component
  const initialData = {
    ...content,
    type: content.type as ContentType,
    status: content.status as Status,
  };

  return (
    <DashboardLayout>
      <ContentEditor initialData={initialData} isNew={false} />
    </DashboardLayout>
  );
}
