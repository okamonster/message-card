import { NextResponse } from "next/server";
import { addMessage, getMessages } from "@/lib/messages";

export async function GET() {
  const messages = await getMessages();
  return NextResponse.json(messages);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = (body?.name ?? "").trim();
    const content = (body?.content ?? "").trim();
    if (!name || !content) {
      return NextResponse.json(
        { message: "name と content は必須です" },
        { status: 400 }
      );
    }
    const saved = await addMessage({ name, content });
    return NextResponse.json(saved, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }
}
