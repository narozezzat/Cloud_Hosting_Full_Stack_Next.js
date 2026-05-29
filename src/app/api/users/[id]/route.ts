import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { verifyToken } from "@/lib/auth/verifyToken";

interface Props {
  params: { id: string };
}

/**
 *  @method  GET
 *  @route   ~/api/users/:id
 *  @desc    Get a user's public profile (never exposes email/password)
 *  @access  public
 */
export async function GET(request: NextRequest, { params }: Props) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id) },
      select: {
        id: true,
        username: true,
        isAdmin: true,
        createdAt: true,
        _count: { select: { comments: true } },
      },
    });

    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}

/**
 *  @method  PATCH
 *  @route   ~/api/users/:id
 *  @desc    Toggle a user's admin flag
 *  @access  private (only admin)
 */
export async function PATCH(request: NextRequest, { params }: Props) {
  try {
    const actor = verifyToken(request);
    if (actor === null || actor.isAdmin === false) {
      return NextResponse.json(
        { message: "only admin, access denied" },
        { status: 403 },
      );
    }

    const targetId = parseInt(params.id);
    const target = await prisma.user.findUnique({ where: { id: targetId } });
    if (!target) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }

    const body = (await request.json()) as { isAdmin?: boolean };
    if (typeof body.isAdmin !== "boolean") {
      return NextResponse.json(
        { message: "isAdmin (boolean) is required" },
        { status: 400 },
      );
    }

    const updated = await prisma.user.update({
      where: { id: targetId },
      data: { isAdmin: body.isAdmin },
      select: { id: true, username: true, isAdmin: true },
    });
    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}

/**
 *  @method  DELETE
 *  @route   ~/api/users/:id
 *  @desc    Delete a user (cascades their comments, likes, bookmarks)
 *  @access  private (only admin)
 */
export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const actor = verifyToken(request);
    if (actor === null || actor.isAdmin === false) {
      return NextResponse.json(
        { message: "only admin, access denied" },
        { status: 403 },
      );
    }

    const targetId = parseInt(params.id);
    if (actor.id === targetId) {
      return NextResponse.json(
        { message: "you cannot delete your own account here" },
        { status: 400 },
      );
    }

    const target = await prisma.user.findUnique({ where: { id: targetId } });
    if (!target) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }

    await prisma.user.delete({ where: { id: targetId } });
    return NextResponse.json({ message: "user deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
