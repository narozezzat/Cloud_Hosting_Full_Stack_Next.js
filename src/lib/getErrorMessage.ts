import axios from "axios";

/**
 * Extract a human-readable message from an unknown error.
 * Understands axios errors (`error.response.data.message`) and native `Error`s,
 * falling back to a generic message so callers can `toast.error(getErrorMessage(e))`.
 */
export function getErrorMessage(
  error: unknown,
  fallback = "Something went wrong",
): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message ?? error.message ?? fallback;
  }
  if (error instanceof Error) {
    return error.message || fallback;
  }
  return fallback;
}
