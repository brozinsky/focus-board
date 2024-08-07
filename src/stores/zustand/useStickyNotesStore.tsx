import { TStickyNote, TStickyNoteColor } from "@/types/model-types";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "@/utils/functions/fn-common";
import { create } from "zustand";

const COLORS: TStickyNoteColor[] = [
  "yellow",
  "purple",
  "cyan",
  "violet",
  "green",
  "white",
];

interface IPlaylistState {
  stickyNotes: TStickyNote[];
  setStickyNotes: (stickyNotes: TStickyNote[]) => void;
  updateStickyNote: (id: string, updates: Partial<TStickyNote>) => void;
  removeStickyNote: (id: string) => void;
  addStickyNote: () => void;
  colorIndex: number;
  areNotesVisible: boolean;
  setAreNotesVisible: (value: boolean) => void;
}

const NOTES_DATA: TStickyNote[] = [
  {
    id: "1",
    title: "Note",
    content: "Study English",
    position: {
      x: 0,
      y: 0,
    },
    color: "yellow",
    isTitle: true,
    isContent: true,
  },
  {
    id: "0",
    title: "Note",
    content: "Study English",
    position: {
      x: 0,
      y: 0,
    },
    color: "cyan",
    isTitle: true,
    isContent: true,
  },
  {
    id: "2",
    title: "Note",
    content: "Study English",
    position: {
      x: 0,
      y: 0,
    },
    color: "purple",
    isTitle: true,
    isContent: true,
  },
  {
    id: "3",
    title: "Note",
    content: "Study English",
    position: {
      x: 0,
      y: 0,
    },
    color: "green",
    isTitle: true,
    isContent: true,
  },
];

const useStickyNotesStore = create<IPlaylistState>((set) => ({
  stickyNotes: getFromLocalStorage("stickyNotes", NOTES_DATA),
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
        position: {
          x: window.innerWidth / 2 - 50,
          y: window.innerHeight / 2 - 50,
        },
        color:
          state.stickyNotes.length === 0 ? "yellow" : COLORS[state.colorIndex],
        isTitle: true,
        isContent: true,
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
