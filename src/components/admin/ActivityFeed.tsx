import Link from "next/link";
import { FileText, MessageSquare, UserPlus } from "lucide-react";
import type { ActivityItem } from "@/lib/analytics";
import { EmptyState } from "@/components/ui/EmptyState";

const ICONS = {
  comment: MessageSquare,
  article: FileText,
  user: UserPlus,
} as const;

const TINTS = {
  comment: "bg-accent-500/15 text-accent-600 dark:text-accent-300",
  article: "bg-brand-500/15 text-brand-600 dark:text-brand-300",
  user: "bg-success/15 text-success",
} as const;

function relativeTime(date: Date): string {
  const diff = Date.now() - new Date(date).getTime();
  const min = Math.floor(diff / 60_000);
  if (min < 1) return "just now";
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const d = Math.floor(hr / 24);
  if (d < 7) return `${d}d ago`;
  return new Date(date).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

interface ActivityFeedProps {
  items: ActivityItem[];
}

export function ActivityFeed({ items }: ActivityFeedProps) {
  if (items.length === 0) {
    return (
      <EmptyState
        title="No activity yet"
        description="Comments, new articles, and sign-ups will show up here."
      />
    );
  }

  return (
    <ul className="divide-y divide-border/60">
      {items.map((item) => {
        const Icon = ICONS[item.type];
        const tint = TINTS[item.type];
        const row = (
          <div className="flex items-start gap-3 px-3 py-4">
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${tint}`}
            >
              <Icon className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1 space-y-0.5">
              <p className="truncate text-sm font-medium text-foreground">
                {item.title}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {item.subtitle}
              </p>
            </div>
            <span className="shrink-0 pt-0.5 text-xs text-muted-foreground">
              {relativeTime(item.createdAt)}
            </span>
          </div>
        );
        return (
          <li key={`${item.type}-${item.id}`}>
            {item.href ? (
              <Link
                href={item.href}
                className="-mx-3 block rounded-lg transition-colors hover:bg-secondary/50"
              >
                {row}
              </Link>
            ) : (
              <div className="-mx-3">{row}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
