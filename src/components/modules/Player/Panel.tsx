import Button from "@/components/ui/buttons/Button";
import usePlayerStore from "@/stores/zustand/usePlayerStore";
import React from "react";
import Volume from "@/components/modules/settings/_partials/Volume";
import Slider from "@/components/ui/inputs/Slider";
import usePlaylistStore from "@/stores/zustand/usePlaylistStore";
import PlayIconSVG from "@/components/elements/svg/icons/media/PlayIconSVG";
import PauseIconSVG from "@/components/elements/svg/icons/media/PauseIconSVG";
import MixerIconSVG from "@/components/elements/svg/icons/interface/MixerIconSVG";
import useWindowsStore from "@/stores/zustand/useWindowsStore";
import MaximizeSVG from "@/components/elements/svg/icons/interface/MaximizeSVG";
import { goFullscreen } from "@/utils/functions/fn-common";

interface IPanelProps {
  handleRewind: () => void;
  handlePlayPause: () => void;
  handleForward: () => void;
  handleSliderChange: (value: number[]) => void;
  handleVolumeChange: (value: number[]) => void;
}

const Panel: React.FC<IPanelProps> = ({
  handleRewind,
  handlePlayPause,
  handleForward,
  handleSliderChange,
  handleVolumeChange,
}) => {
  const { isPlaying, currentTime, duration, volume } = usePlayerStore();
  const { setIsPlaylistOpen } = usePlaylistStore();
  const { setIsSoundFXOpen, isSoundFXOpen } = useWindowsStore();

  return (
    <>
      <div id="Panel" className="panel">
        <Button variant="glass-ghost" onClick={() => setIsPlaylistOpen(true)}>
          Playlist
        </Button>
        <Button
          variant="glass-ghost"
          onClick={() => setIsSoundFXOpen(!isSoundFXOpen)}
        >
          <MixerIconSVG />
        </Button>
        <Button variant="glass" onClick={handleRewind}>
          -10s
        </Button>
        <Button variant="glass" onClick={handlePlayPause}>
          {isPlaying ? <PauseIconSVG /> : <PlayIconSVG />}
        </Button>
        <Button variant="glass" onClick={handleForward}>
          +10s
        </Button>
        <div className="w-[150px]">
          <Volume volume={volume} handleVolumeChange={handleVolumeChange} />
        </div>
        <div className="absolute bottom-[52px] rounded-full overflow-hidden left-0 py-4 w-full flex justify-center z-20">
          <Slider
            value={[currentTime]}
            min={0}
            max={duration}
            step={1}
            onValueChange={handleSliderChange}
          />
        </div>
        <Button variant="glass-ghost" onClick={goFullscreen}>
          <MaximizeSVG />
        </Button>
      </div>
    </>
  );
};

export default Panel;
