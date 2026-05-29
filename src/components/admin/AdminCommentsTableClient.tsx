"use client";

import * as React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Comment } from "@/generated/prisma";
import DeleteCommentButton from "@/app/admin/comments-table/DeleteCommentButton";
import { formatDate } from "@/utils/formatDate";
import { DataTable } from "@/components/ui/DataTable";

interface AdminCommentsTableClientProps {
  comments: Comment[];
}

export default function AdminCommentsTableClient({
  comments,
}: AdminCommentsTableClientProps) {
  const columns = React.useMemo<ColumnDef<Comment>[]>(
    () => [
      {
        accessorKey: "text",
        header: "Comment",
        cell: ({ row }) => (
          <span className="text-foreground">{row.original.text}</span>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Created",
        cell: ({ row }) => (
          <span className="text-muted-foreground">
            {formatDate(String(row.original.createdAt))}
          </span>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        enableSorting: false,
        meta: { align: "right" },
        cell: ({ row }) => (
          <DeleteCommentButton
            commentText={row.original.text}
            commentId={row.original.id}
          />
        ),
      },
    ],
    [],
  );

  return (
    <DataTable
      columns={columns}
      data={comments}
      enablePagination
      pageSize={10}
      emptyState={{
        title: "No comments yet",
        description:
          "When users start engaging with your articles, comments will appear here.",
      }}
    />
  );
}
