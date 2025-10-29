"use client";
import { LinkButton } from "@/components/Buttons/LinkButton";
import styles from "./style.module.css";
export const TopActions = (): React.ReactNode => {
  return (
    <div className={styles.actions}>
      <LinkButton
        href="/messages/new"
        color="var(--button-primary-color)"
        radius="lg"
      >
        メッセージを書く
      </LinkButton>
      <LinkButton href="/" color="var(--button-primary-color)" radius="lg">
        みんなのメッセージを見る
      </LinkButton>
    </div>
  );
};
