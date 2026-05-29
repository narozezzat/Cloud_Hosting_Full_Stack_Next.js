"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  BarChart3,
} from "lucide-react";
import { Logo, LogoMark } from "@/components/brand/Logo";
import { cn } from "@/lib/cn";

interface AdminSidebarProps {
  username?: string | null;
  /** When true (e.g. inside the mobile drawer) the sidebar always shows labels. */
  forceExpanded?: boolean;
}

const NAV = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard, exact: true },
  {
    label: "Articles",
    href: "/admin/articles-table?pageNumber=1",
    match: "/admin/articles-table",
    icon: FileText,
  },
  {
    label: "Comments",
    href: "/admin/comments-table?pageNumber=1",
    match: "/admin/comments-table",
    icon: MessageSquare,
  },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
];

export default function AdminSidebar({
  username,
  forceExpanded = false,
}: AdminSidebarProps) {
  const pathname = usePathname() || "";

  // expanded → show labels (lg+, or when forced on mobile drawer)
  const expandedCls = forceExpanded ? "flex" : "hidden lg:flex";
  const compactCls = forceExpanded ? "hidden" : "flex lg:hidden";
  const labelCls = forceExpanded ? "inline" : "hidden lg:inline";

  return (
    <aside className="flex h-full flex-col gap-2 p-4">
      <div className={cn("items-center gap-2 px-2 pb-4", expandedCls)}>
        <Logo href="/admin" />
      </div>
      <div className={cn("justify-center pb-2", compactCls)}>
        <Link
          href="/admin"
          className="flex h-10 w-10 items-center justify-center rounded-md overflow-hidden"
          aria-label="Admin home"
        >
          <LogoMark className="h-10 w-10" />
        </Link>
      </div>

      <nav className="flex-1 space-y-1">
        {NAV.map((item) => {
          const active = item.exact
            ? pathname === item.href.split("?")[0]
            : pathname.startsWith(item.match ?? item.href.split("?")[0]);

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-hover",
                forceExpanded ? "justify-start" : "justify-center lg:justify-start",
                active
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary",
              )}
            >
              {active && (
                <motion.span
                  layoutId={
                    forceExpanded ? "admin-active-mobile" : "admin-active"
                  }
                  className="absolute inset-0 -z-10 rounded-md bg-gradient-to-r from-brand-500/15 to-accent-500/15"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {active && (
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-full bg-gradient-to-b from-brand-500 to-accent-500"
                />
              )}
              <item.icon
                className={cn("h-4 w-4 shrink-0", active && "text-brand-500")}
              />
              <span className={labelCls}>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {username && (
        <div
          className={cn(
            "items-center gap-3 rounded-lg border border-border bg-card p-3",
            expandedCls,
          )}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-sm font-bold text-white">
            {username.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{username}</p>
            <p className="text-xs text-muted-foreground">Administrator</p>
          </div>
        </div>
      )}
    </aside>
  );
}
