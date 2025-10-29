"use client";
import Image from "next/image";
import { TopActions } from "../TopActions";
import styles from "./style.module.css";

export const TopContainer = (): React.ReactNode => {
  return (
    <div className={styles.container}>
      <Image
        src="/images/main_logo.webp"
        alt="main-logo"
        width={2048}
        height={994}
        className={styles.logo}
        priority
        quality={100}
        loading="eager"
        fetchPriority="high"
      />
      <div className={styles.bottomContent}>
        <TopActions />
      </div>
    </div>
  );
};
