import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getArticlesBasedOnSearch } from "@/lib/api/articleApiCall";
import ArticleItem from "@/components/articles/ArticleItem";
import SearchArticleInput from "@/components/articles/SearchArticleInput";
import { SearchFilters } from "@/components/articles/SearchFilters";
import { ArticleWithCategory, CategoryWithCount } from "@/lib/types";
import prisma from "@/lib/db";
import { Section } from "@/components/ui/Section";
import { EmptyState } from "@/components/ui/EmptyState";
import { Badge } from "@/components/ui/Badge";
import { notFound } from "next/navigation";

interface SearchArticlePageProps {
  searchParams: { searchText?: string; categoryId?: string; sort?: string };
}

const SearchArticlePage = async ({ searchParams }: SearchArticlePageProps) => {
  const searchText = searchParams.searchText || "";
  const { categoryId, sort } = searchParams;
  // Guard the only param that feeds a DB filter; a non-numeric id can't match.
  if (categoryId && Number.isNaN(parseInt(categoryId))) notFound();

  const [articles, categories] = await Promise.all([
    getArticlesBasedOnSearch(searchText, { categoryId, sort }) as Promise<
      ArticleWithCategory[]
    >,
    prisma.category.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { articles: true } } },
    }) as Promise<CategoryWithCount[]>,
  ]);

  return (
    <Section align="left" className="!py-12" containerClassName="space-y-8">
      <Link
        href="/articles?pageNumber=1"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to all articles
      </Link>
      <div className="space-y-3">
        <Badge>Search</Badge>
        <h1 className="font-display text-display-sm font-extrabold tracking-tight">
          {searchText ? (
            <>
              Results for{" "}
              <span className="text-gradient-brand">“{searchText}”</span>
            </>
          ) : (
            "Browse articles"
          )}
        </h1>
        <p className="text-sm text-muted-foreground">
          {articles.length} {articles.length === 1 ? "result" : "results"}
        </p>
      </div>

      <div className="max-w-2xl">
        <SearchArticleInput defaultValue={searchText} />
      </div>

      <SearchFilters
        searchText={searchText}
        categories={categories}
        categoryId={categoryId}
        sort={sort}
      />

      {articles.length === 0 ? (
        <EmptyState
          title="No articles found"
          description={
            searchText
              ? `Nothing matched "${searchText}". Try a different keyword or filter.`
              : "Try a different filter."
          }
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((item) => (
            <ArticleItem key={item.id} article={item} />
          ))}
        </div>
      )}
    </Section>
  );
};

export default SearchArticlePage;
