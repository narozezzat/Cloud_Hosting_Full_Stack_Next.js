"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  Search,
  X,
  CornerDownLeft,
  ArrowUp,
  ArrowDown,
  FileText,
  Users,
  Tag,
  type LucideIcon,
} from "lucide-react";
import { toast } from "react-toastify";
import { cn } from "@/lib/cn";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { searchAdmin } from "@/lib/api/adminSearchApiCall";
import { AdminSearchResults } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { NAV_COMMANDS, matchesNavCommand } from "./adminSearchConfig";

interface AdminSearchCommandProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/** A single keyboard-navigable result row. */
interface CommandItem {
  key: string;
  group: string;
  label: string;
  sublabel?: string;
  icon: LucideIcon;
  href: string;
}

const EMPTY_RESULTS: AdminSearchResults = {
  articles: [],
  users: [],
  categories: [],
};

export default function AdminSearchCommand({
  open,
  onOpenChange,
}: AdminSearchCommandProps) {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<AdminSearchResults>(EMPTY_RESULTS);
  const [loading, setLoading] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const listRef = React.useRef<HTMLDivElement>(null);
  const trimmed = query.trim();

  // Reset transient state whenever the palette closes.
  React.useEffect(() => {
    if (!open) {
      setQuery("");
      setResults(EMPTY_RESULTS);
      setLoading(false);
      setActiveIndex(0);
    }
  }, [open]);

  // Debounced remote search; aborts the in-flight request on each keystroke.
  React.useEffect(() => {
    if (!open) return;
    if (!trimmed) {
      setResults(EMPTY_RESULTS);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const data = await searchAdmin(trimmed, controller.signal);
        setResults(data);
      } catch (error) {
        if (!controller.signal.aborted) {
          toast.error(getErrorMessage(error, "Search failed"));
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 220);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [trimmed, open]);

  // Flatten everything into one ordered list for keyboard navigation.
  const items = React.useMemo<CommandItem[]>(() => {
    const navMatches = trimmed
      ? NAV_COMMANDS.filter((c) => matchesNavCommand(c, trimmed))
      : NAV_COMMANDS;

    const pages: CommandItem[] = navMatches.map((c) => ({
      key: `page-${c.href}`,
      group: "Pages",
      label: c.label,
      icon: c.icon,
      href: c.href,
    }));

    const articles: CommandItem[] = results.articles.map((a) => ({
      key: `article-${a.id}`,
      group: "Articles",
      label: a.title,
      sublabel: a.category?.name ?? "Uncategorized",
      icon: FileText,
      href: `/articles/${a.id}`,
    }));

    const users: CommandItem[] = results.users.map((u) => ({
      key: `user-${u.id}`,
      group: "Users",
      label: u.username,
      sublabel: u.email,
      icon: Users,
      href: "/admin/users",
    }));

    const categories: CommandItem[] = results.categories.map((c) => ({
      key: `category-${c.id}`,
      group: "Categories",
      label: c.name,
      icon: Tag,
      href: `/articles/search?searchText=&categoryId=${c.id}`,
    }));

    return [...pages, ...articles, ...users, ...categories];
  }, [trimmed, results]);

  // Keep the active index in range as the result set changes.
  React.useEffect(() => {
    setActiveIndex((i) => (items.length === 0 ? 0 : Math.min(i, items.length - 1)));
  }, [items.length]);

  const select = React.useCallback(
    (item: CommandItem | undefined) => {
      if (!item) return;
      onOpenChange(false);
      router.push(item.href);
    },
    [onOpenChange, router],
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (items.length ? (i + 1) % items.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (items.length ? (i - 1 + items.length) % items.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      select(items[activeIndex]);
    }
  };

  // Scroll the active row into view on arrow navigation.
  React.useEffect(() => {
    const node = listRef.current?.querySelector<HTMLElement>(
      `[data-index="${activeIndex}"]`,
    );
    node?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const showEmpty = trimmed.length > 0 && !loading && items.length === 0;

  // Group rows for rendering while preserving the flat index for navigation.
  let flatIndex = -1;
  const groups = ["Pages", "Articles", "Users", "Categories"] as const;

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-[1100] bg-black/60 backdrop-blur-sm",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          )}
        />
        <DialogPrimitive.Content
          onKeyDown={onKeyDown}
          onOpenAutoFocus={(e) => e.preventDefault()}
          aria-label="Search"
          className={cn(
            // Mobile: full-screen sheet.
            "fixed inset-0 z-[1110] flex flex-col bg-background outline-none",
            // Desktop: floating command panel anchored near the top.
            "sm:inset-x-0 sm:inset-y-auto sm:top-[12vh] sm:mx-auto sm:h-auto sm:w-full sm:max-w-xl",
            "sm:rounded-2xl sm:border sm:border-border/60 sm:bg-card sm:shadow-2xl",
            "sm:max-h-[70vh] sm:overflow-hidden",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "sm:data-[state=closed]:zoom-out-95 sm:data-[state=open]:zoom-in-95",
            "duration-200",
          )}
        >
          <DialogPrimitive.Title className="sr-only">
            Search the dashboard
          </DialogPrimitive.Title>

          {/* Search field */}
          <div className="flex items-center gap-3 border-b border-border px-4 py-3 sm:px-5">
            <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
            <input
              autoFocus
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActiveIndex(0);
              }}
              placeholder="Search articles, users, categories…"
              aria-label="Search the dashboard"
              className="h-8 flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground sm:text-sm"
            />
            {loading && (
              <span
                aria-hidden="true"
                className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-brand-500"
              />
            )}
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              aria-label="Close search"
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Results */}
          <div ref={listRef} className="min-h-0 flex-1 overflow-y-auto p-2">
            {showEmpty ? (
              <div className="flex flex-col items-center justify-center gap-1 px-4 py-12 text-center">
                <p className="text-sm font-medium text-foreground">
                  No results for “{trimmed}”
                </p>
                <p className="text-xs text-muted-foreground">
                  Try a different keyword or check the spelling.
                </p>
              </div>
            ) : (
              groups.map((group) => {
                const groupItems = items.filter((it) => it.group === group);
                if (groupItems.length === 0) return null;
                return (
                  <div key={group} className="mb-1.5 last:mb-0">
                    <p className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {group}
                    </p>
                    <div className="space-y-0.5">
                      {groupItems.map((item) => {
                        flatIndex += 1;
                        const index = flatIndex;
                        const active = index === activeIndex;
                        return (
                          <button
                            key={item.key}
                            type="button"
                            data-index={index}
                            onClick={() => select(item)}
                            onMouseMove={() => setActiveIndex(index)}
                            className={cn(
                              "flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors",
                              active
                                ? "bg-secondary text-foreground"
                                : "text-foreground/90 hover:bg-secondary/60",
                            )}
                          >
                            <span
                              className={cn(
                                "flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-card",
                                active && "border-brand-500/40 text-brand-500",
                              )}
                            >
                              <item.icon className="h-4 w-4" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-sm font-medium">
                                {item.label}
                              </span>
                              {item.sublabel && (
                                <span className="block truncate text-xs text-muted-foreground">
                                  {item.sublabel}
                                </span>
                              )}
                            </span>
                            {item.group === "Pages" && (
                              <Badge variant="neutral" className="hidden sm:inline-flex">
                                Jump to
                              </Badge>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Keyboard hint footer (desktop) */}
          <div className="hidden items-center gap-4 border-t border-border px-5 py-2.5 text-xs text-muted-foreground sm:flex">
            <span className="flex items-center gap-1">
              <Kbd>
                <ArrowUp className="h-3 w-3" />
              </Kbd>
              <Kbd>
                <ArrowDown className="h-3 w-3" />
              </Kbd>
              to navigate
            </span>
            <span className="flex items-center gap-1">
              <Kbd>
                <CornerDownLeft className="h-3 w-3" />
              </Kbd>
              to select
            </span>
            <span className="flex items-center gap-1">
              <Kbd>Esc</Kbd>
              to close
            </span>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded border border-border bg-card px-1 font-sans text-[10px] font-medium text-foreground">
      {children}
    </kbd>
  );
}
