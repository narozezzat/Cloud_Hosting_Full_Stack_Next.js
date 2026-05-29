"use client";

import * as React from "react";
import axios from "axios";
import { Heart } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { DOMAIN } from "@/lib/constants";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { cn } from "@/lib/cn";

interface LikeButtonProps {
  articleId: number;
  initialLiked: boolean;
  initialCount: number;
  /** When false, clicking redirects to login instead of calling the API. */
  isLoggedIn: boolean;
}

export function LikeButton({
  articleId,
  initialLiked,
  initialCount,
  isLoggedIn,
}: LikeButtonProps) {
  const router = useRouter();
  const [liked, setLiked] = React.useState(initialLiked);
  const [count, setCount] = React.useState(initialCount);
  const [pending, setPending] = React.useState(false);

  const toggle = async () => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    if (pending) return;

    // optimistic
    const nextLiked = !liked;
    setLiked(nextLiked);
    setCount((c) => c + (nextLiked ? 1 : -1));
    setPending(true);

    try {
      const url = `${DOMAIN}/api/articles/${articleId}/like`;
      const res = nextLiked
        ? await axios.post(url)
        : await axios.delete(url);
      // reconcile with server count
      setCount(res.data.likeCount);
    } catch (error) {
      // revert
      setLiked(liked);
      setCount((c) => c + (nextLiked ? -1 : 1));
      toast.error(getErrorMessage(error));
    } finally {
      setPending(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={liked}
      aria-label={liked ? "Unlike article" : "Like article"}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
        liked
          ? "border-destructive/30 bg-destructive/10 text-destructive"
          : "border-border bg-card text-muted-foreground hover:text-foreground",
      )}
    >
      <Heart className={cn("h-4 w-4", liked && "fill-current")} />
      <span>{count}</span>
    </button>
  );
}
