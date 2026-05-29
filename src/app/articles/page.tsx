import { cookies } from "next/headers";
import { Plus } from "lucide-react";
import { getArticles } from "@/lib/api/articleApiCall";
import ArticleItem from "@/components/articles/ArticleItem";
import Pagination from "@/components/ui/Pagination";
import SearchArticleInput from "@/components/articles/SearchArticleInput";
import { CategoryFilterBar } from "@/components/articles/CategoryFilterBar";
import { ArticleWithCategory, CategoryWithCount } from "@/lib/types";
import { ARTICLE_PER_PAGE } from "@/lib/constants";
import { Metadata } from "next";
import prisma from "@/lib/db";
import { EmptyState } from "@/components/ui/EmptyState";
import { GradientBlob } from "@/components/ui/GradientBlob";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import AddArticleModal from "@/components/admin/AddArticleModal";
import { verifyTokenForPage } from "@/lib/auth/verifyToken";

export const metadata: Metadata = {
  title: "Articles — Cloud Hosting",
  description: "Articles, tutorials, and deep dives from the Cloud Hosting team.",
};

interface ArticlesPageProps {
  searchParams: { pageNumber?: string; categoryId?: string };
}

export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {
  const pageNumber = searchParams.pageNumber || "1";
  const categoryId = searchParams.categoryId;

  const [articles, count, categories] = await Promise.all([
    getArticles(pageNumber, categoryId) as Promise<ArticleWithCategory[]>,
    prisma.article.count({
      where: categoryId ? { categoryId: parseInt(categoryId) } : {},
    }),
    prisma.category.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { articles: true } } },
    }) as Promise<CategoryWithCount[]>,
  ]);
  const pages = Math.ceil(count / ARTICLE_PER_PAGE);

  const token = cookies().get("jwtToken")?.value || "";
  const payload = verifyTokenForPage(token);
  const isAdmin = Boolean(payload?.isAdmin);

  return (
    <>
      <section className="relative overflow-hidden">
        <GradientBlob position="top-right" size="lg" />
        <div className="container pt-10 pb-6 sm:pt-12 sm:pb-8 lg:pt-16 lg:pb-10">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <Badge>Blog</Badge>
            <h1 className="font-display text-display-sm font-extrabold tracking-tight text-balance sm:text-display-md lg:text-display-lg">
              Stories from <span className="text-gradient-brand">the build log</span>
            </h1>
            <p className="text-base text-muted-foreground text-balance sm:text-lg">
              Tutorials, post-mortems, and opinionated takes on shipping
              great software.
            </p>
          </div>
          <div className="mx-auto mt-8 flex w-full max-w-2xl items-center gap-2">
            <SearchArticleInput className="flex-1" />
            {isAdmin && (
              <AddArticleModal
                trigger={
                  <Button
                    type="button"
                    aria-label="Add new article"
                    title="New article"
                    className="h-11 w-11 shrink-0 gap-1.5 p-0 sm:w-auto sm:px-5"
                  >
                    <Plus className="h-4 w-4" />
                    <span className="hidden sm:inline">New article</span>
                  </Button>
                }
              />
            )}
          </div>
        </div>
      </section>

      <section className="container pb-16 pt-2 sm:pb-20 sm:pt-4">
        {categories.length > 0 && (
          <div className="mb-8">
            <CategoryFilterBar categories={categories} activeId={categoryId} />
          </div>
        )}
        {articles.length === 0 ? (
          <EmptyState
            title="No articles yet"
            description="We're working on the first set. Check back soon."
          />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {articles.map((item) => (
              <ArticleItem article={item} key={item.id} />
            ))}
          </div>
        )}
        <Pagination
          pageNumber={parseInt(pageNumber) || 1}
          route="/articles"
          pages={pages}
          query={{ categoryId }}
        />
      </section>
    </>
  );
}
