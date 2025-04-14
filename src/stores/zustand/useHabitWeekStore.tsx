import { create } from "zustand";

interface HabitWeekStore {
  weekOffset: number;
  setWeekOffset: (offset: number) => void;
  incrementWeek: () => void;
  decrementWeek: () => void;
  resetWeek: () => void;
}

const useHabitWeekStore = create<HabitWeekStore>((set) => ({
  weekOffset: 0,
  setWeekOffset: (offset) => set({ weekOffset: offset }),
  incrementWeek: () => set((state) => ({ weekOffset: state.weekOffset + 1 })),
  decrementWeek: () => set((state) => ({ weekOffset: state.weekOffset - 1 })),
  resetWeek: () => set({ weekOffset: 0 }),
}));

export default useHabitWeekStore;
