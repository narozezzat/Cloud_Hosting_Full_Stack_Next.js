"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ChevronRight, Home, Menu, Search } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import UserDropdown from "@/components/layout/header/UserDropdown";
import AdminSearchCommand from "@/components/admin/search/AdminSearchCommand";

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
  onOpenMobileNav?: () => void;
}

export default function AdminTopbar({
  username,
  onOpenMobileNav,
}: AdminTopbarProps) {
  const pathname = usePathname() || "/admin";
  const crumbs = getCrumbs(pathname);
  const current = crumbs[crumbs.length - 1];

  const [searchOpen, setSearchOpen] = React.useState(false);

  // Global ⌘K / Ctrl+K shortcut to open the command palette.
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="z-30 flex h-16 shrink-0 items-center gap-2 border-b border-border bg-background/80 px-3 backdrop-blur-md sm:gap-3 sm:px-4 lg:px-8">
      <button
        type="button"
        onClick={onOpenMobileNav}
        aria-label="Open navigation"
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground md:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile: Home → page breadcrumb, beside the hamburger */}
      <nav
        aria-label="Breadcrumb"
        className="flex min-w-0 items-center gap-1.5 text-sm sm:hidden"
      >
        <Link
          href="/"
          aria-label="Back to home"
          className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <Home className="h-3.5 w-3.5" />
        </Link>
        <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/60" />
        <span className="truncate font-display text-sm font-semibold tracking-tight text-foreground">
          {current?.label ?? "Admin"}
        </span>
      </nav>

      {/* Tablet/desktop breadcrumb */}
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

      <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
        {/* Desktop: button styled as a search field, opens the command palette */}
        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          aria-label="Search the dashboard"
          aria-keyshortcuts="Meta+K Control+K"
          className="hidden h-10 w-64 items-center gap-2 rounded-md border border-input bg-card px-3 text-sm text-muted-foreground shadow-xs transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:flex"
        >
          <Search className="h-4 w-4 shrink-0" />
          <span className="flex-1 text-left">Search…</span>
          <kbd className="inline-flex h-5 items-center gap-0.5 rounded border border-border bg-background px-1.5 font-sans text-[10px] font-medium">
            ⌘K
          </kbd>
        </button>
        {/* Mobile / tablet: icon button */}
        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          aria-label="Search the dashboard"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground lg:hidden"
        >
          <Search className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Notifications"
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-card text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-accent-500 ring-2 ring-card" />
        </button>
        <div className="hidden sm:block">
          <ThemeToggle />
        </div>
        <UserDropdown username={username} />
      </div>

      <AdminSearchCommand open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}
