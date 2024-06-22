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
  videoOwnerChannelTitle: string;
  videoOwnerChannelId: string;
}
