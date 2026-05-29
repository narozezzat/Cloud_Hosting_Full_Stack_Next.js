import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

interface LogoProps {
  className?: string;
  href?: string;
  /** Wordmark text — default "Cloud" + "Hosting" split visually. */
  showWordmark?: boolean;
}

export function Logo({ className, href = "/", showWordmark = true }: LogoProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 font-display text-lg font-extrabold tracking-tight",
        className,
      )}
    >
      <LogoMark className="h-8 w-8" />
      {showWordmark && (
        <span className="flex items-baseline">
          <span className="text-foreground">Cloud</span>
          <span className="text-gradient-brand">Hosting</span>
        </span>
      )}
    </Link>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgb(var(--brand-500))" />
          <stop offset="100%" stopColor="rgb(var(--accent-500))" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="10" fill="url(#logoGrad)" />
      <path
        d="M12 22c-2 0-3.5-1.5-3.5-3.5S10 15 12 15c.3 0 .6 0 .9.1A5 5 0 0 1 22 14a4 4 0 0 1 4 4c2 0 3.5 1.5 3.5 3.5S28 25 26 25H12z"
        fill="rgb(255 255 255 / 0.95)"
      />
    </svg>
  );
}
