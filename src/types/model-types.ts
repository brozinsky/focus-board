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