import { ActionIcon, Button, TextInput } from "@mantine/core";
import styles from "./style.module.css";
import { useCallback, useEffect, useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";

type Props = {
  nickName: string;
  onChangeNickName: (v: string) => void;
  order: "asc" | "desc";
  onChangeOrder: (o: "asc" | "desc") => void;
};

export const SearchSection = ({
  nickName,
  onChangeNickName,
  order,
  onChangeOrder,
}: Props): React.ReactNode => {
  const [value, setValue] = useState<string>(nickName ?? "");
  const [debounced] = useDebouncedValue(value, 300);

  useEffect(() => {
    onChangeNickName(debounced);
  }, [debounced, onChangeNickName]);

  const onClear = useCallback(() => {
    setValue("");
    onChangeNickName("");
  }, [onChangeNickName]);

  return (
    <div className={styles.searchSection}>
      <TextInput
        placeholder="ニックネームで検索"
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        leftSection={<IoSearchOutline size={18} />}
        rightSection={
          value ? (
            <ActionIcon variant="subtle" aria-label="clear" onClick={onClear}>
              <IoCloseOutline size={16} />
            </ActionIcon>
          ) : undefined
        }
        size="md"
        radius="lg"
      />

      <div className={styles.sortButtons}>
        <Button
          variant={order === "asc" ? "filled" : "outline"}
          color="var(--button-primary-color)"
          radius="lg"
          onClick={() => onChangeOrder("asc")}
        >
          投稿順
        </Button>
        <Button
          variant={order === "desc" ? "filled" : "outline"}
          color="var(--button-primary-color)"
          radius="lg"
          onClick={() => onChangeOrder("desc")}
        >
          新着順
        </Button>
      </div>
    </div>
  );
};
