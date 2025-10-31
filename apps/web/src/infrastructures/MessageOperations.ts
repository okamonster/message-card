import { db } from "@/lib/firebase";
import { convertDate } from "@/utils/convertDate";
import {
  CreateMessageDto,
  eventsCollection,
  Message,
  messageCollection,
} from "@repo/common";
import {
  addDoc,
  collection,
  getDocs,
  limit,
  startAfter,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import type { QueryDocumentSnapshot } from "firebase/firestore";

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

export const fetchMessagesOperation = async (
  eventId: string
): Promise<Array<Message>> => {
  const snapshot = await getDocs(
    query(
      collection(db, eventsCollection, eventId, messageCollection),
      orderBy("createdAt", "desc"),
      where("displayStatus", "==", "visible")
    )
  );

  if (snapshot.empty) {
    return [];
  }

  return snapshot.docs.map(
    (doc) =>
      ({
        messageId: doc.id,
        ...convertDate(doc.data(), ["createdAt", "updatedAt"]),
      }) as Message
  );
};

export const fetchMessagesPage = async (
  eventId: string,
  pageSize: number,
  cursor?: QueryDocumentSnapshot
): Promise<{
  messages: Array<Message>;
  cursor?: QueryDocumentSnapshot;
  hasMore: boolean;
}> => {
  const base = [
    where("displayStatus", "==", "visible"),
    orderBy("createdAt", "desc"),
    limit(pageSize),
  ];
  const constraints = cursor ? [...base, startAfter(cursor)] : base;

  const snapshot = await getDocs(
    query(
      collection(db, eventsCollection, eventId, messageCollection),
      ...constraints
    )
  );

  const messages = snapshot.docs.map(
    (doc) =>
      ({
        messageId: doc.id,
        ...convertDate(doc.data(), ["createdAt", "updatedAt"]),
      }) as Message
  );

  const last = snapshot.docs[snapshot.docs.length - 1];
  return { messages, cursor: last, hasMore: snapshot.size === pageSize };
};
