import { NextRequest, NextResponse } from "next/server";

/**
 * Tiny in-memory sliding-window rate limiter.
 *
 * NOTE: state lives in the process memory, so it is per-instance and resets on
 * redeploy. It's a sensible guard for a single-instance / low-traffic app but
 * is NOT a substitute for a shared store (Redis/Upstash) behind multiple
 * serverless instances.
 */
const hits = new Map<string, number[]>();

interface RateLimitOptions {
  /** Max requests allowed within the window. */
  limit: number;
  /** Window length in milliseconds. */
  windowMs: number;
}

/** Best-effort client identifier from forwarding headers. */
function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}

/**
 * Returns a 429 NextResponse if the caller has exceeded the limit, otherwise
 * null (meaning: proceed). `bucket` namespaces the counter per endpoint.
 */
export function checkRateLimit(
  request: NextRequest,
  bucket: string,
  { limit, windowMs }: RateLimitOptions,
): NextResponse | null {
  const now = Date.now();
  const key = `${bucket}:${clientIp(request)}`;
  const windowStart = now - windowMs;

  const timestamps = (hits.get(key) ?? []).filter((t) => t > windowStart);

  if (timestamps.length >= limit) {
    const retryAfter = Math.ceil(
      (timestamps[0] + windowMs - now) / 1000,
    );
    return NextResponse.json(
      { message: "too many requests, please try again later" },
      { status: 429, headers: { "Retry-After": String(Math.max(1, retryAfter)) } },
    );
  }

  timestamps.push(now);
  hits.set(key, timestamps);
  return null;
}
