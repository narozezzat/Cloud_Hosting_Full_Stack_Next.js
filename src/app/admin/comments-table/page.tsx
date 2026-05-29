import { getAllComments } from "@/apiCalls/adminApiCall";
import { Comment } from "@/generated/prisma";
import { cookies } from "next/headers";
import { Card } from "@/components/ui/Card";
import AdminCommentsTableClient from "@/components/admin/AdminCommentsTableClient";

export default async function AdminCommentsTable() {
  const token = cookies().get("jwtToken")?.value || "";
  const comments: Comment[] = await getAllComments(token);

  return (
    <div className="flex flex-1 flex-col gap-6 min-h-0">
      <div>
        <h1 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
          Comments
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {comments.length} {comments.length === 1 ? "comment" : "comments"}{" "}
          total
        </p>
      </div>

      <Card className="flex min-h-0 flex-1 flex-col overflow-hidden p-0">
        <AdminCommentsTableClient comments={comments} />
      </Card>
    </div>
  );
}
