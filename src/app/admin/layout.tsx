import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyTokenForPage } from "@/utils/verifyToken";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Cloud Hosting admin dashboard",
};

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
}

export default function AdminDashboardLayout({
  children,
}: AdminDashboardLayoutProps) {
  const token = cookies().get("jwtToken")?.value;
  if (!token) redirect("/");
  const payload = verifyTokenForPage(token);
  if (!payload || payload.isAdmin === false) redirect("/");

  return (
    <div className="flex min-h-screen bg-background">
      <div className="sticky top-0 h-screen w-16 shrink-0 border-r border-border bg-card lg:w-64">
        <AdminSidebar username={payload.username} />
      </div>
      <div className="flex flex-1 flex-col min-w-0">
        <AdminTopbar username={payload.username} />
        <main className="flex-1 px-4 py-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
