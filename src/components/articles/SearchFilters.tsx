"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Select } from "@/components/ui/Select";
import { CategoryWithCount } from "@/lib/types";

interface SearchFiltersProps {
  searchText: string;
  categories: CategoryWithCount[];
  categoryId?: string;
  sort?: string;
}

/** Category + sort refiners for the search results page. Navigating updates the URL. */
export function SearchFilters({
  searchText,
  categories,
  categoryId,
  sort,
}: SearchFiltersProps) {
  const router = useRouter();

  const navigate = (next: { categoryId?: string; sort?: string }) => {
    const params = new URLSearchParams();
    if (searchText) params.set("searchText", searchText);
    const cat = next.categoryId ?? categoryId;
    const s = next.sort ?? sort;
    if (cat) params.set("categoryId", cat);
    if (s) params.set("sort", s);
    router.push(`/articles/search?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <label className="flex items-center gap-2 text-sm text-muted-foreground">
        Category
        <Select
          aria-label="Filter by category"
          className="h-9 w-44"
          value={categoryId ?? ""}
          onChange={(e) => navigate({ categoryId: e.target.value })}
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </Select>
      </label>
      <label className="flex items-center gap-2 text-sm text-muted-foreground">
        Sort
        <Select
          aria-label="Sort results"
          className="h-9 w-36"
          value={sort ?? "newest"}
          onChange={(e) => navigate({ sort: e.target.value })}
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </Select>
      </label>
    </div>
  );
}
