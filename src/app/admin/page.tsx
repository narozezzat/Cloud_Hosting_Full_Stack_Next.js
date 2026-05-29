import {
  FileText,
  MessageSquare,
  Users,
  Activity,
} from "lucide-react";
import { getAnalytics } from "@/lib/analytics";
import { StatCard } from "@/components/ui/StatCard";
import { Card } from "@/components/ui/Card";
import { ActivityFeed } from "@/components/admin/ActivityFeed";
import AddArticleForm from "./AddArticleForm";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const analytics = await getAnalytics();
  const { totals, deltas, recentActivity } = analytics;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-extrabold tracking-tight">
          Overview
        </h1>
        <p className="text-sm text-muted-foreground">
          A snapshot of your platform today.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Users"
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

      <div className="grid gap-6 lg:grid-cols-3">
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

        <Card variant="elevated" className="p-6">
          <h2 className="font-display text-xl font-semibold">Recent activity</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Latest signals across the platform.
          </p>
          <div className="mt-5">
            <ActivityFeed items={recentActivity} />
          </div>
        </Card>
      </div>
    </div>
  );
}
