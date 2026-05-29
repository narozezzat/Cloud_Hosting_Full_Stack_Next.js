"use client";

import * as React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";
import { DOMAIN } from "@/utils/constants";
import ConfirmationModal from "@/components/common/modals/ConfirmationModal";

interface DeleteArticleButtonProps {
  articleId: number;
  articleTitle: string;
}

const DeleteArticleButton = ({
  articleId,
  articleTitle,
}: DeleteArticleButtonProps) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const deleteArticleHandler = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`${DOMAIN}/api/articles/${articleId}`);
      toast.success("Article deleted");
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
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10"
      >
        <Trash2 className="h-4 w-4" />
        Delete
      </button>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
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
