import Link from "next/link";
import {
  FileText,
  MessageSquare,
  Users,
  Activity,
  ArrowUpRight,
  BarChart3,
  LayoutDashboard,
} from "lucide-react";
import { getAnalytics } from "@/lib/analytics";
import { StatCard } from "@/components/ui/StatCard";
import { Card } from "@/components/ui/Card";
import { ActivityFeed } from "@/components/admin/ActivityFeed";
import { TopArticlesList } from "@/components/admin/TopArticlesList";
import AddArticleModal from "@/components/admin/AddArticleModal";

export const dynamic = "force-dynamic";

const QUICK_LINKS = [
  {
    label: "Manage articles",
    description: "Edit, delete, or review the catalog.",
    href: "/admin/articles-table?pageNumber=1",
    icon: FileText,
  },
  {
    label: "Review comments",
    description: "Moderate community discussion.",
    href: "/admin/comments-table?pageNumber=1",
    icon: MessageSquare,
  },
  {
    label: "Open analytics",
    description: "Growth, trends, and engagement.",
    href: "/admin/analytics",
    icon: BarChart3,
  },
];

export default async function AdminDashboardPage() {
  const analytics = await getAnalytics();
  const { totals, deltas, recentActivity, topArticles } = analytics;

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-brand-500/10 via-card to-accent-500/10 p-5 sm:p-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-brand-500/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-accent-500/20 blur-3xl"
        />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-card/80 px-3 py-1 text-xs font-semibold text-brand-600 ring-1 ring-brand-500/20 dark:text-brand-300">
              <LayoutDashboard className="h-3.5 w-3.5" />
              Overview
            </span>
            <h1 className="font-display text-2xl font-extrabold tracking-tight text-balance sm:text-3xl lg:text-4xl">
              A snapshot of your platform
            </h1>
            <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
              Everything that&rsquo;s shipping, what people are talking about,
              and where to dig in next.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <AddArticleModal />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid gap-3 grid-cols-2 sm:gap-4 lg:grid-cols-4">
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
      </section>

      {/* Quick links */}
      <section className="grid gap-3 sm:grid-cols-3 sm:gap-4">
        {QUICK_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group block focus-visible:outline-none"
          >
            <Card
              variant="elevated"
              className="flex h-full items-start gap-3 p-4 transition-transform duration-hover group-focus-visible:ring-2 group-focus-visible:ring-ring sm:p-5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-500/10 text-brand-500 group-hover:bg-brand-500/15">
                <link.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display text-sm font-semibold leading-tight transition-colors group-hover:text-brand-500 sm:text-base">
                  {link.label}
                </p>
                <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground sm:text-sm">
                  {link.description}
                </p>
              </div>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-hover group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
            </Card>
          </Link>
        ))}
      </section>

      {/* Bento */}
      <section className="grid gap-4 lg:grid-cols-5 lg:gap-6">
        <Card variant="elevated" className="p-5 sm:p-6 lg:col-span-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="font-display text-lg font-semibold sm:text-xl">
                Recent activity
              </h2>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                Latest signals across the platform.
              </p>
            </div>
            <Link
              href="/admin/analytics"
              className="hidden text-xs font-semibold text-brand-500 hover:underline sm:inline-flex sm:items-center sm:gap-1"
            >
              View all
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-4 sm:mt-5">
            <ActivityFeed items={recentActivity.slice(0, 6)} />
          </div>
        </Card>

        <Card variant="elevated" className="p-5 sm:p-6 lg:col-span-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="font-display text-lg font-semibold sm:text-xl">
                Top articles
              </h2>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                Most-discussed pieces right now.
              </p>
            </div>
          </div>
          <div className="mt-4 sm:mt-5">
            <TopArticlesList articles={topArticles.slice(0, 5)} />
          </div>
        </Card>
      </section>
    </div>
  );
}
