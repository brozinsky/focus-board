import { useEffect, useLayoutEffect, useRef, useState } from "react";
import usePlayerStore from "@/stores/zustand/usePlayerStore";
import usePlaylistQuery from "@/stores/queries/usePlaylistQuery";
import Overlay from "@/components/modules/Overlay/Overlay";
import YTAudio from "@/components/modules/Player/YTAudio";
import YTVideo from "@/components/modules/Player/YTVideo";
import BgVideo from "@/components/modules/Player/BgVideo";
import BgWallpaper from "@/components/modules/Player/BgWallpaper";
import useVideoPlayer from "@/hooks/useVideoPlayer";
import useAudioPlayer from "@/hooks/useAudioPlayer";
import useFxStore from "@/stores/zustand/useFxStore";
import useThemeStore from "@/stores/zustand/useThemeStore";
import OverlayWelcome from "@/components/modules/Overlay/OverlayWelcome";
import useFXInitialization from "@/hooks/useFXInitialization";
import useRootRef from "@/hooks/useRootRef";
import Onboarding from "../onboarding/Onboarding";
import useAppStore from "@/stores/zustand/useAppStore";
import Main from "../main/Main";
import useAppLoading from "@/hooks/app/useAppLoading";

const Home = () => {
  const { rootRef, rootFontFamily } = useRootRef();
  const { initializeAudio } = useFxStore();
  useFXInitialization(initializeAudio);
  const { isOnboarding, setIsOnboarding } = useAppStore();
  const { updateCSSVariables } = useThemeStore();

  const {
    audioSource,
    activeScene,
    currentVideo,
    currentAudio,
    currentBgVideoId,
    setCurrentVideo,
    setCurrentAudio,
    isSharedVideoAndAudio,
  } = usePlayerStore();
  const playlistQuery = usePlaylistQuery();

  const { onReady: onVideoReady } = useVideoPlayer();

  const {
    onReady: onAudioReady,
    handlePlayPause: handleAudioPlayPause,
  } = useAudioPlayer();

  const {isAppLoading} = useAppLoading()


  useLayoutEffect(() => {
    updateCSSVariables();
  }, [updateCSSVariables]);

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
    <div
      style={{ fontFamily: rootFontFamily }}
      className="App"
      unselectable="on"
      ref={rootRef}
    >
      {!isOnboarding && <Main />}
      {isOnboarding && <Onboarding setIsOnboarding={setIsOnboarding} />}

      <div unselectable="on">
        {!isOnboarding && activeScene === "yt" && currentVideo?.videoId && (
          <YTVideo id={currentVideo.videoId} onReady={onVideoReady} />
        )}

        {activeScene === "yt" && isSharedVideoAndAudio
          ? currentVideo?.videoId && (
              <YTAudio id={currentVideo.videoId} onReady={onAudioReady} />
            )
          : audioSource === "youtube" &&
            currentAudio?.videoId && (
              <YTAudio id={currentAudio.videoId} onReady={onAudioReady} />
            )}

        {!isOnboarding && activeScene === "bg-video" && currentBgVideoId && (
          <BgVideo id={currentBgVideoId} />
        )}

        {!isOnboarding && activeScene === "wallpaper" && currentBgVideoId && (
          <BgWallpaper id={currentBgVideoId} />
        )}

        {!isOnboarding && (
          <>
            <OverlayWelcome isLoading={isAppLoading} />
            <Overlay />
          </>
        )}
        {/* <DevLogger /> */}
      </div>
    </div>
  );
};

export default Home;
