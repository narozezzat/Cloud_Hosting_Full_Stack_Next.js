"use client";
import { Modal, Button } from "antd";
import { TiWarningOutline } from "react-icons/ti";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmation",
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  isLoading = false
}: ConfirmationModalProps) => {
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      closable={false}
      className="confirmation-modal"
    >
      <div className="text-center py-4">
        <div className="bg-gray-100 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
          <TiWarningOutline className="text-3xl text-gray-800" />
        </div>

        <h3 className="text-xl font-normal mb-4">{message}</h3>

        <div className="flex gap-4 mt-6">
          <Button
            onClick={onClose}
            className="w-1/2 h-12 text-lg border-gray-300"
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            className="w-1/2 h-12 text-lg text-white bg-red-600 hover:!bg-red-700 hover:!text-white !border-red-600"
            loading={isLoading}
            disabled={isLoading}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
