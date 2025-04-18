import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchYouTubeDetails = async (videoId: string) => {
  const API_KEY = import.meta.env.VITE_YT_API_KEY;
  const response = await axios.get(
    `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY}&part=snippet,contentDetails,statistics`
  );
  return response.data;
};

const useGetYoutubeDetailsQuery = (url: string) => {
  return useQuery({
    queryKey: ["yt", "details", url],
    queryFn: () => fetchYouTubeDetails(url as string),
    // enabled: false,
  });
};

export default useGetYoutubeDetailsQuery;
