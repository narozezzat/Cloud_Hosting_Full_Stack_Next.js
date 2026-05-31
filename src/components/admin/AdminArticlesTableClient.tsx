"use client";

import * as React from "react";
import Link from "next/link";
import type { ColumnDef } from "@tanstack/react-table";
import { Article } from "@/generated/prisma";
import RowActions from "./RowActions";
import Pagination from "@/components/ui/Pagination";
import { formatDate } from "@/lib/formatDate";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/ui/DataTable";

interface AdminArticlesTableClientProps {
  articles: Article[];
  pages: number;
  currentPage: number;
  /** Active server-side search term, preserved across pagination. */
  searchQuery?: string;
}

export default function AdminArticlesTableClient({
  articles,
  pages,
  currentPage,
  searchQuery,
}: AdminArticlesTableClientProps) {
  const columns = React.useMemo<ColumnDef<Article>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        ellipsis: true,
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
        size: 160,
        enableSorting: false,
        cell: () => <Badge variant="success">Published</Badge>,
      },
      {
        accessorKey: "createdAt",
        header: "Created",
        size: 140,
        cell: ({ row }) => (
          <span className="text-sm text-muted-foreground">
            {formatDate(String(row.original.createdAt))}
          </span>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        size: 120,
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
      emptyState={
        searchQuery
          ? {
              title: "No matching articles",
              description: `No articles match “${searchQuery}”.`,
            }
          : {
              title: "No articles yet",
              description: "Add your first article from the dashboard.",
            }
      }
      footer={
        <Pagination
          pageNumber={currentPage}
          pages={pages}
          route="/admin/articles-table"
          query={{ q: searchQuery }}
          className="mt-0"
        />
      }
    />
  );
}
