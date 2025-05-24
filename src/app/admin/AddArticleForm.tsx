"use client";
import { DOMAIN } from '@/utils/constants';
import { Button, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const AddArticleForm = () => {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const formSubmitHandler = async (e: React.FormEvent) => {
        if (title === "") return toast.error("Title is required");
        if (description === "") return toast.error("Description is required");

        try {
            setLoading(true);
            await axios.post(`${DOMAIN}/api/articles`, { title, description });
            setTitle("");
            setDescription("");
            toast.success("New article added");
            router.refresh();
        } catch (error: any) {
            toast.error(error?.response?.data.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Form onFinish={formSubmitHandler} className="flex gap-2 flex-col">
            <Input
                className="mb-4 border rounded !p-2 text-xl"
                type="text"
                placeholder="Enter Article Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <TextArea
                className='mb-4 lg:text-xl rounded resize-none'
                rows={5}
                placeholder='Enter Article Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></TextArea>
            <Button
                loading={loading}
                disabled={loading}
                htmlType="submit"
                size='large'
                className="text-2xl !text-white !bg-blue-700 hover:!bg-blue-900 hover:border-none hover:!text-white rounded-lg font-bold"
            >
                Add
            </Button>
        </Form>
    )
}

export default AddArticleForm;
