import { headers } from "next/headers";

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const store = new Map<string, RateLimitEntry>();

export async function rateLimit({
  windowMs = 60 * 1000, // 1 minute
  max = 10,
  identifier,
}: {
  windowMs?: number;
  max?: number;
  identifier?: string;
}) {
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") || 
            headersList.get("x-real-ip") || 
            "unknown";
  const key = identifier || ip;

  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetTime) {
    store.set(key, {
      count: 1,
      resetTime: now + windowMs,
    });
    return { success: true, remaining: max - 1 };
  }

  if (entry.count >= max) {
    return {
      success: false,
      remaining: 0,
      resetTime: entry.resetTime,
    };
  }

  entry.count++;
  return {
    success: true,
    remaining: max - entry.count,
    resetTime: entry.resetTime,
  };
}

// Cleanup expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (now > entry.resetTime) {
      store.delete(key);
    }
  }
}, 5 * 60 * 1000);

