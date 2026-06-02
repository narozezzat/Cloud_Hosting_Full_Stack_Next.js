"use client";

import * as React from "react";
import axios from "axios";
import { Bookmark } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/lib/constants";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { cn } from "@/lib/cn";

interface BookmarkButtonProps {
  articleId: number;
  initialBookmarked: boolean;
  isLoggedIn: boolean;
  /** When true, refresh server data after a change (used on the bookmarks list). */
  refreshOnChange?: boolean;
}

export function BookmarkButton({
  articleId,
  initialBookmarked,
  isLoggedIn,
  refreshOnChange = false,
}: BookmarkButtonProps) {
  const router = useRouter();
  const [bookmarked, setBookmarked] = React.useState(initialBookmarked);
  const [pending, setPending] = React.useState(false);

  const toggle = async () => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    if (pending) return;

    const next = !bookmarked;
    setBookmarked(next);
    setPending(true);

    try {
      const url = `${API_BASE_URL}/api/articles/${articleId}/bookmark`;
      if (next) await axios.post(url);
      else await axios.delete(url);
      if (refreshOnChange) router.refresh();
    } catch (error) {
      setBookmarked(!next);
      toast.error(getErrorMessage(error));
    } finally {
      setPending(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={bookmarked}
      aria-label={bookmarked ? "Remove bookmark" : "Bookmark article"}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
        bookmarked
          ? "border-brand-500/30 bg-brand-500/10 text-brand-500"
          : "border-border bg-card text-muted-foreground hover:text-foreground",
      )}
    >
      <Bookmark className={cn("h-4 w-4", bookmarked && "fill-current")} />
      <span>{bookmarked ? "Saved" : "Save"}</span>
    </button>
  );
}
