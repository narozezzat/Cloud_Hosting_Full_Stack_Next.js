"use client";

import * as React from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import { DOMAIN } from "@/lib/constants";
import { Article } from "@/generated/prisma";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Modal } from "@/components/ui/Modal";

interface EditArticleModalProps {
  article: Article;
  /** Optional custom trigger. Defaults to a full-width menu-item style button. Ignored when `open` is controlled. */
  trigger?: React.ReactElement;
  /** When provided, the modal is fully controlled and no internal trigger is rendered. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const EditArticleModal = ({
  article,
  trigger,
  open: openProp,
  onOpenChange,
}: EditArticleModalProps) => {
  const router = useRouter();
  const isControlled = openProp !== undefined;
  const [internalOpen, setInternalOpen] = React.useState(false);
  const open = isControlled ? (openProp as boolean) : internalOpen;
  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const [title, setTitle] = React.useState(article.title);
  const [description, setDescription] = React.useState(article.description);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setTitle(article.title);
      setDescription(article.description);
    }
  }, [open, article]);

  const handleClose = () => {
    if (loading) return;
    setOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return toast.error("Title is required");
    if (!description.trim()) return toast.error("Description is required");

    try {
      setLoading(true);
      await axios.put(`${DOMAIN}/api/articles/${article.id}`, {
        title,
        description,
      });
      toast.success("Article updated");
      setOpen(false);
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => setOpen(true);

  const triggerEl = isControlled ? null : trigger ? (
    React.cloneElement(trigger, {
      onClick: (e: React.MouseEvent) => {
        trigger.props.onClick?.(e);
        if (!e.defaultPrevented) openModal();
      },
    })
  ) : (
    <button
      type="button"
      onClick={openModal}
      className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-foreground transition-colors hover:bg-secondary"
    >
      <Pencil className="h-4 w-4 text-muted-foreground" />
      Edit
    </button>
  );

  return (
    <>
      {triggerEl}
      <Modal
        open={open}
        onClose={handleClose}
        size="xl"
        icon={<Pencil className="h-5 w-5" />}
        title="Edit article"
        description="Update the title or description, then save your changes."
        footer={
          <>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button form="edit-article-form" type="submit" loading={loading}>
              Save changes
            </Button>
          </>
        }
      >
        <form
          id="edit-article-form"
          onSubmit={handleSubmit}
          className="space-y-4"
          noValidate
        >
          <div className="space-y-1.5">
            <label htmlFor="edit-article-title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="edit-article-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
          </div>
          <div className="space-y-1.5">
            <label
              htmlFor="edit-article-description"
              className="text-sm font-medium"
            >
              Description
            </label>
            <Textarea
              id="edit-article-description"
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default EditArticleModal;
