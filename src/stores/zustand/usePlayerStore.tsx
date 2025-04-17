import { initCurrentAudio, initWallpaper } from "@/lib/constants/init.constants";
import { ICurrentVideo, TActiveScene, TActiveYtScene, TAudioSource } from "@/types/query-types";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "@/utils/common.utils";
import { create } from "zustand";

interface IState {
  audioSource: TAudioSource;
  activeScene: TActiveScene;
  activeYtScene: TActiveYtScene;
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
  isBuffering: boolean;
  setAudioSource: (audioSource: TAudioSource) => void;
  setActiveScene: (activeScene: TActiveScene) => void;
  setActiveYtScene: (activeYtScene: TActiveYtScene) => void;
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
  setIsBuffering: (isBuffering: boolean) => void;
}

const usePlayerStore = create<IState>((set) => ({
  audioSource: getFromLocalStorage("audioSource", "youtube"),
  activeScene: getFromLocalStorage("activeScene", "wallpaper"),
  activeYtScene: getFromLocalStorage("activeYtScene", "yt-lofi"),
  currentVideo: getFromLocalStorage("currentVideo", null),
  // currentVideo: null,
  currentBgVideoId: getFromLocalStorage("currentBgVideoId", initWallpaper),
  // currentBgVideoId: null,
  currentAudio: getFromLocalStorage("currentAudio", initCurrentAudio),
  // currentAudio: null,
  volumeVideo: getFromLocalStorage("volumeVideo", 50),
  volumeAudio: getFromLocalStorage("volumeAudio", 50),
  durationVideo: 0,
  durationAudio: 0,
  currentTimeVideo: 0,
  currentTimeAudio: 0,
  isVideoPlaying: false,
  isAudioPlaying: false,
  isSharedVideoAndAudio: getFromLocalStorage("isSharedVideoAndAudio", false),
  isBuffering: true,
  setAudioSource: (value) => {
    setToLocalStorage("audioSource", value);
    set({ audioSource: value });
  },
  setIsSharedVideoAndAudio: (value) => {
    setToLocalStorage("isSharedVideoAndAudio", value);
    set({ isSharedVideoAndAudio: value });
  },
  setActiveScene: (value) => {
    setToLocalStorage("activeScene", value);
    set({ activeScene: value });
  },
  setActiveYtScene: (value) => {
    setToLocalStorage("activeYtScene", value);
    set({ activeYtScene: value });
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
  setIsBuffering: (isBuffering) => set({ isBuffering }),
}));

export default usePlayerStore;
