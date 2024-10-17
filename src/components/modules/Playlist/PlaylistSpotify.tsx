import React, { useEffect, useState } from "react";
import PlaylistItemSpotify from "../Card/PlaylistItemSpotify";
import useSpotifyPlaylistQuery from "@/stores/queries/useSpotifyPlaylistQuery";

const PlaylistSpotify = () => {
  const query = useSpotifyPlaylistQuery();

  if (query.isLoading) {
    return <div>Loading...</div>;
  }
  if (query.error) {
    return <div>Couldn't load the playlists</div>;
  }
  if (!query.data || !query.data.length) {
    return <div>No playlists found</div>;
  }

  return (
    <>
      {query.data.map((playlist) => (
        <PlaylistItemSpotify
          key={playlist.id}
          id={playlist.id}
          isActive={false}
          title={playlist.name}
          imageSrc={
            playlist.images && playlist.images[0] && playlist.images[0].url
          }
          handleClick={() => null}
        />
      ))}
    </>
  );
};

export default PlaylistSpotify;
