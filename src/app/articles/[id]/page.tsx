import AddCommentForm from "@/components/comments/AddCommentForm";
import CommentItem from "@/components/comments/CommentItem";
import { SingleArticle } from "@/utils/types";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { cookies } from "next/headers";
import prisma from "@/utils/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { ShareStrip } from "@/components/articles/ShareStrip";
import { formatDate } from "@/utils/formatDate";

interface SingleArticlePageProps {
  params: { id: string };
}

const SingleArticlePage = async ({ params }: SingleArticlePageProps) => {
  const token = cookies().get("jwtToken")?.value || "";
  const payload = verifyTokenForPage(token);

  const article = (await prisma.article.findUnique({
    where: { id: parseInt(params.id) },
    include: {
      comments: {
        include: { user: { select: { username: true } } },
        orderBy: { createdAt: "desc" },
      },
    },
  })) as SingleArticle;

  if (!article) redirect("/not-found");

  const readMinutes = Math.max(
    1,
    Math.ceil((article.description?.length || 200) / 600),
  );

  return (
    <div className="container py-12 space-y-10">
      <Link
        href="/articles?pageNumber=1"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to articles
      </Link>

      {/* Header */}
      <header className="space-y-5">
        <Badge>Article</Badge>
        <h1 className="font-display text-display-md font-extrabold tracking-tight text-balance sm:text-display-lg">
          {article.title}
        </h1>

        {/* Author byline strip */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-border py-4 text-sm">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-xs font-bold text-white">
              CH
            </div>
            <div className="leading-tight">
              <p className="font-semibold text-foreground">
                Cloud Hosting Team
              </p>
              <p className="text-xs text-muted-foreground">Editorial</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-muted-foreground sm:ml-auto">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(String(article.createdAt))}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {readMinutes} min read
            </span>
            <a
              href="#comments"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              {article.comments.length}{" "}
              {article.comments.length === 1 ? "comment" : "comments"}
            </a>
          </div>
        </div>
      </header>

      {/* Body */}
      <article className="whitespace-pre-line text-lg leading-relaxed text-foreground/90">
        {article.description}
      </article>

      {/* Share strip */}
      <ShareStrip title={article.title} />

      {/* Comments */}
      <section id="comments" className="space-y-6 border-t border-border pt-10">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold">Comments</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {article.comments.length}{" "}
              {article.comments.length === 1 ? "reply" : "replies"} so far
            </p>
          </div>
        </div>

        {payload ? (
          <Card variant="default" className="p-5">
            <AddCommentForm articleId={article.id} />
          </Card>
        ) : (
          <Card
            variant="outlined"
            className="flex items-center justify-between gap-3 p-5"
          >
            <p className="text-sm text-muted-foreground">
              Want to leave a comment?
            </p>
            <Link
              href="/login"
              className="text-sm font-semibold text-brand-500 hover:underline"
            >
              Log in →
            </Link>
          </Card>
        )}

        <div className="space-y-4">
          {article.comments.length === 0 ? (
            <EmptyState
              title="No comments yet"
              description="Be the first to share your thoughts."
            />
          ) : (
            article.comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                userId={payload?.id}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default SingleArticlePage;
