import {
  Users,
  FileText,
  MessageSquare,
  Activity,
} from "lucide-react";
import { getAnalytics } from "@/lib/analytics";
import { StatCard } from "@/components/ui/StatCard";
import { Card } from "@/components/ui/Card";
import { AnalyticsChart } from "@/components/admin/AnalyticsChart";
import { TopArticlesList } from "@/components/admin/TopArticlesList";
import { ActivityFeed } from "@/components/admin/ActivityFeed";

export const dynamic = "force-dynamic";

export default async function AnalyticsPage() {
  const analytics = await getAnalytics();
  const { totals, deltas, series, topArticles, recentActivity } = analytics;

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
          Analytics
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Growth, engagement, and what&apos;s trending.
        </p>
      </div>

      <div className="grid gap-3 grid-cols-2 sm:gap-4 lg:grid-cols-4">
        <StatCard
          label="Total users"
          value={totals.users}
          icon={<Users className="h-5 w-5" />}
          delta={{ value: deltas.users, label: "vs. last 30d" }}
        />
        <StatCard
          label="Articles"
          value={totals.articles}
          icon={<FileText className="h-5 w-5" />}
          delta={{ value: deltas.articles, label: "vs. last 30d" }}
        />
        <StatCard
          label="Comments"
          value={totals.comments}
          icon={<MessageSquare className="h-5 w-5" />}
          delta={{ value: deltas.comments, label: "vs. last 30d" }}
        />
        <StatCard
          label="Active users"
          value={totals.activeUsers}
          icon={<Activity className="h-5 w-5" />}
          delta={{ value: deltas.activeUsers, label: "vs. last 30d" }}
        />
      </div>

      {/* Bento grid */}
      <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
        <Card variant="elevated" className="p-5 sm:p-6 lg:col-span-2">
          <AnalyticsChart series={series} />
        </Card>

        <Card variant="elevated" className="p-5 sm:p-6">
          <h2 className="font-display text-lg font-semibold sm:text-xl">
            Top articles
          </h2>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            Most-discussed pieces right now.
          </p>
          <div className="mt-4 sm:mt-5">
            <TopArticlesList articles={topArticles} />
          </div>
        </Card>
      </div>

      <Card variant="elevated" className="p-5 sm:p-6">
        <h2 className="font-display text-lg font-semibold sm:text-xl">
          Recent activity
        </h2>
        <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
          Latest signals across the platform.
        </p>
        <div className="mt-4 sm:mt-5">
          <ActivityFeed items={recentActivity} />
        </div>
      </Card>
    </div>
  );
}
