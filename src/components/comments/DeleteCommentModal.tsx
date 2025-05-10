"use client"
import { IoMdCloseCircleOutline } from 'react-icons/io';

interface DeleteCommentModalProps {
    text: string;
    onClose: () => void;
    onDelete: () => void;
}

const DeleteCommentModal = ({ text, onClose, onDelete }: DeleteCommentModalProps) => {
    return (
        <div className='fixed top-0 left-0 bottom-0 right-0 z-10 bg-black bg-opacity-40 flex items-center justify-center'>
            <div className='w-2/4 bg-white rounded-lg p-3'>
                <div className='flex justify-end items-start'>
                    <IoMdCloseCircleOutline onClick={onClose} className='text-red-500 cursor-pointer text-3xl' />
                </div>
                <div className='text-center mb-4'>
                    <h3 className='text-xl font-bold mb-2'>Delete Comment</h3>
                    <p>Are you sure you want to delete this comment?</p>
                    <p className='text-gray-600 italic mt-2'>"{text}"</p>
                </div>
                <div className='flex justify-between gap-3'>
                    <button onClick={onClose} className='bg-gray-500 w-1/2 text-white p-1 text-xl rounded-lg hover:bg-gray-600 transition'>
                        Cancel
                    </button>
                    <button onClick={onDelete} className='bg-red-600 w-1/2 text-white p-1 text-xl rounded-lg hover:bg-red-700 transition'>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteCommentModal