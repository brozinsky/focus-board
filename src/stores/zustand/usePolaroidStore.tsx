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
  polaroids: [
    { id: 1, image: null, caption: "", tilt: "right", sticker: null },
  ],
  activeId: 1,
  setActiveId: (id) => set({ activeId: id }),
  updatePolaroid: (id, updates) =>
    set((state) => ({
      polaroids: state.polaroids.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      ),
    })),
  addNewPolaroid: () =>
    set((state) => {
      const newId = Math.max(...state.polaroids.map((p) => p.id)) + 1;
      return {
        polaroids: [
          ...state.polaroids,
          { id: newId, image: null, caption: "", tilt: "right", sticker: null },
        ],
        activeId: newId,
      };
    }),
  setPolaroids: (newPolaroids) => set({ polaroids: newPolaroids }),
}));

export default usePolaroidStore;
