"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import { Button, Paper, TextInput, Textarea, Title } from "@mantine/core";
import classes from "./style.module.css";
import { LinkButton } from "@/components/Buttons/LinkButton";

const MAX_NAME = 24;
const MAX_MESSAGE = 500;

export const MessageSendContainer = (): React.ReactNode => {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const name = nickname.trim();
    const content = message.trim();
    if (!name || !content) {
      setError("ニックネームとメッセージは必須です");
      notifications.show({
        color: "red",
        title: "未入力",
        message: "必須項目を入力してください",
      });
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, content }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message ?? "送信に失敗しました");
      }
      notifications.show({
        color: "green",
        title: "送信しました",
        message: "メッセージを受け付けました",
      });
      router.push("/messages");
      router.refresh();
    } catch (err) {
      const msg = (err as Error).message;
      setError(msg);
      notifications.show({ color: "red", title: "エラー", message: msg });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>メッセージを送る</h2>
      <Paper
        withBorder
        radius="md"
        className={classes.paper}
        onSubmit={handleSubmit}
        component="form"
        shadow="md"
      >
        <TextInput
          label="ニックネーム"
          placeholder="やまだたろう"
          value={nickname}
          onChange={(e) =>
            setNickname(e.currentTarget.value.slice(0, MAX_NAME))
          }
          maxLength={MAX_NAME}
          required
        />

        <Textarea
          label="メッセージ"
          placeholder="あかりさんへのお祝いメッセージを書いてね"
          rows={6}
          value={message}
          onChange={(e) =>
            setMessage(e.currentTarget.value.slice(0, MAX_MESSAGE))
          }
          maxLength={MAX_MESSAGE}
          required
        />

        <div className={classes.actions}>
          <LinkButton
            href="/"
            color="var(--button-primary-color)"
            radius="lg"
            variant="outline"
          >
            戻る
          </LinkButton>
          <Button
            type="submit"
            loading={submitting}
            color="var(--button-primary-color)"
            variant="filled"
            radius="lg"
            disabled={!nickname.trim() || !message.trim()}
          >
            送信
          </Button>
        </div>
      </Paper>
    </div>
  );
};
