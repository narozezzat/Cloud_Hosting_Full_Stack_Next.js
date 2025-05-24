"use client";
import useLoading from "@/hooks/useLoading";
import { DOMAIN } from "@/utils/constants";
import { Button, Drawer, Form, Grid, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";

const { useBreakpoint } = Grid;

const AddArticleModal = () => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { loading, withLoading } = useLoading();
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const screens = useBreakpoint(); // Get screen size breakpoints

  const openAddModal = () => {
    setIsAddModalVisible(true);
  };

  const closeAddModal = () => {
    setIsAddModalVisible(false);
  };

  const formSubmitHandler = async () => {
    if (title === "") return toast.error("Title is required");
    if (description === "") return toast.error("Description is required");

    try {
      await withLoading(async () => {
        await axios.post(`${DOMAIN}/api/articles`, { title, description });
        setTitle("");
        setDescription("");
        toast.success("New article added");
        router.refresh();
        closeAddModal();
      });
    } catch (error: any) {
      toast.error(error?.response?.data.message);
    }
  };

  const formContent = useMemo(
    () => (
      <Form
        id="add-article-form"
        onFinish={formSubmitHandler}
        className="flex gap-4 flex-col"
        layout="vertical"
      >
        <Form.Item
          label="Title"
          name="title"
          className="mb-2"
          rules={[{ required: true, message: "Title is required" }]}
        >
          <Input
            className="border rounded p-2 text-xl"
            type="text"
            placeholder="Enter Article Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name={"description"}
          label={"Description"}
          rules={[{ required: true, message: "Description is required" }]}
        >
          <TextArea
            className="p-2 lg:text-xl rounded resize-none"
            rows={5}
            placeholder="Enter Article Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Item>
      </Form>
    ),
    [title, description],
  );

  const footerContent = useMemo(
    () => (
      <Button
        form="add-article-form"
        loading={loading}
        disabled={loading}
        htmlType="submit"
        className="w-full text-2xl text-white bg-blue-700 hover:bg-blue-900 hover:border-blue-800 p-6 rounded-lg font-bold"
      >
        Add
      </Button>
    ),
    [loading],
  );

  return (
    <>
      <Button
        className="bg-blue-700 text-white hover:bg-blue-900 hover:border-blue-900"
        onClick={openAddModal}
      >
        Add Article
      </Button>
      {screens.md ? (
        <Modal
          title="Add New Article"
          open={isAddModalVisible}
          onCancel={closeAddModal}
          footer={footerContent}
        >
          {formContent}
        </Modal>
      ) : (
        <Drawer
          title="Add New Article"
          placement="bottom"
          onClose={closeAddModal}
          open={isAddModalVisible}
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
          {formContent}
        </Drawer>
      )}
    </>
  );
};

export default AddArticleModal;
