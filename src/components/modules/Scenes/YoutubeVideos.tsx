import { useEffect, useState } from "react";
import CardYTVideo from "@/components/ui/cards/CardYTVideo";
import LoadingSpinner from "@/components/ui/loaders/LoadingSpinner";
import usePlaylistQuery from "@/stores/queries/usePlaylistQuery";
import { ICurrentVideo } from "@/types/query-types";
import { cn } from "@/lib/utils";

type TSnippet = {
  videoOwnerChannelTitle: string;
  videoOwnerChannelId: string;
  title: string;
  thumbnails: {
    high: {
      url: string;
      width: number;
      height: number;
    };
    maxres: {
      url: string;
      width: number;
      height: number;
    };
    default: {
      url: string;
      width: number;
      height: number;
    };
  };
  resourceId: {
    videoId: string;
  };
};

type TPlaylistItem = {
  snippet: TSnippet;
};

const YoutubeVideos = ({
  grid = "md",
  noInfo = false,
}: {
  grid?: "sm" | "md";
  noInfo?: boolean;
}) => {
  const playlistQuery = usePlaylistQuery();
  const [playlistItems, setPlaylistItems] = useState<TPlaylistItem[] | null>(
    null
  );

  useEffect(() => {
    if (!playlistQuery.isLoading && playlistQuery.data) {
      setPlaylistItems(playlistQuery.data.items);
    }
  }, [playlistQuery.isLoading, playlistQuery.data]);

  if (playlistQuery.isLoading) {
    return (
      <div className="mx-auto w-full flex-center mt-10">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      <div
        className={cn(
          grid === "sm" &&
            "gap-2 grid xl:grid-cols-4 2xl:grid-cols-6 md:grid-cols-3 grid-cols-1",
          grid === "md" &&
            "gap-8 grid xl:grid-cols-3 2xl:grid-cols-4 md:grid-cols-2 grid-cols-1"
        )}
      >
        {playlistItems &&
          playlistItems.map(({ snippet }: { snippet: TSnippet }) => {
            const currVid: ICurrentVideo = {
              title: snippet.title,
              videoId: snippet.resourceId.videoId,
              imgHi: snippet.thumbnails.high,
              imgHd: snippet.thumbnails.maxres,
              imgDefault: snippet.thumbnails.default,
              videoOwnerChannelTitle: snippet.videoOwnerChannelTitle,
              videoOwnerChannelId: snippet.videoOwnerChannelId,
            };
            if (currVid.title === "Private video") {
              return null;
            }
            return <CardYTVideo key={currVid.title} item={currVid} noInfo={noInfo}/>;
          })}
      </div>
    </div>
  );
};

export default YoutubeVideos;
