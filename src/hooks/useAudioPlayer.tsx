import { useEffect, useRef, useCallback } from "react";
import { YouTubeProps } from "react-youtube";
import usePlayerStore from "@/stores/zustand/usePlayerStore";
import { Player, PlayerState } from "@/types/model-types";

const useAudioPlayer = () => {
  const playerRef = useRef<Player | null>(null);
  const {
    setCurrentTimeAudio,
    setDurationAudio,
    setIsAudioPlaying,
    volumeAudio,
  } = usePlayerStore();

  const onReady: YouTubeProps["onReady"] = (event) => {
    playerRef.current = event.target;
    event.target.setVolume(volumeAudio);
    event.target.setPlaybackQuality("small");
    setDurationAudio(event.target.getDuration());

    const checkAndPlay = () => {
      const state = event.target.getPlayerState();

      if (state === PlayerState.PLAYING) {
        setIsAudioPlaying(true);
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
        setCurrentTimeAudio(playerRef.current.getCurrentTime());
      }
    }, 1000);
  };

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.setVolume(volumeAudio);
    }
  }, [volumeAudio]);

  const handlePlayPause = useCallback(() => {
    const player = playerRef.current;

    if (player) {
      const state = player.getPlayerState();
      if (state !== PlayerState.UNSTARTED && state !== PlayerState.BUFFERING) {
        if (state === PlayerState.PLAYING) {
          player.pauseVideo();
          setIsAudioPlaying(false);
        } else {
          player.playVideo();
          setIsAudioPlaying(true);
        }
      }
    }
  }, [setIsAudioPlaying]);

  return {
    playerRef,
    onReady,
    handlePlayPause,
  };
};

export default useAudioPlayer;
