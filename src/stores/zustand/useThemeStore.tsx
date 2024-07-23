import { themeColors } from "@/lib/constants/const-theme";
import { TThemeColor, TThemeStyle, TUIStyle } from "@/types/model-types";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "@/utils/functions/fn-common";
import { darkenHexColor, hexToRgba } from "@/utils/functions/fn-theme";
import { create } from "zustand";

interface ISceneStore {
  colorTheme: TThemeColor;
  themeStyle: TThemeStyle;
  uiStyle: TUIStyle;
  setColorTheme: (colorTheme: TThemeColor) => void;
  setThemeStyle: (themeStyle: TThemeStyle) => void;
  setUIStyle: (uiStyle: TUIStyle) => void;
  updateCSSVariables: () => void;
}

const useThemeStore = create<ISceneStore>((set, get) => ({
  colorTheme: getFromLocalStorage("colorTheme", themeColors.emerald),
  themeStyle: getFromLocalStorage("themeStyle", "glass"),
  uiStyle: getFromLocalStorage("uiStyle", "ghost"),
  setColorTheme: (value) => {
    setToLocalStorage("colorTheme", value);
    set({ colorTheme: value });
    get().updateCSSVariables();
  },
  setThemeStyle: (value) => {
    setToLocalStorage("themeStyle", value);
    set({ themeStyle: value });
  },
  setUIStyle: (value) => {
    setToLocalStorage("uiStyle", value);
    set({ uiStyle: value });
  },
  updateCSSVariables: () => {
    const colorTheme = get().colorTheme.colors;
    document.documentElement.style.setProperty(
      "--color-primary",
      colorTheme.primary
    );
    document.documentElement.style.setProperty(
      "--color-secondary",
      colorTheme.secondary
    );
    document.documentElement.style.setProperty(
      "--color-foreground",
      colorTheme.foreground
    );
    document.documentElement.style.setProperty(
      "--color-foreground-primary",
      colorTheme.foregroundPrimary
    );
    document.documentElement.style.setProperty(
      "--color-foreground-muted",
      colorTheme.foregroundMuted
    );
    document.documentElement.style.setProperty(
      "--color-background",
      colorTheme.background
    );
    document.documentElement.style.setProperty(
      "--color-background-glass",
      hexToRgba(colorTheme.background, 0.7)
    );
    document.documentElement.style.setProperty(
      "--color-input",
      colorTheme.input
    );
  },
}));

export default useThemeStore;
