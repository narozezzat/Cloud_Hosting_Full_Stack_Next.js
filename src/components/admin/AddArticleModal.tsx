"use client";

import * as React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Plus, FileText } from "lucide-react";
import { DOMAIN } from "@/lib/constants";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { ArticleFormFields } from "@/components/admin/ArticleFormFields";
import { useCategories } from "@/hooks/useCategories";

interface AddArticleModalProps {
  /** Optional custom trigger. If omitted, a primary "New article" button is rendered. */
  trigger?: React.ReactElement;
}

const AddArticleModal = ({ trigger }: AddArticleModalProps) => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [categoryId, setCategoryId] = React.useState<number | null>(null);
  const [loading, setLoading] = React.useState(false);
  const { categories } = useCategories(open);

  const reset = () => {
    setTitle("");
    setDescription("");
    setCategoryId(null);
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
      await axios.post(`${DOMAIN}/api/articles`, {
        title,
        description,
        categoryId,
      });
      toast.success("Article published");
      reset();
      setOpen(false);
      router.refresh();
    } catch (error) {
      toast.error(getErrorMessage(error));
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
          <ArticleFormFields
            idPrefix="add-article"
            title={title}
            description={description}
            onTitleChange={setTitle}
            onDescriptionChange={setDescription}
            titlePlaceholder="e.g. Why edge functions matter"
            descriptionPlaceholder="Tell us what this article is about…"
            categories={categories}
            categoryId={categoryId}
            onCategoryChange={setCategoryId}
          />
        </form>
      </Modal>
    </>
  );
};

export default AddArticleModal;
