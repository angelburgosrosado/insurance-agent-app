import { DashboardLayout } from "@/components/admin/layout";
import { ContentManager } from "@/components/admin/ContentManager";
import { getAllContent } from "@/lib/server/content-service";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminContentPage() {
  const contents = await getAllContent();

  return (
    <DashboardLayout>
      <ContentManager initialContents={contents} />
    </DashboardLayout>
  );
}
