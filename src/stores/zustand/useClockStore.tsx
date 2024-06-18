import {
  getFromLocalStorage,
  setToLocalStorage,
} from "@/utils/functions/fn-common";
import create from "zustand";

interface IClockStore {
  date: Date;
  timeFormat: "24" | "12";
  clockPosition: "center" | "top-right";
  setTimeFormat: (timeFormat: "24" | "12") => void;
  setClockPosition: (clockPosition: "center" | "top-right") => void;
  setDate: (date: Date) => void;
}

export const useClockStore = create<IClockStore>((set) => ({
  date: new Date(),
  timeFormat: getFromLocalStorage("timeFormat", "24"),
  clockPosition: getFromLocalStorage("clockPosition", "top-right"),
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
