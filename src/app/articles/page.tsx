import { getArticles } from "@/apiCalls/articleApiCall";
import ArticleItem from "@/components/articles/ArticleItem";
import Pagination from "@/components/articles/Pagination";
import SearchArticleInput from "@/components/articles/SearchArticleInput";
import { Article } from "@/generated/prisma";
import { ARTICLE_PER_PAGE } from "@/utils/constants";
import { Metadata } from "next";
import prisma from "@/utils/db";
import { Section } from "@/components/ui/Section";
import { EmptyState } from "@/components/ui/EmptyState";
import { GradientBlob } from "@/components/ui/GradientBlob";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Articles — Cloud Hosting",
  description: "Articles, tutorials, and deep dives from the Cloud Hosting team.",
};

interface ArticlesPageProps {
  searchParams: { pageNumber: string };
}

export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {
  const pageNumber = searchParams.pageNumber || "1";
  const articles: Article[] = await getArticles(pageNumber);
  const count: number = await prisma.article.count();
  const pages = Math.ceil(count / ARTICLE_PER_PAGE);

  return (
    <>
      <section className="relative overflow-hidden">
        <GradientBlob position="top-right" size="lg" />
        <div className="container py-16 lg:py-20">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <Badge>Blog</Badge>
            <h1 className="font-display text-display-md font-extrabold tracking-tight text-balance sm:text-display-lg">
              Stories from <span className="text-gradient-brand">the build log</span>
            </h1>
            <p className="text-lg text-muted-foreground text-balance">
              Tutorials, post-mortems, and opinionated takes on shipping
              great software.
            </p>
          </div>
          <div className="mt-10">
            <SearchArticleInput />
          </div>
        </div>
      </section>

      <Section className="!py-0 pb-20">
        {articles.length === 0 ? (
          <EmptyState
            title="No articles yet"
            description="We're working on the first set. Check back soon."
          />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((item) => (
              <ArticleItem article={item} key={item.id} />
            ))}
          </div>
        )}
        <Pagination
          pageNumber={parseInt(pageNumber) || 1}
          route="/articles"
          pages={pages}
        />
      </Section>
    </>
  );
}
