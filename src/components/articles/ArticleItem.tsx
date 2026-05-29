import * as React from "react";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Article } from "@/generated/prisma";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/utils/formatDate";

interface ArticleItemProps {
  article: Article;
}

const ArticleItem = ({ article }: ArticleItemProps) => {
  const readMinutes = Math.max(
    1,
    Math.ceil((article.description?.length || 200) / 600),
  );

  return (
    <Link
      href={`/articles/${article.id}`}
      className="group block focus-visible:outline-none"
    >
      <Card
        variant="elevated"
        className="flex h-full flex-col gap-4 p-6 group-focus-visible:ring-2 group-focus-visible:ring-ring"
      >
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="default">Article</Badge>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {readMinutes} min read
          </span>
        </div>
        <h3 className="font-display text-lg font-semibold leading-snug line-clamp-2 transition-colors duration-hover group-hover:text-brand-500">
          {article.title}
        </h3>
        <p className="line-clamp-3 text-sm text-muted-foreground">
          {article.description}
        </p>
        <div className="mt-auto flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
          <span>{formatDate(String(article.createdAt))}</span>
          <span className="inline-flex items-center gap-1 font-semibold text-brand-500 transition-transform duration-hover group-hover:translate-x-0.5">
            Read
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </Card>
    </Link>
  );
};

export default ArticleItem;
