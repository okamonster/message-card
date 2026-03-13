import type { Message } from "@repo/common";
import { regionLabelMap } from "@repo/common";
import { Modal } from "@mantine/core";
import styles from "./style.module.css";
import { useMemo } from "react";

type Props = {
  message: Message;
  opened: boolean;
  onClose: () => void;
};

export const MessageDetailModal = ({
  message,
  opened,
  onClose,
}: Props): React.ReactNode => {
  const regionLabel = useMemo(() => {
    return message.region === "noAnswer" ? "" : regionLabelMap[message.region];
  }, [message.region]);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      centered
      size="auto"
      classNames={{ content: styles.modal }}
      padding={0}
    >
      <div className={styles.header}>
        <span className={styles.headerTitle}>メッセージ</span>
        <button
          type="button"
          onClick={onClose}
          style={{
            background: "rgba(255,255,255,0.3)",
            border: "none",
            borderRadius: "50%",
            width: 28,
            height: 28,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            color: "#fff",
            fontWeight: "bold",
          }}
          aria-label="閉じる"
        >
          ×
        </button>
      </div>
      <div className={styles.body}>
        <div className={styles.content}>
          <p className={styles.message}>{message.message}</p>
          <div className={styles.divider} />
          <div className={styles.signatureContainer}>
            <p className={styles.signature}>— {message.nickName}</p>
            {regionLabel && <p className={styles.region}>{regionLabel}</p>}
          </div>
        </div>
      </div>
    </Modal>
  );
};
