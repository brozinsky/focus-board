import clsx from "clsx";
import { useSpotifyStore } from "@/stores/zustand/player/spotify.store";
import { extractSpotifyPlaylistId } from "@/utils/common.utils";
import { ICurrentVideo } from "@/types/query/playlist.types";

type TProps = {
  id: string;
  handleClick: (item: ICurrentVideo) => void;
  isActive?: boolean;
  isHoverable?: boolean;
  imageSrc: string;
  title: string;
};

const PlaylistItemSpotify = ({
  id,
  isActive,
  isHoverable = true,
  imageSrc,
  title,
}: TProps) => {
  const { setPlaylistFromId, playlistUrl } = useSpotifyStore();

  return (
    <div
      className={clsx(
        id === extractSpotifyPlaylistId(playlistUrl) && "active",
        "cursor-pointer playlist-item relative playlist-item--spotify",
        !isHoverable && "hover-none !cursor-default"
      )}
      onClick={() => {
        setPlaylistFromId(id);
      }}
    >
      <div className="relative">
        <div className="playlist-item__image-wrap playlist-item__image-wrap--square">
          {imageSrc ? (
            <img src={imageSrc} alt={title} width="57" height="57" />
          ) : (
            <div className="w-full h-full bg-red-500"></div>
          )}
        </div>
      </div>
      <div className="flex flex-col w-full">
        {isActive && (
          <div className="absolute bottom-2 right-2 px-3 py-1 glass-blur border border-white/30 rounded-lg text-xs">
            Now playing
          </div>
        )}
        <div className="text-base tracking-wide line-clamp-2">{title}</div>
        {/* <div className="text-md tracking-wide">
          <div className="pr-4 group relative inline-flex items-center justify-center overflow-hidden ">
            <span>{item.videoOwnerChannelTitle}</span>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default PlaylistItemSpotify;
