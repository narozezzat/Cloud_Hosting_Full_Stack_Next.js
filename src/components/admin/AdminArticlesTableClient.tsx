"use client";
import * as React from "react";
import { Article } from "@/generated/prisma";
import { Table, Dropdown } from "antd";
import Link from "next/link";
import { MoreHorizontal, ExternalLink } from "lucide-react";
import EditArticleForm from "./EditArticleModal";
import DeleteArticleButton from "./DeleteArticleButton";
import Pagination from "@/components/articles/Pagination";
import { formatDate } from "@/utils/formatDate";
import type { ColumnsType } from "antd/es/table";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";

interface AdminArticlesTableClientProps {
  articles: Article[];
  pages: number;
  currentPage: number;
}

export default function AdminArticlesTableClient({
  articles,
  pages,
  currentPage,
}: AdminArticlesTableClientProps) {
  const columns: ColumnsType<Article> = [
    {
      title: "Title",
      dataIndex: "title",
      width: "55%",
      key: "title",
      render: (text: string, article) => (
        <Link
          href={`/articles/${article.id}`}
          className="font-medium text-foreground transition-colors hover:text-brand-500"
        >
          {text}
        </Link>
      ),
    },
    {
      title: "Status",
      key: "status",
      width: "12%",
      render: () => <Badge variant="success">Published</Badge>,
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "20%",
      render: (date: string) => (
        <span className="text-sm text-muted-foreground">
          {formatDate(date)}
        </span>
      ),
    },
    {
      title: "",
      key: "actions",
      width: "13%",
      align: "right",
      render: (_: any, article: Article) => {
        const items = [
          {
            key: "edit",
            className: "p-0",
            label: <EditArticleForm article={article} />,
          },
          {
            key: "read-more",
            className: "p-0",
            label: (
              <Link
                href={`/articles/${article.id}`}
                className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-foreground transition-colors hover:bg-secondary"
              >
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                View article
              </Link>
            ),
          },
          { type: "divider" as const },
          {
            key: "delete",
            className: "p-0",
            label: (
              <DeleteArticleButton
                articleTitle={article.title}
                articleId={article.id}
              />
            ),
          },
        ];

        return (
          <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Row actions"
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </Dropdown>
        );
      },
    },
  ];

  if (!articles.length) {
    return (
      <div className="p-6">
        <EmptyState
          title="No articles yet"
          description="Add your first article from the dashboard."
        />
      </div>
    );
  }

  const dataSource = articles.map((article) => ({
    key: article.id,
    ...article,
  }));

  return (
    <div>
      <Table<Article>
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        tableLayout="fixed"
        scroll={{ x: 600 }}
        className="[&_.ant-table]:bg-transparent"
      />
      <div className="border-t border-border p-4">
        <Pagination
          pageNumber={currentPage}
          pages={pages}
          route="/admin/articles-table"
          className="mt-0"
        />
      </div>
    </div>
  );
}
