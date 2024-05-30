import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import usePlaylistQuery from "@/stores/queries/usePlaylistQuery";
import CloseIconSVG from "@/components/elements/svg/icons/interface/CloseIconSVG";
import usePlaylistStore from "@/stores/zustand/usePlaylistStore";
import usePlayerStore from "@/stores/zustand/usePlayerStore";

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

const Playlist = () => {
  const playlistQuery = usePlaylistQuery();
  const { isPlaylistOpen, setIsPlaylistOpen } = usePlaylistStore();
  const { setVideoId } = usePlayerStore();
  const [playlistItems, setPlaylistItems] = useState<TPlaylistItem[] | null>(
    null
  );
  const handleClick = (id: string) => {
    setVideoId(id);
    setIsPlaylistOpen(false);
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
        <div
          className={"p-8 gap-8 grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1"}
        >
          {playlistItems &&
            playlistItems.map(({ snippet }: any) => {
              const channelTitle = snippet.videoOwnerChannelTitle;
              const title = snippet.title;
              const img = snippet.thumbnails.high;
              const videoId = snippet.resourceId.videoId;
              return (
                <div
                  className="cursor-pointer"
                  onClick={() => handleClick(videoId)}
                  key={title}
                >
                  <div className="modal__image-wrap">
                    <img
                      className="aspect-video object-cover modal__image"
                      src={img.url}
                      height={img.height}
                      width={img.width}
                       alt={title}
                    />
                  </div>

                  <div>{title}</div>
                  <div>{channelTitle}</div>
                </div>
              );
            })}
        </div>
      </motion.div>
    </div>
  );
};

export default Playlist;
