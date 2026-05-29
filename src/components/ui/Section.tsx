import * as React from "react";
import { cn } from "@/lib/cn";

interface SectionProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  containerClassName?: string;
}

export function Section({
  eyebrow,
  title,
  subtitle,
  align = "center",
  containerClassName,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn("py-16 sm:py-24", className)} {...props}>
      <div className={cn("container", containerClassName)}>
        {(eyebrow || title || subtitle) && (
          <div
            className={cn(
              "mb-12 max-w-3xl",
              align === "center" && "mx-auto text-center",
            )}
          >
            {eyebrow && (
              <span className="inline-block rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="mt-4 font-display text-display-sm font-bold text-balance sm:text-display-md">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 text-lg text-muted-foreground text-balance">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
