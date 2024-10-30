import React from "react";
import PictureSVG from "@/components/elements/svg/icons/media/PictureSVG";
import { cn } from "@/lib/utils";
import usePlayerStore from "@/stores/zustand/usePlayerStore";
import useWindowsStore from "@/stores/zustand/useWindowsStore";
import { ICurrentVideo } from "@/types/query-types";
import { AsyncImage } from "loadable-image";
import { Blur } from "transitions-kit";

const CardYTVideo = ({
  item,
  noInfo = false,
}: {
  item: ICurrentVideo;
  noInfo?: boolean;
}) => {
  const { activeScene, setActiveScene, setCurrentVideo, currentVideo } =
    usePlayerStore();
  const { setIsOpen } = useWindowsStore();

  const handleClick = (value: ICurrentVideo) => {
    activeScene !== "yt" && setActiveScene("yt");
    setCurrentVideo(value);
    setIsOpen("scene", false);
  };

  return (
    <div
      className="cursor-pointer"
      onClick={() => handleClick(item)}
      key={item.title}
    >
      <div
        className={cn(
          activeScene === "yt" &&
            currentVideo?.videoId === item.videoId &&
            "modal__image-wrap--active",
          "modal__image-wrap mb-2"
        )}
      >
        {item.imgHi ? (
          <AsyncImage
            className="aspect-video object-cover modal__image"
            src={item.imgHi.url}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: 3,
            }}
            alt={item.title}
            Transition={Blur}
            loader={<div className="bg-white/50 glass" />}
          />
        ) : (
          <div className="aspect-video bg-white/50 flex items-center justify-center">
            <PictureSVG pathClass="stroke-neutral-500" width={60} />
          </div>
        )}
      </div>
      {!noInfo && (
        <div className="text-xl tracking-wide line-clamp-2 mb-1">
          {item.title}
          {/* <div className="bstn btn-anim">Live</div> */}
        </div>
      )}
      {!noInfo && (
        <div className="text-md tracking-wide">
          <a
            href=""
            className="pr-4 group relative inline-flex items-center justify-center overflow-hidden "
          >
            <span>{item.videoOwnerChannelTitle}</span>
            <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
              >
                <path
                  d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </a>
        </div>
      )}
    </div>
  );
};

export default CardYTVideo;
