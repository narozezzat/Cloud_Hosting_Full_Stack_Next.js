"use client";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";
import ConfirmationModal from "@/components/common/modals/ConfirmationModal";
import { Button } from "antd";

interface DeleteArticleButtonProps {
    articleId: number;
    articleTitle: string;
}

const DeleteArticleButton = ({ articleId, articleTitle }: DeleteArticleButtonProps) => {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const deleteArticleHandler = async () => {
        try {
            setIsLoading(true);
            await axios.delete(`${DOMAIN}/api/articles/${articleId}`);
            router.refresh();
            toast.success("article deleted");
            setIsModalOpen(false);
        } catch (error: any) {
            toast.error(error?.response?.data.message);
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <button className="text-red-500" onClick={showModal}>
                Delete
            </button>

            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={handleCancel}
                onConfirm={deleteArticleHandler}
                message={
                    <>
                        Are you sure you want to delete this article?
                        <p className="font-bold">"{articleTitle}"</p>
                    </>
                }
                confirmText="Delete"
                cancelText="Cancel"
                isLoading={isLoading}
            />
        </>
    )
}

export default DeleteArticleButton
