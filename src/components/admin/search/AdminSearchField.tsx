"use client";

import * as React from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { useAdminSearch } from "./AdminSearchContext";

interface AdminSearchFieldProps {
  placeholder: string;
  autoFocus?: boolean;
  className?: string;
}

/** Search input wired to the shared admin-search query. */
export function AdminSearchField({
  placeholder,
  autoFocus,
  className,
}: AdminSearchFieldProps) {
  const { query, setQuery } = useAdminSearch();

  return (
    <Input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder={placeholder}
      aria-label={placeholder}
      autoFocus={autoFocus}
      className={className}
      leftIcon={<Search className="h-4 w-4" />}
      rightIcon={
        query ? (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="inline-flex h-5 w-5 items-center justify-center rounded text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        ) : undefined
      }
    />
  );
}
