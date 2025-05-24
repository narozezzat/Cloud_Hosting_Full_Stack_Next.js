"use client";
import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { DOMAIN } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { Article } from "@/generated/prisma";
import useLoading from "@/hooks/useLoading";
import { Button, Form, Input, Modal, Drawer, Grid } from "antd";
import { EditOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { useBreakpoint } = Grid;

interface EditArticleFormProps {
  article: Article;
}

const EditArticleModal = ({ article }: EditArticleFormProps) => {
  const router = useRouter();
  const { loading, withLoading } = useLoading();
  const [isVisible, setIsVisible] = useState(false);
  const screens = useBreakpoint(); // Get screen size breakpoints

  const open = () => {
    setIsVisible(true);
  };

  const close = () => {
    setIsVisible(false);
  };

  const formSubmitHandler = async (values: {
    title: string;
    description: string;
  }) => {
    const { title, description } = values;

    if (title === "") return toast.error("Title is required");
    if (description === "") return toast.error("Description is required");

    try {
      await withLoading(async () => {
        await axios.put(`${DOMAIN}/api/articles/${article.id}`, {
          title,
          description,
        });
        toast.success("Article updated");
        router.refresh();
        close();
      });
    } catch (error: any) {
      toast.error(error?.response?.data.message);
    }
  };

  const initialValues = {
    title: article.title,
    description: article.description,
  };

  const FormContent = useMemo(
    () => (
      <Form
        onFinish={formSubmitHandler}
        className="flex flex-col"
        layout="vertical"
        initialValues={initialValues}
        id="update-article-form"
      >
        <Form.Item name="title" label="Title" className="mb-4">
          <Input className="border rounded p-2 text-xl" type="text" />
        </Form.Item>
        <Form.Item name="description" label="Description" className="mb-4">
          <TextArea className="p-2 lg:text-xl rounded resize-none" rows={5} />
        </Form.Item>
      </Form>
    ),
    [formSubmitHandler, initialValues],
  );

  const footerContent = useMemo(
    () => (
      <Button
        form="update-article-form"
        loading={loading}
        htmlType="submit"
        size="large"
        className="text-2xl w-full text-white bg-blue-700 hover:bg-blue-900 p-6 hover:border-blue-800 hover:text-white font-bold"
      >
        Edit
      </Button>
    ),
    [loading],
  );

  return (
    <>
      <Button
        className="w-full flex justify-start p-2.5"
        icon={<EditOutlined />}
        type="text"
        onClick={open}
      >
        Edit
      </Button>

      {screens.md ? (
        <Modal
          title="Edit Article"
          open={isVisible}
          onCancel={close}
          footer={footerContent}
        >
          {FormContent}
        </Modal>
      ) : (
        <Drawer
          title="Edit Article"
          placement="bottom"
          onClose={close}
          open={isVisible}
          width="100%"
          footer={footerContent}
          styles={{ body: { padding: "16px" } }}
          className={`
                        rounded-t-2xl
                        [&>.ant-drawer-wrapper-body]:h-min
                        [&>.ant-drawer-wrapper-body_.ant-drawer-body]:py-6
                        [&>.ant-drawer-header>div]:flex-row-reverse
                    `}
        >
          {FormContent}
        </Drawer>
      )}
    </>
  );
};

export default EditArticleModal;
