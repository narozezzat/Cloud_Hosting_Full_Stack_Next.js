"use client";

import * as React from "react";
import { AlertTriangle } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: React.ReactNode;
  message: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  /** Visual tone for the confirm action. Defaults to "danger". */
  tone?: "danger" | "primary";
}

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  isLoading = false,
  tone = "danger",
}: ConfirmationModalProps) => {
  const handleClose = () => {
    if (isLoading) return;
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      size="sm"
      variant="center"
      icon={
        <AlertTriangle
          className={
            tone === "danger"
              ? "h-5 w-5 text-destructive"
              : "h-5 w-5 text-brand-500"
          }
        />
      }
      title={title}
      footer={
        <>
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button
            type="button"
            variant={tone === "danger" ? "danger" : "primary"}
            onClick={onConfirm}
            loading={isLoading}
          >
            {confirmText}
          </Button>
        </>
      }
    >
      <div className="text-sm text-muted-foreground">{message}</div>
    </Modal>
  );
};

export default ConfirmationModal;
