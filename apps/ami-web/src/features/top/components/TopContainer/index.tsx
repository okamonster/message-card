"use client";
import Image from "next/image";
import { TopActions } from "../TopActions";
import styles from "./style.module.css";

export const TopContainer = (): React.ReactNode => {
  return (
    <div className={styles.page}>
      <div className={styles.photoArea}>
        <Image
          src="/images/visual_image.webp"
          alt="あみちゃん"
          fill
          style={{ objectFit: "cover", objectPosition: "center top" }}
          priority
          quality={95}
        />
        <div className={styles.photoOverlay} />

      </div>

      <div className={styles.contentBlock}>
        <div className={styles.logoWrap}>
          <Image
            src="/images/main_logo.webp"
            alt="スワンスワンズ"
            width={6032}
            height={3080}
            style={{ width: 320, height: "auto" }}
          />
        </div>

        <div className={styles.titleArea}>
          <p className={styles.titlePre}>あみちゃん生誕</p>
          <h1 className={styles.titleMain}>Message Card</h1>
          <p className={styles.titleKana}>— オンラインメッセージカード —</p>
          <div className={styles.divider}>
            <span />
            <span className={styles.dividerIcon}>♡</span>
            <span />
          </div>
          <p className={styles.dateText}>
            <span className={styles.dateYear}>2026</span>
            <span className={styles.dateDot}>.</span>
            <span className={styles.dateMain}>5.2</span>
            <span className={styles.dateSat}> Sat.</span>
          </p>
          <p className={styles.venuText}>at OSAKA RUIDO</p>
        </div>

        {/* CTA */}
        <div className={styles.ctaArea}>
          <p className={styles.ctaLead}>あみちゃんへメッセージを贈ろう</p>
          <TopActions />
        </div>
      </div>
    </div>
  );
};
