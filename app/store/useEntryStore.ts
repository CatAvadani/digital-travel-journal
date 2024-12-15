'use client';
import { create } from 'zustand';
import { Entry } from '../interfaces/entry';
import {
  deleteEntry,
  fetchEntries,
  fetchEntryById,
  updateEntry,
} from '../services/entryService';

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
      const fetchedEntries = await fetchEntries(userId);
      set(() => ({ entries: fetchedEntries }));
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  },
  fetchEntryById: async (entryId) => {
    const entry = await fetchEntryById(entryId);
    if (entry) {
      set((state) => ({
        entries: [...state.entries, entry],
      }));
    }
    return entry;
  },
  updateEntry: async (entryId, updatedEntry) => {
    await updateEntry(entryId, updatedEntry);
    set((state) => ({
      entries: state.entries.map((entry) =>
        entry.id === entryId ? updatedEntry : entry
      ),
    }));
  },
  deleteEntry: async (entryId) => {
    await deleteEntry(entryId);
    set((state) => ({
      entries: state.entries.filter((entry) => entry.id !== entryId),
    }));
  },
}));
export default useEntryStore;
