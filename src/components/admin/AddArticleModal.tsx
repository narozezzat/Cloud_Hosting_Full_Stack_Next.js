"use client";

import * as React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Plus, FileText } from "lucide-react";
import { DOMAIN } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Modal } from "@/components/ui/Modal";

interface AddArticleModalProps {
  /** Optional custom trigger. If omitted, a primary "New article" button is rendered. */
  trigger?: React.ReactElement;
}

const AddArticleModal = ({ trigger }: AddArticleModalProps) => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const reset = () => {
    setTitle("");
    setDescription("");
  };

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
      await axios.post(`${DOMAIN}/api/articles`, { title, description });
      toast.success("Article published");
      reset();
      setOpen(false);
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => setOpen(true);

  const triggerEl = trigger ? (
    React.cloneElement(trigger, {
      onClick: (e: React.MouseEvent) => {
        trigger.props.onClick?.(e);
        if (!e.defaultPrevented) openModal();
      },
    })
  ) : (
    <Button onClick={openModal} className="gap-1.5">
      <Plus className="h-4 w-4" />
      <span className="hidden sm:inline">New Article</span>
    </Button>
  );

  return (
    <>
      {triggerEl}
      <Modal
        open={open}
        onClose={handleClose}
        size="xl"
        icon={<FileText className="h-5 w-5" />}
        title="Publish a new article"
        description="A clear title and a short description go a long way."
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
            <Button form="add-article-form" type="submit" loading={loading}>
              Publish article
            </Button>
          </>
        }
      >
        <form
          id="add-article-form"
          onSubmit={handleSubmit}
          className="space-y-4"
          noValidate
        >
          <div className="space-y-1.5">
            <label htmlFor="add-article-title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="add-article-title"
              placeholder="e.g. Why edge functions matter"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
          </div>
          <div className="space-y-1.5">
            <label
              htmlFor="add-article-description"
              className="text-sm font-medium"
            >
              Description
            </label>
            <Textarea
              id="add-article-description"
              rows={6}
              placeholder="Tell us what this article is about…"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddArticleModal;
