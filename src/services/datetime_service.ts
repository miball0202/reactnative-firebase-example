import { Timestamp } from 'firebase/firestore';

export const timestampToDateLocaleString = (
  timestamp: Timestamp | undefined,
) => {
  if (!timestamp) {
    return '';
  }

  return new Date(timestamp.seconds * 1000).toLocaleString();
};
