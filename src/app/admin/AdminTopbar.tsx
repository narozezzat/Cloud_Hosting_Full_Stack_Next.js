"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ChevronRight, Home, Menu, Search } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import UserDropdown from "@/components/layout/header/UserDropdown";
import { AdminSearchField } from "@/components/admin/search/AdminSearchField";
import { getAdminSearchPage } from "@/components/admin/search/adminSearchConfig";
import { useAdminSearch } from "@/components/admin/search/AdminSearchContext";

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

  const searchPage = getAdminSearchPage(pathname);
  const { setQuery } = useAdminSearch();
  const [mobileSearchOpen, setMobileSearchOpen] = React.useState(false);

  // Collapse the mobile search whenever the route changes.
  React.useEffect(() => {
    setMobileSearchOpen(false);
  }, [pathname]);

  const closeMobileSearch = () => {
    setMobileSearchOpen(false);
    setQuery("");
  };

  return (
    <header className="z-30 flex h-16 shrink-0 items-center gap-2 border-b border-border bg-background/80 px-3 backdrop-blur-md sm:gap-3 sm:px-4 lg:px-8">
      {mobileSearchOpen && searchPage ? (
        /* Mobile: full-width search bar */
        <div className="flex w-full items-center gap-2 lg:hidden">
          <AdminSearchField
            autoFocus
            placeholder={searchPage.placeholder}
            className="h-10"
          />
          <button
            type="button"
            onClick={closeMobileSearch}
            className="shrink-0 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
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
            {searchPage && (
              <>
                {/* Desktop: always-visible search field */}
                <div className="hidden lg:block lg:w-72">
                  <AdminSearchField
                    placeholder={searchPage.placeholder}
                    className="h-10"
                  />
                </div>
                {/* Mobile/tablet: tap to expand the search bar */}
                <button
                  type="button"
                  onClick={() => setMobileSearchOpen(true)}
                  aria-label="Search"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground lg:hidden"
                >
                  <Search className="h-4 w-4" />
                </button>
              </>
            )}
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
        </>
      )}
    </header>
  );
}
