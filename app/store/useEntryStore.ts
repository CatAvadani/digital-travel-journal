'use client';
import { create } from 'zustand';

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
}));

export default useEntryStore;
