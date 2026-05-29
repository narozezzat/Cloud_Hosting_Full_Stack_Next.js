"use client";

import * as React from "react";
import Link from "next/link";
import { MoreHorizontal, ExternalLink, Pencil, Trash2 } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { Article } from "@/generated/prisma";
import EditArticleModal from "./EditArticleModal";
import DeleteArticleButton from "./DeleteArticleButton";
import Pagination from "@/components/articles/Pagination";
import { formatDate } from "@/utils/formatDate";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/ui/DataTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AdminArticlesTableClientProps {
  articles: Article[];
  pages: number;
  currentPage: number;
}

function RowActions({ article }: { article: Article }) {
  const [editOpen, setEditOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Row actions"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setEditOpen(true)}>
            <Pencil className="h-4 w-4 text-muted-foreground" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/articles/${article.id}`}>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
              View article
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            destructive
            onSelect={(e) => {
              e.preventDefault();
              setDeleteOpen(true);
            }}
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditArticleModal
        article={article}
        open={editOpen}
        onOpenChange={setEditOpen}
      />
      <DeleteArticleButton
        articleId={article.id}
        articleTitle={article.title}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </>
  );
}

export default function AdminArticlesTableClient({
  articles,
  pages,
  currentPage,
}: AdminArticlesTableClientProps) {
  const columns = React.useMemo<ColumnDef<Article>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        size: 400,
        cell: ({ row }) => (
          <Link
            href={`/articles/${row.original.id}`}
            className="font-medium text-foreground transition-colors hover:text-brand-500"
          >
            {row.original.title}
          </Link>
        ),
      },
      {
        id: "status",
        header: "Status",
        size: 150,
        enableSorting: false,
        cell: () => <Badge variant="success">Published</Badge>,
      },
      {
        accessorKey: "createdAt",
        header: "Created",
        size: 200,
        cell: ({ row }) => (
          <span className="text-sm text-muted-foreground">
            {formatDate(String(row.original.createdAt))}
          </span>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        size: 100,
        enableSorting: false,
        meta: { align: "right" },
        cell: ({ row }) => <RowActions article={row.original} />,
      },
    ],
    [],
  );

  return (
    <DataTable
      columns={columns}
      data={articles}
      emptyState={{
        title: "No articles yet",
        description: "Add your first article from the dashboard.",
      }}
      footer={
        <Pagination
          pageNumber={currentPage}
          pages={pages}
          route="/admin/articles-table"
          className="mt-0"
        />
      }
    />
  );
}
