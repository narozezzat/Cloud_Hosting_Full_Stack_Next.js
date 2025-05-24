"use client";
import { useState, Dispatch, SetStateAction, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Modal, Input, Button, Form } from 'antd';
import { DOMAIN } from '@/utils/constants';
import useLoading from '@/hooks/useLoading';

interface UpdateCommentModalProps {
    setOpen: Dispatch<SetStateAction<boolean>>;
    text: string;
    commentId: number;
    commentUserName: string;
}

const UpdateCommentModal = ({ setOpen, text, commentId, commentUserName }: UpdateCommentModalProps) => {
    const [updatedText, setUpdatedText] = useState(text);
    const router = useRouter();
    const { loading, withLoading } = useLoading();


    const formSubmitHandler = async () => {
        if (updatedText === "") return toast.info("Please write something");

        try {
            await withLoading(async () => {
                await axios.put(`${DOMAIN}/api/comments/${commentId}`, { text: updatedText });
                router.refresh();
                setUpdatedText("");
                setOpen(false);
            });
        } catch (error: any) {
            toast.error(error?.response?.data.message);
            console.log(error);
        }
    };

    return (
        <Modal
            title={
                <>
                    Edit Comment: <span className='uppercase'>{commentUserName}</span>
                </>
            }
            open={true}
            onCancel={() => setOpen(false)}
            footer={
                <Button
                    htmlType="submit"
                    form="update-comment-form" // Link this button to the form by its id
                    size='large'
                    loading={loading}
                    className="bg-green-700 w-full text-white p-4 text-xl hover:bg-green-900 hover:border-none transition"
                >
                    Edit
                </Button>
            }
        >
            <Form
                id="update-comment-form" // Assign an id to the form
                onFinish={formSubmitHandler}
            >
                <Form.Item>
                    <Input
                        type="text"
                        placeholder="Edit Comment..."
                        value={updatedText}
                        onChange={(e) => setUpdatedText(e.target.value)}
                        className="mb-2"
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UpdateCommentModal;