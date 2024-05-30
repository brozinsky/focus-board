import create from "zustand";

interface IClockStore {
  date: Date;
  hours24: boolean;
  setDate: (date: Date) => void;
  toggleFormat: () => void;
}

export const useClockStore = create<IClockStore>((set) => ({
  date: new Date(),
  hours24: true,
  setDate: (date: Date) => set({ date }),
  toggleFormat: () => set((state) => ({ hours24: !state.hours24 })),
}));
