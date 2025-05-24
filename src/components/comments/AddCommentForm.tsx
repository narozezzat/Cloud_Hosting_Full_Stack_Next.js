"use client";
import { DOMAIN } from "@/utils/constants";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import useLoading from "@/hooks/useLoading";

interface AddCommentFormProps {
  articleId: number;
}

const AddCommentForm = ({ articleId }: AddCommentFormProps) => {
  const router = useRouter();
  const { loading, withLoading } = useLoading();

  const [text, setText] = useState("");

  const formSubmitHandler = async () => {
    if (text === "") return toast.error("Please write something");

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
    <Form onFinish={formSubmitHandler}>
      <Input
        className="rounded-lg text-xl p-2 w-full bg-white focus:shadow-md"
        type="text"
        placeholder="Add a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button
        size="large"
        loading={loading}
        htmlType="submit"
        className="bg-green-700 text-white mt-2  w-min text-xl rounded-lg hover:!bg-green-900 hover:!text-white hover:!border-green-900 transition"
      >
        Comment
      </Button>
    </Form>
  );
};

export default AddCommentForm;
