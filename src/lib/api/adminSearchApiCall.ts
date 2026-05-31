import axios from "axios";
import { DOMAIN } from "@/lib/constants";
import { AdminSearchResults } from "@/lib/types";

/** Browser-side fetcher for the admin unified search command palette. */
export async function searchAdmin(
  q: string,
  signal?: AbortSignal,
): Promise<AdminSearchResults> {
  const { data } = await axios.get<AdminSearchResults>(
    `${DOMAIN}/api/admin/search`,
    { params: { q }, signal },
  );
  return data;
}
