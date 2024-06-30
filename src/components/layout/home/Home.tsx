import { useCallback, useEffect, useRef, useState } from "react";
import { YouTubeProps } from "react-youtube";
import Panel from "@/components/modules/Player/Panel";
import Playlist from "@/components/modules/Playlist/Playlist";
import usePlayerStore from "@/stores/zustand/usePlayerStore";
import usePlaylistQuery from "@/stores/queries/usePlaylistQuery";
import SoundFX from "@/components/modules/SoundFX/SoundFX";
import Pomodoro from "@/components/modules/Pomodoro/Pomodoro";
import usePomodoroStore from "@/stores/zustand/usePomodoroStore";
import Overlay from "@/components/modules/Overlay/Overlay";
import useSceneStore from "@/stores/zustand/useSceneStore";
import YTAudio from "@/components/modules/Player/YTAudio";
import YTVideo from "@/components/modules/Player/YTVideo";
import Scenes from "@/components/modules/Scenes/Scenes";
import BgVideo from "@/components/modules/Player/BgVideo";
import BgWallpaper from "@/components/modules/Player/BgWallpaper";
import usePlaylistStore from "@/stores/zustand/usePlaylistStore";
import DevLogger from "@/components/modules/Utility/Logger";

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
  const rootRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isSceneOpen, isBgBlur, isBgShadow, blurValue, shadowValue } = useSceneStore();
  const { isPlaylistOpen } = usePlaylistStore();

  const {
    setCurrentTime,
    setDuration,
    setIsPlaying,
    setVolume,
    volume,
    activeScene,
    currentVideo,
    currentAudio,
    currentBgVideoId,
    setCurrentVideo,
    setCurrentAudio,
    isSharedVideoAndAudio,
  } = usePlayerStore();
  const playlistQuery = usePlaylistQuery();

  const { isPomodoroOpen } = usePomodoroStore();

  useEffect(() => {
    if (rootRef.current) {
      rootRef.current.style.setProperty("--bg-overlay-blur", `${blurValue}px`);
      rootRef.current.style.setProperty(
        "--bg-overlay-shadow-amount",
        `${shadowValue}`
      );
    }
  }, [blurValue, shadowValue, isBgBlur, isBgShadow]);

  useEffect(() => {
    if (
      !playlistQuery.isLoading &&
      playlistQuery.data &&
      currentVideo?.videoId === null
    ) {
      setCurrentAudio({
        title: playlistQuery.data.items[0].snippet.title,
        videoId: playlistQuery.data.items[0].snippet.resourceId.videoId,
        imgHi: playlistQuery.data.items[0].snippet.thumbnails.high,
        imgHd: playlistQuery.data.items[0].snippet.thumbnails.maxres,
        videoOwnerChannelTitle:
          playlistQuery.data.items[0].snippet.videoOwnerChannelTitle,
        videoOwnerChannelId:
          playlistQuery.data.items[0].snippet.videoOwnerChannelId,
      });
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
  }, [
    playlistQuery.isLoading,
    playlistQuery.data,
    setCurrentVideo,
    setCurrentAudio,
  ]);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.setVolume(volume);
    }
  }, [volume]);

  const onReady: YouTubeProps["onReady"] = (event) => {
    playerRef.current = event.target;
    event.target.setVolume(volume);
    event.target.setPlaybackQuality("small");
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
    <div className="App" unselectable="on" ref={rootRef}>
      {isPomodoroOpen && <Pomodoro />}
      <div
        // className={cn(isPomodoroOpen && "bg-overlay-focus")}
        unselectable="on"
      >
        {isLoading && (
          <div className="absolute top-1/2 right-0 w-full flex items-center justify-center">
            <div className="buffer">Buffering...</div>
          </div>
        )}
        {activeScene === "yt" && currentVideo?.videoId && (
          <YTVideo id={currentVideo.videoId} onReady={onReady} />
        )}
        {activeScene === "yt" && isSharedVideoAndAudio
          ? currentVideo?.videoId && (
              <YTAudio id={currentVideo.videoId} onReady={onReady} />
            )
          : currentAudio?.videoId && (
              <YTAudio id={currentAudio.videoId} onReady={onReady} />
            )}

        {activeScene === "bg-video" && currentBgVideoId && (
          <BgVideo id={currentBgVideoId} />
        )}

        {activeScene === "wallpaper" && currentBgVideoId && (
          <BgWallpaper id={currentBgVideoId} />
        )}

        <Panel
          handleRewind={handleRewind}
          handlePlayPause={handlePlayPause}
          handleForward={handleForward}
          handleSliderChange={handleSliderChange}
          handleVolumeChange={handleVolumeChange}
        />
        <SoundFX />
        {isPlaylistOpen && <Playlist />}
        {isSceneOpen && <Scenes />}
        <Overlay />
        <DevLogger />
      </div>
    </div>
  );
};

export default Home;
