import { useEffect, useLayoutEffect, useRef, useState } from "react";
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
import useWindowsStore from "@/stores/zustand/useWindowsStore";
import useFxStore from "@/stores/zustand/useFxStore";
import { fontFamilyExt } from "@/lib/constants/const-theme";
import useThemeStore from "@/stores/zustand/useThemeStore";
import StickyNotes from "@/components/modules/StickyNotes/StickyNotes";

const Home = () => {
  const { fontFamily } = useSceneStore();
  const rootRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isSceneOpen, isBgBlur, isBgShadow, blurValue, shadowValue } =
    useSceneStore();
  const { isPlaylistOpen } = usePlaylistStore();
  const { isSoundFXOpen } = useWindowsStore();

  const { initializeAudio } = useFxStore();

  useEffect(() => {
    initializeAudio();
  }, []);

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

  const { colorTheme, setColorTheme, updateCSSVariables } = useThemeStore();

  useLayoutEffect(() => {
    updateCSSVariables();
  }, [updateCSSVariables]);

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

  const combinedFontFamily = [fontFamily, ...fontFamilyExt].join(", ");

  return (
    <div
      style={{ fontFamily: combinedFontFamily }}
      className="App"
      unselectable="on"
      ref={rootRef}
    >
      {isPomodoroOpen && <Pomodoro />}
      <StickyNotes />
      <div unselectable="on">
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
        {isPlaylistOpen && <Playlist />}
        {isSceneOpen && <Scenes />}
        {isSoundFXOpen && <SoundFX />}
        <Overlay />
        <DevLogger />
      </div>
    </div>
  );
};

export default Home;
