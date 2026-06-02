"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { MoreHorizontal, ExternalLink, Trash2 } from "lucide-react";
import { Comment } from "@/generated/prisma";
import { API_BASE_URL } from "@/lib/constants";
import { getErrorMessage } from "@/lib/getErrorMessage";
import ConfirmationModal from "@/components/common/modals/ConfirmationModal";
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CommentRowActionsProps {
  comment: Comment;
}

export default function CommentRowActions({
  comment,
}: CommentRowActionsProps): React.ReactElement {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const deleteCommentHandler = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`${API_BASE_URL}/api/comments/${comment.id}`);
      toast.success("Comment deleted");
      setIsModalOpen(false);
      router.refresh();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:bg-secondary hover:text-foreground"
            aria-label="Row actions"
          >
            <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href={`/articles/${comment.articleId}`}>
              <ExternalLink className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              View article
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            destructive
            onSelect={(e) => {
              e.preventDefault();
              setIsModalOpen(true);
            }}
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={deleteCommentHandler}
        title="Delete this comment?"
        message={
          <span>
            This action cannot be undone. The comment{" "}
            <span className="font-semibold text-foreground">
              &ldquo;{comment.text}&rdquo;
            </span>{" "}
            will be permanently removed.
          </span>
        }
        confirmText="Delete comment"
        cancelText="Cancel"
        isLoading={isLoading}
        tone="danger"
      />
    </>
  );
}
