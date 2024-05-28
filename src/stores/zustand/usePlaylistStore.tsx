import { create } from "zustand";

interface IPlaylistState {
  isPlaylistOpen: boolean;
  setIsPlaylistOpen: (isPlaylistOpen: boolean) => void;
}

const usePlaylistStore = create<IPlaylistState>((set) => ({
  isPlaylistOpen: false,
  setIsPlaylistOpen: (isPlaylistOpen) => set({ isPlaylistOpen }),
}));

export default usePlaylistStore;
