import {
  getFromLocalStorage,
  setToLocalStorage,
} from "@/utils/functions/fn-common";
import { create } from "zustand";

// type TFrameType = "glass-frame" | "vignette";
type TFrameType = string;

interface ISceneStore {
  frameType: TFrameType;
  isBgBlur: boolean;
  isBgShadow: boolean;
  isSceneModalOpen: boolean;
  isSceneOpen: boolean;
  blurValue: number;
  shadowValue: number;
  setFrameType: (frameType: TFrameType) => void;
  setIsBgBlur: (isBgBlur: boolean) => void;
  setIsBgShadow: (isBgShadow: boolean) => void;
  setIsSceneModalOpen: (isSceneModalOpen: boolean) => void;
  setIsSceneOpen: (isSceneOpen: boolean) => void;
  setBlurValue: (blurValue: number) => void;
  setShadowValue: (shadowValue: number) => void;
}

const useSceneStore = create<ISceneStore>((set) => ({
  blurValue: getFromLocalStorage("blurValue", 4),
  setBlurValue: (value) => {
    setToLocalStorage("blurValue", value);
    set({ blurValue: value });
  },
  shadowValue: getFromLocalStorage("shadowValue", 0.5),
  setShadowValue: (value) => {
    setToLocalStorage("shadowValue", value);
    set({ shadowValue: value });
  },
  frameType: getFromLocalStorage("frameType", "glass-frame"),
  setFrameType: (value) => {
    setToLocalStorage("frameType", value);
    set({ frameType: value });
  },
  isBgBlur: getFromLocalStorage("isBgBlur", false),
  setIsBgBlur: (value) => {
    setToLocalStorage("isBgBlur", value);
    set({ isBgBlur: value });
  },
  isBgShadow: getFromLocalStorage("isBgShadow", false),
  setIsBgShadow: (value) => {
    setToLocalStorage("isBgShadow", value);
    set({ isBgShadow: value });
  },
  isSceneModalOpen: false,
  setIsSceneModalOpen: (isSceneModalOpen) => set({ isSceneModalOpen }),
  isSceneOpen: false,
  setIsSceneOpen: (isSceneOpen) => set({ isSceneOpen }),

}));

export default useSceneStore;
