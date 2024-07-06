interface IImage {
  height: number;
  width: number;
  url: string;
}

export interface ICurrentVideo {
  videoId: string;
  title: string;
  imgHd: IImage;
  imgHi: IImage;
  imgDefault: IImage;
  videoOwnerChannelTitle: string;
  videoOwnerChannelId: string;
}

export type TActiveScene = "yt" | "bg-video" | "wallpaper"

