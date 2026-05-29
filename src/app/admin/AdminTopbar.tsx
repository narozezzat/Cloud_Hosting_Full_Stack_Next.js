"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ChevronRight, Home, Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import UserDropdown from "@/components/header/UserDropdown";

const TITLES: Record<string, string> = {
  "/admin": "Overview",
  "/admin/articles-table": "Articles",
  "/admin/comments-table": "Comments",
  "/admin/analytics": "Analytics",
};

function getCrumbs(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  const crumbs: { label: string; href: string }[] = [];
  let acc = "";
  for (const seg of segments) {
    acc += `/${seg}`;
    crumbs.push({
      label: TITLES[acc] ?? seg.charAt(0).toUpperCase() + seg.slice(1),
      href: acc,
    });
  }
  return crumbs;
}

interface AdminTopbarProps {
  username: string;
}

export default function AdminTopbar({ username }: AdminTopbarProps) {
  const pathname = usePathname() || "/admin";
  const crumbs = getCrumbs(pathname);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur lg:px-8">
      <nav
        aria-label="Breadcrumb"
        className="hidden sm:flex items-center text-sm text-muted-foreground"
      >
        <Link
          href="/"
          className="rounded-md p-1 hover:bg-secondary hover:text-foreground"
          aria-label="Home"
        >
          <Home className="h-3.5 w-3.5" />
        </Link>
        {crumbs.map((c, i) => (
          <React.Fragment key={c.href}>
            <ChevronRight className="h-3.5 w-3.5 mx-1 text-muted-foreground/60" />
            <Link
              href={c.href}
              className={
                i === crumbs.length - 1
                  ? "font-medium text-foreground"
                  : "hover:text-foreground"
              }
            >
              {c.label}
            </Link>
          </React.Fragment>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-2">
        <div className="hidden md:block w-64">
          <Input
            type="search"
            placeholder="Search…"
            leftIcon={<Search className="h-4 w-4" />}
            aria-label="Admin search"
          />
        </div>
        <button
          type="button"
          aria-label="Notifications"
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-card text-foreground/80 hover:text-foreground hover:bg-secondary"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-accent-500 ring-2 ring-card" />
        </button>
        <ThemeToggle />
        <UserDropdown username={username} />
      </div>
    </header>
  );
}
