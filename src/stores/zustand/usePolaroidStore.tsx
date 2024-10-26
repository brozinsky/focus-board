import {
  getFromLocalStorage,
  setToLocalStorage,
} from "@/utils/functions/fn-common";
import { create } from "zustand";

type TPolaroid = {
  id: number;
  image: string | null;
  caption: string;
  tilt: "left" | "center" | "right";
  sticker: "star" | "heart" | "smile" | null;
};

type TPolaroidStore = {
  polaroids: TPolaroid[];
  activeId: number;
  setActiveId: (id: number) => void;
  updatePolaroid: (id: number, updates: Partial<TPolaroid>) => void;
  addNewPolaroid: () => void;
  setPolaroids: (newPolaroids: TPolaroid[]) => void;
};

const usePolaroidStore = create<TPolaroidStore>((set) => ({
  polaroids: getFromLocalStorage("polaroids", [
    {
      id: 1,
      image: null,
      caption: "",
      tilt: "right",
      sticker: null,
    },
  ]),
  activeId: 1,
  setActiveId: (id) => set({ activeId: id }),
  updatePolaroid: (id, updates) =>
    set((state) => {
      const updatedPolaroids = state.polaroids.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      );
      setToLocalStorage("polaroids", updatedPolaroids);
      return { polaroids: updatedPolaroids };
    }),

  addNewPolaroid: () =>
    set((state) => {
      const newId =
        state.polaroids.length > 0
          ? Math.max(...state.polaroids.map((p) => p.id)) + 1
          : 1;
      const newPolaroid: TPolaroid = {
        id: newId,
        image: null,
        caption: "",
        tilt: "right",
        sticker: null,
      };
      const newPolaroids = [...state.polaroids, newPolaroid];
      setToLocalStorage("polaroids", newPolaroids);
      return { polaroids: newPolaroids, activeId: newId };
    }),

  setPolaroids: (newPolaroids) => {
    setToLocalStorage("polaroids", newPolaroids);
    set({ polaroids: newPolaroids });
  },
}));

export default usePolaroidStore;
