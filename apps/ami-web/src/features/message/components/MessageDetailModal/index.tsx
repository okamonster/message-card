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
      withCloseButton
      centered
      size="auto"
      classNames={{ content: styles.modal }}
    >
      <div className={styles.content}>
        <p className={styles.message}>{message.message}</p>
        <div className={styles.signatureContainer}>
          <p className={styles.signature}>— {message.nickName}</p>
          <p className={styles.region}>{regionLabel}</p>
        </div>
      </div>
    </Modal>
  );
};
