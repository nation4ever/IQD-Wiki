"use client";
import { useRef, useCallback } from "react";

/**
 * Returns a debounced version of the given callback.
 * The callback will only execute after `delay` ms of inactivity.
 */
export function useDebouncedCallback<T extends (...args: any[]) => any>(
    fn: T,
    delay: number,
) {
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const fnRef = useRef(fn);
    fnRef.current = fn;

    return useCallback(
        (...args: Parameters<T>) => {
            if (timer.current) clearTimeout(timer.current);
            timer.current = setTimeout(() => fnRef.current(...args), delay);
        },
        [delay],
    );
}
