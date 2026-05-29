import "server-only";
import prisma from "@/lib/db";

const MONTHS_BACK = 7;
const MS_IN_DAY = 86_400_000;
const PERIOD_DAYS = 30;

export type Metric = "users" | "articles" | "comments";

export interface SeriesPoint {
  label: string;
  users: number;
  articles: number;
  comments: number;
}

export interface ActivityItem {
  type: "comment" | "article" | "user";
  id: number;
  title: string;
  subtitle: string;
  href?: string;
  createdAt: Date;
}

export interface AnalyticsSummary {
  totals: {
    users: number;
    articles: number;
    comments: number;
    /** Distinct users who left a comment in the last 30 days. */
    activeUsers: number;
  };
  deltas: {
    users: number;
    articles: number;
    comments: number;
    activeUsers: number;
  };
  series: SeriesPoint[];
  topArticles: { id: number; title: string; comments: number }[];
  recentActivity: ActivityItem[];
}

function monthKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function monthLabel(d: Date): string {
  return d.toLocaleDateString("en-US", { month: "short" });
}

function buildMonthBuckets(months: number) {
  const now = new Date();
  const buckets: { key: string; label: string; date: Date }[] = [];
  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    buckets.push({ key: monthKey(d), label: monthLabel(d), date: d });
  }
  return buckets;
}

function pctChange(current: number, prior: number): number {
  if (prior === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - prior) / prior) * 100);
}

/**
 * Compute the analytics summary used by the admin dashboard and analytics page.
 *
 * One round-trip to the DB per metric — kept parallel so the wall-clock cost is
 * roughly one query. Aggregation into monthly buckets happens in JS rather than
 * SQL so the implementation stays portable across Prisma drivers.
 */
export async function getAnalytics(): Promise<AnalyticsSummary> {
  const now = new Date();
  const periodStart = new Date(now.getTime() - PERIOD_DAYS * MS_IN_DAY);
  const priorPeriodStart = new Date(
    now.getTime() - PERIOD_DAYS * 2 * MS_IN_DAY,
  );
  const seriesStart = new Date(
    now.getFullYear(),
    now.getMonth() - (MONTHS_BACK - 1),
    1,
  );

  const [
    usersTotal,
    articlesTotal,
    commentsTotal,
    usersLast,
    usersPrior,
    articlesLast,
    articlesPrior,
    commentsLast,
    commentsPrior,
    userDates,
    articleDates,
    commentDates,
    activeUserLast,
    activeUserPrior,
    topArticles,
    recentComments,
    recentArticles,
    recentUsers,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.article.count(),
    prisma.comment.count(),
    prisma.user.count({ where: { createdAt: { gte: periodStart } } }),
    prisma.user.count({
      where: { createdAt: { gte: priorPeriodStart, lt: periodStart } },
    }),
    prisma.article.count({ where: { createdAt: { gte: periodStart } } }),
    prisma.article.count({
      where: { createdAt: { gte: priorPeriodStart, lt: periodStart } },
    }),
    prisma.comment.count({ where: { createdAt: { gte: periodStart } } }),
    prisma.comment.count({
      where: { createdAt: { gte: priorPeriodStart, lt: periodStart } },
    }),
    prisma.user.findMany({
      where: { createdAt: { gte: seriesStart } },
      select: { createdAt: true },
    }),
    prisma.article.findMany({
      where: { createdAt: { gte: seriesStart } },
      select: { createdAt: true },
    }),
    prisma.comment.findMany({
      where: { createdAt: { gte: seriesStart } },
      select: { createdAt: true },
    }),
    prisma.comment.findMany({
      where: { createdAt: { gte: periodStart } },
      distinct: ["userId"],
      select: { userId: true },
    }),
    prisma.comment.findMany({
      where: { createdAt: { gte: priorPeriodStart, lt: periodStart } },
      distinct: ["userId"],
      select: { userId: true },
    }),
    prisma.article.findMany({
      orderBy: { comments: { _count: "desc" } },
      take: 5,
      select: {
        id: true,
        title: true,
        _count: { select: { comments: true } },
      },
    }),
    prisma.comment.findMany({
      take: 6,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { username: true } },
        article: { select: { id: true, title: true } },
      },
    }),
    prisma.article.findMany({
      take: 6,
      orderBy: { createdAt: "desc" },
      select: { id: true, title: true, createdAt: true },
    }),
    prisma.user.findMany({
      take: 6,
      orderBy: { createdAt: "desc" },
      select: { id: true, username: true, createdAt: true },
    }),
  ]);

  // Bucket the time-series in JS so we don't need DATE_TRUNC.
  const buckets = buildMonthBuckets(MONTHS_BACK);
  const byKey: Record<string, Omit<SeriesPoint, "label">> = {};
  for (const b of buckets) {
    byKey[b.key] = { users: 0, articles: 0, comments: 0 };
  }
  for (const u of userDates) {
    const k = monthKey(u.createdAt);
    if (byKey[k]) byKey[k].users++;
  }
  for (const a of articleDates) {
    const k = monthKey(a.createdAt);
    if (byKey[k]) byKey[k].articles++;
  }
  for (const c of commentDates) {
    const k = monthKey(c.createdAt);
    if (byKey[k]) byKey[k].comments++;
  }
  const series: SeriesPoint[] = buckets.map((b) => ({
    label: b.label,
    ...byKey[b.key],
  }));

  // Merge into a single, sorted activity feed.
  const recentActivity: ActivityItem[] = [
    ...recentComments.map((c) => ({
      type: "comment" as const,
      id: c.id,
      title: `${c.user.username} commented`,
      subtitle: `on “${c.article.title}”`,
      href: `/articles/${c.article.id}#comments`,
      createdAt: c.createdAt,
    })),
    ...recentArticles.map((a) => ({
      type: "article" as const,
      id: a.id,
      title: "New article published",
      subtitle: a.title,
      href: `/articles/${a.id}`,
      createdAt: a.createdAt,
    })),
    ...recentUsers.map((u) => ({
      type: "user" as const,
      id: u.id,
      title: "New member joined",
      subtitle: `@${u.username}`,
      createdAt: u.createdAt,
    })),
  ]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 8);

  return {
    totals: {
      users: usersTotal,
      articles: articlesTotal,
      comments: commentsTotal,
      activeUsers: activeUserLast.length,
    },
    deltas: {
      users: pctChange(usersLast, usersPrior),
      articles: pctChange(articlesLast, articlesPrior),
      comments: pctChange(commentsLast, commentsPrior),
      activeUsers: pctChange(activeUserLast.length, activeUserPrior.length),
    },
    series,
    topArticles: topArticles
      .filter((a) => a._count.comments > 0)
      .map((a) => ({
        id: a.id,
        title: a.title,
        comments: a._count.comments,
      })),
    recentActivity,
  };
}
