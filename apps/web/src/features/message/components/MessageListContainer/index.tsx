import { getMessages } from "@/lib/messages";
import styles from "./style.module.css";

export const MessageListContainer = async (): Promise<React.ReactNode> => {
  const messages = await getMessages();
  const items = messages.slice().reverse();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>みんなのメッセージ</h2>
      {items.length === 0 ? (
        <p className={styles.empty}>
          まだメッセージがありません。最初のメッセージを送ってね！
        </p>
      ) : (
        <div className={styles.list}>
          {items.map((m) => (
            <div key={m.id} className={styles.item}>
              <p className={styles.content}>{m.content}</p>
              <div className={styles.signature}>— {m.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
