import NowPlaying from "@/components/ui/NowPlaying";
import { cn } from "@/lib/utils";
import usePlayerStore from "@/stores/zustand/usePlayerStore";
import useSceneStore from "@/stores/zustand/useSceneStore";
import clsx from "clsx";
import React from "react";
import Quote from "../Quote/Quote";
import Clock from "../Clock/Clock";

const Overlay = () => {
  const { currentVideo } = usePlayerStore();
  const { frameType } = useSceneStore();

  return (
    <div className={cn("bg-overlay-frame__wrap")}>
      <div
        className={clsx(
          frameType == "glass-frame" && "bg-overlay-frame--glass-frame",
          "bg-overlay-frame"
        )}
      >
        <Clock />
        <Quote />
        {currentVideo?.title && <NowPlaying title={currentVideo?.title} />}
      </div>

      {frameType == "glass-frame" && (
        <div className="bg-overlay-frame__blur">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
    </div>
  );
};

export default Overlay;
