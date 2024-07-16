interface IImage {
  height: number;
  width: number;
  url: string;
}

export type TSnippet = {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    default: {
      url: string;
      width: number;
      height: number;
    };
    medium: {
      url: string;
      width: number;
      height: number;
    };
    high: {
      url: string;
      width: number;
      height: number;
    };
    standard: {
      url: string;
      width: number;
      height: number;
    };
    maxres: {
      url: string;
      width: number;
      height: number;
    };
  };
  channelTitle: string;
  playlistId: string;
  position: number;
  resourceId: {
    kind: string;
    videoId: string;
  };
  videoOwnerChannelTitle: string;
  videoOwnerChannelId: string;
};

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

