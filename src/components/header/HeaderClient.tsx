"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
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

  // Hide on admin pages — admin has its own shell.
  const onAdmin = pathname.startsWith("/admin");

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on route change.
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
        "sticky top-0 z-50 w-full transition-all duration-enter",
        scrolled ? "glass shadow-sm" : "bg-background/0",
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
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-card text-foreground"
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="x"
                  initial={{ rotate: -45, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 45, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="h-4 w-4" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 45, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -45, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu className="h-4 w-4" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden border-t border-border bg-background"
          >
            <div className="container flex flex-col py-3">
              {NAV_LINKS.map((link) => {
                const active = isActive(link);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "rounded-md px-3 py-3 text-sm font-medium",
                      active
                        ? "bg-secondary text-foreground"
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
                  className="rounded-md px-3 py-3 text-sm font-semibold text-accent-600 dark:text-accent-300"
                >
                  Admin Dashboard
                </Link>
              )}
              <div className="mt-3 flex flex-col gap-2 border-t border-border pt-3">
                {username ? (
                  <div className="px-3 py-2">
                    <UserDropdown username={username} />
                  </div>
                ) : (
                  <>
                    <Button asChild variant="outline" size="md">
                      <Link href="/login">Log in</Link>
                    </Button>
                    <Button asChild size="md">
                      <Link href="/register">Get started</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
