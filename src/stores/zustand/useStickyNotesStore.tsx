import { TStickyNote, TStickyNoteColor } from "@/types/model-types";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "@/utils/functions/fn-common";
import { create } from "zustand";

interface IPlaylistState {
  stickyNotes: TStickyNote[];
  setStickyNotes: (stickyNotes: TStickyNote[]) => void;
  updateStickyNote: (id: string, updates: Partial<TStickyNote>) => void;
  removeStickyNote: (id: string) => void;
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
  updateStickyNote: (id, updates) =>
    set((state) => {
      console.log("updateing...");
      const updatedNotes = state.stickyNotes.map((note) =>
        note.id === id ? { ...note, ...updates } : note
      );
      setToLocalStorage("stickyNotes", updatedNotes);
      return { stickyNotes: updatedNotes };
    }),
  removeStickyNote: (id) =>
    set((state) => {
      const updatedNotes = state.stickyNotes.filter((note) => note.id !== id);
      console.log(`Removing note with id: ${id}`);
      console.log(`Updated notes: ${JSON.stringify(updatedNotes)}`);
      setToLocalStorage("stickyNotes", updatedNotes);
      return { stickyNotes: updatedNotes };
    }),
}));

export default useStickyNotesStore;
