import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyTokenForPage } from "@/lib/auth/verifyToken";
import AdminShell from "./AdminShell";

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

  return <AdminShell username={payload.username}>{children}</AdminShell>;
}
