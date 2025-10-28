"use client";

import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

export default function NewMessagePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
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
      setError((err as Error).message);
      notifications.show({
        color: "red",
        title: "エラー",
        message: (err as Error).message,
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 24, marginBottom: 16 }}>メッセージを送る</h1>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        <label style={{ display: "grid", gap: 8 }}>
          <span>お名前</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="例: さくら"
            style={{ padding: 8 }}
          />
        </label>
        <label style={{ display: "grid", gap: 8 }}>
          <span>メッセージ</span>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={6}
            placeholder="推しへのお祝いメッセージを書いてね"
            style={{ padding: 8 }}
          />
        </label>
        {error ? <p style={{ color: "crimson" }}>{error}</p> : null}
        <button
          type="submit"
          disabled={submitting}
          style={{ padding: "10px 16px" }}
        >
          {submitting ? "送信中..." : "送信"}
        </button>
      </form>
    </main>
  );
}
