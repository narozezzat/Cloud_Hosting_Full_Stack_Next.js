"use client";

import Link from "next/link";
import { Menu, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetBody,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import UserDropdown from "./UserDropdown";
import { NAV_LINKS, isNavLinkActive } from "./navLinks";

interface HeaderMobileMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pathname: string;
  isAdmin: boolean;
  username: string | null;
}

/** Mobile navigation drawer: trigger button + slide-in sheet with links + account. */
export function HeaderMobileMenu({
  open,
  onOpenChange,
  pathname,
  isAdmin,
  username,
}: HeaderMobileMenuProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <button
        type="button"
        onClick={() => onOpenChange(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-card text-foreground"
      >
        <Menu className="h-4 w-4" />
      </button>
      <SheetContent side="right" className="w-80 max-w-[85vw] p-0">
        <SheetHeader>
          <SheetTitle className="sr-only">Navigation menu</SheetTitle>
          <SheetDescription className="sr-only">
            Primary site navigation links and account actions.
          </SheetDescription>
          <Logo />
        </SheetHeader>

        <SheetBody className="pt-2">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const active = isNavLinkActive(link, pathname);
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
                <Avatar name={username} size="sm" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{username}</p>
                  <p className="text-xs text-muted-foreground">Signed in</p>
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
  );
}
