import { Article, User, Comment, Category } from "@/generated/prisma";

export type JWTPayload = {
  id: number;
  isAdmin: boolean;
  username: string;
};

export type CommentWithUser = Comment & { user: Pick<User, "username"> };

/** A comment plus one level of nested replies (each reply carries its author). */
export type CommentWithReplies = CommentWithUser & {
  replies: CommentWithUser[];
};

export type ArticleWithCategory = Article & { category: Category | null };

export type CategoryWithCount = Category & { _count: { articles: number } };

export type AdminUserRow = Pick<
  User,
  "id" | "username" | "email" | "isAdmin" | "createdAt"
> & { _count: { comments: number } };

export type SingleArticle = Article & {
  category: Category | null;
  comments: CommentWithUser[];
};
