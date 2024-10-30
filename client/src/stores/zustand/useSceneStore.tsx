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
  isBgNoise: boolean;
  blurValue: number;
  shadowValue: number;
  noiseValue: number;
  fontFamily: string;
  setFontFamily: (fontFamily: string) => void;
  setFrameType: (frameType: TFrameType) => void;
  setIsBgBlur: (isBgBlur: boolean) => void;
  setIsBgShadow: (isBgShadow: boolean) => void;
  setIsBgNoise: (isBgNoise: boolean) => void;
  setBlurValue: (blurValue: number) => void;
  setShadowValue: (shadowValue: number) => void;
  setNoiseValue: (noiseValue: number) => void;
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
  noiseValue: getFromLocalStorage("noiseValue", 0.5),
  setNoiseValue: (value) => {
    setToLocalStorage("noiseValue", value);
    set({ noiseValue: value });
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
  isBgNoise: getFromLocalStorage("isBgNoise", false),
  setIsBgNoise: (value) => {
    setToLocalStorage("isBgNoise", value);
    set({ isBgNoise: value });
  },
  // fontFamily: getFromLocalStorage("fontFamily", "WorkSans"),
  fontFamily: "WorkSans",
  setFontFamily: (value) => {
    setToLocalStorage("fontFamily", value);
    set({ fontFamily: value });
  },
}));

export default useSceneStore;
