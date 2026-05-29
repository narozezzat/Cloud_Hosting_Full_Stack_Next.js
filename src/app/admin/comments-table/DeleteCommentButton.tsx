"use client";

import * as React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";
import { DOMAIN } from "@/utils/constants";
import ConfirmationModal from "@/components/common/modals/ConfirmationModal";
import { Button } from "@/components/ui/Button";

interface DeleteCommentButtonProps {
  commentId: number;
  commentText: string;
}

const DeleteCommentButton = ({
  commentId,
  commentText,
}: DeleteCommentButtonProps) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const deleteCommentHandler = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`${DOMAIN}/api/comments/${commentId}`);
      toast.success("Comment deleted");
      setIsModalOpen(false);
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        type="button"
        variant="danger"
        size="sm"
        onClick={() => setIsModalOpen(true)}
        className="gap-1.5"
      >
        <Trash2 className="h-3.5 w-3.5" />
        Delete
      </Button>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={deleteCommentHandler}
        title="Delete this comment?"
        message={
          <span>
            This action cannot be undone. The comment{" "}
            <span className="font-semibold text-foreground">
              &ldquo;{commentText}&rdquo;
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
};

export default DeleteCommentButton;
