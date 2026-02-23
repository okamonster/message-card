"use client";

import { useEffect, useRef } from "react";

type Options = {
  onLoadMore: () => void;
  canLoadMore: boolean;
  isLoading: boolean;
  rootMargin?: string;
  threshold?: number;
};

export function useInfiniteScroll({
  onLoadMore,
  canLoadMore,
  isLoading,
  rootMargin = "200px 0px",
  threshold = 0,
}: Options) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !canLoadMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first && first.isIntersecting && !isLoading && canLoadMore) {
          onLoadMore();
        }
      },
      { root: null, rootMargin, threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [canLoadMore, isLoading, onLoadMore, rootMargin, threshold]);

  return { sentinelRef } as const;
}
