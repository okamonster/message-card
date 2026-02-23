"use client";
import { LinkButton } from "@/components/Buttons/LinkButton";
import styles from "./style.module.css";
import { IoMailOutline } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";

export const TopActions = (): React.ReactNode => {
  return (
    <div className={styles.actions}>
      <LinkButton
        href="/messages/new"
        color="var(--button-primary-color)"
        radius="lg"
        leftSection={<IoIosSend size={20} />}
      >
        メッセージを書く
      </LinkButton>
      <LinkButton
        href="/messages"
        color="var(--button-primary-color)"
        radius="lg"
        leftSection={<IoMailOutline size={20} />}
      >
        みんなのメッセージを見る
      </LinkButton>
    </div>
  );
};
