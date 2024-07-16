import NowPlaying from "@/components/ui/NowPlaying";
import { cn } from "@/lib/utils";
import usePlayerStore from "@/stores/zustand/usePlayerStore";
import useSceneStore from "@/stores/zustand/useSceneStore";
import clsx from "clsx";
import Quote from "../Quote/Quote";
import Clock from "../Clock/Clock";

const Overlay = () => {
  const { currentAudio } = usePlayerStore();
  const { frameType, noiseValue } = useSceneStore();

  return (
    <div className={cn("bg-overlay-frame__wrap")}>
      {noiseValue > 0 && (
        <div className="bg-overlay-noise" style={{ opacity: noiseValue }}></div>
      )}

      <div
        className={clsx(
          frameType == "glass-frame" && "bg-overlay-frame--glass-frame",
          "bg-overlay-frame"
        )}
      >
        <Clock />
        <Quote />
        {currentAudio?.title && <NowPlaying title={currentAudio?.title} />}
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
