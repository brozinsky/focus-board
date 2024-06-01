import create from "zustand";

interface IPomodoroStore {
  workTimeMin: number;
  breakTimeMin: number;
  longBreakTimeMin: number;
  progress: number;
  timeLeft: number;
  isRunning: boolean;
  currentSession: number;
  isWorkSession: boolean;
  timeOption: string;
  setWorkTimeMin: (value: number) => void;
  setBreakTimeMin: (value: number) => void;
  setLongBreakTimeMin: (value: number) => void;
  setProgress: (value: number) => void;
  setTimeLeft: (value: number) => void;
  setIsRunning: (value: boolean) => void;
  setCurrentSession: (value: number) => void;
  setIsWorkSession: (value: boolean) => void;
  setTimeOption: (value: string) => void;
}

const usePomodoroStore = create<IPomodoroStore>((set) => ({
  workTimeMin: 25,
  breakTimeMin: 5,
  longBreakTimeMin: 10,
  progress: 100,
  timeLeft: 25 * 60,
  isRunning: false,
  currentSession: 1,
  isWorkSession: true,
  timeOption: "25/5",
  setWorkTimeMin: (value: number) => set({ workTimeMin: value }),
  setBreakTimeMin: (value: number) => set({ breakTimeMin: value }),
  setLongBreakTimeMin: (value: number) => set({ longBreakTimeMin: value }),
  setProgress: (value: number) => set({ progress: value }),
  setTimeLeft: (value: number) => set({ timeLeft: value }),
  setIsRunning: (value: boolean) => set({ isRunning: value }),
  setCurrentSession: (value: number) => set({ currentSession: value }),
  setIsWorkSession: (value: boolean) => set({ isWorkSession: value }),
  setTimeOption: (value: string) => set({ timeOption: value }),
}));

export default usePomodoroStore;
