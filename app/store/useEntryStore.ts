'use client';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { create } from 'zustand';
import { db } from '../firebase/firebase';

export interface Entry {
  id: string;
  title: string;
  date: string;
  city: string;
  country: string;
  coordinates: [number, number];
  image: string;
  description: string;
}

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
