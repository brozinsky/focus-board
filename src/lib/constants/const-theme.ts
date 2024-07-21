import { TThemeColor, TThemeColors } from "@/types/model-types";

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
      primaryMuted: "#e1e7ef80",
      secondary: "#e1e7ef",
      secondaryMuted: "#e1e7ef80",
      foreground: "#e1e7ef",
      foregroundPrimary: "#e1e7ef",
      foregroundMuted: "#e1e7ef80",
      background: "#00000080",
    },
  },
  purple: {
    name: "Purple",
    colors: {
      primary: "#a855f7",
      primaryMuted: "#a955f7b3",
      secondary: "#ccc2d633",
      secondaryMuted: "#ffffff33",
      foreground: "#ccc2d6",
      foregroundPrimary: "#ccc2d6",
      foregroundMuted: "#e1e7ef93",
      background: "#210f2e99",
    },
  },
  emerald: {
    name: "Emerald",
    colors: {
      primary: "#22c55e",
      primaryMuted: "#22c55ebb",
      secondary: "#ccc2d633",
      secondaryMuted: "#ffffff33",
      foreground: "#ccc2d6",
      foregroundPrimary: "#000",
      foregroundMuted: "#e1e7ef93",
      background: "#1c1917",
    },
  },
};
