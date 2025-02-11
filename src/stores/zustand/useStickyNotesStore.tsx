import { create } from "zustand";
import { TPosition, TStickyNote, TStickyNoteColor } from "@/types/model-types";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "@/utils/functions/fn-common";

type TStickyNoteDemo = TStickyNote & {
  position: TPosition;
};

type IStore = {
  stickyNotes: TStickyNoteDemo[];
  setStickyNotes: (value: TStickyNoteDemo[]) => void;
  areNotesVisible: boolean;
  setAreNotesVisible: (value: boolean) => void;
  updateStickyNote: (id: string, updates: Partial<TStickyNoteDemo>) => void;
  removeStickyNote: (id: string) => void;
  addStickyNote: (variant: "note" | "todo") => void;
  colorIndex: number;
};

const COLORS = ["yellow", "cyan", "purple", "green", "violet", "white"];

const useStickyNotesStore = create<IStore>((set) => ({
  stickyNotes: getFromLocalStorage("stickyNotesDemo", []),
  setStickyNotes: (value) => {
    setToLocalStorage("stickyNotesDemo", value);
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
      setToLocalStorage("stickyNotesDemo", updatedNotes);
      return { stickyNotes: updatedNotes };
    }),
  removeStickyNote: (id) =>
    set((state) => {
      const updatedNotes = state.stickyNotes.filter((note) => note.id !== id);
      setToLocalStorage("stickyNotesDemo", updatedNotes);
      return { stickyNotes: updatedNotes };
    }),
  addStickyNote: (variant) =>
    set((state) => {
      const newNote: TStickyNoteDemo = {
        id: String(Date.now()),
        title: variant === "todo" ? "Todo list" : "My note",
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
        isContent: variant === "note",
        isTodos: variant === "todo",
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
