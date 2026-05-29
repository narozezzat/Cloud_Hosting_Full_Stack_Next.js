"use client";
import { DOMAIN } from "@/lib/constants";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { CommentWithUser } from "@/lib/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import UpdateCommentModal from "./UpdateCommentModal";
import ConfirmationModal from "../common/modals/ConfirmationModal";
import { Avatar } from "@/components/ui/Avatar";
import useLoading from "@/hooks/useLoading";

interface CommentItemProps {
  comment: CommentWithUser;
  userId: number | undefined;
}

const CommentItem = ({ comment, userId }: CommentItemProps) => {
  const [open, setOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const router = useRouter();

  const { loading, withLoading } = useLoading();

  const commentDeleteHandler = async () => {
    try {
      await withLoading(async () => {
        await axios.delete(`${DOMAIN}/api/comments/${comment.id}`);
        router.refresh();
        setShowDeleteModal(false);
      });
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar name={comment.user.username} size="sm" />
          <div>
            <p className="text-sm font-semibold text-foreground">
              {comment.user.username}
            </p>
            <p className="text-xs text-muted-foreground">
              {new Date(comment.createdAt).toDateString()}
            </p>
          </div>
        </div>
        {userId && userId === comment.userId && (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Edit comment"
              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <FaEdit className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              aria-label="Delete comment"
              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
            >
              <FaTrash className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>
      <p className="text-sm text-foreground/90">{comment.text}</p>
      {open && (
        <UpdateCommentModal
          setOpen={setOpen}
          text={comment.text}
          commentId={comment.id}
          commentUserName={comment.user.username}
        />
      )}
      {showDeleteModal && (
        <ConfirmationModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={commentDeleteHandler}
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
          isLoading={loading}
          tone="danger"
        />
      )}
    </div>
  );
};

export default CommentItem;
