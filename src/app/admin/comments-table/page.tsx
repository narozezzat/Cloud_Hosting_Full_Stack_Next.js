import { getAllComments } from "@/lib/api/adminApiCall";
import { COMMENT_PER_PAGE } from "@/lib/constants";
import { cookies } from "next/headers";
import { Card } from "@/components/ui/Card";
import AdminCommentsTableClient from "@/components/admin/AdminCommentsTableClient";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

interface AdminCommentsTableProps {
  searchParams: { pageNumber?: string };
}

export default async function AdminCommentsTable({
  searchParams: { pageNumber },
}: AdminCommentsTableProps) {
  const token = cookies().get("jwtToken")?.value || "";
  const { comments, count } = await getAllComments(token, pageNumber || "1");
  const pages = Math.ceil(count / COMMENT_PER_PAGE);

  return (
    <div className="flex flex-1 flex-col gap-6 min-h-0">
      <AdminPageHeader
        title="Comments"
        badgeText={`${count} ${count === 1 ? "comment" : "comments"}`}
        description="Moderate user feedback and manage community discussions."
      />

      <Card className="flex min-h-0 rounded-md flex-1 flex-col overflow-hidden p-0">
        <AdminCommentsTableClient
          comments={comments}
          pages={pages}
          currentPage={parseInt(pageNumber || "1") || 1}
        />
      </Card>
    </div>
  );
}
