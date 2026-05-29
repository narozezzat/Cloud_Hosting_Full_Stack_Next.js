import { getAllComments } from "@/apiCalls/adminApiCall";
import { Comment } from "@/generated/prisma";
import { cookies } from "next/headers";
import { Card } from "@/components/ui/Card";
import AdminCommentsTableClient from "@/components/admin/AdminCommentsTableClient";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

export default async function AdminCommentsTable() {
  const token = cookies().get("jwtToken")?.value || "";
  const comments: Comment[] = await getAllComments(token);

  return (
    <div className="flex flex-1 flex-col gap-6 min-h-0">
      <AdminPageHeader
        title="Comments"
        badgeText={`${comments.length} ${comments.length === 1 ? "comment" : "comments"}`}
        description="Moderate user feedback and manage community discussions."
      />

      <Card className="flex min-h-0 rounded-md flex-1 flex-col overflow-hidden p-0">
        <AdminCommentsTableClient comments={comments} />
      </Card>
    </div>
  );
}
