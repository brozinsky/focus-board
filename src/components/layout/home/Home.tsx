import React, { useCallback, useEffect, useRef, useState } from "react";
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
  const {
    setCurrentTime,
    setDuration,
    setIsPlaying,
    setVolume,
    volume,
    videoId,
    setVideoId,
  } = usePlayerStore();
  const playlistQuery = usePlaylistQuery();

  const { isPomodoroOpen } = usePomodoroStore();

  useEffect(() => {
    if (!playlistQuery.isLoading && playlistQuery.data && videoId === null) {
      setVideoId(playlistQuery.data.items[0].snippet.resourceId.videoId);
    }
  }, [playlistQuery.isLoading, playlistQuery.data, setVideoId]);

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

  const handlePlayPause = useCallback(() => {
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
        {videoId && (
          <YouTube
            videoId={videoId}
            onReady={onReady}
            opts={{
              playerVars: {
                enablejsapi: 1,
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
      </div>
    </div>
  );
};

export default Home;
