import type { DocumentData, Timestamp } from "firebase/firestore";

export function convertDate(
  snapshot: DocumentData,
  targetKey: Array<string>
): DocumentData {
  for (const key of targetKey) {
    const value: Timestamp = snapshot[key];
    if (value) {
      snapshot[key] = value.toDate();
    }
  }
  return snapshot;
}
