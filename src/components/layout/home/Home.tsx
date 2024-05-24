import { useEffect, useRef, useState } from "react";
// import { useMediaQuery } from "@mantine/hooks";
// import MobileNotSupported from "../MobileNotSupported";
import Button from "@/components/ui/buttons/Button";
import YouTube, { YouTubeProps } from "react-youtube";
import Slider from "@/components/ui/inputs/Slider";
import Volume from "@/components/modules/settings/_partials/Volume";
// import { TPlayer, YT } from "@/types/yt";
import Panel from "@/components/modules/Player/Panel";
import usePlayerStore from "@/stores/zustand/usePlayerStore";

declare namespace YT {
  enum PlayerState {
    UNSTARTED = -1,
    ENDED = 0,
    PLAYING = 1,
    PAUSED = 2,
    BUFFERING = 3,
    CUED = 5,
  }

  class Player {
    constructor(elementId: string | HTMLElement, options: IPlayerOptions);
    playVideo(): void;
    pauseVideo(): void;
    seekTo(seconds: number, allowSeekAhead: boolean): void;
    getCurrentTime(): number;
    getPlayerState(): PlayerState;
    stopVideo(): void;
    destroy(): void;
    setVolume(volume: number): void;
  }

  interface IPlayerOptions {
    height?: string;
    width?: string;
    videoId?: string;
    events?: {
      onReady?: (event: any) => void;
      onStateChange?: (event: any) => any;
      onError?: (event: any) => void;
      onPlaybackQualityChange?: (event: any) => void;
      onPlaybackRateChange?: (event: any) => void;
    };
  }
}

type TPlayer = YT.Player | null;

const VIDEO_ID = "D9km3yXmR8k";

const Home = () => {
  // const matches = useMediaQuery("(max-width: 768px)");
  const playerRef = useRef<TPlayer>(null);
  // const [currentTime, setCurrentTime] = useState(0);
  // const [duration, setDuration] = useState(0);
  // const [isPlaying, setIsPlaying] = useState(false);
  // const [volume, setVolume] = useState(50);

  const { setCurrentTime, setDuration, setIsPlaying, setVolume, volume } = usePlayerStore();

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.setVolume(volume);
    }
  }, [volume]);

  const onReady: YouTubeProps["onReady"] = (event) => {
    playerRef.current = event.target;
    setDuration(event.target.getDuration());
    setInterval(() => {
      if (playerRef.current) {
        setCurrentTime(playerRef.current.getCurrentTime());
      }
    }, 1000);
  };

  const handlePlayPause = () => {
    const player = playerRef.current;
    if (player) {
      const state = player.getPlayerState();
      if (state === YT.PlayerState.PLAYING) {
        player.pauseVideo();
        setIsPlaying(false);
      } else {
        player.playVideo();
        setIsPlaying(true);
      }
    }
  };

  const handleRewind = () => {
    const player = playerRef.current;
    if (player) {
      const currentTime = player.getCurrentTime();
      player.seekTo(currentTime - 10, true);
    }
  };

  const handleForward = () => {
    const player = playerRef.current;
    if (player) {
      const currentTime = player.getCurrentTime();
      player.seekTo(currentTime + 10, true);
    }
  };

  const handleSliderChange = (newValue: number[]) => {
    const player = playerRef.current;
    if (player && newValue.length > 0) {
      player.seekTo(newValue[0], true);
      setCurrentTime(newValue[0]);
    }
  };

  const handleVolumeChange = (newValue: number[]) => {
    if (newValue.length > 0) {
      setVolume(newValue[0]);
    }
  };

  // if (matches) {
  //   return <MobileNotSupported />;
  // }

  return (
    <div className="App" unselectable="on">
      <div unselectable="on">
        <YouTube
          videoId={VIDEO_ID}
          onReady={onReady}
          opts={{
            playerVars: {
              enablejsapi: 1,
            },
          }}
          className="bg-video relative"
        />
        {/* <Player /> */}
        <Panel
          handleRewind={handleRewind}
          handlePlayPause={handlePlayPause}
          handleForward={handleForward}
          handleSliderChange={handleSliderChange}
          handleVolumeChange={handleVolumeChange}
        />
        {/* <div className="gap-4 absolute bottom-10 left-0 py-4 flex items-center justify-center z-20 bg-white/50 w-full">
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
        </div> */}
      </div>
    </div>
  );
};

export default Home;
