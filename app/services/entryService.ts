import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { Entry } from '../interfaces/entry';

export const fetchEntries = async (userId: string): Promise<Entry[]> => {
  const q = query(collection(db, 'entries'), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Entry[];
};

export const fetchEntryById = async (
  entryId: string
): Promise<Entry | null> => {
  const entryRef = doc(db, 'entries', entryId);
  const entryDoc = await getDoc(entryRef);

  if (entryDoc.exists()) {
    return { id: entryDoc.id, ...entryDoc.data() } as Entry;
  } else {
    return null;
  }
};

export const updateEntry = async (
  entryId: string,
  updatedEntry: Entry
): Promise<void> => {
  const entryRef = doc(db, 'entries', entryId);
  await setDoc(entryRef, updatedEntry);
};

export const deleteEntry = async (entryId: string): Promise<void> => {
  const entryRef = doc(db, 'entries', entryId);
  await deleteDoc(entryRef);
};
