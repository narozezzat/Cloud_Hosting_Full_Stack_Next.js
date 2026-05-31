import { Article, Prisma } from "@/generated/prisma";
import { ARTICLE_PER_PAGE } from "@/lib/constants";
import prisma from "@/lib/db";
import AdminArticlesTableClient from "@/components/admin/AdminArticlesTableClient";
import AddArticleModal from "@/components/admin/AddArticleModal";
import { Card } from "@/components/ui/Card";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

export const dynamic = "force-dynamic";

interface AdminArticlesTableProps {
  searchParams: { pageNumber?: string; q?: string };
}

export default async function AdminArticlesTable({
  searchParams: { pageNumber, q },
}: AdminArticlesTableProps) {
  const search = q?.trim() || "";
  const currentPage = parseInt(pageNumber || "1") || 1;

  const where: Prisma.ArticleWhereInput = search
    ? {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      }
    : {};

  const [articles, count] = await Promise.all([
    prisma.article.findMany({
      where,
      skip: ARTICLE_PER_PAGE * (currentPage - 1),
      take: ARTICLE_PER_PAGE,
      orderBy: { createdAt: "desc" },
    }) as Promise<Article[]>,
    prisma.article.count({ where }),
  ]);
  const pages = Math.ceil(count / ARTICLE_PER_PAGE);

  return (
    <div className="flex flex-1 flex-col gap-6 min-h-0">
      <AdminPageHeader
        title="Articles"
        badgeText={`${count} ${count === 1 ? "article" : "articles"}`}
        description="Manage, edit, and publish articles on your platform."
        action={<AddArticleModal />}
      />
      <Card className="flex rounded-md min-h-0 flex-1 flex-col overflow-hidden p-0">
        <AdminArticlesTableClient
          articles={articles}
          pages={pages}
          currentPage={currentPage}
          searchQuery={search}
        />
      </Card>
    </div>
  );
}
