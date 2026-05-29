import { FileText, MessageSquare, Users, TrendingUp } from "lucide-react";
import prisma from "@/utils/db";
import { StatCard } from "@/components/ui/StatCard";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import AddArticleForm from "./AddArticleForm";
import { formatDate } from "@/utils/formatDate";

export default async function AdminDashboardPage() {
  const [articlesCount, commentsCount, usersCount, recentArticles] =
    await Promise.all([
      prisma.article.count(),
      prisma.comment.count(),
      prisma.user.count(),
      prisma.article.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: { id: true, title: true, createdAt: true },
      }),
    ]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight">
            Overview
          </h1>
          <p className="text-sm text-muted-foreground">
            A snapshot of your platform today.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Users"
          value={usersCount}
          icon={<Users className="h-5 w-5" />}
          delta={{ value: 12, label: "vs. last month" }}
        />
        <StatCard
          label="Articles"
          value={articlesCount}
          icon={<FileText className="h-5 w-5" />}
          delta={{ value: 8 }}
        />
        <StatCard
          label="Comments"
          value={commentsCount}
          icon={<MessageSquare className="h-5 w-5" />}
          delta={{ value: 24 }}
        />
        <StatCard
          label="Growth"
          value="+18%"
          icon={<TrendingUp className="h-5 w-5" />}
          delta={{ value: 3, label: "WoW" }}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quick action: add article */}
        <Card variant="elevated" className="p-6 lg:col-span-2">
          <h2 className="font-display text-xl font-semibold">
            Publish a new article
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Title, description, and you're live.
          </p>
          <div className="mt-5">
            <AddArticleForm />
          </div>
        </Card>

        {/* Recent activity */}
        <Card variant="elevated" className="p-6">
          <h2 className="font-display text-xl font-semibold">Recent articles</h2>
          <ul className="mt-4 space-y-3">
            {recentArticles.length === 0 ? (
              <li className="text-sm text-muted-foreground">No articles yet.</li>
            ) : (
              recentArticles.map((a) => (
                <li
                  key={a.id}
                  className="flex items-start justify-between gap-3 border-b border-border/60 pb-3 last:border-0 last:pb-0"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{a.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(String(a.createdAt))}
                    </p>
                  </div>
                  <Badge variant="neutral">#{a.id}</Badge>
                </li>
              ))
            )}
          </ul>
        </Card>
      </div>
    </div>
  );
}
