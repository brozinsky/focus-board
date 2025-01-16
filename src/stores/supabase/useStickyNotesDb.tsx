import { create } from "zustand";
import {
  TStickyNote,
  TStickyNoteColor,
  TStickyNotePosition,
  TTodo,
} from "@/types/model-types";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "@/utils/functions/fn-common";
import { supabaseClient } from "@/api/client";
import { DragEndEvent } from "@dnd-kit/core";

interface IDb {
  stickyNotes: TStickyNote[];
  setStickyNotes: (value: TStickyNote[]) => void;
  stickyNotesPositions: TStickyNotePosition[];
  setStickyNotesPositions: (value: TStickyNotePosition[]) => void;
  areNotesVisible: boolean;
  setAreNotesVisible: (value: boolean) => void;
  updateStickyNote: (
    id: string,
    updates: Partial<TStickyNote>
  ) => Promise<void>;
  removeStickyNote: (id: string) => Promise<void>;
  addStickyNote: (variant: "note" | "todo") => Promise<void>;
  fetchStickyNotes: () => Promise<void>;
  dragStickyNote: (e: DragEndEvent) => void;
  colorIndex: number;
}

const STICKY_NOES_COLORS = [
  "yellow",
  "cyan",
  "purple",
  "green",
  "violet",
  "white",
];

const useStickyNotesDb = create<IDb>((set, get) => ({
  stickyNotes: [],
  setStickyNotes: (value) => {
    set({ stickyNotes: value });
  },
  stickyNotesPositions: getFromLocalStorage("stickyNotesPositions", []),
  setStickyNotesPositions: (value) => {
    setToLocalStorage("stickyNotesPositions", value);
    set({ stickyNotesPositions: value });
  },
  areNotesVisible: getFromLocalStorage("areNotesVisible", true),
  setAreNotesVisible: (value) => {
    setToLocalStorage("areNotesVisible", value);
    set({ areNotesVisible: value });
  },
  dragStickyNote(e: DragEndEvent) {
    const { stickyNotesPositions } = get();
    const notePosition: TStickyNotePosition | undefined =
      stickyNotesPositions.find((x) => x.id === e.active.id);
    if (notePosition) {
      notePosition.x += e.delta.x;
      notePosition.y += e.delta.y;
      const _notesPositions = stickyNotesPositions.map((x) => {
        if (x.id === notePosition.id) return notePosition;
        return x;
      });

      setToLocalStorage("stickyNotesPositions", _notesPositions);
      set({ stickyNotesPositions: _notesPositions });
    }
  },
  fetchStickyNotes: async () => {
    try {
      const { data: userData, error: userError } =
        await supabaseClient.auth.getUser();

      if (userError || !userData?.user) {
        console.error("Error retrieving user:", userError?.message);
        return;
      }

      const { data, error } = await supabaseClient
        .from("stickynotes")
        .select("*")
        .eq("user_id", userData.user.id);

      if (error) {
        console.error("Error fetching sticky notes:", error.message);
      } else {
        const stickyNotes = (data || []).map((note) => {
          //   const position = getFromLocalStorage(`position_${note.id}`, {
          //     x: window.innerWidth / 2 - 50,
          //     y: window.innerHeight / 2 - 50,
          //   });
          return { ...note };
        });
        set({ stickyNotes });
      }
    } catch (error) {
      console.error("Unexpected error fetching sticky notes:", error);
    }
  },
  updateStickyNote: async (id, updates) => {
    try {
      const { data, error } = await supabaseClient
        .from("stickynotes")
        .update({
          ...updates,
          updated_at: new Date(),
        })
        .eq("id", id);

      if (error) {
        console.error("Error updating sticky note:", error.message);
        return;
      }

      set((state) => {
        const updatedNotes = state.stickyNotes.map((note) =>
          note.id === id ? { ...note, ...updates } : note
        );
        return { stickyNotes: updatedNotes };
      });
    } catch (error) {
      console.error("Unexpected error updating sticky note:", error);
    }
  },
  removeStickyNote: async (id) => {
    try {
      const { error } = await supabaseClient
        .from("stickynotes")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting sticky note:", error.message);
        return;
      }

      set((state) => {
        const updatedNotes = state.stickyNotes.filter((note) => note.id !== id);
        return { stickyNotes: updatedNotes };
      });
    } catch (error) {
      console.error("Unexpected error deleting sticky note:", error);
    }
  },
  addStickyNote: async (variant) => {
    try {
      const { data: userData, error: userError } =
        await supabaseClient.auth.getUser();
      if (userError || !userData?.user) {
        console.error("Error retrieving user:", userError?.message);
        return;
      }

      const userId = userData.user.id;

      const newNotePosition: TStickyNotePosition = {
        id: "",
        x: window.innerWidth / 2 - 50,
        y: window.innerHeight / 2 - 50,
      };

      const newNote: Omit<TStickyNote, "id"> = {
        title: variant === "todo" ? "Todo list" : "My note",
        content: "",
        todos: [],
        color:
          get().stickyNotes.length === 0
            ? "yellow"
            : (STICKY_NOES_COLORS[get().colorIndex] as TStickyNoteColor),
        isTitle: true,
        isContent: variant === "note",
        isTodos: variant === "todo",
        created_at: new Date(),
        updated_at: new Date(),
      };

      const { data, error } = await supabaseClient
        .from("stickynotes")
        .insert({
          user_id: userId,
          title: newNote.title,
          content: newNote.content,
          color: newNote.color,
          created_at: newNote.created_at,
          updated_at: newNote.updated_at,
        })
        .select();

      if (error) {
        console.error("Error adding sticky note:", error.message);
        return;
      }

      if (data && data.length > 0) {
        const noteId = data[0].id;
        newNotePosition.id = noteId;

        set((state) => ({
          stickyNotes: [...state.stickyNotes, { ...newNote, id: noteId }],
          stickyNotesPositions: [
            ...state.stickyNotesPositions,
            newNotePosition,
          ],
          colorIndex: (state.colorIndex + 1) % STICKY_NOES_COLORS.length,
        }));

        const { stickyNotesPositions } = get();
        setToLocalStorage("stickyNotesPositions", [
          ...stickyNotesPositions,
          newNotePosition,
        ]);
      } else {
        console.error(
          "No data returned from Supabase, cannot add sticky note."
        );
      }
    } catch (error) {
      console.error("Unexpected error adding sticky note:", error);
    }
  },
  colorIndex: 1,
}));

export default useStickyNotesDb;
