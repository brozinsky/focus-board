import Button from "@/components/ui/buttons/Button";
import usePlayerStore from "@/stores/zustand/usePlayerStore";
import React from "react";
import Volume from "@/components/modules/settings/_partials/Volume";
import Slider from "@/components/ui/inputs/Slider";
import usePlaylistStore from "@/stores/zustand/usePlaylistStore";

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

  return (
    <>
      <div id="Panel" className="panel">
        <Button variant="glass" onClick={() => setIsPlaylistOpen(true)}>
          Playlist
        </Button>
        <Button variant="glass" onClick={handleRewind}>
          -10s
        </Button>
        <Button variant="glass" onClick={handlePlayPause}>
          {isPlaying ? "Pause" : "Play"}
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
      </div>
    </>
  );
};

export default Panel;
