import { promises as fs } from "fs";
import { randomUUID } from "crypto";
import path from "path";

export type Message = {
  id: string;
  name: string;
  content: string;
  createdAt: string;
};

const dataDirPath = path.join(process.cwd(), "data");
const dataFilePath = path.join(dataDirPath, "messages.json");

async function ensureDataFile(): Promise<void> {
  await fs.mkdir(dataDirPath, { recursive: true });
  try {
    await fs.access(dataFilePath);
  } catch {
    await fs.writeFile(dataFilePath, JSON.stringify([], null, 2), "utf8");
  }
}

export async function getMessages(): Promise<Message[]> {
  await ensureDataFile();
  const raw = await fs.readFile(dataFilePath, "utf8");
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed)) {
      return parsed as Message[];
    }
    return [];
  } catch {
    return [];
  }
}

export async function addMessage(input: {
  name: string;
  content: string;
}): Promise<Message> {
  const messages = await getMessages();
  const message: Message = {
    id: randomUUID(),
    name: input.name,
    content: input.content,
    createdAt: new Date().toISOString(),
  };
  messages.push(message);
  await fs.writeFile(dataFilePath, JSON.stringify(messages, null, 2), "utf8");
  return message;
}
