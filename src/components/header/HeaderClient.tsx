"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetBody,
  SheetFooter,
  SheetTitle,
} from "@/components/ui/sheet";
import UserDropdown from "./UserDropdown";

interface HeaderClientProps {
  isAdmin: boolean;
  username: string | null;
}

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Articles", href: "/articles?pageNumber=1", match: "/articles" },
  { label: "About", href: "/about" },
];

export default function HeaderClient({ isAdmin, username }: HeaderClientProps) {
  const pathname = usePathname() || "/";
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const onAdmin = pathname.startsWith("/admin");

  React.useEffect(() => {
    const el = document.getElementById("app-scroll");
    if (!el) return;
    const onScroll = () => setScrolled(el.scrollTop > 8);
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (onAdmin) return null;

  const isActive = (link: (typeof NAV_LINKS)[number]) =>
    link.match
      ? pathname.startsWith(link.match)
      : pathname === link.href.split("?")[0];

  return (
    <header
      className={cn(
        "shrink-0 z-50 w-full transition-all duration-enter",
        scrolled ? "glass shadow-sm" : "bg-background",
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = isActive(link);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium transition-colors duration-hover",
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-brand-500 to-accent-500"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
            {isAdmin && (
              <Link
                href="/admin"
                className="ml-1 rounded-md bg-accent-500/15 px-3 py-1.5 text-xs font-semibold text-accent-600 dark:text-accent-300 transition-colors hover:bg-accent-500/25"
              >
                Admin
              </Link>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden md:flex items-center gap-2">
            {username ? (
              <UserDropdown username={username} />
            ) : (
              <>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/login">Log in</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/register">Get started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu trigger + sheet */}
          <Sheet open={open} onOpenChange={setOpen}>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-card text-foreground"
            >
              <Menu className="h-4 w-4" />
            </button>
            <SheetContent
              side="right"
              className="w-80 max-w-[85vw] p-0"
            >
              <SheetHeader>
                <SheetTitle className="sr-only">Navigation menu</SheetTitle>
                <Logo />
              </SheetHeader>

              <SheetBody className="pt-2">
                <nav className="flex flex-col gap-1">
                  {NAV_LINKS.map((link) => {
                    const active = isActive(link);
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          "rounded-md px-3 py-3 text-sm font-medium transition-colors",
                          active
                            ? "bg-gradient-to-r from-brand-500/15 to-accent-500/15 text-foreground"
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                        )}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                  {isAdmin && (
                    <Link
                      href="/admin"
                      className="mt-1 inline-flex items-center gap-2 rounded-md bg-accent-500/15 px-3 py-3 text-sm font-semibold text-accent-600 dark:text-accent-300 transition-colors hover:bg-accent-500/25"
                    >
                      <ShieldCheck className="h-4 w-4" />
                      Admin Dashboard
                    </Link>
                  )}
                </nav>
              </SheetBody>

              <SheetFooter>
                {username ? (
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-sm font-bold text-white">
                        {username.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">
                          {username}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Signed in
                        </p>
                      </div>
                    </div>
                    <UserDropdown username={username} />
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Button asChild variant="outline" size="md">
                      <Link href="/login">Log in</Link>
                    </Button>
                    <Button asChild size="md">
                      <Link href="/register">Get started</Link>
                    </Button>
                  </div>
                )}
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
