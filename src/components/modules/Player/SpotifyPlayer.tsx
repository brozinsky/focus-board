import React, { useState } from "react";

const SpotifyPlayer: React.FC = () => {
  const url = "https://open.spotify.com/playlist/2idylB7DB5cDvSl5Ddnl1w".match(/playlist\/([a-zA-Z0-9]+)/);
  const playlistId = url && url[1];

  const initialPlaylistUrl = `https://open.spotify.com/embed/playlist/${playlistId}?theme=0`;
  const [playlistUrl, setPlaylistUrl] = useState(initialPlaylistUrl);

  const changePlaylist = () => {
    const newUrl = prompt("Enter a new Spotify playlist URL:");
    if (newUrl) {
      const match = newUrl.match(/playlist\/([a-zA-Z0-9]+)/);
      if (match) {
        const playlistId = match[1];
        setPlaylistUrl(
          `https://open.spotify.com/embed/playlist/${playlistId}?theme=0`
        );
      } else {
        alert("Invalid Spotify playlist URL");
      }
    }
  };

  const WIDTH = 350;
  const HEIGHT = 500;

  return (
    <div className="absolute bottom-24 left-14 z-100">
      <iframe
        src={playlistUrl}
        width={WIDTH}
        height={HEIGHT}
        allow="encrypted-media"
        title="Spotify Playlist"
      />
      <button onClick={changePlaylist}>Change Playlist</button>
    </div>
  );
};

export default SpotifyPlayer;
