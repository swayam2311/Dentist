// Simple sliding-window rate limiter for server actions and API routes.
// In serverless / edge, keeps per-IP sliding window in memory.

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const memoryStore = new Map<string, RateLimitRecord>();

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

export function checkRateLimit(
  identifier: string,
  limit: number = 5,
  windowSeconds: number = 60
): RateLimitResult {
  const now = Date.now();
  const key = `ratelimit:${identifier}`;
  const record = memoryStore.get(key);

  if (!record || now > record.resetAt) {
    const resetAt = now + windowSeconds * 1000;
    memoryStore.set(key, { count: 1, resetAt });
    return {
      success: true,
      limit,
      remaining: limit - 1,
      reset: resetAt,
    };
  }

  if (record.count >= limit) {
    return {
      success: false,
      limit,
      remaining: 0,
      reset: record.resetAt,
    };
  }

  record.count += 1;
  return {
    success: true,
    limit,
    remaining: limit - record.count,
    reset: record.resetAt,
  };
}

