import { useQuery } from "@tanstack/react-query";

const fetchBgVideos = async (tag: string) => {
  const response = await fetch(
    `https://res.cloudinary.com/${
      import.meta.env.VITE_CLOUD_NAME
    }/video/list/${tag}.json`
  );
  const data = await response.json();
  return data.resources;
};

const useBgVideosQuery = () => {
  return useQuery({
    queryKey: ["cloudinary", "backgrounds"],
    queryFn: () => fetchBgVideos("backgrounds"),
  });
};

export default useBgVideosQuery;
