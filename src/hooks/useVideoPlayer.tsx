import { useEffect, useRef, useCallback } from "react";
import { YouTubeProps } from "react-youtube";
import usePlayerStore from "@/stores/zustand/usePlayerStore";
import { Player, PlayerState } from "@/types/model-types";

const useVideoPlayer = () => {
  const playerRef = useRef<Player | null>(null);
  const {
    setCurrentTimeVideo,
    setDurationVideo,
    setIsVideoPlaying,
    volumeVideo,
  } = usePlayerStore();

  const onReady: YouTubeProps["onReady"] = (event) => {
    playerRef.current = event.target;
    event.target.setVolume(volumeVideo);
    event.target.setPlaybackQuality("small");
    setDurationVideo(event.target.getDuration());

    const checkAndPlay = () => {
      const state = event.target.getPlayerState();

      if (state === PlayerState.PLAYING) {
        setIsVideoPlaying(true);
        return;
      }

      if (state === PlayerState.CUED || state === PlayerState.UNSTARTED) {
        event.target.playVideo();
      }

      setTimeout(checkAndPlay, 500);
    };

    checkAndPlay();

    setInterval(() => {
      if (playerRef.current) {
        setCurrentTimeVideo(playerRef.current.getCurrentTime());
      }
    }, 1000);
  };

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.setVolume(volumeVideo);
    }
  }, [volumeVideo]);

  const handlePlayPause = useCallback(() => {
    const player = playerRef.current;

    if (player) {
      const state = player.getPlayerState();
      if (state !== PlayerState.UNSTARTED && state !== PlayerState.BUFFERING) {
        if (state === PlayerState.PLAYING) {
          player.pauseVideo();
          setIsVideoPlaying(false);
        } else {
          player.playVideo();
          setIsVideoPlaying(true);
        }
      }
    }
  }, [setIsVideoPlaying]);

  return {
    playerRef,
    onReady,
    handlePlayPause,
  };
};

export default useVideoPlayer;
