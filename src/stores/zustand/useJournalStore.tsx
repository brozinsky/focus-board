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
  content: string;
  editedContent: string | null;
  journalPrompt: string;
  activeEntry: number;
  sheetBgColor: TJournalBgColors;
  sheetBg: TJournalSheets;
  fontFamily: TJournalFonts;
  setContent: (content: string) => void;
  setEditedContent: (editedContent: string | null) => void;
  setJournalPrompt: (journalPrompt: string) => void;
  setActiveEntry: (activeEntry: number) => void;
  setSheetBgColor: (sheetBgColor: TJournalBgColors) => void;
  setSheetBg: (sheetBg: TJournalSheets) => void;
  setFontFamily: (fontFamily: TJournalFonts) => void;
}

export const useJournalStore = create<TState>((set) => ({
  content: "",
  editedContent: null,
  journalPrompt: "",
  activeEntry: 4,
  sheetBgColor: getFromLocalStorage("journalSheetBgColor", "light"),
  sheetBg: getFromLocalStorage("journalSheetBg", "lines"),
  fontFamily: getFromLocalStorage("journalFontFamily", "font-patrick-hand"),
  setContent: (content) => set({ content }),
  setEditedContent: (editedContent) => set({ editedContent }),
  setJournalPrompt: (journalPrompt) => set({ journalPrompt }),
  setActiveEntry: (activeEntry) => set({ activeEntry }),
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
}));
