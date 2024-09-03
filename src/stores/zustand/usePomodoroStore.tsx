import { TPosition } from "@/types/model-types";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "@/utils/functions/fn-common";
import { create } from "zustand";

interface IPomodoroStore {
  workTimeMin: number;
  breakTimeMin: number;
  longBreakTimeMin: number;
  timeOption: string;
  currentSession: number;
  isWorkSession: boolean;
  isSoundNotification: boolean;
  windowPosition: TPosition;
  setWindowPosition: (
    value: TPosition | ((prev: TPosition) => TPosition)
  ) => void;
  setWorkTimeMin: (value: number) => void;
  setBreakTimeMin: (value: number) => void;
  setLongBreakTimeMin: (value: number) => void;
  setCurrentSession: (value: number) => void;
  setTimeOption: (value: string) => void;
  setIsWorkSession: (value: boolean) => void;
  setIsSoundNotification: (value: boolean) => void;
}

const usePomodoroStore = create<IPomodoroStore>((set) => ({
  workTimeMin: getFromLocalStorage("workTimeMin", 25),
  breakTimeMin: getFromLocalStorage("breakTimeMin", 5),
  longBreakTimeMin: getFromLocalStorage("longBreakTimeMin", 10),
  timeOption: getFromLocalStorage("timeOption", "25/5"),
  currentSession: 1,
  isWorkSession: true,
  isSoundNotification: getFromLocalStorage("isSoundNotification", true),
  windowPosition: getFromLocalStorage("timerWindowPosition", {
    x: window.innerWidth / 2 - 50,
    y: window.innerHeight / 2 - 50,
  }),
  setWindowPosition: (value) => {
    set((state) => {
      const newPosition =
        typeof value === "function" ? value(state.windowPosition) : value;
      setToLocalStorage("timerWindowPosition", newPosition);
      return { windowPosition: newPosition };
    });
  },
  setWorkTimeMin: (value) => {
    setToLocalStorage("workTimeMin", value);
    set({ workTimeMin: value });
  },
  setBreakTimeMin: (value) => {
    setToLocalStorage("breakTimeMin", value);
    set({ breakTimeMin: value });
  },
  setLongBreakTimeMin: (value) => {
    setToLocalStorage("longBreakTimeMin", value);
    set({ longBreakTimeMin: value });
  },
  setTimeOption: (value) => {
    setToLocalStorage("timeOption", value);
    set({ timeOption: value });
  },
  setCurrentSession: (value) => set({ currentSession: value }),
  setIsWorkSession: (value) => set({ isWorkSession: value }),
  setIsSoundNotification: (value) => {
    setToLocalStorage("isSoundNotification", value);
    set({ isSoundNotification: value });
  },
}));

export default usePomodoroStore;
