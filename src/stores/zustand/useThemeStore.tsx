import { themeColors } from "@/lib/constants/const-theme";
import { TThemeColor, TThemeStyle } from "@/types/model-types";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "@/utils/functions/fn-common";
import { darkenHexColor, hexToRgba } from "@/utils/functions/fn-theme";
import { create } from "zustand";

interface ISceneStore {
  colorTheme: TThemeColor;
  themeStyle: TThemeStyle;
  setColorTheme: (colorTheme: TThemeColor) => void;
  setThemeStyle: (themeStyle: TThemeStyle) => void;
  updateCSSVariables: () => void;
}

const useThemeStore = create<ISceneStore>((set, get) => ({
  colorTheme: getFromLocalStorage("colorTheme", themeColors.emerald),
  themeStyle: getFromLocalStorage("themeStyle", "glass"),
  setColorTheme: (value) => {
    setToLocalStorage("colorTheme", value);
    set({ colorTheme: value });
    get().updateCSSVariables();
  },
  setThemeStyle: (value) => {
    setToLocalStorage("themeStyle", value);
    set({ themeStyle: value });
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
