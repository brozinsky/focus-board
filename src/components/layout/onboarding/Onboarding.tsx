import LogoSVG from "@/components/elements/svg/icons/LogoSVG";
import React, { ReactNode, useState } from "react";
import OnboardingButton from "./OnboardingButton";
import MusicNoteSVG from "@/components/elements/svg/icons/media/MusicNoteSVG";
import useWindowsStore from "@/stores/zustand/useWindowsStore";
import SceneEditSVG from "@/components/elements/svg/icons/interface/SceneEditSVG";
import YTVideo from "@/components/modules/Player/YTVideo";
import usePlayerStore from "@/stores/zustand/usePlayerStore";
import useVideoPlayer from "@/hooks/useVideoPlayer";
import YouTube from "react-youtube";
import { cn } from "@/lib/utils";
import AnimatedWallpapers from "@/components/modules/Scenes/AnimatedWallpapers";
import YoutubeVideos from "@/components/modules/Scenes/YoutubeVideos";
import Wallpapers from "@/components/modules/Scenes/Wallpapers";
import ButtonTab from "@/components/ui/buttons/ButtonTab";
import { TActiveScene } from "@/types/query-types";
import OnboardingWelcomeContent from "./OnboardingWelcomeContent";
import OnboardingAudioContent from "./OnboardingAudioContent";
import OnboardingBackgroundContent from "./OnboardingBackgroundContent";

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

const Onboarding = () => {
  const { setIsOpen } = useWindowsStore();
  const { activeScene, currentVideo } = usePlayerStore();
  const { onReady } = useVideoPlayer();
  const [playerState, setPlayerState] = useState(null);

  const opts = {
    width: "100%",
    borderRadius: "2rem",
    playerVars: {
      enablejsapi: 1,
      autoplay: 1,
      loop: 1,
      mute: 1,
      controls: 0,
      modestbranding: 1,
    },
  };

  const handleStateChange = (event: any) => {
    setPlayerState(event.data);
  };

  const [activeSceneTab, setActiveSceneTab] =
    useState<TActiveScene>("bg-video");

  return (
    <div className="grid grid-cols-3 h-screen">
      <div className="p-10 text-foreground flex flex-col justify-between">
        {/* <OnboardingWelcomeContent /> */}
        <OnboardingAudioContent />
        {/* <OnboardingBackgroundContent /> */}
        <div className="flex justify-between w-full">
          <div>1 / 3</div>
          <div>Next</div>
        </div>
      </div>
      <div className="flex justify-start p-8">
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
        {/* <YoutubeVideos /> */}
      </div>
      {/* <div className="bg-gray-800">
        <div className="flex-center h-full">
          <div>
            <div className="text-center text-2xl font-medium">Welcome to</div>
            <LogoSVG />
          </div>
        </div>
      </div> */}
      <div className="p-8 text-foreground">
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
      </div>
    </div>
  );
};

export default Onboarding;
