"use client";
import { API_BASE_URL } from "@/lib/constants";
import { getErrorMessage } from "@/lib/getErrorMessage";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import useLoading from "@/hooks/useLoading";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface AddCommentFormProps {
  articleId: number;
  /** When set, the comment is posted as a reply to this comment id. */
  parentId?: number;
  /** Called after a successful post (e.g. to collapse a reply box). */
  onPosted?: () => void;
  placeholder?: string;
  submitLabel?: string;
  autoFocus?: boolean;
}

const AddCommentForm = ({
  articleId,
  parentId,
  onPosted,
  placeholder = "Share your thoughts…",
  submitLabel = "Post comment",
  autoFocus = false,
}: AddCommentFormProps) => {
  const router = useRouter();
  const { loading, withLoading } = useLoading();
  const [text, setText] = useState("");

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() === "") return toast.error("Please write something");

    await withLoading(async () => {
      try {
        await axios.post(`${API_BASE_URL}/api/comments`, {
          text,
          articleId,
          parentId: parentId ?? null,
        });
        router.refresh();
        setText("");
        onPosted?.();
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    });
  };

  return (
    <form onSubmit={formSubmitHandler} className="flex flex-col gap-3">
      <Input
        type="text"
        placeholder={placeholder}
        aria-label={parentId ? "Reply" : "Comment"}
        value={text}
        onChange={(e) => setText(e.target.value)}
        autoFocus={autoFocus}
      />
      <div className="flex justify-end">
        <Button type="submit" loading={loading}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default AddCommentForm;
