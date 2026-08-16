import { DashboardLayout } from "@/components/admin/layout";
import { ContentEditor } from "@/components/admin/content-editor";
import { getPrismaClient } from "@/lib/server/db";
import { notFound } from "next/navigation";
import type { ContentEntry } from "@prisma/client";

type ContentType = "article" | "resource" | "service";
type Status = "draft" | "published" | "archived";

export default async function EditContentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const prisma = getPrismaClient();
  
  const content = await prisma.contentEntry.findUnique({
    where: { id }
  });

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
