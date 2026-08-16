import { DashboardLayout } from "@/components/admin/layout";
import { ContentEditor } from "@/components/admin/content-editor";

export default function NewContentPage() {
  return (
    <DashboardLayout>
      <ContentEditor isNew={true} />
    </DashboardLayout>
  );
}
