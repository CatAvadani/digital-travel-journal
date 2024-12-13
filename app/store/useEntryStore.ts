'use client';
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
import { create } from 'zustand';
import { db } from '../firebase/firebase';
import { Entry } from '../interfaces/entry';

interface EntryStore {
  entries: Entry[];
  selectedCoordinates: [number, number] | null;
  setSelectedCoordinates: (coordinates: [number, number] | null) => void;
  addEntry: (entry: Entry) => void;
  setEntries: (entries: Entry[]) => void;
  fetchEntries: (userId: string) => void;
  clearEntries: () => void;
  updateEntry: (entryId: string, updatedEntry: Entry) => void;
  deleteEntry: (entryId: string) => void;
  fetchEntryById: (entryId: string) => Promise<Entry | null>;
}

const useEntryStore = create<EntryStore>((set) => ({
  entries: [],
  selectedCoordinates: null,
  setSelectedCoordinates: (coordinates) =>
    set(() => ({ selectedCoordinates: coordinates })),
  addEntry: (entry) =>
    set((state) => ({
      entries: [...state.entries, entry],
    })),
  setEntries: (entries) => set(() => ({ entries })),
  clearEntries: () => set(() => ({ entries: [] })),

  fetchEntries: async (userId) => {
    try {
      const q = query(collection(db, 'entries'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      const fetchedEntries = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Entry[];
      set(() => ({ entries: fetchedEntries }));
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  },

  fetchEntryById: async (entryId) => {
    try {
      const entryRef = doc(db, 'entries', entryId);
      const entryDoc = await getDoc(entryRef);
      if (entryDoc.exists()) {
        const entry = { id: entryDoc.id, ...entryDoc.data() } as Entry;
        set((state) => ({
          entries: [...state.entries, entry],
        }));
        return entry;
      } else {
        console.error('No entry found with the given ID');
        return null;
      }
    } catch (error) {
      console.error('Error fetching entry:', error);
      return null;
    }
  },

  updateEntry: async (entryId, updatedEntry) => {
    try {
      const entryRef = doc(db, 'entries', entryId);
      await setDoc(entryRef, updatedEntry);
      set((state) => ({
        entries: state.entries.map((entry) =>
          entry.id === entryId ? updatedEntry : entry
        ),
      }));
    } catch (error) {
      console.error('Error updating entry in Firestore:', error);
    }
  },

  deleteEntry: async (entryId) => {
    try {
      const entryRef = doc(db, 'entries', entryId);
      await deleteDoc(entryRef);
      set((state) => ({
        entries: state.entries.filter((entry) => entry.id !== entryId),
      }));
    } catch (error) {
      console.error('Error deleting entry from Firestore:', error);
    }
  },
}));

export default useEntryStore;
