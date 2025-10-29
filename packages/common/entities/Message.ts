import type { FieldValue } from "firebase/firestore";

export const messagesCollection = "messages";

export type DisplayStatus = "visible" | "hidden";

export type Message = {
  messageId: string;
  nickName: string;
  content: string;
  displayStatus: DisplayStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateMessageDto = Omit<
  Message,
  "messageId" | "createdAt" | "updatedAt"
> & {
  createdAt: FieldValue;
  updatedAt: FieldValue;
};
