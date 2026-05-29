export interface NavLink {
  label: string;
  href: string;
  /** Optional prefix used for active-state matching (e.g. ignore query string). */
  match?: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Articles", href: "/articles?pageNumber=1", match: "/articles" },
  { label: "About", href: "/about" },
];

/** Whether a nav link is active for the given pathname. */
export function isNavLinkActive(link: NavLink, pathname: string): boolean {
  return link.match
    ? pathname.startsWith(link.match)
    : pathname === link.href.split("?")[0];
}
