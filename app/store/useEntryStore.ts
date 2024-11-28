'use client';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { create } from 'zustand';
import { db } from '../firebase/firebase';

export interface Entry {
  id: string;
  title: string;
  date: string;
  location: string;
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
}));

export default useEntryStore;
