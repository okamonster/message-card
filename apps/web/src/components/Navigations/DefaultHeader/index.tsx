"use client";

import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import { LinkButton } from "@/components/Buttons/LinkButton";
import styles from "./style.module.css";
import { BiChevronLeft } from "react-icons/bi";

type Props = {
  title: string;
  backHref?: string;
};

export const DefaultHeader = ({ title, backHref }: Props): React.ReactNode => {
  const router = useRouter();

  return (
    <header className={styles.container}>
      <div className={styles.left}>
        {backHref ? (
          <LinkButton
            href={backHref}
            variant="transparent"
            radius="lg"
            color="var(--button-gray-color)"
          >
            <BiChevronLeft size={30} />
          </LinkButton>
        ) : (
          <Button
            variant="transparent"
            radius="lg"
            color="var(--button-gray-color)"
            onClick={() => router.back()}
          >
            <BiChevronLeft size={30} />
          </Button>
        )}
      </div>

      <h1 className={styles.title}>{title}</h1>

      <div className={styles.right} />
    </header>
  );
};

export default DefaultHeader;
