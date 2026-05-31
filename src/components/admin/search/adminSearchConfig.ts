/** Per-page search configuration for the admin dashboard topbar. */
export interface AdminSearchPage {
  /** Pathname prefix this config applies to. */
  match: string;
  /** Placeholder shown in the search field on this page. */
  placeholder: string;
}

/**
 * Pages that expose a searchable list. The topbar shows its search field only
 * on these routes; everywhere else (Overview, Analytics) it stays hidden.
 */
export const ADMIN_SEARCH_PAGES: AdminSearchPage[] = [
  { match: "/admin/articles-table", placeholder: "Search articles by title…" },
  { match: "/admin/comments-table", placeholder: "Search comments…" },
  { match: "/admin/categories", placeholder: "Search categories…" },
  { match: "/admin/users", placeholder: "Search users by name or email…" },
];

export function getAdminSearchPage(pathname: string): AdminSearchPage | null {
  return ADMIN_SEARCH_PAGES.find((p) => pathname.startsWith(p.match)) ?? null;
}
