import { getMessages } from "@/lib/messages";
import { Card, Group, Stack, Text, Title } from "@mantine/core";

export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  const messages = await getMessages();
  const items = messages.slice().reverse();

  return (
    <Stack gap="lg">
      <Title order={3}>みんなのメッセージ</Title>
      {items.length === 0 ? (
        <Text c="dimmed">
          まだメッセージがありません。最初のメッセージを送ってね！
        </Text>
      ) : (
        <Stack gap="sm">
          {items.map((m) => (
            <Card key={m.id} withBorder padding="md" radius="md">
              <Group justify="space-between" mb={6}>
                <Text fw={600}>{m.name}</Text>
                <Text size="xs" c="dimmed">
                  {new Date(m.createdAt).toLocaleString()}
                </Text>
              </Group>
              <Text style={{ whiteSpace: "pre-wrap" }}>{m.content}</Text>
            </Card>
          ))}
        </Stack>
      )}
    </Stack>
  );
}
