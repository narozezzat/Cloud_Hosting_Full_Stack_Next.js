import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { verifyToken } from "@/lib/auth/verifyToken";
import { UpdateCategoryDto } from "@/lib/validation/dtos";
import { updateCategorySchema } from "@/lib/validation/validationSchema";
import { slugify } from "@/lib/slugify";

interface Props {
  params: { id: string };
}

/**
 *  @method  PUT
 *  @route   ~/api/categories/:id
 *  @desc    Update Category
 *  @access  private (only admin)
 */
export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const user = verifyToken(request);
    if (user === null || user.isAdmin === false) {
      return NextResponse.json(
        { message: "only admin, access denied" },
        { status: 403 },
      );
    }

    const category = await prisma.category.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!category) {
      return NextResponse.json(
        { message: "category not found" },
        { status: 404 },
      );
    }

    const body = (await request.json()) as UpdateCategoryDto;
    const validation = updateCategorySchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 },
      );
    }

    const name = body.name.trim();
    const updated = await prisma.category.update({
      where: { id: parseInt(params.id) },
      data: { name, slug: slugify(name) },
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
 *  @route   ~/api/categories/:id
 *  @desc    Delete Category (articles keep their data, category is unset)
 *  @access  private (only admin)
 */
export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const user = verifyToken(request);
    if (user === null || user.isAdmin === false) {
      return NextResponse.json(
        { message: "only admin, access denied" },
        { status: 403 },
      );
    }

    const category = await prisma.category.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!category) {
      return NextResponse.json(
        { message: "category not found" },
        { status: 404 },
      );
    }

    await prisma.category.delete({ where: { id: parseInt(params.id) } });
    return NextResponse.json({ message: "category deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
