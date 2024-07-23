import { TThemeColors } from "@/types/model-types";

export const fontFamilyExt = [
  "ui-sans-serif",
  "system-ui",
  "-apple-system",
  "BlinkMacSystemFont",
  '"Segoe UI"',
  "Roboto",
  '"Helvetica Neue"',
  "Arial",
  '"Noto Sans"',
  "sans-serif",
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
  '"Noto Color Emoji"',
];

export const themeColors: TThemeColors = {
  neutral: {
    name: "Neutral",
    colors: {
      primary: "#e1e7ef",
      secondary: "#e1e7ef4d",
      foreground: "#e1e7ef",
      foregroundPrimary: "#222",
      foregroundMuted: "#e1e7ef80",
      background: "#000",
      input: "#4D545C",
    },
  },
  blue: {
    name: "Blue",
    colors: {
      primary: "#2196F3",
      secondary: "#2196f34d",
      foreground: "#ccc",
      foregroundPrimary: "#ccc",
      foregroundMuted: "#e1e7ef93",
      background: "#252526",
      input: "#4D4D4D",
    },
  },
  purple: {
    name: "Purple",
    colors: {
      primary: "#9a3df2",
      secondary: "#9a3df233",
      foreground: "#ccc2d6",
      foregroundPrimary: "#ccc2d6",
      foregroundMuted: "#e1e7ef93",
      background: "#210f2e",
      input: "#59576B",
    },
  },
  emerald: {
    name: "Emerald",
    colors: {
      primary: "#22c55e",
      secondary: "#ccc2d633",
      foreground: "#ccc2d6",
      foregroundPrimary: "#1c1917",
      foregroundMuted: "#e1e7ef93",
      background: "#1c1917",
      input: "#555351",
    },
  },
};
