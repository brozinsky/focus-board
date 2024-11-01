import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// const fetchBgVideos = async (tag: string) => {
//   const response = await fetch(
//     `https://res.cloudinary.com/${
//       import.meta.env.VITE_CLOUD_NAME
//     }/video/list/${tag}.json`
//   );
//   const data = await response.json();
//   return data.resources;
// };

const fetchBgVideos = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/cloudinary-videos`);
    return response.data.resources;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const useBgVideosQuery = () => {
  return useQuery({
    queryKey: ["cloudinary", "backgrounds"],
    queryFn: () => fetchBgVideos(),
  });
};

export default useBgVideosQuery;
