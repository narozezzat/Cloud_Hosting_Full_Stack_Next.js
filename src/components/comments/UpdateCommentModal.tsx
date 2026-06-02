"use client";

import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import { Pencil } from "lucide-react";
import { API_BASE_URL } from "@/lib/constants";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { FormField } from "@/components/ui/FormField";

interface UpdateCommentModalProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  text: string;
  commentId: number;
  commentUserName: string;
}

const UpdateCommentModal = ({
  setOpen,
  text,
  commentId,
  commentUserName,
}: UpdateCommentModalProps) => {
  const router = useRouter();
  const [updatedText, setUpdatedText] = useState(text);
  const [loading, setLoading] = useState(false);

  const close = () => {
    if (loading) return;
    setOpen(false);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!updatedText.trim()) return toast.info("Please write something");
    try {
      setLoading(true);
      await axios.put(`${API_BASE_URL}/api/comments/${commentId}`, {
        text: updatedText,
      });
      toast.success("Comment updated");
      setOpen(false);
      router.refresh();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open
      onClose={close}
      size="md"
      icon={<Pencil className="h-5 w-5" />}
      title="Edit comment"
      description={
        <>
          By <span className="font-medium text-foreground">@{commentUserName}</span>
        </>
      }
      footer={
        <>
          <Button
            type="button"
            variant="outline"
            onClick={close}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button form="update-comment-form" type="submit" loading={loading}>
            Save changes
          </Button>
        </>
      }
    >
      <form id="update-comment-form" onSubmit={onSubmit}>
        <FormField label="Comment" htmlFor="update-comment-text">
          <Textarea
            id="update-comment-text"
            rows={4}
            value={updatedText}
            onChange={(e) => setUpdatedText(e.target.value)}
            autoFocus
          />
        </FormField>
      </form>
    </Modal>
  );
};

export default UpdateCommentModal;
