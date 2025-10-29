import type { FieldValue } from "firebase/firestore";

export const eventsCollection = "events";

export type Event = {
  eventId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateEventDto = Omit<
  Event,
  "eventId" | "createdAt" | "updatedAt"
> & {
  createdAt: FieldValue;
  updatedAt: FieldValue;
};
