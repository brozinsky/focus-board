import React, { useEffect } from "react";
import PlaylistItemSpotify from "../Card/PlaylistItemSpotify";
import useSpotifyPlaylistQuery from "@/stores/queries/useSpotifyPlaylistQuery";
import DialogAddSpotifyPlaylist from "./DialogAddSpotifyPlaylist";
import { useSpotifyStore } from "@/stores/zustand/player/spotify.store";

const PlaylistSpotify = () => {
  const query = useSpotifyPlaylistQuery();
  const { playlists, setPlaylists } = useSpotifyStore();

  useEffect(() => {
    if (query.data) {
      setPlaylists(query.data);
    }
  }, [query.data]);

  if (query.isLoading) {
    return <div>Loading...</div>;
  }
  if (query.error) {
    return <div>Couldn't load the playlists</div>;
  }
  if (!playlists.length) {
    return <div>No playlists found</div>;
  }

  return (
    <>
      <DialogAddSpotifyPlaylist />
      {playlists &&
        playlists.map((playlist) => (
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
