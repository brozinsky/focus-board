import Button from "@/components/ui/buttons/Button";
import usePlayerStore from "@/stores/zustand/usePlayerStore";
import React from "react";
import Volume from "@/components/modules/settings/_partials/Volume";
import Slider from "@/components/ui/inputs/Slider";

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

  return (
    <>
      <div className="gap-4 absolute bottom-10 left-0 py-4 flex items-center justify-center z-20 bg-white/50 w-full">
        <Button onClick={handleRewind}>-10s</Button>
        <Button onClick={handlePlayPause}>
          {isPlaying ? "Pause" : "Play"}
        </Button>
        <Button onClick={handleForward}>+10s</Button>
        <div className="w-[150px]">
          <Volume volume={volume} handleVolumeChange={handleVolumeChange} />
        </div>
      </div>
      <div className="absolute bottom-24 left-0 py-4 w-full flex justify-center z-20">
        <Slider
          value={[currentTime]}
          min={0}
          max={duration}
          step={1}
          onValueChange={handleSliderChange}
        />
      </div>
    </>
  );
};

export default Panel;
