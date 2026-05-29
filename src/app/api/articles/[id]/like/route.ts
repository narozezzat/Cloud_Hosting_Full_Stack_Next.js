import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { verifyToken } from "@/lib/auth/verifyToken";

interface Props {
  params: { id: string };
}

/**
 *  @method  POST
 *  @route   ~/api/articles/:id/like
 *  @desc    Like an article (idempotent)
 *  @access  private (logged in user)
 */
export async function POST(request: NextRequest, { params }: Props) {
  return toggle(request, params, "like");
}

/**
 *  @method  DELETE
 *  @route   ~/api/articles/:id/like
 *  @desc    Remove a like (idempotent)
 *  @access  private (logged in user)
 */
export async function DELETE(request: NextRequest, { params }: Props) {
  return toggle(request, params, "unlike");
}

async function toggle(
  request: NextRequest,
  params: { id: string },
  action: "like" | "unlike",
) {
  try {
    const user = verifyToken(request);
    if (!user) {
      return NextResponse.json(
        { message: "only logged in user, access denied" },
        { status: 401 },
      );
    }

    const articleId = parseInt(params.id);
    const article = await prisma.article.findUnique({
      where: { id: articleId },
    });
    if (!article) {
      return NextResponse.json(
        { message: "article not found" },
        { status: 404 },
      );
    }

    if (action === "like") {
      await prisma.like.upsert({
        where: { userId_articleId: { userId: user.id, articleId } },
        create: { userId: user.id, articleId },
        update: {},
      });
    } else {
      await prisma.like.deleteMany({ where: { userId: user.id, articleId } });
    }

    const likeCount = await prisma.like.count({ where: { articleId } });
    return NextResponse.json(
      { liked: action === "like", likeCount },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
