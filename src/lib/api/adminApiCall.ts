import { Comment } from "@/generated/prisma";
import { DOMAIN } from "@/lib/constants";

interface PaginatedComments {
  comments: Comment[];
  count: number;
}

// Get all comments (paginated)
export async function getAllComments(
  token: string,
  pageNumber: string,
): Promise<PaginatedComments> {
  const response = await fetch(
    `${DOMAIN}/api/comments?pageNumber=${pageNumber}`,
    {
      headers: {
        Cookie: `jwtToken=${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch comments");
  }

  return response.json();
}
