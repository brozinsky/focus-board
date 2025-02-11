import {
  getFromLocalStorage,
  setToLocalStorage,
} from "@/utils/functions/fn-common";
import { create } from "zustand";

interface IClockStore {
  date: Date;
  timeFormat: "24" | "12";
  clockPosition: "center" | "top-right";
  isSecondsVisible: boolean;
  setTimeFormat: (timeFormat: "24" | "12") => void;
  setClockPosition: (clockPosition: "center" | "top-right") => void;
  setDate: (date: Date) => void;
  setIsSecondsVisible: (isSecondsVisible: boolean) => void;
}

export const useClockStore = create<IClockStore>((set) => ({
  date: new Date(),
  timeFormat: getFromLocalStorage("timeFormat", "24"),
  clockPosition: getFromLocalStorage("clockPosition", "center"),
  isSecondsVisible: getFromLocalStorage("isSecondsVisible", false),
  setIsSecondsVisible: (value) => {
    setToLocalStorage("isSecondsVisible", value);
    set({ isSecondsVisible: value });
  },
  setTimeFormat: (value) => {
    setToLocalStorage("timeFormat", value);
    set({ timeFormat: value });
  },
  setClockPosition: (value) => {
    setToLocalStorage("clockPosition", value);
    set({ clockPosition: value });
  },
  setDate: (date: Date) => set({ date }),
}));
