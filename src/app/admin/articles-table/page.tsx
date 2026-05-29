import { Article } from "@/generated/prisma";
import { getArticles } from "@/apiCalls/articleApiCall";
import { ARTICLE_PER_PAGE } from "@/utils/constants";
import prisma from "@/utils/db";
import AdminArticlesTableClient from "@/components/admin/AdminArticlesTableClient";
import AddArticleModal from "@/components/admin/AddArticleModal";
import { Card } from "@/components/ui/Card";

interface AdminArticlesTableProps {
  searchParams: { pageNumber: string };
}

export default async function AdminArticlesTable({
  searchParams: { pageNumber },
}: AdminArticlesTableProps) {
  const articles: Article[] = await getArticles(pageNumber);
  const count: number = await prisma.article.count();
  const pages = Math.ceil(count / ARTICLE_PER_PAGE);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight">
            Articles
          </h1>
          <p className="text-sm text-muted-foreground">
            {count} {count === 1 ? "article" : "articles"} total
          </p>
        </div>
        <AddArticleModal />
      </div>
      <Card variant="elevated" className="overflow-hidden p-0">
        <AdminArticlesTableClient
          articles={articles}
          pages={pages}
          currentPage={parseInt(pageNumber) || 1}
        />
      </Card>
    </div>
  );
}
