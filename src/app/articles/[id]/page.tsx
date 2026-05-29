import AddCommentForm from "@/components/comments/AddCommentForm";
import CommentItem from "@/components/comments/CommentItem";
import { SingleArticle } from "@/utils/types";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { cookies } from "next/headers";
import prisma from "@/utils/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { GradientBlob } from "@/components/ui/GradientBlob";
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

  return (
    <>
      <section className="relative overflow-hidden">
        <GradientBlob position="top-right" size="md" />
        <div className="container max-w-3xl py-12">
          <Link
            href="/articles?pageNumber=1"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to articles
          </Link>
          <div className="mt-6 space-y-4">
            <Badge>Article</Badge>
            <h1 className="font-display text-display-sm font-extrabold tracking-tight text-balance sm:text-display-md">
              {article.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(String(article.createdAt))}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MessageCircle className="h-3.5 w-3.5" />
                {article.comments.length} comments
              </span>
            </div>
          </div>
        </div>
      </section>

      <article className="container max-w-3xl pb-20">
        <div className="max-w-none whitespace-pre-line text-lg leading-relaxed text-foreground/90">
          {article.description}
        </div>

        <div className="mt-16 border-t border-border pt-10">
          <h2 className="font-display text-2xl font-bold">
            Comments{" "}
            <span className="text-muted-foreground">
              ({article.comments.length})
            </span>
          </h2>

          <div className="mt-6">
            {payload ? (
              <Card variant="default" className="p-5">
                <AddCommentForm articleId={article.id} />
              </Card>
            ) : (
              <Card variant="outlined" className="p-5">
                <p className="text-sm text-muted-foreground">
                  <Link
                    href="/login"
                    className="font-semibold text-brand-500 hover:underline"
                  >
                    Log in
                  </Link>{" "}
                  to join the conversation.
                </p>
              </Card>
            )}
          </div>

          <div className="mt-6 space-y-4">
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
        </div>
      </article>
    </>
  );
};

export default SingleArticlePage;
