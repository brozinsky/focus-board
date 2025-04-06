import { useQuery } from "@tanstack/react-query";
import React from "react";
import axios from "axios";
import { TActiveYtScene } from "@/types/query-types";

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

const useYoutubeBgQuery = (category: TActiveYtScene) => {
  return useQuery({
    queryKey: ["yt", "playlist", category],
    queryFn: () => fetchPlaylistItems(category),
    enabled: !!category,
  });
};

export default useYoutubeBgQuery;
