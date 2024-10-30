import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSpotifyPlaylists = async (): Promise<any[]> => {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
  const authString = btoa(`${clientId}:${clientSecret}`);

  try {
    const tokenResponse = await axios.post(
      "https://accounts.spotify.com/api/token",
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${authString}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    const playlistResponse = await axios.get(
      `https://api.spotify.com/v1/users/${
        import.meta.env.VITE_SPOTIFY_USER_ID
      }/playlists`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return playlistResponse.data.items;
  } catch (err) {
    throw new Error("Failed to fetch playlists");
  }
};

const useSpotifyPlayerQuery = () => {
  return useQuery({
    queryKey: ["spotify", "player"],
    queryFn: () => fetchSpotifyPlaylists(), 
    // queryFn: () => Promise.reject("Custom error message")
  });
};

export default useSpotifyPlayerQuery;
