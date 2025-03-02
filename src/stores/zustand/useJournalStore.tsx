import {
  TJournalBgColors,
  TJournalFonts,
  TJournalSheets,
} from "@/types/model-types";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "@/utils/functions/fn-common";
import { create } from "zustand";
interface TState {
  title: string;
  content: string;
  editedContent: string | null;
  journalPrompt: string;
  activeEntry: number;
  sheetBgColor: TJournalBgColors;
  sheetBg: TJournalSheets;
  fontFamily: TJournalFonts;
  isEditing: boolean;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setEditedContent: (editedContent: string | null) => void;
  setJournalPrompt: (journalPrompt: string) => void;
  setActiveEntry: (value: number | ((prev: number) => number)) => void;
  setSheetBgColor: (sheetBgColor: TJournalBgColors) => void;
  setSheetBg: (sheetBg: TJournalSheets) => void;
  setFontFamily: (fontFamily: TJournalFonts) => void;
  setIsEditing: (isEditing: boolean) => void;
}

export const useJournalStore = create<TState>((set) => ({
  title: "",
  content: "",
  editedContent: null,
  journalPrompt: "",
  activeEntry: -1,
  sheetBgColor: getFromLocalStorage("journalSheetBgColor", "light"),
  sheetBg: getFromLocalStorage("journalSheetBg", "lines"),
  fontFamily: getFromLocalStorage("journalFontFamily", "font-patrick-hand"),
  isEditing: false,
  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  setEditedContent: (editedContent) => set({ editedContent }),
  setJournalPrompt: (journalPrompt) => set({ journalPrompt }),
  setActiveEntry: (activeEntry) => {
    if (typeof activeEntry === "function") {
      set((state) => ({ activeEntry: activeEntry(state.activeEntry) }));
    } else {
      set({ activeEntry });
    }
  },
  setSheetBgColor: (value) => {
    setToLocalStorage("journalSheetBgColor", value);
    set({ sheetBgColor: value });
  },
  setSheetBg: (value) => {
    setToLocalStorage("journalSheetBg", value);
    set({ sheetBg: value });
  },
  setFontFamily: (value) => {
    setToLocalStorage("journalFontFamily", value);
    set({ fontFamily: value });
  },
  setIsEditing: (isEditing) => set({ isEditing: isEditing }),
}));
