"use client";
import { useEvent } from "@/features/event/EventProvider";
import { fetchMessagesPage } from "@/infrastructures/MessageOperations";
import type { Message } from "@repo/common";
import type { QueryDocumentSnapshot } from "firebase/firestore";
import { useCallback, useEffect, useRef, useState } from "react";

export const useMessage = (): {
  messages: Message[];
  loadMore: () => Promise<void>;
  hasMore: boolean;
  loading: boolean;
  order: "asc" | "desc";
  setOrder: (o: "asc" | "desc") => void;
  nickName: string;
  setNickName: (v: string) => void;
} => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [cursor, setCursor] = useState<QueryDocumentSnapshot | undefined>(
    undefined
  );
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const { event } = useEvent();
  const PAGE_SIZE = 10;
  const mounted = useRef(true);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [nickName, setNickName] = useState<string>("");

  useEffect(() => {
    mounted.current = true;
    if (!event) {
      setMessages([]);
      setCursor(undefined);
      setHasMore(true);
      return;
    }

    const loadFirst = async () => {
      setLoading(true);
      const page = await fetchMessagesPage(
        event.eventId,
        PAGE_SIZE,
        undefined,
        order,
        nickName
      );
      if (!mounted.current) return;
      setMessages(page.messages);
      setCursor(page.cursor);
      setHasMore(page.hasMore);
      setLoading(false);
    };

    loadFirst();
    return () => {
      setMessages([]);
      setCursor(undefined);
      setHasMore(true);
      mounted.current = false;
    };
  }, [event, order, nickName]);

  const loadMore = useCallback(async () => {
    if (!event || !hasMore || loading || !cursor) return;
    setLoading(true);
    const page = await fetchMessagesPage(
      event.eventId,
      PAGE_SIZE,
      cursor,
      order,
      nickName
    );
    if (!mounted.current) return;
    setMessages((prev) => [...prev, ...page.messages]);
    setCursor(page.cursor);
    setHasMore(page.hasMore);
    setLoading(false);
  }, [cursor, event, hasMore, loading, order, nickName]);

  return {
    messages,
    loadMore,
    hasMore,
    loading,
    order,
    setOrder,
    nickName,
    setNickName,
  };
};
