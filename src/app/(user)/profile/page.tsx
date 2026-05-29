import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyTokenForPage } from "@/lib/auth/verifyToken";
import prisma from "@/lib/db";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import { GradientBlob } from "@/components/ui/GradientBlob";
import { Avatar } from "@/components/ui/Avatar";
import { EmptyState } from "@/components/ui/EmptyState";
import ArticleItem from "@/components/articles/ArticleItem";
import { ArticleWithCategory } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const token = cookies().get("jwtToken")?.value || "";
  const payload = verifyTokenForPage(token);
  if (!payload) redirect("/login");

  const bookmarks = await prisma.bookmark.findMany({
    where: { userId: payload.id },
    orderBy: { createdAt: "desc" },
    include: { article: { include: { category: true } } },
  });
  const savedArticles = bookmarks.map(
    (b) => b.article,
  ) as ArticleWithCategory[];

  return (
    <>
      <section className="relative overflow-hidden">
        <GradientBlob position="top-right" size="md" />
        <div className="container py-16">
          <div className="flex items-center gap-5">
            <Avatar
              name={payload.username}
              size="xl"
              shape="square"
              className="shadow-md"
            />
            <div>
              <h1 className="font-display text-display-sm font-extrabold tracking-tight">
                {payload.username}
              </h1>
              <div className="mt-2 flex items-center gap-2">
                <Badge variant="success">Active</Badge>
                {payload.isAdmin && <Badge variant="accent">Admin</Badge>}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section align="left" eyebrow="Profile" title="Account details">
        <div className="grid gap-4 sm:grid-cols-2">
          <Card variant="elevated" className="p-6">
            <p className="text-sm text-muted-foreground">Username</p>
            <p className="mt-1 font-display text-lg font-semibold">
              {payload.username}
            </p>
          </Card>
          <Card variant="elevated" className="p-6">
            <p className="text-sm text-muted-foreground">Role</p>
            <p className="mt-1 font-display text-lg font-semibold">
              {payload.isAdmin ? "Administrator" : "Member"}
            </p>
          </Card>
        </div>
      </Section>

      <Section
        align="left"
        eyebrow="Library"
        title="Saved articles"
        subtitle="Articles you've bookmarked for later."
      >
        {savedArticles.length === 0 ? (
          <EmptyState
            title="No saved articles yet"
            description="Tap “Save” on any article to bookmark it here."
          />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {savedArticles.map((article) => (
              <ArticleItem key={article.id} article={article} />
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
