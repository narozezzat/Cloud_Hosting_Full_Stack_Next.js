import prisma from "@/lib/db";
import { Prisma } from "@/generated/prisma";
import { CategoryWithCount } from "@/lib/types";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminCategoriesClient from "@/components/admin/AdminCategoriesClient";
import { Card } from "@/components/ui/Card";

export const dynamic = "force-dynamic";

interface AdminCategoriesPageProps {
  searchParams: { q?: string };
}

export default async function AdminCategoriesPage({
  searchParams,
}: AdminCategoriesPageProps) {
  const q = searchParams.q?.trim() || "";
  const where: Prisma.CategoryWhereInput = q
    ? { name: { contains: q, mode: "insensitive" } }
    : {};

  const categories = (await prisma.category.findMany({
    where,
    orderBy: { name: "asc" },
    include: { _count: { select: { articles: true } } },
  })) as CategoryWithCount[];

  return (
    <div className="flex flex-1 flex-col gap-6">
      <AdminPageHeader
        title="Categories"
        badgeText={`${categories.length} ${
          categories.length === 1 ? "category" : "categories"
        }`}
        description="Group articles into categories readers can filter by."
      />
      <Card className="rounded-md p-5">
        <AdminCategoriesClient categories={categories} searchQuery={q} />
      </Card>
    </div>
  );
}
