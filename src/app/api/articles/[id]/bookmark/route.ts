import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { verifyToken } from "@/lib/auth/verifyToken";

interface Props {
  params: { id: string };
}

/**
 *  @method  POST
 *  @route   ~/api/articles/:id/bookmark
 *  @desc    Bookmark an article (idempotent)
 *  @access  private (logged in user)
 */
export async function POST(request: NextRequest, { params }: Props) {
  return toggle(request, params, "bookmark");
}

/**
 *  @method  DELETE
 *  @route   ~/api/articles/:id/bookmark
 *  @desc    Remove a bookmark (idempotent)
 *  @access  private (logged in user)
 */
export async function DELETE(request: NextRequest, { params }: Props) {
  return toggle(request, params, "unbookmark");
}

async function toggle(
  request: NextRequest,
  params: { id: string },
  action: "bookmark" | "unbookmark",
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

    if (action === "bookmark") {
      await prisma.bookmark.upsert({
        where: { userId_articleId: { userId: user.id, articleId } },
        create: { userId: user.id, articleId },
        update: {},
      });
    } else {
      await prisma.bookmark.deleteMany({
        where: { userId: user.id, articleId },
      });
    }

    return NextResponse.json(
      { bookmarked: action === "bookmark" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
