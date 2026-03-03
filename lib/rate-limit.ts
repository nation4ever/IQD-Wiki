/**
 * Simple in-memory rate limiter.
 * Tracks request counts per key (e.g. IP address) within a sliding window.
 */

interface RateLimitEntry {
    count: number;
    resetTime: number; // timestamp in ms
}

const store = new Map<string, RateLimitEntry>();

// Clean up expired entries every 10 minutes to prevent memory leaks
const CLEANUP_INTERVAL = 10 * 60 * 1000;
let lastCleanup = Date.now();

function cleanup() {
    const now = Date.now();
    if (now - lastCleanup < CLEANUP_INTERVAL) return;
    lastCleanup = now;

    for (const [key, entry] of store) {
        if (now > entry.resetTime) {
            store.delete(key);
        }
    }
}

interface RateLimitResult {
    success: boolean;
    remaining: number;
    resetInSeconds: number;
}

/**
 * Check if a request is allowed under the rate limit.
 *
 * @param key - Unique identifier (e.g. IP address)
 * @param maxRequests - Maximum requests allowed per window (default: 3)
 * @param windowMs - Time window in milliseconds (default: 1 hour)
 */
export function rateLimit(
    key: string,
    maxRequests = 3,
    windowMs = 60 * 60 * 1000
): RateLimitResult {
    cleanup();

    const now = Date.now();
    const entry = store.get(key);

    // No existing entry or window expired — start fresh
    if (!entry || now > entry.resetTime) {
        store.set(key, { count: 1, resetTime: now + windowMs });
        return { success: true, remaining: maxRequests - 1, resetInSeconds: Math.ceil(windowMs / 1000) };
    }

    // Within window — check count
    if (entry.count < maxRequests) {
        entry.count++;
        return {
            success: true,
            remaining: maxRequests - entry.count,
            resetInSeconds: Math.ceil((entry.resetTime - now) / 1000),
        };
    }

    // Rate limited
    return {
        success: false,
        remaining: 0,
        resetInSeconds: Math.ceil((entry.resetTime - now) / 1000),
    };
}
