import { DashboardLayout } from "@/components/admin/layout";
import { ContentEditor } from "@/components/admin/content-editor";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function NewContentPage() {
  return (
    <DashboardLayout>
      <ContentEditor isNew={true} />
    </DashboardLayout>
  );
}
