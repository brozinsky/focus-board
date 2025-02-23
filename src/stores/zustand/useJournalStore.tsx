import { create } from "zustand";

interface TState {
  content: string;
  editedContent: string | null;
  journalPrompt: string;
  activeEntry: number;
  setContent: (content: string) => void;
  setEditedContent: (editedContent: string | null) => void;
  setJournalPrompt: (journalPrompt: string) => void;
  setActiveEntry: (activeEntry: number) => void;
}

export const useJournalStore = create<TState>((set) => ({
  content: "",
  editedContent: null,
  journalPrompt: "",
  activeEntry: 4,
  setContent: (content) => set({ content }),
  setEditedContent: (editedContent) => set({ editedContent }),
  setJournalPrompt: (journalPrompt) => set({ journalPrompt }),
  setActiveEntry: (activeEntry) => set({ activeEntry }),
}));
