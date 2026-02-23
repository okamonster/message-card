import { db } from "~/lib/firebase";
import { CreateEventDto, Event, eventsCollection } from "@repo/common";
import {
  addDoc,
  collection,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { convertDate } from "@/utils/convertDate";

export const createEvent = async (dto: CreateEventDto): Promise<Event> => {
  const data = await addDoc(collection(db, eventsCollection), dto);

  if (!data) {
    throw new Error("Failed to create event");
  }

  const event = {
    eventId: data.id,
    ...convertDate(data, ["createdAt", "updatedAt"]),
  } as Event;

  return event;
};

export const fetchEventByTitle = async (
  title: string
): Promise<Event | undefined> => {
  const snapshot = await getDocs(
    query(
      collection(db, eventsCollection),
      where("title", "==", title),
      limit(1)
    )
  );

  const docSnap = snapshot.docs[0];
  const data = docSnap?.data();

  if (!docSnap || !data) {
    return undefined;
  }

  return {
    eventId: docSnap.id,
    ...convertDate({ ...data }, ["createdAt", "updatedAt"]),
  } as Event;
};
