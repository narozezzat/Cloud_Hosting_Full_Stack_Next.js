"use client";
import { Modal, Button, Grid, Drawer } from "antd";
import { useMemo } from "react";
import { TiWarningOutline } from "react-icons/ti";

const { useBreakpoint } = Grid;

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  isLoading = false,
}: ConfirmationModalProps) => {
  const screens = useBreakpoint();

  const modalContent = useMemo(
    () => (
      <div className="text-center mt-8">
        <div className="bg-gray-100 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
          <TiWarningOutline className="text-3xl text-gray-800" />
        </div>
        <h3 className="text-xl font-normal">{message}</h3>
      </div>
    ),
    [message],
  );

  const footerContent = useMemo(
    () => (
      <div className="flex gap-4">
        <Button
          onClick={onClose}
          className="w-1/2 h-12 text-lg border-gray-300"
          disabled={isLoading}
          size={screens.xs ? "middle" : "large"}
        >
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          className="w-1/2 h-12 text-lg text-white bg-error-light-1 hover:bg-red-700 border-red-600"
          loading={isLoading}
          disabled={isLoading}
          size={screens.xs ? "middle" : "large"}
        >
          {confirmText}
        </Button>
      </div>
    ),
    [cancelText, confirmText, isLoading, onClose, onConfirm, screens.xs],
  );

  return (
    <>
      {screens.md ? (
        <Modal
          open={isOpen}
          onCancel={onClose}
          footer={footerContent}
          centered
          closable={false}
          className="confirmation-modal"
        >
          {modalContent}
        </Modal>
      ) : (
        <Drawer
          placement="bottom"
          onClose={onClose}
          open={isOpen}
          width="100%"
          closable={false}
          height={"auto"}
          footer={footerContent}
          styles={{ body: { padding: "16px" } }}
          className={`rounded-t-2xl`}
        >
          {modalContent}
        </Drawer>
      )}
    </>
  );
};

export default ConfirmationModal;
