// SpotifyPlaylist.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

interface SpotifyPlaylistProps {
  playlistUrl: string;
}

interface PlaylistData {
  name: string;
  description: string;
  images: { url: string }[];
  tracks: { items: { track: { name: string; artists: { name: string }[] } }[] };
}

const SpotifyPlaylist: React.FC<SpotifyPlaylistProps> = ({ playlistUrl }) => {
  const [playlistData, setPlaylistData] = useState<PlaylistData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Helper function to get the playlist ID from the URL
  const getPlaylistIdFromUrl = (url: string): string | null => {
    const match = url.match(/playlist\/([a-zA-Z0-9]+)/);
    return match ? match[1] : null;
  };

  // Function to get Spotify Access Token
  const fetchAccessToken = async (): Promise<string | null> => {
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
    const authString = btoa(`${clientId}:${clientSecret}`);

    try {
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        "grant_type=client_credentials",
        {
          headers: {
            Authorization: `Basic ${authString}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      return response.data.access_token;
    } catch (err) {
      setError("Failed to retrieve access token");
      return null;
    }
  };

  // Function to fetch playlist data
  const fetchPlaylistData = async (accessToken: string, playlistId: string) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${playlistId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setPlaylistData(response.data);
    } catch (err) {
      setError("Failed to fetch playlist data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const playlistId = getPlaylistIdFromUrl(playlistUrl);
    if (!playlistId) {
      setError("Invalid playlist URL");
      return;
    }

    // Fetch access token and then playlist data
    (async () => {
      const accessToken = await fetchAccessToken();
      if (accessToken) {
        fetchPlaylistData(accessToken, playlistId);
      }
    })();
  }, [playlistUrl]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!playlistData) {
    return null;
  }

  return (
    <div>
      <h2>{playlistData.name}</h2>
      <p>{playlistData.description}</p>
      {playlistData.images[0] && (
        <img src={playlistData.images[0].url} alt={playlistData.name} />
      )}
      <ul>
        {playlistData.tracks.items.map((item, index) => (
          <li key={index}>
            {item.track.name} -{" "}
            {item.track.artists.map((artist) => artist.name).join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpotifyPlaylist;
