import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageCircle, Calendar } from "lucide-react";
import prisma from "@/lib/db";
import { formatDate } from "@/lib/formatDate";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { GradientBlob } from "@/components/ui/GradientBlob";
import { EmptyState } from "@/components/ui/EmptyState";

export const dynamic = "force-dynamic";

interface PublicProfilePageProps {
  params: { id: string };
}

export default async function PublicProfilePage({
  params,
}: PublicProfilePageProps) {
  const id = parseInt(params.id);
  if (Number.isNaN(id)) notFound();

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      isAdmin: true,
      createdAt: true,
      _count: { select: { comments: true } },
      comments: {
        where: { parentId: null },
        orderBy: { createdAt: "desc" },
        take: 5,
        include: { article: { select: { id: true, title: true } } },
      },
    },
  });

  if (!user) notFound();

  return (
    <>
      <section className="relative overflow-hidden">
        <GradientBlob position="top-right" size="md" />
        <div className="container py-16">
          <div className="flex items-center gap-5">
            <Avatar
              name={user.username}
              size="xl"
              shape="square"
              className="shadow-md"
            />
            <div>
              <h1 className="font-display text-display-sm font-extrabold tracking-tight">
                {user.username}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                {user.isAdmin && <Badge variant="accent">Admin</Badge>}
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  Joined {formatDate(String(user.createdAt))}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MessageCircle className="h-3.5 w-3.5" />
                  {user._count.comments}{" "}
                  {user._count.comments === 1 ? "comment" : "comments"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section align="left" eyebrow="Activity" title="Recent comments">
        {user.comments.length === 0 ? (
          <EmptyState
            title="No comments yet"
            description={`${user.username} hasn't commented on anything yet.`}
          />
        ) : (
          <div className="space-y-3">
            {user.comments.map((comment) => (
              <Card key={comment.id} variant="elevated" className="p-5">
                <p className="text-sm text-foreground/90">{comment.text}</p>
                <Link
                  href={`/articles/${comment.article.id}`}
                  className="mt-3 inline-block text-xs font-semibold text-brand-500 hover:underline"
                >
                  on “{comment.article.title}” →
                </Link>
              </Card>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
