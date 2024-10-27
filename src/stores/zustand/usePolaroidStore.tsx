import { TPolaroid } from "@/types/model-types";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "@/utils/functions/fn-common";
import { create } from "zustand";

type TStore = {
  polaroids: TPolaroid[];
  activeId: number;
  setActiveId: (id: number) => void;
  updatePolaroid: (id: number, updates: Partial<TPolaroid>) => void;
  addNewPolaroid: () => void;
  setPolaroids: (newPolaroids: TPolaroid[]) => void;
  arePhotosVisible: boolean;
  setArePhotosVisible: (value: boolean) => void;
};

const usePolaroidStore = create<TStore>((set) => ({
  polaroids: getFromLocalStorage("polaroids", [
    {
      id: 1,
      image: null,
      caption: "",
      tilt: "right",
      sticker: null,
      position: {
        x: window.innerWidth / 2 - 50,
        y: window.innerHeight / 2 - 50,
      },
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
        position: {
          x: window.innerWidth / 2 - 50,
          y: window.innerHeight / 2 - 50,
        },
      };
      const newPolaroids = [...state.polaroids, newPolaroid];
      setToLocalStorage("polaroids", newPolaroids);
      return { polaroids: newPolaroids, activeId: newId };
    }),

  setPolaroids: (newPolaroids) => {
    setToLocalStorage("polaroids", newPolaroids);
    set({ polaroids: newPolaroids });
  },
  arePhotosVisible: getFromLocalStorage("arePhotosVisible", true),
  setArePhotosVisible: (value) => {
    setToLocalStorage("arePhotosVisible", value);
    set({ arePhotosVisible: value });
  },
}));

export default usePolaroidStore;
