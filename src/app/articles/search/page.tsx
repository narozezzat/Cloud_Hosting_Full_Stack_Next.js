import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getArticlesBasedOnSearch } from "@/apiCalls/articleApiCall";
import ArticleItem from "@/components/articles/ArticleItem";
import { Article } from "@/generated/prisma";
import { Section } from "@/components/ui/Section";
import { EmptyState } from "@/components/ui/EmptyState";
import { Badge } from "@/components/ui/Badge";

interface SearchArticlePageProps {
  searchParams: { searchText: string };
}

const SearchArticlePage = async ({
  searchParams: { searchText },
}: SearchArticlePageProps) => {
  const articles: Article[] = await getArticlesBasedOnSearch(searchText);

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
          Results for{" "}
          <span className="text-gradient-brand">“{searchText}”</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          {articles.length} {articles.length === 1 ? "result" : "results"}
        </p>
      </div>

      {articles.length === 0 ? (
        <EmptyState
          title="No articles found"
          description={`Nothing matched "${searchText}". Try a different keyword.`}
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
