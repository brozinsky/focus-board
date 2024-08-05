import create from "zustand";
import { TStickyNote, TStickyNoteColor, TTodo } from "@/types/model-types";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "@/utils/functions/fn-common";

type IPlaylistState = {
  stickyNotes: TStickyNote[];
  setStickyNotes: (value: TStickyNote[]) => void;
  areNotesVisible: boolean;
  setAreNotesVisible: (value: boolean) => void;
  updateStickyNote: (id: string, updates: Partial<TStickyNote>) => void;
  removeStickyNote: (id: string) => void;
  addStickyNote: () => void;
  colorIndex: number;
};

const COLORS = ["yellow", "cyan", "purple", "green", "violet", "white"];

const useStickyNotesStore = create<IPlaylistState>((set) => ({
  stickyNotes: getFromLocalStorage("stickyNotes", []),
  setStickyNotes: (value) => {
    setToLocalStorage("stickyNotes", value);
    set({ stickyNotes: value });
  },
  areNotesVisible: getFromLocalStorage("areNotesVisible", true),
  setAreNotesVisible: (value) => {
    setToLocalStorage("areNotesVisible", value);
    set({ areNotesVisible: value });
  },
  updateStickyNote: (id, updates) =>
    set((state) => {
      const updatedNotes = state.stickyNotes.map((note) =>
        note.id === id ? { ...note, ...updates } : note
      );
      setToLocalStorage("stickyNotes", updatedNotes);
      return { stickyNotes: updatedNotes };
    }),
  removeStickyNote: (id) =>
    set((state) => {
      const updatedNotes = state.stickyNotes.filter((note) => note.id !== id);
      setToLocalStorage("stickyNotes", updatedNotes);
      return { stickyNotes: updatedNotes };
    }),
  addStickyNote: () =>
    set((state) => {
      const newNote: TStickyNote = {
        id: String(Date.now()),
        title: "New Note",
        content: "",
        todos: [],
        position: {
          x: window.innerWidth / 2 - 50,
          y: window.innerHeight / 2 - 50,
        },
        color:
          state.stickyNotes.length === 0
            ? "yellow"
            : (COLORS[state.colorIndex] as TStickyNoteColor),
        isTitle: true,
        isContent: true,
        isTodos: false,
      };
      const updatedNotes = [...state.stickyNotes, newNote];
      return {
        stickyNotes: updatedNotes,
        colorIndex: (state.colorIndex + 1) % COLORS.length,
      };
    }),
  colorIndex: 1,
}));

export default useStickyNotesStore;
