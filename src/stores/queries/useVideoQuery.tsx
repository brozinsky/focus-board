import { useQuery } from "@tanstack/react-query";
import React from "react";
import axios from "axios";

const YT_BASE_URL = "https://www.googleapis.com/youtube/v3/playlistItems";

const fetchPlaylistItems = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/youtube`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
// const fetchPlaylistItems = async () => {
//   const response = await axios.get(YT_BASE_URL, {
//     params: {
//       key: import.meta.env.VITE_YT_API_KEY,
//       playlistId: import.meta.env.VITE_YT_PLAYLIST_ID_ALL,
//       part: "snippet",
//       maxResults: 50
//     },
//   });
//   return response.data;
// };

const useVideoQuery = () => {
  return useQuery({
    queryKey: ["yt", "playlist", "all"],
    queryFn: () => fetchPlaylistItems(),
    // queryFn: () => Promise.reject("Treść błędu")
  });
};

export default useVideoQuery;
