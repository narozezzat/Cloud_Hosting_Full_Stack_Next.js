import { API_BASE_URL } from "@/lib/constants";
import { ArticleWithCategory, SingleArticle } from "@/lib/types";

// Get articles based on pageNumber (optionally filtered by category)
export async function getArticles(
  pageNumber: string | undefined,
  categoryId?: string,
): Promise<ArticleWithCategory[]> {
  const params = new URLSearchParams({ pageNumber: pageNumber || "1" });
  if (categoryId) params.set("categoryId", categoryId);

  const response = await fetch(
    `${API_BASE_URL}/api/articles?${params.toString()}`,
    { cache: "no-store" },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }

  return response.json();
}

// Get articles count
export async function getArticlesCount(): Promise<number> {
  const response = await fetch(`${API_BASE_URL}/api/articles/count`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to get articles count");
  }

  const { count } = (await response.json()) as { count: number };
  return count;
}

// Get articles based on searchText (+ optional category / sort filters)
export async function getArticlesBasedOnSearch(
  searchText: string,
  options?: { categoryId?: string; sort?: string },
): Promise<ArticleWithCategory[]> {
  const params = new URLSearchParams({ searchText });
  if (options?.categoryId) params.set("categoryId", options.categoryId);
  if (options?.sort) params.set("sort", options.sort);

  const response = await fetch(
    `${API_BASE_URL}/api/articles/search?${params.toString()}`,
    { cache: "no-store" },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }

  return response.json();
}

// Get single article by id
export async function getSingleArticle(
  articleId: string,
): Promise<SingleArticle> {
  const response = await fetch(`${API_BASE_URL}/api/articles/${articleId}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch article");
  }

  return response.json();
}
