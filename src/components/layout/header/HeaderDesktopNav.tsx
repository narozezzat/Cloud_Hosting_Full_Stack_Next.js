"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { navSpring } from "@/lib/animations";
import { NAV_LINKS, isNavLinkActive } from "./navLinks";

interface HeaderDesktopNavProps {
  pathname: string;
  isAdmin: boolean;
}

/** Inline desktop navigation with an animated active underline. */
export function HeaderDesktopNav({ pathname, isAdmin }: HeaderDesktopNavProps) {
  return (
    <nav className="hidden md:flex items-center gap-1">
      {NAV_LINKS.map((link) => {
        const active = isNavLinkActive(link, pathname);
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
                transition={navSpring}
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
  );
}
