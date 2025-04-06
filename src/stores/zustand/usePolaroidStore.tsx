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
  addNewPicture: () => void;
  removePolaroid: (id: number) => void;
  setPolaroids: (newPolaroids: TPolaroid[]) => void;
  arePhotosVisible: boolean;
  setArePhotosVisible: (value: boolean) => void;
};

const createNewPolaroid = (
  state: TStore,
  overrides: Partial<TPolaroid>
): TPolaroid => {
  const newId =
    state.polaroids.length > 0
      ? Math.max(...state.polaroids.map((p) => p.id)) + 1
      : 1;

  return {
    id: newId,
    image: null,
    caption: "",
    tilt: "center",
    sticker: null,
    orientation: "portrait",
    variant: "polaroid",
    position: {
      x: window.innerWidth / 2 - 50,
      y: window.innerHeight / 2 - 50,
    },
    ...overrides,
  };
};

const usePolaroidStore = create<TStore>((set) => ({
  polaroids: getFromLocalStorage("polaroids", []),
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
      const newPolaroid = createNewPolaroid(state, {
        tilt: "right",
        orientation: "portrait",
        variant: "polaroid",
      });
      const newPolaroids = [...state.polaroids, newPolaroid];
      setToLocalStorage("polaroids", newPolaroids);
      return { polaroids: newPolaroids, activeId: newPolaroid.id };
    }),

  addNewPicture: () =>
    set((state) => {
      const newPicture = createNewPolaroid(state, {
        caption: "",
        tilt: "center",
        orientation: "landscape",
        variant: "picture",
        frame: "light",
        padding: "padding",
        position: {
          x: window.innerWidth / 2 - 100,
          y: window.innerHeight / 2 - 100,
        },
      });
      const newPolaroids = [...state.polaroids, newPicture];
      setToLocalStorage("polaroids", newPolaroids);
      return { polaroids: newPolaroids, activeId: newPicture.id };
    }),

  removePolaroid: (id) =>
    set((state) => {
      const updatedPolaroids = state.polaroids.filter((p) => p.id !== id);
      setToLocalStorage("polaroids", updatedPolaroids);
      const newActiveId =
        state.activeId === id && updatedPolaroids.length > 0
          ? updatedPolaroids[0].id
          : state.activeId;
      return {
        polaroids: updatedPolaroids,
        activeId: newActiveId,
      };
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
