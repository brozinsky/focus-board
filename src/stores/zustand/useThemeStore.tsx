import { themeColors } from "@/lib/constants/const-theme";
import { TThemeColor } from "@/types/model-types";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "@/utils/functions/fn-common";
import { create } from "zustand";

interface ISceneStore {
  colorTheme: TThemeColor;
  setColorTheme: (colorTheme: TThemeColor) => void;
  updateCSSVariables: () => void;
}

const useThemeStore = create<ISceneStore>((set, get) => ({
  colorTheme: getFromLocalStorage("colorTheme", themeColors.emerald),
  setColorTheme: (value) => {
    setToLocalStorage("colorTheme", value);
    set({ colorTheme: value });
    get().updateCSSVariables();
  },
  updateCSSVariables: () => {
    const colorTheme = get().colorTheme.colors;
    document.documentElement.style.setProperty(
      "--color-primary",
      colorTheme.primary
    );
    document.documentElement.style.setProperty(
      "--color-primary-muted",
      colorTheme.primaryMuted
    );
    document.documentElement.style.setProperty(
      "--color-secondary",
      colorTheme.secondary
    );
    document.documentElement.style.setProperty(
      "--color-secondary-muted",
      colorTheme.secondaryMuted
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
  },
}));

export default useThemeStore;
