import PictureSVG from "@/components/elements/svg/icons/media/PictureSVG";
import LoadingSpinner from "@/components/ui/loaders/LoadingSpinner";
import usePlaylistQuery from "@/stores/queries/usePlaylistQuery";
import usePlayerStore from "@/stores/zustand/usePlayerStore";
import useSceneStore from "@/stores/zustand/useSceneStore";
import { ICurrentVideo } from "@/types/query-types";
import clsx from "clsx";
import React, { useEffect, useState } from "react";

type TSnippet = {
  videoOwnerChannelTitle: string;
  title: string;
  thumbnails: {
    high: {
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

const YoutubeVideos = () => {
  const playlistQuery = usePlaylistQuery();
  const {
    activeScene,
    setActiveScene,
    setCurrentVideo,
    currentVideo,
    setCurrentBgVideoId,
  } = usePlayerStore();
  const { setIsSceneOpen } = useSceneStore();

  const [playlistItems, setPlaylistItems] = useState<TPlaylistItem[] | null>(
    null
  );

  const handleClick = (value: ICurrentVideo) => {
    activeScene !== "yt" && setActiveScene("yt");
    setCurrentVideo(value);
    setIsSceneOpen(false);
  };

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
        className={
          "gap-8 grid xl:grid-cols-3 2xl:grid-cols-4 md:grid-cols-2 grid-cols-1"
        }
      >
        {playlistItems &&
          playlistItems.map(({ snippet }: any) => {
            const currVid = {
              title: snippet.title,
              videoId: snippet.resourceId.videoId,
              imgHi: snippet.thumbnails.high,
              imgHd: snippet.thumbnails.maxres,
              videoOwnerChannelTitle: snippet.videoOwnerChannelTitle,
              videoOwnerChannelId: snippet.videoOwnerChannelId,
            };
            if (currVid.title === "Private video") {
              return null;
            }
            return (
              <div
                className="cursor-pointer"
                onClick={() => handleClick(currVid)}
                key={currVid.title}
              >
                <div
                  className={clsx(
                    activeScene === "yt" &&
                      currentVideo?.videoId === currVid.videoId &&
                      "modal__image-wrap--active",
                    "modal__image-wrap"
                  )}
                >
                  {currVid.imgHi ? (
                    <img
                      className="aspect-video object-cover modal__image"
                      src={currVid.imgHi.url}
                      loading={"lazy"}
                      height={currVid.imgHi.height}
                      width={currVid.imgHi.width}
                      alt={currVid.title}
                    />
                  ) : (
                    <div className="aspect-video bg-white/50 flex items-center justify-center">
                      <PictureSVG pathClass="stroke-neutral-500" width={60} />
                    </div>
                  )}
                </div>
                <div className="text-xl tracking-wide line-clamp-2 mb-2">
                  {currVid.title}
                  {/* <div className="bstn btn-anim">Live</div> */}
                </div>
                <div className="text-md tracking-wide">
                  <a
                    href=""
                    className="pr-4 group relative inline-flex items-center justify-center overflow-hidden "
                  >
                    <span>{currVid.videoOwnerChannelTitle}</span>
                    <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                      >
                        <path
                          d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </a>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default YoutubeVideos;
