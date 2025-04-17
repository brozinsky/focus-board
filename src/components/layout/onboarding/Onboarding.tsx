import LogoSVG from "@/components/elements/svg/icons/LogoSVG";
import React, { ReactNode, useEffect, useState } from "react";
import AnimatedWallpapers from "@/components/modules/Scenes/AnimatedWallpapers";
import YoutubeVideos from "@/components/modules/Scenes/YoutubeVideos";
import Wallpapers from "@/components/modules/Scenes/Wallpapers";
import { TActiveScene } from "@/types/query-types";
import OnboardingWelcomeContent from "./OnboardingWelcomeContent";
import OnboardingAudioContent from "./OnboardingAudioContent";
import OnboardingBackgroundContent from "./OnboardingBackgroundContent";
import PlaylistItems from "@/components/modules/Playlist/PlaylistItems";
import ButtonTab from "@/components/ui/buttons/ButtonTab";
import { SFX_AUDIO } from "@/lib/constants/sfx.constants";
import FxItem from "@/components/modules/FxItem/FxItem";
import SceneSettings from "@/components/modules/settings/SceneSettings";
import usePlayerStore from "@/stores/zustand/usePlayerStore";
import BgVideo from "@/components/modules/Player/BgVideo";
import Overlay from "@/components/modules/Overlay/Overlay";
import BgWallpaper from "@/components/modules/Player/BgWallpaper";
import YTVideo from "@/components/modules/Player/YTVideo";
import useVideoPlayer from "@/hooks/useVideoPlayer";

type TTab = {
  id: string;
  content: string;
  component: ReactNode;
};

const sceneTabs: TTab[] = [
  {
    id: "bg-video",
    content: "Animated wallpapers",
    component: <AnimatedWallpapers grid="sm" />,
  },
  {
    id: "wallpaper",
    content: "Static wallpapers",
    component: <Wallpapers grid="sm" />,
  },
  {
    id: "yt",
    content: "Youtube videos",
    component: <YoutubeVideos grid="sm" noInfo />,
  },
];

const Onboarding = ({
  setIsOnboarding,
}: {
  setIsOnboarding: (value: boolean) => void;
}) => {
  const { activeScene, currentVideo, currentBgVideoId } = usePlayerStore();

  const { onReady: onVideoReady } = useVideoPlayer();

  const [activeSceneTab, setActiveSceneTab] =
    useState<TActiveScene>("bg-video");

  const [page, setPage] = useState<number>(0);
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    setStep(0);
  }, [page]);

  return (
    <div className="grid grid-cols-3 h-screen max-h-screen">
      <div className="p-10 pt-14 text-foreground flex flex-col justify-between">
        {page === 0 && <OnboardingWelcomeContent />}
        {page === 1 && <OnboardingAudioContent step={step} />}
        {page === 2 && <OnboardingBackgroundContent />}
        <div className="flex justify-between w-full">
          <div>{page + 1} / 3</div>
          <div className="flex gap-8">
            {page !== 0 && (
              <div
                className="cursor-pointer"
                onClick={() => page !== 0 && setPage(page - 1)}
              >
                Prev
              </div>
            )}
            <div
              className="cursor-pointer"
              onClick={() => {
                if (step === 0 && page === 1) {
                  setStep(step + 1);
                } else if (page === 2) {
                  setIsOnboarding(false);
                } else {
                  setPage(page + 1);
                }
              }}
            >
              {step === 0 && page === 1
                ? "Continue"
                : page === 2
                ? "Finish"
                : "Next"}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-onboarding-welcome col-span-2">
        <div className="flex-center h-full max-h-screen px-10 py-10">
          {page === 0 && (
            <div>
              {/* <div className="text-center text-2xl font-medium">Welcome to</div> */}
              <LogoSVG />
            </div>
          )}
          {page === 1 && (
            <>
              {step === 0 && (
                <div className="p-4 bg-background-glass flex flex-col gap-2 rounded-md max-h-full overflow-y-scroll">
                  <PlaylistItems />
                </div>
              )}
              {step === 1 && (
                <div
                  className={
                    "w-full bg-background-glass p-4 rounded-md gap-8 grid xl:grid-cols-5 md:grid-cols-3 lg:grid-cols-4 grid-cols-1"
                  }
                >
                  {SFX_AUDIO.map(({ name, id }) => {
                    return <FxItem key={id} id={id} name={name} variant="lg" />;
                  })}
                </div>
              )}
            </>
          )}

          {page === 2 && (
            <div className="flex flex-col gap-4 h-full w-full">
              <div className="h-full w-full max-h-[50%] flex gap-2 justify-start">
                <div className="aspect-video rounded-xl bg-background-glass flex-center !overflow-clip">
                  {/* <div className="text-lg">No bakground selected</div> */}
                  {activeScene === "bg-video" && currentBgVideoId && (
                    <BgVideo id={currentBgVideoId} />
                  )}
                  {activeScene === "wallpaper" && currentBgVideoId && (
                    <BgWallpaper id={currentBgVideoId} mini />
                  )}
                  {activeScene === "yt" && currentVideo?.videoId && (
                    <div className="w-full h-full max-h-full max-w-full">
                      <YTVideo
                        id={currentVideo.videoId}
                        onReady={onVideoReady}
                      />
                    </div>
                  )}
                  <Overlay display="settings" />
                </div>
                <div className="w-fit rounded-xl bg-background-glass h-full p-4">
                  <SceneSettings />
                </div>
              </div>
              <div
                className={
                  "w-full bg-background-glass p-4 rounded-md gap-8 h-full max-h-[50%] overflow-auto"
                }
              >
                <div className="flex gap-4">
                  {sceneTabs.map(
                    ({ content, id }: { content: string; id: string }) => (
                      <ButtonTab
                        key={id}
                        onClick={() => setActiveSceneTab(id as TActiveScene)}
                        isActive={activeSceneTab === id}
                      >
                        {content}
                      </ButtonTab>
                    )
                  )}
                </div>
                <div className="flex flex-col gap-4 mt-10">
                  {sceneTabs.map(({ id, component }: TTab) => {
                    if (activeSceneTab === id) {
                      return <div key={id}>{component}</div>;
                    }
                  })}
                </div>
              </div>
              {/* <div className="w-full mx-auto rounded-xl bg-background-glass h-full max-h-[20%] p-4">
                <SceneSettings />
              </div> */}
            </div>
          )}
        </div>
      </div>

      {/* {page === 1 && (
        <div className="col-span-2">
          <div className="flex-center h-full">
            <div className="overflow-auto max-h-screen py-20 px-10">
              {playlistItems && <PlaylistItems items={playlistItems} />}
            </div>
          </div>
        </div>
      )} */}

      {/* <div className="flex justify-start p-8">
        <div className="flex flex-col gap-8 w-full">
          {activeScene === "yt" && currentVideo?.videoId && (
            <div
              className={cn(
                "bg-video aspect-video overflow-hidden mx-auto relative max-w-[600px] w-[90%] rounded-xl"
              )}
            >
              <YouTube
                videoId={currentVideo.videoId}
                onReady={onReady}
                onStateChange={handleStateChange}
                className={cn(
                  "bg-video bg-overlay relative opacity-0 transition duration-1000 [&>*]:h-full h-full",
                  playerState === 1 && "opacity-100"
                )}
                opts={opts}
              />
            </div>
          )}
          <div className="grid grid-cols-[200px_200px_200px] gap-2">
            {sceneTabs.map(
              ({ content, id }: { content: string; id: string }) => (
                <ButtonTab
                  key={id}
                  onClick={() => setActiveSceneTab(id as TActiveScene)}
                  isActive={activeSceneTab === id}
                >
                  {content}
                </ButtonTab>
              )
            )}
          </div>
          <div className="flex flex-col gap-4">
            {sceneTabs.map(({ id, component }: TTab) => {
              if (activeSceneTab === id) {
                return <div key={id}>{component}</div>;
              }
            })}{" "}
          </div>
        </div>
      </div> */}
      {/* <div className="bg-gray-800">
        <div className="flex-center h-full">
          <div>
            <div className="text-center text-2xl font-medium">Welcome to</div>
            <LogoSVG />
          </div>
        </div>
      </div> */}
      {/* <div className="p-8 text-foreground">
        <h1 className="text-3xl text-center mb-2 font-normal">
          Let's set you up!
        </h1>
        <p className="text-lg text-center mb-8">
          Let’s get started with customizing your experience!
        </p>
        <div className="space-y-4">
          <OnboardingButton
            onClick={() => setIsOpen("playlist", true)}
            icon={<MusicNoteSVG />}
            title="Audio"
            text="Pick some music or sounds to set the mood."
            variant="audio"
          />
          <OnboardingButton
            onClick={() => setIsOpen("scene", true)}
            icon={<SceneEditSVG />}
            title="Background"
            text="Throw in a cool background video fFor extra style points."
            variant="background"
          />
          <OnboardingButton
            onClick={() => setIsOpen("playlist", true)}
            icon={<MusicNoteSVG />}
            title="Theme"
            text="Select a theme that speaks to you—or create something totally
              unique!"
            variant="theme"
          />
        </div>
      </div> */}
    </div>
  );
};

export default Onboarding;
