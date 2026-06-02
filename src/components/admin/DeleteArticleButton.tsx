"use client";

import * as React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";
import { API_BASE_URL } from "@/lib/constants";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { useControllableState } from "@/hooks/useControllableState";
import ConfirmationModal from "@/components/common/modals/ConfirmationModal";

interface DeleteArticleButtonProps {
  articleId: number;
  articleTitle: string;
  /** When provided, the dialog is fully controlled and no internal trigger button is rendered. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const DeleteArticleButton = ({
  articleId,
  articleTitle,
  open: openProp,
  onOpenChange,
}: DeleteArticleButtonProps) => {
  const router = useRouter();
  const isControlled = openProp !== undefined;
  const [open, setOpen] = useControllableState({
    prop: openProp,
    onChange: onOpenChange,
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const deleteArticleHandler = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`${API_BASE_URL}/api/articles/${articleId}`);
      toast.success("Article deleted");
      setOpen(false);
      router.refresh();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isControlled && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10"
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </button>
      )}

      <ConfirmationModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={deleteArticleHandler}
        title="Delete this article?"
        message={
          <span>
            This action cannot be undone. The article{" "}
            <span className="font-semibold text-foreground">
              &ldquo;{articleTitle}&rdquo;
            </span>{" "}
            and its comments will be permanently removed.
          </span>
        }
        confirmText="Delete article"
        cancelText="Cancel"
        isLoading={isLoading}
        tone="danger"
      />
    </>
  );
};

export default DeleteArticleButton;
