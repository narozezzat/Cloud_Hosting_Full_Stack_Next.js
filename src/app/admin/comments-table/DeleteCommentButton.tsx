"use client";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";
import ConfirmationModal from "@/components/common/modals/ConfirmationModal";

interface DeleteCommentButtonProps {
  commentId: number;
  commentText: string;
}

const DeleteCommentButton = ({
  commentId,
  commentText,
}: DeleteCommentButtonProps) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const deleteCommentHandler = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`${DOMAIN}/api/comments/${commentId}`);
      router.refresh();
      toast.success("comment deleted");
      setIsModalOpen(false);
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        onClick={showModal}
        className="bg-red-600 text-white rounded-lg inline-block py-1 px-2 cursor-pointer hover:bg-red-800 transition"
      >
        Delete
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCancel}
        onConfirm={deleteCommentHandler}
        message={
          <>
            Are you sure you want to delete this comment?{" "}
            <p className="font-bold">"{commentText}"</p>
          </>
        }
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isLoading}
      />
    </>
  );
};

export default DeleteCommentButton;
