"use client";
import { useState, Dispatch, SetStateAction, FormEvent, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import { Modal, Input, Button, Form, Grid, Drawer } from "antd";
import { DOMAIN } from "@/utils/constants";
import useLoading from "@/hooks/useLoading";

const { useBreakpoint } = Grid;

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
  const [updatedText, setUpdatedText] = useState(text);
  const router = useRouter();
  const { loading, withLoading } = useLoading();
  const screens = useBreakpoint();

  const formSubmitHandler = async () => {
    if (updatedText === "") return toast.info("Please write something");

    try {
      await withLoading(async () => {
        await axios.put(`${DOMAIN}/api/comments/${commentId}`, {
          text: updatedText,
        });
        router.refresh();
        setUpdatedText("");
        setOpen(false);
      });
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      console.log(error);
    }
  };

  const formContent = useMemo(
    () => (
      <Form
        layout="vertical"
        id="update-comment-form"
        onFinish={formSubmitHandler}
      >
        <Form.Item label={"Description"}>
          <Input
            type="text"
            placeholder="Edit Comment..."
            value={updatedText}
            onChange={(e) => setUpdatedText(e.target.value)}
            className="mb-2"
          />
        </Form.Item>
      </Form>
    ),
    [updatedText, formSubmitHandler],
  );

  const footerContent = useMemo(
    () => (
      <Button
        htmlType="submit"
        form="update-comment-form" // Link this button to the form by its id
        size="large"
        loading={loading}
        className="bg-green-700 w-full text-white p-4 text-xl hover:bg-green-900 hover:border-none transition"
      >
        Edit
      </Button>
    ),
    [loading],
  );

  return (
    <>
      {screens.md ? (
        <Modal
          title={
            <>
              Edit Comment: <span className="uppercase">{commentUserName}</span>
            </>
          }
          open={true}
          onCancel={() => setOpen(false)}
          footer={footerContent}
        >
          {formContent}
        </Modal>
      ) : (
        <Drawer
          title="Add New Article"
          placement="bottom"
          onClose={() => setOpen(false)}
          open={true}
          width="100%"
          height={"auto"}
          footer={footerContent}
          styles={{ body: { padding: "28px 16px 0px 16px" } }}
          className={`
                                rounded-t-2xl
                                [&>.ant-drawer-header>div]:flex-row-reverse
                                `}
        >
          {formContent}
        </Drawer>
      )}
    </>
  );
};

export default UpdateCommentModal;
