import { Modal } from "@mantine/core";
import styles from "./style.module.css";
import { LinkButton } from "@/components/Buttons/LinkButton";
import { IoMailOutline } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";

type Props = {
  opened: boolean;
};

export const SendCompleteModal = ({ opened }: Props): React.ReactNode => {
  return (
    <Modal
      opened={opened}
      onClose={() => {}}
      withCloseButton={false}
      fullScreen
      classNames={{ content: styles.modal }}
    >
      <div className={styles.content}>
        <h2 className={styles.title}>メッセージを送信しました</h2>
        <div className={styles.anim}>
          <IoIosSend size={72} className={styles.plane} />
          <span className={`${styles.sparkle} ${styles.s1}`}>✶</span>
          <span className={`${styles.sparkle} ${styles.s2}`}>✦</span>
          <span className={`${styles.sparkle} ${styles.s3}`}>✧</span>
        </div>

        <LinkButton
          href="/messages"
          color="var(--button-primary-color)"
          radius="lg"
          fullWidth
          variant="white"
          leftSection={<IoMailOutline size={20} />}
        >
          メッセージを見る
        </LinkButton>
      </div>
    </Modal>
  );
};
