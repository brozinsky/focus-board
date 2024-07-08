import { ICurrentVideo, TActiveScene } from "@/types/query-types";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "@/utils/functions/fn-common";
import { create } from "zustand";

interface PlayerState {
  activeScene: TActiveScene;
  currentVideo: ICurrentVideo | null;
  currentBgVideoId: string | null;
  currentAudio: ICurrentVideo | null;
  volumeVideo: number;
  volumeAudio: number;
  durationVideo: number;
  durationAudio: number;
  currentTimeVideo: number;
  currentTimeAudio: number;
  isVideoPlaying: boolean;
  isAudioPlaying: boolean;
  isSharedVideoAndAudio: boolean;
  setActiveScene: (activeScene: TActiveScene) => void;
  setCurrentVideo: (currentVideo: ICurrentVideo | null) => void;
  setCurrentBgVideoId: (currentBgVideoId: string | null) => void;
  setCurrentAudio: (currentAudio: ICurrentVideo | null) => void;
  setVolumeVideo: (volume: number) => void;
  setVolumeAudio: (volume: number) => void;
  setDurationVideo: (duration: number) => void;
  setDurationAudio: (duration: number) => void;
  setCurrentTimeVideo: (time: number) => void;
  setCurrentTimeAudio: (time: number) => void;
  setIsVideoPlaying: (isPlaying: boolean) => void;
  setIsAudioPlaying: (isPlaying: boolean) => void;
  setIsSharedVideoAndAudio: (isSharedVideoAndAudio: boolean) => void;
}

const usePlayerStore = create<PlayerState>((set) => ({
  activeScene: getFromLocalStorage("activeScene", "yt"),
  currentVideo: getFromLocalStorage("currentVideo", null),
  currentBgVideoId: getFromLocalStorage("currentBgVideoId", null),
  currentAudio: getFromLocalStorage("currentAudio", null),
  volumeVideo: getFromLocalStorage("volumeVideo", 50),
  volumeAudio: getFromLocalStorage("volumeAudio", 50),
  durationVideo: 0,
  durationAudio: 0,
  currentTimeVideo: 0,
  currentTimeAudio: 0,
  isVideoPlaying: false,
  isAudioPlaying: false,
  isSharedVideoAndAudio: getFromLocalStorage("isSharedVideoAndAudio", false),
  setIsSharedVideoAndAudio: (value) => {
    setToLocalStorage("isSharedVideoAndAudio", value);
    set({ isSharedVideoAndAudio: value });
  },
  setActiveScene: (value) => {
    setToLocalStorage("activeScene", value);
    set({ activeScene: value });
  },
  setCurrentVideo: (value) => {
    setToLocalStorage("currentVideo", value);
    set({ currentVideo: value });
  },
  setCurrentBgVideoId: (value) => {
    setToLocalStorage("currentBgVideoId", value);
    set({ currentBgVideoId: value });
  },
  setCurrentAudio: (value) => {
    setToLocalStorage("currentAudio", value);
    set({ currentAudio: value });
  },
  setVolumeVideo: (value) => {
    setToLocalStorage("volumeVideo", value);
    set({ volumeVideo: value });
  },
  setVolumeAudio: (value) => {
    setToLocalStorage("volumeAudio", value);
    set({ volumeAudio: value });
  },
  setDurationVideo: (duration) => set({ durationVideo: duration }),
  setDurationAudio: (duration) => set({ durationAudio: duration }),
  setCurrentTimeVideo: (currentTime) => set({ currentTimeVideo: currentTime }),
  setCurrentTimeAudio: (currentTime) => set({ currentTimeAudio: currentTime }),
  setIsVideoPlaying: (isPlaying) => set({ isVideoPlaying: isPlaying }),
  setIsAudioPlaying: (isPlaying) => set({ isAudioPlaying: isPlaying }),
}));

export default usePlayerStore;
