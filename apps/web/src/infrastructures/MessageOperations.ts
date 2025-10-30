import { db } from "@/lib/firebase";
import { convertDate } from "@/utils/convertDate";
import {
  CreateMessageDto,
  eventsCollection,
  Message,
  messageCollection,
} from "@repo/common";
import { addDoc, collection } from "firebase/firestore";

export const createMessage = async (
  eventId: string,
  dto: CreateMessageDto
): Promise<Message> => {
  const ref = await addDoc(
    collection(db, eventsCollection, eventId, messageCollection),
    dto
  );

  if (!ref) {
    throw new Error("Failed to create message");
  }

  return {
    messageId: ref.id,
    ...convertDate(ref, ["createdAt", "updatedAt"]),
  } as Message;
};
