"use client";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const AddArticleForm = () => {
  const router = useRouter();
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return toast.error("Title is required");
    if (!description) return toast.error("Description is required");

    try {
      setLoading(true);
      await axios.post(`${DOMAIN}/api/articles`, { title, description });
      setTitle("");
      setDescription("");
      toast.success("New article added");
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="space-y-1.5">
        <label htmlFor="article-title" className="text-sm font-medium">
          Title
        </label>
        <Input
          id="article-title"
          placeholder="e.g. Why edge functions matter"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="article-description" className="text-sm font-medium">
          Description
        </label>
        <textarea
          id="article-description"
          rows={5}
          placeholder="Tell us what this article is about…"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={cn(
            "w-full rounded-md border border-input bg-card px-3 py-2 text-sm shadow-xs",
            "placeholder:text-muted-foreground resize-y",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent",
          )}
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit" loading={loading} size="md">
          Publish article
        </Button>
      </div>
    </form>
  );
};

export default AddArticleForm;
