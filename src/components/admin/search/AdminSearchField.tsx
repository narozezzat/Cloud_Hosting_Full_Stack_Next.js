"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/Input";

interface AdminSearchFieldProps {
  placeholder: string;
  autoFocus?: boolean;
  className?: string;
}

const DEBOUNCE_MS = 300;

/**
 * Search input whose value lives in the URL `?q=` param, so the active page can
 * filter server-side. The query is debounced into `router.replace` (no history
 * spam) and any new search resets pagination back to page 1.
 */
export function AdminSearchField({
  placeholder,
  autoFocus,
  className,
}: AdminSearchFieldProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("q") ?? "";

  const [value, setValue] = React.useState(urlQuery);

  // Reflect external URL changes (navigation, clearing) back into the input.
  React.useEffect(() => {
    setValue(urlQuery);
  }, [urlQuery]);

  const commit = React.useCallback(
    (next: string) => {
      const params = new URLSearchParams(Array.from(searchParams.entries()));
      if (next.trim()) params.set("q", next);
      else params.delete("q");
      params.delete("pageNumber"); // a new search always starts on page 1
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  // Debounce the typed value into the URL.
  React.useEffect(() => {
    if (value === urlQuery) return;
    const timer = setTimeout(() => commit(value), DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [value, urlQuery, commit]);

  return (
    <Input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      aria-label={placeholder}
      autoFocus={autoFocus}
      className={className}
      leftIcon={<Search className="h-4 w-4" />}
      rightIcon={
        value ? (
          <button
            type="button"
            onClick={() => setValue("")}
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
