import React from 'react';
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { Article } from "@/generated/prisma";
import { getArticles } from "@/apiCalls/articleApiCall";
import { ARTICLE_PER_PAGE } from "@/utils/constants";
import prisma from "@/utils/db";
import AdminArticlesTableClient from '@/components/admin/AdminArticlesTableClient';
import AddArticleForm from '../../../components/admin/AddArticleModal';

interface AdminArticlesTableProps {
    searchParams: { pageNumber: string };
}

const AdminArticlesTable = async ({ searchParams: { pageNumber } }: AdminArticlesTableProps) => {
    const token = cookies().get("jwtToken")?.value;
    if (!token) redirect("/");

    const payload = verifyTokenForPage(token);
    if (payload?.isAdmin === false) redirect("/");

    const articles: Article[] = await getArticles(pageNumber);
    const count: number = await prisma.article.count();
    const pages = Math.ceil(count / ARTICLE_PER_PAGE);

    return (
        <>
            <div className="flex justify-between items-center p-5 pb-2">
                <h1 className="text-2xl font-semibold text-gray-700">Articles</h1>
                <AddArticleForm />
            </div>
            <AdminArticlesTableClient
                articles={articles}
                pages={pages}
                currentPage={parseInt(pageNumber)}
            />
        </>
    );
};

export default AdminArticlesTable;