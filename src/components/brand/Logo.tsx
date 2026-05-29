import * as React from "react";
import Link from "next/link";
import Image from "next/image";
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
    <Image
      src="/icon.svg"
      alt=""
      width={40}
      height={40}
      className={cn("shrink-0", className)}
      aria-hidden="true"
    />
  );
}
