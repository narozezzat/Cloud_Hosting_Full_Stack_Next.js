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
      <div className="rounded-lg border border-dashed border-border bg-secondary/30 px-4 py-8">
        <EmptyState
          title="No discussion yet"
          description="Once articles get comments, the most-discussed will appear here."
        />
      </div>
    );
  }

  const max = articles[0]?.comments || 1;

  return (
    <ul className="space-y-3.5">
      {articles.map((a, i) => {
        const pct = Math.max(8, Math.round((a.comments / max) * 100));
        return (
          <li key={a.id}>
            <Link
              href={`/articles/${a.id}`}
              className="group block rounded-lg border border-transparent bg-secondary/30 px-4 py-3.5 transition-all hover:border-brand-500/20 hover:bg-secondary/60 hover:shadow-sm"
            >
              <div className="flex items-start justify-between gap-3 text-sm">
                <span className="flex min-w-0 items-start gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-background font-display text-xs font-bold text-muted-foreground ring-1 ring-border transition-colors group-hover:text-brand-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-medium leading-5 transition-colors group-hover:text-brand-500">
                      {a.title}
                    </span>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      Engagement score
                    </span>
                  </span>
                </span>
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground ring-1 ring-border">
                  <MessageSquare className="h-3 w-3" />
                  {a.comments}
                </span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-background ring-1 ring-border/60">
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
