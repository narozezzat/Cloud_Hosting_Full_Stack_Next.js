import { API_BASE_URL } from "@/lib/constants";
import { CategoryWithCount } from "@/lib/types";

// Get all categories (with article counts)
export async function getCategories(): Promise<CategoryWithCount[]> {
  const response = await fetch(`${API_BASE_URL}/api/categories`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
}
