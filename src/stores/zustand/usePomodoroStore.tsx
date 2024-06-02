import create from "zustand";
interface IPomodoroStore {
  workTimeMin: number;
  breakTimeMin: number;
  longBreakTimeMin: number;
  currentSession: number;
  isWorkSession: boolean;
  setWorkTimeMin: (value: number) => void;
  setBreakTimeMin: (value: number) => void;
  setLongBreakTimeMin: (value: number) => void;
  setCurrentSession: (value: number) => void;
  setIsWorkSession: (value: boolean) => void;
}

const usePomodoroStore = create<IPomodoroStore>((set) => ({
  workTimeMin: 25,
  breakTimeMin: 5,
  longBreakTimeMin: 10,
  currentSession: 1,
  isWorkSession: true,
  setWorkTimeMin: (value) => set({ workTimeMin: value }),
  setBreakTimeMin: (value) => set({ breakTimeMin: value }),
  setLongBreakTimeMin: (value) => set({ longBreakTimeMin: value }),
  setCurrentSession: (value) => set({ currentSession: value }),
  setIsWorkSession: (value) => set({ isWorkSession: value }),
}));

export default usePomodoroStore;
