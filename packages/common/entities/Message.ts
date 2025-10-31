import type { FieldValue } from "firebase/firestore";

export const messageCollection = "messages";

export type DisplayStatus = "visible" | "hidden";

export type Region =
  | "kansai"
  | "kantou"
  | "chubu"
  | "tohoku"
  | "shikoku"
  | "kyushu"
  | "hokkaido"
  | "foreign"
  | "noAnswer";

export const regionList: Region[] = [
  "kansai",
  "kantou",
  "chubu",
  "tohoku",
  "shikoku",
  "kyushu",
  "hokkaido",
  "foreign",
  "noAnswer",
];

export const regionLabelMap: Record<Region, string> = {
  kansai: "関西",
  kantou: "関東",
  chubu: "中部",
  tohoku: "東北",
  shikoku: "四国",
  kyushu: "九州",
  hokkaido: "北海道",
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
