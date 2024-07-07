import usePlayerStore from "@/stores/zustand/usePlayerStore";
import usePlaylistStore from "@/stores/zustand/usePlaylistStore";
import useSceneStore from "@/stores/zustand/useSceneStore";
import React, { useEffect, useState } from "react";

const DevLogger = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isSceneOpen } = useSceneStore();
  const { isPlaylistOpen } = usePlaylistStore();
  const { currentVideo, currentAudio } = usePlayerStore();


  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "`") {
        setIsVisible((prevState) => !prevState);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      id="Logger"
      className="absolute w-fit min-w-72 h-lg px-8 py-4 window !top-10 left-1/2 -translate-x-1/2 z-[99999999]"
    >
      <div className="flex flex-col gap-4 justify-between">
        <div className="flex justify-between">
          isPlaylistOpen: <span>{isPlaylistOpen.toString()}</span>
        </div>
        <div className="flex justify-between">
          isSceneOpen: <span>{isSceneOpen.toString()}</span>
        </div>
        <div className="flex justify-between">
          currentVideo: <span>{currentVideo?.videoId}</span>
        </div>
        <div className="flex justify-between">
          currentAudio: <span>{currentAudio?.title}</span>
        </div>
      </div>
    </div>
  );
};

export default DevLogger;
