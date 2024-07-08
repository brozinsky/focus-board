import { useEffect, useRef, useState } from "react";
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
import useVideoPlayer from "@/hooks/useVideoPlayer";
import useAudioPlayer from "@/hooks/useAudioPlayer";

const Home = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isSceneOpen, isBgBlur, isBgShadow, blurValue, shadowValue } =
    useSceneStore();
  const { isPlaylistOpen } = usePlaylistStore();

  const {
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

  const { onReady: onVideoReady } = useVideoPlayer();

  const { onReady: onAudioReady, handlePlayPause: handleAudioPlayPause } =
    useAudioPlayer();

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
        imgDefault: playlistQuery.data.items[0].snippet.thumbnails.default,
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
        imgDefault: playlistQuery.data.items[0].snippet.thumbnails.default,
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

  return (
    <div className="App" unselectable="on" ref={rootRef}>
      {isPomodoroOpen && <Pomodoro />}
      <div unselectable="on">
        {isLoading && (
          <div className="absolute top-1/2 right-0 w-full flex items-center justify-center">
            <div className="buffer">Buffering...</div>
          </div>
        )}
        {activeScene === "yt" && currentVideo?.videoId && (
          <YTVideo id={currentVideo.videoId} onReady={onVideoReady} />
        )}

        {activeScene === "yt" && isSharedVideoAndAudio
          ? currentVideo?.videoId && (
              <YTAudio id={currentVideo.videoId} onReady={onAudioReady} />
            )
          : currentAudio?.videoId && (
              <YTAudio id={currentAudio.videoId} onReady={onAudioReady} />
            )}

        {activeScene === "bg-video" && currentBgVideoId && (
          <BgVideo id={currentBgVideoId} />
        )}

        {activeScene === "wallpaper" && currentBgVideoId && (
          <BgWallpaper id={currentBgVideoId} />
        )}

        <Panel handlePlayPause={handleAudioPlayPause} />
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
