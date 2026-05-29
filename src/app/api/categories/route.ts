import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { verifyToken } from "@/lib/auth/verifyToken";
import { CreateCategoryDto } from "@/lib/validation/dtos";
import { createCategorySchema } from "@/lib/validation/validationSchema";
import { slugify } from "@/lib/slugify";

/**
 *  @method  GET
 *  @route   ~/api/categories
 *  @desc    Get All Categories (with article counts)
 *  @access  public
 */
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { articles: true } } },
    });
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}

/**
 *  @method  POST
 *  @route   ~/api/categories
 *  @desc    Create New Category
 *  @access  private (only admin)
 */
export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (user === null || user.isAdmin === false) {
      return NextResponse.json(
        { message: "only admin, access denied" },
        { status: 403 },
      );
    }

    const body = (await request.json()) as CreateCategoryDto;

    const validation = createCategorySchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 },
      );
    }

    const name = body.name.trim();
    const slug = slugify(name);

    const existing = await prisma.category.findFirst({
      where: { OR: [{ name: { equals: name, mode: "insensitive" } }, { slug }] },
    });
    if (existing) {
      return NextResponse.json(
        { message: "category already exists" },
        { status: 409 },
      );
    }

    const category = await prisma.category.create({ data: { name, slug } });
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
