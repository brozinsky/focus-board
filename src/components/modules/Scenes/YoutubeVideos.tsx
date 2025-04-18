import { useEffect, useState } from "react";
import CardYTVideo from "@/components/ui/cards/CardYTVideo";
import LoadingSpinner from "@/components/ui/loaders/LoadingSpinner";
import usePlaylistQuery from "@/stores/queries/get-playlist.query";
import { cn } from "@/lib/utils";
import { ICurrentVideo, TActiveYtScene, TSnippet } from "@/types/query/playlist.types";
import useYoutubeBgQuery from "@/stores/queries/get-youtube-bg.query";

type TPlaylistItem = {
  snippet: TSnippet;
};

const YoutubeVideos = ({
  grid = "md",
  noInfo = false,
  category,
}: {
  grid?: "sm" | "md";
  noInfo?: boolean;
  category: TActiveYtScene;
}) => {
  const playlistQuery = usePlaylistQuery();
  const yBgQuery = useYoutubeBgQuery(category);
  const [playlistItems, setPlaylistItems] = useState<TPlaylistItem[] | null>(
    null
  );

  useEffect(() => {
    if (!yBgQuery.isLoading && yBgQuery.data) {
      setPlaylistItems(yBgQuery.data.items);
    }
  }, [yBgQuery.isLoading, yBgQuery.data]);

  // useEffect(() => {
  //   if (!playlistQuery.isLoading && playlistQuery.data) {
  //     setPlaylistItems(playlistQuery.data.items);
  //   }
  // }, [playlistQuery.isLoading, playlistQuery.data]);

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
            "gap-8 grid lg:grid-cols-3 2xl:grid-cols-4 md:grid-cols-2 grid-cols-1"
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
            return (
              <CardYTVideo key={currVid.title} item={currVid} noInfo={noInfo} category={category}/>
            );
          })}
      </div>
    </div>
  );
};

export default YoutubeVideos;
