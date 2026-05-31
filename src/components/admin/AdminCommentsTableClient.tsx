"use client";

import * as React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Comment } from "@/generated/prisma";
import CommentRowActions from "./CommentRowActions";
import Pagination from "@/components/ui/Pagination";
import { formatDate } from "@/lib/formatDate";
import { DataTable } from "@/components/ui/DataTable";
import { useAdminSearch } from "@/components/admin/search/AdminSearchContext";

interface AdminCommentsTableClientProps {
  comments: Comment[];
  pages: number;
  currentPage: number;
}

export default function AdminCommentsTableClient({
  comments,
  pages,
  currentPage,
}: AdminCommentsTableClientProps) {
  const { query } = useAdminSearch();
  const q = query.trim().toLowerCase();
  const filtered = q
    ? comments.filter((c) => c.text.toLowerCase().includes(q))
    : comments;

  const columns = React.useMemo<ColumnDef<Comment>[]>(
    () => [
      {
        accessorKey: "text",
        header: "Comment",
        ellipsis: true,
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
        cell: ({ row }) => <CommentRowActions comment={row.original} />,
      },
    ],
    [],
  );

  return (
    <DataTable
      columns={columns}
      data={filtered}
      emptyState={
        q
          ? {
              title: "No matching comments",
              description: `No comments on this page match “${query}”.`,
            }
          : {
              title: "No comments yet",
              description:
                "When users start engaging with your articles, comments will appear here.",
            }
      }
      footer={
        q ? undefined : (
          <Pagination
            pageNumber={currentPage}
            pages={pages}
            route="/admin/comments-table"
            className="mt-0"
          />
        )
      }
    />
  );
}
