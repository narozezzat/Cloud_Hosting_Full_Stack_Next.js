import Link from "next/link";
import { cn } from "@/lib/cn";
import { CategoryWithCount } from "@/lib/types";

interface CategoryFilterBarProps {
  categories: CategoryWithCount[];
  /** Currently active category id (string from query params), or undefined for "All". */
  activeId?: string;
  /** Base route the pills link to (defaults to /articles). */
  route?: string;
}

/** A row of category filter pills. Renders nothing when there are no categories. */
export function CategoryFilterBar({
  categories,
  activeId,
  route = "/articles",
}: CategoryFilterBarProps) {
  if (categories.length === 0) return null;

  const pill = (active: boolean) =>
    cn(
      "inline-flex items-center rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
      active
        ? "border-brand-500 bg-brand-500 text-white"
        : "border-border bg-card text-muted-foreground hover:border-brand-500 hover:text-foreground",
    );

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Link href={`${route}?pageNumber=1`} className={pill(!activeId)}>
        All
      </Link>
      {categories.map((c) => (
        <Link
          key={c.id}
          href={`${route}?pageNumber=1&categoryId=${c.id}`}
          className={pill(activeId === String(c.id))}
        >
          {c.name}
          <span className="ml-1.5 text-xs opacity-70">{c._count.articles}</span>
        </Link>
      ))}
    </div>
  );
}
