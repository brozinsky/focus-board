import PictureSVG from "@/components/elements/svg/icons/media/PictureSVG";
import { Switch } from "@/components/ui/buttons/Switch";
import usePlayerStore from "@/stores/zustand/usePlayerStore";
import usePlaylistStore from "@/stores/zustand/usePlaylistStore";
import useQuoteStore from "@/stores/zustand/useQuoteStore";
import useSceneStore from "@/stores/zustand/useSceneStore";
import clsx from "clsx";
import React from "react";

const MainSettings = () => {
  const { setIsSceneOpen } = useSceneStore();
  const {
    currentVideo,
    currentAudio,
    isSharedVideoAndAudio,
    setIsSharedVideoAndAudio,
  } = usePlayerStore();
  const { setIsPlaylistOpen } = usePlaylistStore();
  const { isQuoteActive, setIsQuoteActive } = useQuoteStore();

  return (
    <>
      <div className="flex justify-between items-center max-w-sm">
        <div>Use same video and audio source</div>
        <Switch
          checked={isSharedVideoAndAudio}
          onCheckedChange={setIsSharedVideoAndAudio}
        />
      </div>
      <div className="flex flex-row gap-8">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <div>Video</div>
          </div>
          <div className="modal__image-wrap">
            {currentVideo?.imgHi ? (
              <img
                onClick={() => setIsSceneOpen(true)}
                className="aspect-video object-cover modal__image"
                src={currentVideo.imgHi.url}
                loading={"lazy"}
                height={currentVideo.imgHi.height}
                width={currentVideo.imgHi.width}
                alt={currentVideo.title}
              />
            ) : (
              <div className="aspect-video bg-white/50 flex items-center justify-center">
                <PictureSVG pathClass="stroke-neutral-500" width={60} />
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <div>Audio</div>
          </div>
          <div className="modal__image-wrap">
            {currentVideo?.imgHi && currentAudio?.imgHi ? (
              <img
                onClick={() => {
                  if (!isSharedVideoAndAudio) {
                    setIsPlaylistOpen(true);
                  }
                }}
                className={clsx(
                  isSharedVideoAndAudio && "modal__image--disabled",
                  "aspect-video object-cover modal__image"
                )}
                src={
                  isSharedVideoAndAudio
                    ? currentVideo.imgHi.url
                    : currentAudio.imgHi.url
                }
                loading={"lazy"}
                height={
                  isSharedVideoAndAudio
                    ? currentVideo.imgHi.height
                    : currentAudio.imgHi.height
                }
                width={
                  isSharedVideoAndAudio
                    ? currentVideo.imgHi.width
                    : currentAudio.imgHi.width
                }
                alt={
                  isSharedVideoAndAudio
                    ? currentVideo.title
                    : currentAudio.title
                }
              />
            ) : (
              <div className="aspect-video bg-white/50 flex items-center justify-center">
                <PictureSVG pathClass="stroke-neutral-500" width={60} />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center max-w-sm">
          <div>Show quotes</div>
          <Switch checked={isQuoteActive} onCheckedChange={setIsQuoteActive} />
        </div>
      </div>
    </>
  );
};

export default MainSettings;
