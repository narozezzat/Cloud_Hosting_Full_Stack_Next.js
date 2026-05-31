"use client";

import * as React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Plus, Trash2, Tag } from "lucide-react";
import { DOMAIN } from "@/lib/constants";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { CategoryWithCount } from "@/lib/types";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import ConfirmationModal from "@/components/common/modals/ConfirmationModal";
import useLoading from "@/hooks/useLoading";

interface AdminCategoriesClientProps {
  categories: CategoryWithCount[];
  /** Active server-side search term (drives the empty-state copy). */
  searchQuery?: string;
}

export default function AdminCategoriesClient({
  categories,
  searchQuery,
}: AdminCategoriesClientProps) {
  const router = useRouter();
  const [name, setName] = React.useState("");
  const [pendingDelete, setPendingDelete] =
    React.useState<CategoryWithCount | null>(null);
  const { loading: creating, withLoading: withCreating } = useLoading();
  const { loading: deleting, withLoading: withDeleting } = useLoading();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Category name is required");
    try {
      await withCreating(async () => {
        await axios.post(`${DOMAIN}/api/categories`, { name: name.trim() });
        toast.success("Category created");
        setName("");
        router.refresh();
      });
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleDelete = async () => {
    if (!pendingDelete) return;
    try {
      await withDeleting(async () => {
        await axios.delete(`${DOMAIN}/api/categories/${pendingDelete.id}`);
        toast.success("Category deleted");
        setPendingDelete(null);
        router.refresh();
      });
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleCreate} className="flex items-center gap-2">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New category name…"
          leftIcon={<Tag className="h-4 w-4" />}
          aria-label="New category name"
        />
        <Button type="submit" loading={creating} className="shrink-0 gap-1.5">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Add</span>
        </Button>
      </form>

      {categories.length === 0 ? (
        <EmptyState
          title={searchQuery ? "No matching categories" : "No categories yet"}
          description={
            searchQuery
              ? `No categories match “${searchQuery}”.`
              : "Create your first category to organize articles."
          }
        />
      ) : (
        <ul className="divide-y divide-border rounded-md border border-border">
          {categories.map((c) => (
            <li
              key={c.id}
              className="flex items-center justify-between gap-3 px-4 py-3"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">
                  {c.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {c._count.articles}{" "}
                  {c._count.articles === 1 ? "article" : "articles"} · /{c.slug}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPendingDelete(c)}
                aria-label={`Delete ${c.name}`}
                className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {pendingDelete && (
        <ConfirmationModal
          isOpen={Boolean(pendingDelete)}
          onClose={() => setPendingDelete(null)}
          onConfirm={handleDelete}
          title="Delete this category?"
          message={
            <span>
              Articles in{" "}
              <span className="font-semibold text-foreground">
                {pendingDelete.name}
              </span>{" "}
              will keep their content but lose this category.
            </span>
          }
          confirmText="Delete category"
          cancelText="Cancel"
          isLoading={deleting}
          tone="danger"
        />
      )}
    </div>
  );
}
