import React, { useEffect, useState } from "react";
import { Input } from "./Input";
import { cn } from "@/lib/utils";
import { extractYouTubeVideoId } from "@/utils/functions/fn-common";
import useGetYoutubeDetailsQuery from "@/stores/queries/useGetYoutubeDetailsQuery";

const AddLinkInput = () => {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    console.log(url);
  }, [url]);

  const videoId = extractYouTubeVideoId(url);
  const { refetch, data, error } = useGetYoutubeDetailsQuery(videoId || "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (videoId) {
      await refetch();
      console.log("YouTube video details: ", data);
    } else {
      console.error("Invalid YouTube URL");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-row max-w-[500px] items-center h-10 gap-2"
    >
      <Input
        id="url"
        className="w-full"
        type="text"
        value={url}
        placeholder={"Add your custom YouTube link"}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <button
        type="submit"
        disabled={url === ""}
        className="group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-md border-white/30 border px-6 font-medium bg-transparent glass-blur py-2 duration-500"
      >
        <div
          className={cn(
            "translate-x-0 opacity-60",
            url !== "" &&
              "opacity-100 transition group-hover:-translate-x-[150%] group-hover:opacity-0"
          )}
        >
          Add
        </div>
        <div
          className={cn(
            "absolute translate-x-[150%] opacity-0 transition",
            url !== "" && "group-hover:translate-x-0 group-hover:opacity-100"
          )}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
          >
            <path
              d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
      </button>
      {error && <p className="text-red-500">Error fetching video details</p>}
    </form>
  );
};

export default AddLinkInput;
