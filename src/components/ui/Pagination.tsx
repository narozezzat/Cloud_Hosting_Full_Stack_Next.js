"use client";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

interface PaginationProps {
  pages: number;
  pageNumber: number;
  route?: string;
  className?: string;
  /** Extra query params (e.g. an active category filter) preserved on every link. */
  query?: Record<string, string | undefined>;
}

const Pagination = ({
  pages,
  pageNumber,
  className,
  route = "",
  query,
}: PaginationProps) => {
  if (!pages || pages < 1) return null;

  const pagesArray = Array.from({ length: pages }, (_, i) => i + 1);
  const prev = pageNumber - 1;
  const next = pageNumber + 1;
  const atStart = pageNumber <= 1;
  const atEnd = pageNumber >= pages;

  const hrefFor = (page: number) => {
    const params = new URLSearchParams();
    params.set("pageNumber", String(page));
    if (query) {
      for (const [key, value] of Object.entries(query)) {
        if (value) params.set(key, value);
      }
    }
    return `${route}?${params.toString()}`;
  };

  const linkClass =
    "inline-flex h-9 min-w-9 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors duration-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <nav
      aria-label="Pagination"
      className={cn(
        "mt-10 flex items-center justify-center gap-1 rounded-full border border-border bg-card p-1 mx-auto w-fit",
        className,
      )}
    >
      <Link
        href={atStart ? "#" : hrefFor(prev)}
        aria-label="Previous page"
        aria-disabled={atStart}
        onClick={(e) => atStart && e.preventDefault()}
        className={cn(
          linkClass,
          atStart
            ? "pointer-events-none text-muted-foreground/50"
            : "text-muted-foreground hover:bg-secondary hover:text-foreground",
        )}
      >
        <ChevronLeft className="h-4 w-4" />
      </Link>

      {pagesArray.map((page) => {
        const active = pageNumber === page;
        return (
          <Link
            key={page}
            href={hrefFor(page)}
            aria-current={active ? "page" : undefined}
            className={cn(
              linkClass,
              active
                ? "bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-sm"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground",
            )}
          >
            {page}
          </Link>
        );
      })}

      <Link
        href={atEnd ? "#" : hrefFor(next)}
        aria-label="Next page"
        aria-disabled={atEnd}
        onClick={(e) => atEnd && e.preventDefault()}
        className={cn(
          linkClass,
          atEnd
            ? "pointer-events-none text-muted-foreground/50"
            : "text-muted-foreground hover:bg-secondary hover:text-foreground",
        )}
      >
        <ChevronRight className="h-4 w-4" />
      </Link>
    </nav>
  );
};

export default Pagination;
