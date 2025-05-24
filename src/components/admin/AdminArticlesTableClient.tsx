"use client";
import React, { useEffect, useState } from "react";
import { Article } from "@/generated/prisma";
import { Table, Button, Dropdown, Spin } from "antd";
import Link from "next/link";
import EditArticleForm from "./EditArticleModal";
import DeleteArticleButton from "./DeleteArticleButton";
import Pagination from "@/components/articles/Pagination";
import { formatDate } from "@/utils/formatDate";
import type { ColumnsType } from "antd/es/table";
import {
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
  ReadOutlined,
} from "@ant-design/icons";

interface AdminArticlesTableClientProps {
  articles: Article[];
  pages: number;
  currentPage: number;
}

const AdminArticlesTableClient = ({
  articles,
  pages,
  currentPage,
}: AdminArticlesTableClientProps) => {
  // const [mounted, setMounted] = useState(false);
  // useEffect(() => {
  //     setMounted(true);
  // }, []);

  // if (!mounted) return <Spin className="flex justify-center items-center h-[80%]" />;

  const columns: ColumnsType<Article> = [
    {
      title: "Title",
      dataIndex: "title",
      width: "25%",
      key: "title",
      align: "center",
      render: (text: string) => <span className="text-gray-700">{text}</span>,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "30%",
      align: "center",
      render: (date: string) => (
        <span className="text-gray-700">{formatDate(date)}</span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: "45%",
      align: "center",
      render: (_: any, article: Article) => {
        const items = [
          {
            key: "edit",
            className: "p-0",
            label: <EditArticleForm article={article} />,
          },
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
          {
            key: "read-more",
            icon: <ReadOutlined />,
            label: <Link href={`/articles/${article.id}`}>Read More</Link>,
          },
        ];

        return (
          <Dropdown menu={{ items }} trigger={["click"]}>
            <Button
              icon={<MoreOutlined />}
              className="text-gray-700 rounded-full hover:text-gray-900"
            />
          </Dropdown>
        );
      },
    },
  ];

  // Map articles to data source for the table
  const dataSource = articles.map((article) => ({
    key: article.id,
    ...article,
  }));

  return (
    <section className="p-5 pt-0">
      <Table<Article>
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        tableLayout="fixed"
        scroll={{ x: 600 }}
      />

      <Pagination
        pageNumber={currentPage}
        pages={pages}
        route="/admin/articles-table"
        className="pb-0"
      />
    </section>
  );
};

export default AdminArticlesTableClient;
