import { ICurrentVideo } from "@/types/query-types";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "@/utils/functions/fn-common";
import { create } from "zustand";

interface PlayerState {
  currentVideo: ICurrentVideo | null;
  currentAudio: ICurrentVideo | null;
  volume: number;
  duration: number;
  currentTime: number;
  isPlaying: boolean;
  isSharedVideoAndAudio: boolean;
  setCurrentVideo: (currentVideo: ICurrentVideo | null) => void;
  setCurrentAudio: (currentAudio: ICurrentVideo | null) => void;
  setVolume: (volume: number) => void;
  setDuration: (duration: number) => void;
  setCurrentTime: (time: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setIsSharedVideoAndAudio: (isSharedVideoAndAudio: boolean) => void;
}

const usePlayerStore = create<PlayerState>((set) => ({
  currentVideo: getFromLocalStorage("currentVideo", null),
  currentAudio: getFromLocalStorage("currentAudio", null),
  volume: getFromLocalStorage("volume", 50),
  duration: 0,
  currentTime: 0,
  isPlaying: false,
  isSharedVideoAndAudio: true,
  setIsSharedVideoAndAudio: (value) => {
    setToLocalStorage("isSharedVideoAndAudio", value);
    set({ isSharedVideoAndAudio: value });
  },
  setCurrentVideo: (value) => {
    setToLocalStorage("currentVideo", value);
    set({ currentVideo: value });
  },
  setCurrentAudio: (value) => {
    setToLocalStorage("currentAudio", value);
    set({ currentAudio: value });
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
