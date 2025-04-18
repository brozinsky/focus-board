import React, { useEffect, useState } from "react";
import PlaylistItem from "../Card/PlaylistItem";
import usePlayerStore from "@/stores/zustand/player/player.store";
import usePlaylistQuery from "@/stores/queries/playlist.query";
import { ICurrentVideo, TSnippet } from "@/types/query/playlist.types";

type TPlaylistItem = {
  snippet: TSnippet;
};

const PlaylistItems = () => {
  const { currentAudio, setCurrentAudio } = usePlayerStore();
  const playlistQuery = usePlaylistQuery();

  const [playlistItems, setPlaylistItems] = useState<TPlaylistItem[] | null>(
    null
  );

  useEffect(() => {
    if (!playlistQuery.isLoading && playlistQuery.data) {
      setPlaylistItems(playlistQuery.data.items);
    }
  }, [playlistQuery.isLoading, playlistQuery.data]);

  const handleClick = (value: ICurrentVideo) => {
    // isSharedVideoAndAudio ? setCurrentVideo(value) : setCurrentAudio(value);
    setCurrentAudio(value);
  };

  return (
    <>
      {playlistItems &&
        (() => {
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

            if (
              currVid.title === "Deleted video" ||
              currVid.title === "Private video"
            ) {
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
    </>
  );
};

export default PlaylistItems;
