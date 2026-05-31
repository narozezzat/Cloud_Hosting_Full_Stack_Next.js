import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { verifyToken } from "@/lib/auth/verifyToken";
import { AdminSearchResults } from "@/lib/types";

const GROUP_LIMIT = 5;

/**
 *  @method  GET
 *  @route   ~/api/admin/search?q=value
 *  @desc    Unified admin search across articles, users, and categories
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

    const q = request.nextUrl.searchParams.get("q")?.trim() || "";
    if (!q) {
      const empty: AdminSearchResults = {
        articles: [],
        users: [],
        categories: [],
      };
      return NextResponse.json(empty, { status: 200 });
    }

    const [articles, users, categories] = await Promise.all([
      prisma.article.findMany({
        where: {
          OR: [
            { title: { contains: q, mode: "insensitive" } },
            { description: { contains: q, mode: "insensitive" } },
          ],
        },
        select: { id: true, title: true, category: { select: { name: true } } },
        orderBy: { createdAt: "desc" },
        take: GROUP_LIMIT,
      }),
      prisma.user.findMany({
        where: {
          OR: [
            { username: { contains: q, mode: "insensitive" } },
            { email: { contains: q, mode: "insensitive" } },
          ],
        },
        select: { id: true, username: true, email: true, isAdmin: true },
        orderBy: { createdAt: "desc" },
        take: GROUP_LIMIT,
      }),
      prisma.category.findMany({
        where: { name: { contains: q, mode: "insensitive" } },
        select: { id: true, name: true, slug: true },
        orderBy: { name: "asc" },
        take: GROUP_LIMIT,
      }),
    ]);

    const results: AdminSearchResults = { articles, users, categories };
    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
