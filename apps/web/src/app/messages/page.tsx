import { getMessages } from "@/lib/messages";

export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  const messages = await getMessages();

  return (
    <main style={{ maxWidth: 960, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 24, marginBottom: 16 }}>みんなのメッセージ</h1>
      {messages.length === 0 ? (
        <p>まだメッセージがありません。最初のメッセージを送ってね！</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 12 }}>
          {messages
            .slice()
            .reverse()
            .map((m) => (
              <li
                key={m.id}
                style={{
                  border: "1px solid var(--gray-alpha-200)",
                  padding: 12,
                  borderRadius: 8,
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <strong>{m.name}</strong>
                  <span style={{ opacity: 0.7, fontSize: 12 }}>
                    {new Date(m.createdAt).toLocaleString()}
                  </span>
                </div>
                <p style={{ whiteSpace: "pre-wrap", marginTop: 8 }}>
                  {m.content}
                </p>
              </li>
            ))}
        </ul>
      )}
    </main>
  );
}
