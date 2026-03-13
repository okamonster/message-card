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
      onClose={() => { }}
      withCloseButton={false}
      fullScreen
      classNames={{ content: styles.modal }}
      padding={0}
    >
      <div className={styles.content}>
        <h2 className={styles.title}>
          メッセージを
          <br />
          送信しました ♡
        </h2>

        <div className={styles.anim}>
          <IoIosSend size={72} className={styles.plane} />
          {/* 周回するミニハート */}
          <span className={styles.orbitHeart}>♡</span>
          <span className={styles.orbitHeart}>♡</span>
          <span className={styles.orbitHeart}>♡</span>
          <span className={styles.orbitHeart}>♡</span>

          {/* キラキラ */}
          <span className={`${styles.sparkle} ${styles.s1}`}>✦</span>
          <span className={`${styles.sparkle} ${styles.s2}`}>✶</span>
          <span className={`${styles.sparkle} ${styles.s3}`}>✧</span>
          <span className={`${styles.sparkle} ${styles.s4}`}>✦</span>
        </div>



        <div className={styles.shimmerBtn}>
          <LinkButton
            href="/messages"
            color="var(--button-primary-color)"
            radius="lg"
            fullWidth
            leftSection={<IoMailOutline size={20} />}
          >
            みんなのメッセージを見る
          </LinkButton>
        </div>
      </div>
    </Modal>
  );
};
