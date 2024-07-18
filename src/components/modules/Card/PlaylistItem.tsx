import PictureSVG from "@/components/elements/svg/icons/media/PictureSVG";
import { ICurrentVideo } from "@/types/query-types";
import clsx from "clsx";
import { AsyncImage } from "loadable-image";
import PlayIconSVG from "@/components/elements/svg/icons/media/PlayIconSVG";
import { Blur, Grow } from "transitions-kit";

type TProps = {
  handleClick: (item: ICurrentVideo) => void;
  isActive?: boolean;
  isHoverable?: boolean;
  item: ICurrentVideo;
};

const PlaylistItem = ({
  handleClick,
  item,
  isActive,
  isHoverable = true,
}: TProps) => {
  return (
    <div
      className={clsx(
        isActive && "active",
        "cursor-pointer playlist-item relative",
        !isHoverable && "hover-none !cursor-default"
      )}
      onClick={() => {
        !isActive && handleClick(item);
      }}
      key={item.title}
    >
      <div className="relative">
        {isActive && (
          <div className="z-10 absolute left-1/2 top-1/2  -translate-x-1/2 -translate-y-1/2">
            <div className="icon audio">
              <i></i>
              <i></i>
            </div>
          </div>
        )}
        {/* <div className="z-10 text-white absolute bottom-2 w-full mx-auto text-center">
          Playing
        </div> */}
        <div className="playlist-item__image-wrap">
          {!isActive && (
            <div className="playlist-item__play-overlay">
              <div className="p-5 rounded-xl">
                <PlayIconSVG width="40" className="" />
              </div>
            </div>
          )}
          {item.imgDefault ? (
            <AsyncImage
              src={item.imgDefault.url}
              style={{
                width: 210,
                height: 118,
                borderRadius: 3,
              }}
              Transition={Blur}
              loader={<div className="bg-white/50 glass" />}
            />
          ) : (
            <div className="aspect-video h-full w-[210px] bg-white/50 flex items-center justify-center">
              <PictureSVG pathClass="stroke-neutral-500" width={60} />
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col w-full">
        {isActive && (
          <div className="absolute bottom-2 right-2 px-3 py-1 glass-blur border border-white/30 rounded-lg text-xs">
            Now playing
          </div>
        )}
        <div className="text-xl tracking-wide line-clamp-2 mb-2">
          {item.title}
        </div>
        <div className="text-md tracking-wide">
          <div className="pr-4 group relative inline-flex items-center justify-center overflow-hidden ">
            <span>{item.videoOwnerChannelTitle}</span>
            {/* <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100">
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
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistItem;
