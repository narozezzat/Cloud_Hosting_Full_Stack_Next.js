"use client";
import { DOMAIN } from "@/lib/constants";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { CommentWithReplies, CommentWithUser } from "@/lib/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Reply } from "lucide-react";
import { toast } from "react-toastify";
import UpdateCommentModal from "./UpdateCommentModal";
import AddCommentForm from "./AddCommentForm";
import ConfirmationModal from "../common/modals/ConfirmationModal";
import { Avatar } from "@/components/ui/Avatar";
import useLoading from "@/hooks/useLoading";

interface CommentItemProps {
  comment: CommentWithReplies | CommentWithUser;
  userId: number | undefined;
  articleId: number;
  isLoggedIn: boolean;
  /** Replies render compact and cannot themselves be replied to (one level deep). */
  isReply?: boolean;
}

const CommentItem = ({
  comment,
  userId,
  articleId,
  isLoggedIn,
  isReply = false,
}: CommentItemProps) => {
  const [open, setOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const router = useRouter();

  const { loading, withLoading } = useLoading();

  const replies = "replies" in comment ? comment.replies : [];

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
        <Link
          href={`/users/${comment.userId}`}
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <Avatar name={comment.user.username} size="sm" />
          <div>
            <p className="text-sm font-semibold text-foreground">
              {comment.user.username}
            </p>
            <p className="text-xs text-muted-foreground">
              {new Date(comment.createdAt).toDateString()}
            </p>
          </div>
        </Link>
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

      {!isReply && isLoggedIn && (
        <div className="mt-3">
          <button
            type="button"
            onClick={() => setShowReply((v) => !v)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <Reply className="h-3.5 w-3.5" />
            {showReply ? "Cancel" : "Reply"}
          </button>
        </div>
      )}

      {showReply && (
        <div className="mt-3 border-t border-border pt-3">
          <AddCommentForm
            articleId={articleId}
            parentId={comment.id}
            placeholder={`Reply to ${comment.user.username}…`}
            submitLabel="Post reply"
            autoFocus
            onPosted={() => setShowReply(false)}
          />
        </div>
      )}

      {replies.length > 0 && (
        <div className="mt-4 space-y-3 border-l-2 border-border pl-4">
          {replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              userId={userId}
              articleId={articleId}
              isLoggedIn={isLoggedIn}
              isReply
            />
          ))}
        </div>
      )}

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
