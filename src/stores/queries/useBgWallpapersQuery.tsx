import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// const fetchWallpapers = async (tag: string) => {
//   const response = await fetch(
//     `https://res.cloudinary.com/${
//       import.meta.env.VITE_CLOUD_NAME
//     }/image/list/${tag}.json`
//   );
//   const data = await response.json();
//   return data.resources;
// };

const fetchWallpapers = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/cloudinary-images`);
    return response.data.resources;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const useBgWallpapersQuery = () => {
  return useQuery({
    queryKey: ["cloudinary", "wallpaper"],
    queryFn: () => fetchWallpapers(),
  });
};

export default useBgWallpapersQuery;
