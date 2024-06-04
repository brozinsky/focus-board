import { getFromLocalStorage, setToLocalStorage } from "@/utils/functions/fn-common";
import { create } from "zustand";

interface PlayerState {
  videoId: string | null;
  volume: number;
  duration: number;
  currentTime: number;
  isPlaying: boolean;
  setVideoId: (id: string | null) => void;
  setVolume: (volume: number) => void;
  setDuration: (duration: number) => void;
  setCurrentTime: (time: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
}

const usePlayerStore = create<PlayerState>((set) => ({
  videoId: getFromLocalStorage("videoId", null),
  volume: 50,
  duration: 0,
  currentTime: 0,
  isPlaying: false,
  setVideoId: (value) => {
    setToLocalStorage("videoId", value);
    set({ videoId: value });
  },
  setVolume: (volume) => set({ volume }),
  setDuration: (duration) => set({ duration }),
  setCurrentTime: (currentTime) => set({ currentTime }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
}));

export default usePlayerStore;
