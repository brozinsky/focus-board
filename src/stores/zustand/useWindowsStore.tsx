import { create } from "zustand";

interface IWindowsStore {
    isSoundFXOpen: boolean;
    setIsSoundFXOpen: (isSoundFXOpen: boolean) => void;
    isSoundFXFirstOpen: boolean;
    setIsSoundFXFirstOpen: (isSoisSoundFXFirstOpenundFXOpen: boolean) => void;
}

const useWindowsStore = create<IWindowsStore>((set) => ({
  isSoundFXOpen: false,
  setIsSoundFXOpen: (isSoundFXOpen) => set({ isSoundFXOpen }),
  isSoundFXFirstOpen: false,
  setIsSoundFXFirstOpen: (isSoundFXFirstOpen) => set({ isSoundFXFirstOpen }),
}));

export default useWindowsStore;
