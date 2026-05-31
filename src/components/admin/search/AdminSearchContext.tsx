"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

interface AdminSearchValue {
  /** The live search query that list pages filter against. */
  query: string;
  setQuery: (q: string) => void;
}

const AdminSearchContext = React.createContext<AdminSearchValue | null>(null);

/**
 * Shares the dashboard search query between the topbar (where it's typed) and
 * the active list page (where it filters rows). The query resets on navigation
 * so each page starts clean.
 */
export function AdminSearchProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [query, setQuery] = React.useState("");

  React.useEffect(() => {
    setQuery("");
  }, [pathname]);

  const value = React.useMemo(() => ({ query, setQuery }), [query]);

  return (
    <AdminSearchContext.Provider value={value}>
      {children}
    </AdminSearchContext.Provider>
  );
}

export function useAdminSearch(): AdminSearchValue {
  const ctx = React.useContext(AdminSearchContext);
  if (!ctx) {
    throw new Error("useAdminSearch must be used within <AdminSearchProvider>");
  }
  return ctx;
}
