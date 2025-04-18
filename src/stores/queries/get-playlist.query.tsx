import { useQuery } from "@tanstack/react-query";
import React from "react";
import axios from "axios";

// const YT_BASE_URL = "https://www.googleapis.com/youtube/v3/playlistItems";

const fetchPlaylistItems = async (category: string) => {
  if (!category) {
    throw new Error("Category is required for fetching the playlist.");
  }

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/youtube/${category}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching YouTube playlist:", error);
    throw new Error("Failed to fetch YouTube playlist");
  }
};

const usePlaylistQuery = () => {
  return useQuery({
    queryKey: ["yt", "playlist", "music"],
    queryFn: () => fetchPlaylistItems("music"),
    // queryFn: () => Promise.reject("Treść błędu")
  });
};

export default usePlaylistQuery;
