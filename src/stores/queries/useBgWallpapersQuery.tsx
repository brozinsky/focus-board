import { useQuery } from "@tanstack/react-query";

const fetchWallpapers = async (tag: string) => {
  const response = await fetch(
    `https://res.cloudinary.com/${
      import.meta.env.VITE_CLOUD_NAME
    }/image/list/${tag}.json`
  );
  const data = await response.json();
  return data.resources;
};

const useBgWallpapersQuery = () => {
  return useQuery({
    queryKey: ["cloudinary", "wallpaper"],
    queryFn: () => fetchWallpapers("wallpaper"),
  });
};

export default useBgWallpapersQuery;
