import { COMMENT_PER_PAGE } from "@/lib/constants";
import prisma from "@/lib/db";
import { Comment, Prisma } from "@/generated/prisma";
import { Card } from "@/components/ui/Card";
import AdminCommentsTableClient from "@/components/admin/AdminCommentsTableClient";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

export const dynamic = "force-dynamic";

interface AdminCommentsTableProps {
  searchParams: { pageNumber?: string; q?: string };
}

export default async function AdminCommentsTable({
  searchParams: { pageNumber, q },
}: AdminCommentsTableProps) {
  const search = q?.trim() || "";
  const currentPage = parseInt(pageNumber || "1") || 1;

  const where: Prisma.CommentWhereInput = search
    ? { text: { contains: search, mode: "insensitive" } }
    : {};

  const [comments, count] = await Promise.all([
    prisma.comment.findMany({
      where,
      skip: COMMENT_PER_PAGE * (currentPage - 1),
      take: COMMENT_PER_PAGE,
      orderBy: { createdAt: "desc" },
    }) as Promise<Comment[]>,
    prisma.comment.count({ where }),
  ]);
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
          currentPage={currentPage}
          searchQuery={search}
        />
      </Card>
    </div>
  );
}
