import { ReactNode } from "react";

export enum PlayerState {
  UNSTARTED = -1,
  ENDED = 0,
  PLAYING = 1,
  PAUSED = 2,
  BUFFERING = 3,
  CUED = 5,
}

export interface IPlayerOptions {
  height?: string;
  width?: string;
  videoId?: string;
  events?: {
    onReady?: (event: any) => void;
    onStateChange?: (event: any) => any;
    onError?: (event: any) => void;
    onPlaybackQualityChange?: (event: any) => void;
    onPlaybackRateChange?: (event: any) => void;
  };
}

export class Player {
  constructor(elementId: string | HTMLElement, options: IPlayerOptions) {}
  playVideo(): void {}
  pauseVideo(): void {}
  seekTo(seconds: number, allowSeekAhead: boolean): void {}
  getCurrentTime(): number {
    return 0;
  }
  getPlayerState(): PlayerState {
    return PlayerState.UNSTARTED;
  }
  stopVideo(): void {}
  destroy(): void {}
  setVolume(volume: number): void {}
}

export type TSoundFX = {
  id: string;
  name: string;
  volume: number;
  audio: string;
  isActive: boolean;
};

export type TThemeStyle = "glass" | "solid";

export type TUIStyle = "glass" | "ghost";

export type TThemeColor = {
  name: string;
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

export type TStickyNoteColor =
  | "yellow"
  | "purple"
  | "cyan"
  | "violet"
  | "green"
  | "white";

  export type TTodo = {
    id: string;
    content: string;
    isCompleted: boolean;
  }

export type TStickyNote = {
  id: string;
  title?: string;
  content?: string;
  todos?: TTodo[];
  position: {
    x: number;
    y: number;
  };
  color: TStickyNoteColor;
  isTitle?: boolean;
  isContent?: boolean;
  isTodos?: boolean;
};
