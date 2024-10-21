import React, { useEffect, useState } from "react";
import PlaylistItemSpotify from "../Card/PlaylistItemSpotify";
import useSpotifyPlaylistQuery from "@/stores/queries/useSpotifyPlaylistQuery";
import axios from "axios";
import DialogAddSpotifyPlaylist from "./DialogAddSpotifyPlaylist";

const PlaylistSpotify = () => {
  const query = useSpotifyPlaylistQuery();
  const [playlists, setPlaylists] = useState<any[]>([]);

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
      <DialogAddSpotifyPlaylist setPlaylists={setPlaylists} />
      {playlists.map((playlist) => (
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
