"use client";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import useLoading from "@/hooks/useLoading";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface AddCommentFormProps {
  articleId: number;
}

const AddCommentForm = ({ articleId }: AddCommentFormProps) => {
  const router = useRouter();
  const { loading, withLoading } = useLoading();
  const [text, setText] = useState("");

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() === "") return toast.error("Please write something");

    await withLoading(async () => {
      try {
        await axios.post(`${DOMAIN}/api/comments`, { text, articleId });
        router.refresh();
        setText("");
      } catch (error: any) {
        toast.error(error?.response?.data.message);
      }
    });
  };

  return (
    <form onSubmit={formSubmitHandler} className="flex flex-col gap-3">
      <Input
        type="text"
        placeholder="Share your thoughts…"
        aria-label="Comment"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex justify-end">
        <Button type="submit" loading={loading}>
          Post comment
        </Button>
      </div>
    </form>
  );
};

export default AddCommentForm;
