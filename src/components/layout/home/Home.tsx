import { useCallback, useEffect, useRef, useState } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import Panel from "@/components/modules/Player/Panel";
import Playlist from "@/components/modules/Playlist/Playlist";
import usePlayerStore from "@/stores/zustand/usePlayerStore";
import usePlaylistQuery from "@/stores/queries/usePlaylistQuery";
import SoundFX from "@/components/modules/SoundFX/SoundFX";
import Clock from "@/components/modules/Clock/Clock";
import Pomodoro from "@/components/modules/Pomodoro/Pomodoro";
import usePomodoroStore from "@/stores/zustand/usePomodoroStore";
import { cn } from "@/lib/utils";
import NowPlaying from "@/components/ui/NowPlaying";

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

const Home = () => {
  const playerRef = useRef<TPlayer>(null);
  const [isLoading, setIsLoading] = useState(true); // Add state for loading
  const {
    setCurrentTime,
    setDuration,
    setIsPlaying,
    setVolume,
    volume,
    currentVideo,
    setCurrentVideo,
  } = usePlayerStore();
  const playlistQuery = usePlaylistQuery();

  const { isPomodoroOpen } = usePomodoroStore();

  useEffect(() => {
    console.log(currentVideo);
  }, [currentVideo]);

  useEffect(() => {
    if (
      !playlistQuery.isLoading &&
      playlistQuery.data &&
      currentVideo?.videoId === null
    ) {
      // setVideoId(playlistQuery.data.items[0].snippet.resourceId.videoId);
      setCurrentVideo({
        title: playlistQuery.data.items[0].snippet.title,
        videoId: playlistQuery.data.items[0].snippet.resourceId.videoId,
        imgHi: playlistQuery.data.items[0].snippet.thumbnails.high,
        imgHd: playlistQuery.data.items[0].snippet.thumbnails.maxres,
        videoOwnerChannelTitle:
          playlistQuery.data.items[0].snippet.videoOwnerChannelTitle,
        videoOwnerChannelId:
          playlistQuery.data.items[0].snippet.videoOwnerChannelId,
      });
    }
  }, [playlistQuery.isLoading, playlistQuery.data, setCurrentVideo]);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.setVolume(volume);
    }
  }, [volume]);

  const onReady: YouTubeProps["onReady"] = (event) => {
    playerRef.current = event.target;
    event.target.setVolume(volume);
    setDuration(event.target.getDuration());

    const checkAndPlay = () => {
      const state = event.target.getPlayerState();

      if (state === YT.PlayerState.PLAYING) {
        setIsPlaying(true);
        return;
      }

      if (state === YT.PlayerState.CUED || state === YT.PlayerState.UNSTARTED) {
        event.target.playVideo();
      }

      setTimeout(checkAndPlay, 500);
    };

    checkAndPlay();

    setInterval(() => {
      if (playerRef.current) {
        setCurrentTime(playerRef.current.getCurrentTime());
      }
    }, 1000);
  };

  const handlePlayPause = useCallback(() => {
    const player = playerRef.current;

    if (player) {
      const state = player.getPlayerState();
      console.log("Player state:", state);
      if (
        state !== YT.PlayerState.UNSTARTED &&
        state !== YT.PlayerState.BUFFERING
      ) {
        if (state === YT.PlayerState.PLAYING) {
          player.pauseVideo();
          setIsPlaying(false);
        } else {
          player.playVideo();
          setIsPlaying(true);
        }
      }
    }
  }, [setIsPlaying]);

  const handleRewind = useCallback(() => {
    const player = playerRef.current;
    if (player) {
      const currentTime = player.getCurrentTime();
      player.seekTo(currentTime - 10, true);
    }
  }, []);

  const handleForward = useCallback(() => {
    const player = playerRef.current;
    if (player) {
      const currentTime = player.getCurrentTime();
      player.seekTo(currentTime + 10, true);
    }
  }, []);

  const handleSliderChange = useCallback(
    (newValue: number[]) => {
      const player = playerRef.current;
      if (player && newValue.length > 0) {
        player.seekTo(newValue[0], true);
        setCurrentTime(newValue[0]);
      }
    },
    [setCurrentTime]
  );

  const handleVolumeChange = useCallback(
    (newValue: number[]) => {
      if (newValue.length > 0) {
        setVolume(newValue[0]);
      }
    },
    [setVolume]
  );

  return (
    <div className="App" unselectable="on">
      <Clock />
      {isPomodoroOpen && <Pomodoro />}
      <div
        className={cn(isPomodoroOpen && "bg-overlay-focus")}
        unselectable="on"
      >
        {isLoading && (
          <div className="absolute top-1/2 right-0 w-full flex items-center justify-center">
            <div className="buffer">Buffering...</div>
          </div>
        )}
        {currentVideo?.videoId && (
          <YouTube
            videoId={currentVideo.videoId}
            onReady={onReady}
            opts={{
              playerVars: {
                enablejsapi: 1,
                autoplay: 1,
              },
            }}
            className="bg-video bg-overlay relative"
          />
        )}
        <Panel
          handleRewind={handleRewind}
          handlePlayPause={handlePlayPause}
          handleForward={handleForward}
          handleSliderChange={handleSliderChange}
          handleVolumeChange={handleVolumeChange}
        />
        <SoundFX />
        <Playlist />
        <div className="bg-overlay-frame__wrap">
          <div className="bg-overlay-frame">
            {currentVideo?.title && <NowPlaying title={currentVideo?.title} />}
          </div>

          <div className="bg-overlay-frame__blur">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
