import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";

interface TopArticle {
  id: number;
  title: string;
  comments: number;
}

interface TopArticlesListProps {
  articles: TopArticle[];
}

export function TopArticlesList({ articles }: TopArticlesListProps) {
  if (articles.length === 0) {
    return (
      <EmptyState
        title="No discussion yet"
        description="Once articles get comments, the most-discussed will appear here."
      />
    );
  }

  const max = articles[0]?.comments || 1;

  return (
    <ul className="space-y-3">
      {articles.map((a, i) => {
        const pct = Math.max(8, Math.round((a.comments / max) * 100));
        return (
          <li key={a.id}>
            <Link
              href={`/articles/${a.id}`}
              className="group block rounded-md"
            >
              <div className="flex items-center justify-between text-sm">
                <span className="flex min-w-0 items-center gap-2">
                  <span className="font-display text-xs font-bold text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="truncate font-medium transition-colors group-hover:text-brand-500">
                    {a.title}
                  </span>
                </span>
                <span className="inline-flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                  <MessageSquare className="h-3 w-3" />
                  {a.comments}
                </span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500 transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
