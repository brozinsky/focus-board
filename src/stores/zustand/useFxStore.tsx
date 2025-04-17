import { create } from "zustand";
import { Howl } from "howler";
import { SFX_AUDIO } from "@/lib/constants/sfx.constants";
import { TSoundFX } from "@/types/model-types";

interface IFXStore {
  activeSoundFX: TSoundFX[];
  audioInstances: Record<string, Howl>;
  initializeAudio: () => void;
  setActiveSoundFX: (value: (prev: TSoundFX[]) => TSoundFX[]) => void;
  toggleSound: (id: string) => void;
  setVolume: (id: string, volume: number) => void;
}

const useFxStore = create<IFXStore>((set) => ({
  activeSoundFX: SFX_AUDIO,
  audioInstances: {},

  initializeAudio: () => {
    const audioInstances: Record<string, Howl> = {};
    SFX_AUDIO.forEach((sound) => {
      audioInstances[sound.id] = new Howl({
        src: [sound.audio],
        loop: true,
        volume: sound.volume,
      });
    });
    set({ audioInstances });
  },

  setActiveSoundFX: (value) =>
    set((state) => ({
      activeSoundFX: value(state.activeSoundFX),
    })),

  toggleSound: (id) =>
    set((state) => {
      const sound = state.activeSoundFX.find((fx) => fx.id === id);
      if (sound) {
        const isActive = !sound.isActive;
        const newActiveSoundFX = state.activeSoundFX.map((fx) =>
          fx.id === id ? { ...fx, isActive } : fx
        );
        if (isActive) {
          state.audioInstances[id].play();
        } else {
          state.audioInstances[id].pause();
        }
        return { activeSoundFX: newActiveSoundFX };
      }
      return state;
    }),

  setVolume: (id, volume) =>
    set((state) => {
      const sound = state.activeSoundFX.find((fx) => fx.id === id);
      if (sound) {
        const newVolume = volume / 100;
        state.audioInstances[id].volume(newVolume);
        const newActiveSoundFX = state.activeSoundFX.map((fx) =>
          fx.id === id ? { ...fx, volume: newVolume } : fx
        );
        return { activeSoundFX: newActiveSoundFX };
      }
      return state;
    }),
}));

export default useFxStore;
