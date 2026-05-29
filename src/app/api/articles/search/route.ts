import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { Prisma } from "@/generated/prisma";

/**
 *  @method  GET
 *  @route   ~/api/articles/search?searchText=value&categoryId=1&sort=newest
 *  @desc    Search Articles by title OR description, with optional category + sort
 *  @access  public
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const searchText = searchParams.get("searchText")?.trim() || "";
    const categoryId = searchParams.get("categoryId");
    const sort = searchParams.get("sort") === "oldest" ? "asc" : "desc";

    const where: Prisma.ArticleWhereInput = {};
    if (searchText) {
      where.OR = [
        { title: { contains: searchText, mode: "insensitive" } },
        { description: { contains: searchText, mode: "insensitive" } },
      ];
    }
    if (categoryId) {
      where.categoryId = parseInt(categoryId);
    }

    const articles = await prisma.article.findMany({
      where,
      include: { category: true },
      orderBy: { createdAt: sort },
      take: searchText || categoryId ? 50 : 6,
    });

    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
