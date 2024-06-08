import { ICurrentVideo } from "@/types/query-types";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "@/utils/functions/fn-common";
import { create } from "zustand";

interface PlayerState {
  currentVideo: ICurrentVideo | null;
  volume: number;
  duration: number;
  currentTime: number;
  isPlaying: boolean;
  setCurrentVideo: (currentVideo: ICurrentVideo | null) => void;
  setVolume: (volume: number) => void;
  setDuration: (duration: number) => void;
  setCurrentTime: (time: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
}

const usePlayerStore = create<PlayerState>((set) => ({
  currentVideo: getFromLocalStorage("currentVideo", null),
  volume: getFromLocalStorage("volume", 50),
  duration: 0,
  currentTime: 0,
  isPlaying: false,
  setCurrentVideo: (value) => {
    setToLocalStorage("currentVideo", value);
    set({ currentVideo: value });
  },
  setVolume: (value) => {
    setToLocalStorage("volume", value);
    set({ volume: value });
  },
  setDuration: (duration) => set({ duration }),
  setCurrentTime: (currentTime) => set({ currentTime }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
}));

export default usePlayerStore;
