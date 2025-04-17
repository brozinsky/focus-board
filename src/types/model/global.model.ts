export type TThemeStyle = "glass" | "solid";

export type TUIStyle = "glass" | "ghost";

export type TThemeColor = {
  name: string;
  isPremium?: boolean;
  colors: {
    primary: string;
    secondary: string;
    foreground: string;
    foregroundPrimary: string;
    foregroundMuted: string;
    background: string;
    input: string;
  };
};

export type TThemeColors = {
  [key: string]: TThemeColor;
};

export type TPosition = {
  x: number;
  y: number;
};

export type TUserStatus = "online" | "offline";
