import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { verifyToken } from "@/lib/auth/verifyToken";
import { CreateCommentDto } from "@/lib/validation/dtos";
import { createCommentSchema } from "@/lib/validation/validationSchema";
import { COMMENT_PER_PAGE } from "@/lib/constants";

/**
 *  @method  POST
 *  @route   ~/api/comments
 *  @desc    Create New Comment
 *  @access  private (only logged in user)
 */
export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (!user) {
      return NextResponse.json(
        { message: "only logged in user, access denied" },
        { status: 401 },
      );
    }

    const body = (await request.json()) as CreateCommentDto;

    const validation = createCommentSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 },
      );
    }

    const newComment = await prisma.comment.create({
      data: {
        text: body.text,
        articleId: body.articleId,
        userId: user.id,
      },
    });
    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}

/**
 *  @method  GET
 *  @route   ~/api/comments
 *  @desc    Get All Comments (paginated)
 *  @access  private (only admin)
 */
export async function GET(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (user === null || user.isAdmin === false) {
      return NextResponse.json(
        { message: "only admin, access denied" },
        { status: 403 },
      );
    }

    const pageNumber =
      request.nextUrl.searchParams.get("pageNumber") || "1";

    const [comments, count] = await Promise.all([
      prisma.comment.findMany({
        skip: COMMENT_PER_PAGE * (parseInt(pageNumber) - 1),
        take: COMMENT_PER_PAGE,
        orderBy: { createdAt: "desc" },
      }),
      prisma.comment.count(),
    ]);

    return NextResponse.json({ comments, count }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
