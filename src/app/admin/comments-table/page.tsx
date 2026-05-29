import { getAllComments } from "@/apiCalls/adminApiCall";
import { Comment } from "@/generated/prisma";
import DeleteCommentButton from "./DeleteCommentButton";
import { cookies } from "next/headers";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatDate } from "@/utils/formatDate";

export default async function AdminCommentsTable() {
  const token = cookies().get("jwtToken")?.value || "";
  const comments: Comment[] = await getAllComments(token);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
          Comments
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {comments.length} {comments.length === 1 ? "comment" : "comments"}{" "}
          total
        </p>
      </div>

      {comments.length === 0 ? (
        <EmptyState
          title="No comments yet"
          description="When users start engaging with your articles, comments will appear here."
        />
      ) : (
        <Card variant="elevated" className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-secondary/40">
                <tr className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-3">Comment</th>
                  <th className="hidden px-5 py-3 lg:table-cell">Created</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {comments.map((comment) => (
                  <tr
                    key={comment.id}
                    className="transition-colors hover:bg-brand-500/5"
                  >
                    <td className="px-5 py-3 text-foreground">
                      {comment.text}
                    </td>
                    <td className="hidden px-5 py-3 text-muted-foreground lg:table-cell">
                      {formatDate(String(comment.createdAt))}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <DeleteCommentButton
                        commentText={comment.text}
                        commentId={comment.id}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
