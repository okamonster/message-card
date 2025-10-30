import type { FieldValue } from "firebase/firestore";

export const messageCollection = "messages";

export type DisplayStatus = "visible" | "hidden";

export type Region = "kansai" | "kantou" | "foreign" | "noAnswer";

export const regionList: Region[] = ["kansai", "kantou", "foreign", "noAnswer"];

export const regionLabelMap: Record<Region, string> = {
  kansai: "関西",
  kantou: "関東",
  foreign: "海外",
  noAnswer: "非回答",
};

export type Message = {
  messageId: string;
  nickName: string;
  message: string;
  displayStatus: DisplayStatus;
  region: Region;
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
