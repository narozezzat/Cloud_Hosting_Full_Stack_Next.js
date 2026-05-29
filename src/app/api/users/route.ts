import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { verifyToken } from "@/lib/auth/verifyToken";

/**
 *  @method  GET
 *  @route   ~/api/users
 *  @desc    List all users (for admin management)
 *  @access  private (only admin)
 */
export async function GET(request: NextRequest) {
  try {
    const actor = verifyToken(request);
    if (actor === null || actor.isAdmin === false) {
      return NextResponse.json(
        { message: "only admin, access denied" },
        { status: 403 },
      );
    }

    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        username: true,
        email: true,
        isAdmin: true,
        createdAt: true,
        _count: { select: { comments: true } },
      },
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
