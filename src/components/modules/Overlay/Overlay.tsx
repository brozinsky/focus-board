import { cn } from "@/lib/utils";
import useSceneStore from "@/stores/zustand/useSceneStore";
import clsx from "clsx";
import Quote from "../Quote/Quote";
import Clock from "../Clock/Clock";

const Overlay = ({
  display = "default",
}: {
  display?: "settings" | "default";
}) => {
  // const { currentAudio } = usePlayerStore();
  const { frameType, noiseValue, isBgNoise } = useSceneStore();

  return (
    <div className={cn("bg-overlay-frame__wrap")}>
      {isBgNoise && noiseValue > 0 && (
        <div className="bg-overlay-noise" style={{ opacity: noiseValue }}></div>
      )}

      <div
        className={clsx(
          frameType == "glass-frame" && "bg-overlay-frame--glass-frame",
          frameType == "glass-frame" &&
            display === "settings" &&
            "bg-overlay-frame--glass-frame-mini",
          "bg-overlay-frame"
        )}
      >
        <Clock display={display} />
        <Quote />
        {/* {currentAudio?.title && <NowPlaying title={currentAudio?.title} />} */}
      </div>

      {frameType == "glass-frame" && (
        <div
          className={clsx(
            display === "settings" && "bg-overlay-frame__blur--mini",
            "bg-overlay-frame__blur"
          )}
        >
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
