"use client";
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { DOMAIN } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import { Article } from '@/generated/prisma';
import useLoading from '@/hooks/useLoading';
import { Button, Form, Input, Modal } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const { TextArea } = Input;

interface EditArticleFormProps {
    article: Article;
}

const EditArticleModal = ({ article }: EditArticleFormProps) => {
    const router = useRouter();
    const { loading, withLoading } = useLoading();
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);


    const openEditModal = () => {
        setIsEditModalVisible(true);
    };

    const closeEditModal = () => {
        setIsEditModalVisible(false);
    };

    const formSubmitHandler = async (values: { title: string; description: string }) => {
        const { title, description } = values;

        if (title === "") return toast.error("Title is required");
        if (description === "") return toast.error("Description is required");

        try {
            await withLoading(async () => {
                await axios.put(`${DOMAIN}/api/articles/${article.id}`, { title, description });
                toast.success("Article updated");
                router.refresh();
                closeEditModal();
            });
        } catch (error: any) {
            toast.error(error?.response?.data.message);
        }
    };

    const initialValues = {
        title: article.title,
        description: article.description,
    }

    return (
        <>
            <Button className='w-full flex justify-start p-2.5' icon={<EditOutlined />} type='text' onClick={openEditModal}>
                Edit
            </Button>
            <Modal
                title={`Edit Article`}
                open={isEditModalVisible}
                onCancel={closeEditModal}
                footer={null}
            >
                <Form
                    onFinish={formSubmitHandler}
                    className="flex flex-col"
                    layout="vertical"
                    initialValues={initialValues}
                >
                    <Form.Item
                        name="title"
                        label="Title"
                        className="mb-4"
                    >
                        <Input
                            className="border rounded p-2 text-xl"
                            type="text"
                        />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                        className="mb-4"
                    >
                        <TextArea
                            className="p-2 lg:text-xl rounded resize-none"
                            rows={5}
                        />
                    </Form.Item>
                    <Button
                        loading={loading}
                        htmlType="submit"
                        size="large"
                        className="text-2xl text-white bg-blue-700 hover:bg-blue-900 p-6 hover:border-blue-800 hover:text-white font-bold"
                    >
                        Edit
                    </Button>
                </Form>
            </Modal>
        </>
    );
};

export default EditArticleModal;