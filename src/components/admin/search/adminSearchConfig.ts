import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  BarChart3,
  Tag,
  Users,
  type LucideIcon,
} from "lucide-react";

/** A static page the command palette can jump to (always available). */
export interface NavCommand {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Extra terms (besides the label) that should match this command. */
  keywords?: string[];
}

export const NAV_COMMANDS: NavCommand[] = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard, keywords: ["dashboard", "home"] },
  { label: "Articles", href: "/admin/articles-table?pageNumber=1", icon: FileText, keywords: ["posts"] },
  { label: "Comments", href: "/admin/comments-table?pageNumber=1", icon: MessageSquare },
  { label: "Categories", href: "/admin/categories", icon: Tag, keywords: ["tags"] },
  { label: "Users", href: "/admin/users", icon: Users, keywords: ["accounts", "members"] },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3, keywords: ["stats", "metrics"] },
];

export function matchesNavCommand(cmd: NavCommand, query: string): boolean {
  const haystack = [cmd.label, ...(cmd.keywords ?? [])].join(" ").toLowerCase();
  return haystack.includes(query.toLowerCase());
}
