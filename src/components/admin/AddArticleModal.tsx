"use client";
import useLoading from '@/hooks/useLoading';
import { DOMAIN } from '@/utils/constants';
import { Button, Form, Input, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';


const AddArticleModal = () => {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const { loading, withLoading } = useLoading();
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);

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

    return (
        <>
            <Button
                className='bg-blue-700 text-white hover:bg-blue-900 hover:border-blue-900'
                onClick={openAddModal}
            >
                Add Article
            </Button>

            <Modal
                title="Add New Article"
                open={isAddModalVisible}
                onCancel={closeAddModal}
                footer={null}
            >
                <Form onFinish={formSubmitHandler} className="flex gap-4 flex-col">
                    <Input
                        className="mb-4 border rounded p-2 text-xl"
                        type="text"
                        placeholder="Enter Article Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextArea
                        className='mb-4 p-2 lg:text-xl rounded resize-none'
                        rows={5}
                        placeholder='Enter Article Description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></TextArea>
                    <Button
                        loading={loading}
                        disabled={loading}
                        htmlType="submit"
                        className="text-2xl text-white bg-blue-700 hover:bg-blue-900 hover:border-blue-800 p-6 rounded-lg font-bold"
                    >
                        Add
                    </Button>
                </Form>
            </Modal>
        </>
    );
};

export default AddArticleModal;