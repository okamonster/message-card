"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Event } from "@repo/common";
import {
  createEvent,
  fetchEventByTitle,
} from "~/infrastructures/EventOperations";
import { serverTimestamp } from "~/lib/firebase";

type EventProviderProps = {
  title: string;
  children: ReactNode;
};

type EventContextValue = {
  event: Event | null;
  loading: boolean;
  error: string | null;
};

const Context = createContext<EventContextValue | undefined>(undefined);

export function EventProvider({ title, children }: EventProviderProps) {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const found = await fetchEventByTitle(title);
        if (found) {
          if (isMounted) setEvent(found);
        } else {
          const created = await createEvent({
            title,
            createdAt: serverTimestamp,
            updatedAt: serverTimestamp,
          });
          if (isMounted) setEvent(created);
        }
      } catch (e) {
        if (isMounted)
          setError(e instanceof Error ? e.message : "Unknown error");

        console.error(e);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [title]);

  const value = useMemo<EventContextValue>(
    () => ({ event, loading, error }),
    [event, loading, error]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useEvent(): EventContextValue {
  const ctx = useContext(Context);
  if (!ctx) {
    throw new Error("useEvent must be used within EventProvider");
  }
  return ctx;
}
