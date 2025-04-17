import {
  getFromLocalStorage,
  setToLocalStorage,
} from "@/utils/common.utils";
import { create } from "zustand";

interface IStore {
  isOnboarding: boolean;
  setIsOnboarding: (value: boolean) => void;
}

const useAppStore = create<IStore>((set) => ({
  isOnboarding: getFromLocalStorage("isOnboarding", true),
  setIsOnboarding: (value) => {
    setToLocalStorage("isOnboarding", value);
    set({ isOnboarding: value });
  },
}));

export default useAppStore;
