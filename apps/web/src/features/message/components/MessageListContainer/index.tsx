"use client";
import styles from "./style.module.css";
import { useMessage } from "~/features/message/hooks/useMessage";
import { useInfiniteScroll } from "~/features/message/hooks/useInfiniteScroll";
import { useState } from "react";
import type { Message } from "@repo/common";
import { MessageDetailModal } from "~/features/message/components/MessageDetailModal";
import { MessageCard } from "~/features/message/components/MessageCard";
import { useDisclosure } from "@mantine/hooks";

export const MessageListContainer = (): React.ReactNode => {
  const { messages, loadMore, hasMore, loading } = useMessage();
  const { sentinelRef } = useInfiniteScroll({
    canLoadMore: hasMore,
    isLoading: loading,
    onLoadMore: () => {
      loadMore();
    },
  });
  const [opened, { open, close }] = useDisclosure(false);
  const [selected, setSelected] = useState<Message | null>(null);

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>みんなのメッセージ</h2>
        {messages.length === 0 ? (
          <p className={styles.empty}>
            まだメッセージがありません。最初のメッセージを送ってね！
          </p>
        ) : (
          <div className={styles.list}>
            {messages.map((m) => (
              <MessageCard
                key={m.messageId}
                message={m}
                onClick={(msg) => {
                  setSelected(msg);
                  open();
                }}
                close={close}
              />
            ))}
            <div ref={sentinelRef} />
          </div>
        )}
      </div>
      {selected && (
        <MessageDetailModal
          message={selected}
          opened={opened}
          onClose={close}
        />
      )}
    </>
  );
};
