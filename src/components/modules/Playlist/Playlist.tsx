import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import usePlaylistQuery from "@/stores/queries/usePlaylistQuery";
import CloseIconSVG from "@/components/elements/svg/icons/interface/CloseIconSVG";
import usePlaylistStore from "@/stores/zustand/usePlaylistStore";
import usePlayerStore from "@/stores/zustand/usePlayerStore";
import PlaylistSVG from "@/components/elements/svg/icons/media/PlaylistSVG";
import { Separator } from "@/components/ui/Separator/Separator";
import PictureSVG from "@/components/elements/svg/icons/media/PictureSVG";
import { ICurrentVideo } from "@/types/query-types";
import PlaylistItem from "../Card/PlaylistItem";

type TSnippet = {
  videoOwnerChannelTitle: string;
  title: string;
  thumbnails: {
    high: {
      url: string;
      width: number;
      height: number;
    };
    default: {
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
  resourceId: {
    videoId: string;
  };
};

type TPlaylistItem = {
  snippet: TSnippet;
};

const Playlist = () => {
  const playlistQuery = usePlaylistQuery();
  const { isPlaylistOpen, setIsPlaylistOpen } = usePlaylistStore();
  const {
    currentAudio,
    setCurrentAudio,
    setCurrentVideo,
    isSharedVideoAndAudio,
  } = usePlayerStore();
  const [playlistItems, setPlaylistItems] = useState<TPlaylistItem[] | null>(
    null
  );
  const handleClick = (value: ICurrentVideo) => {
    // isSharedVideoAndAudio ? setCurrentVideo(value) : setCurrentAudio(value);

    setCurrentAudio(value)
    // setIsPlaylistOpen(false);
  };

  useEffect(() => {
    if (!playlistQuery.isLoading && playlistQuery.data) {
      setPlaylistItems(playlistQuery.data.items);
    }
  }, [playlistQuery.isLoading, playlistQuery.data]);

  //   useEffect(() => {
  //     const body = document.querySelector("body");

  //     if (isPlaylistOpen) {
  //       body!.style.overflowY = "hidden";
  //     } else {
  //       body!.style.overflowY = "scroll";
  //     }
  //   }, [isPlaylistOpen]);

  if (!isPlaylistOpen) return;

  return (
    <div
      id="Playlist"
      className={"modal"}
      onClick={() => setIsPlaylistOpen(false)}
    >
      <button className={"modal__close"}>
        {/* <MdClose /> */}
        <CloseIconSVG />
      </button>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        className={"modal__card"}
      >
        <div className={"p-8 gap-6 flex flex-col"}>
          <h2 className="flex flex-row items-center text-xl gap-4 tracking-wide">
            <PlaylistSVG /> Media playlist
          </h2>
          {/* <Separator className="bg-white/30" /> */}
          <div
            className={"gap-8 grid xl:grid-cols-2 md:grid-cols-1 grid-cols-1"}
          >
            {playlistItems &&
              (() => {
                // Separate the active item and the rest of the items
                const activeItem: JSX.Element[] = [];
                const otherItems: JSX.Element[] = [];

                playlistItems.forEach(({ snippet }) => {
                  const currVid: ICurrentVideo = {
                    title: snippet.title,
                    videoId: snippet.resourceId.videoId,
                    imgDefault: snippet.thumbnails.medium,
                    imgHi: snippet.thumbnails.high,
                    imgHd: snippet.thumbnails.maxres,
                    videoOwnerChannelTitle: snippet.videoOwnerChannelTitle,
                    videoOwnerChannelId: snippet.videoOwnerChannelId,
                  };

                  const isActive = currVid.videoId === currentAudio?.videoId;

                  if (currVid.title === "Private video") {
                    return;
                  }

                  const itemElement = (
                    <PlaylistItem
                      key={currVid.videoId}
                      isActive={isActive}
                      item={currVid}
                      handleClick={handleClick}
                    />
                  );

                  if (isActive) {
                    activeItem.push(itemElement);
                  } else {
                    otherItems.push(itemElement);
                  }
                });

                return (
                  <>
                    {activeItem}
                    {otherItems}
                  </>
                );
              })()}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Playlist;
