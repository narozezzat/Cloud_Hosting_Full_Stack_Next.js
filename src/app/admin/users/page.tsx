import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { Prisma } from "@/generated/prisma";
import { verifyTokenForPage } from "@/lib/auth/verifyToken";
import { AdminUserRow } from "@/lib/types";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminUsersClient from "@/components/admin/AdminUsersClient";
import { Card } from "@/components/ui/Card";

export const dynamic = "force-dynamic";

interface AdminUsersPageProps {
  searchParams: { q?: string };
}

export default async function AdminUsersPage({
  searchParams,
}: AdminUsersPageProps) {
  const token = cookies().get("jwtToken")?.value || "";
  const payload = verifyTokenForPage(token);
  if (!payload || !payload.isAdmin) redirect("/");

  const q = searchParams.q?.trim() || "";
  const where: Prisma.UserWhereInput = q
    ? {
        OR: [
          { username: { contains: q, mode: "insensitive" } },
          { email: { contains: q, mode: "insensitive" } },
        ],
      }
    : {};

  const users = (await prisma.user.findMany({
    where,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      username: true,
      email: true,
      isAdmin: true,
      createdAt: true,
      _count: { select: { comments: true } },
    },
  })) as AdminUserRow[];

  return (
    <div className="flex flex-1 flex-col gap-6 min-h-0">
      <AdminPageHeader
        title="Users"
        badgeText={`${users.length} ${users.length === 1 ? "user" : "users"}`}
        description="Manage accounts, roles, and access."
      />
      <Card className="flex rounded-md min-h-0 flex-1 flex-col overflow-hidden p-0">
        <div className="overflow-auto">
          <AdminUsersClient
            users={users}
            currentUserId={payload.id}
            searchQuery={q}
          />
        </div>
      </Card>
    </div>
  );
}
