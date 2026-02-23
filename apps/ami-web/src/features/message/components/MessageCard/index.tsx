import styles from "./style.module.css";
import type { Message } from "@repo/common";
import { regionLabelMap } from "@repo/common";
import { useMemo } from "react";

type Props = {
  message: Message;
  onClick: (message: Message) => void;
  close: () => void;
};

export const MessageCard = ({ message, onClick }: Props): React.ReactNode => {
  const regionLabel = useMemo(() => {
    return message.region === "noAnswer" ? "" : regionLabelMap[message.region];
  }, [message.region]);

  return (
    <div
      className={styles.item}
      role="button"
      tabIndex={0}
      onClick={() => onClick(message)}
    >
      <p className={styles.message}>{message.message}</p>

      <div className={styles.signatureContainer}>
        <p className={styles.signature}>— {message.nickName}</p>
        <p className={styles.region}>{regionLabel}</p>
      </div>
    </div>
  );
};
