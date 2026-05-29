import { Article } from "@/generated/prisma";
import { getArticles } from "@/lib/api/articleApiCall";
import { ARTICLE_PER_PAGE } from "@/lib/constants";
import prisma from "@/lib/db";
import AdminArticlesTableClient from "@/components/admin/AdminArticlesTableClient";
import AddArticleModal from "@/components/admin/AddArticleModal";
import { Card } from "@/components/ui/Card";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

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
          currentPage={parseInt(pageNumber) || 1}
        />
      </Card>
    </div>
  );
}
