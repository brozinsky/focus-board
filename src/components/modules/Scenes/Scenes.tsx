import React, { ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";
import CloseIconSVG from "@/components/elements/svg/icons/interface/CloseIconSVG";
import { Separator } from "@/components/ui/Separator/Separator";
import AnimatedWallpapers from "./AnimatedWallpapers";
import Wallpapers from "./Wallpapers";
import YoutubeVideos from "./YoutubeVideos";
import { TActiveYtScene } from "@/types/query-types";
import usePlayerStore from "@/stores/zustand/usePlayerStore";
import ButtonTab from "@/components/ui/buttons/ButtonTab";
import SceneEditSVG from "@/components/elements/svg/icons/interface/SceneEditSVG";
import { cn } from "@/lib/utils";
import useThemeStore from "@/stores/zustand/useThemeStore";
import useWindowsStore from "@/stores/zustand/useWindowsStore";
import DrawerBgSettings from "@/components/ui/drawer/DrawerBgSettings";
import { Music, Cpu, Footprints, Joystick, Film, Leaf } from "lucide-react";
import SceneButton from "./SceneButton";

type TTabs = "bg-video" | "wallpaper" | "yt";

type TTab = {
  id: TTabs;
  content: string;
  component: ReactNode;
  visibility?: "hidden" | "visible";
};

const sceneButtons = [
  { id: "yt-lofi", name: "Lofi", icon: <Music /> },
  {
    id: "yt-city-walk",
    name: "City walk",
    icon: <Footprints />,
  },
  {
    id: "yt-nature",
    name: "Nature",
    icon: <Leaf />,
  },
  {
    id: "yt-retro",
    name: "Retro",
    icon: <Joystick />,
  },
  {
    id: "yt-movies-games",
    name: "Movies / games",
    icon: <Film />,
    isPremium: true,
  },
  {
    id: "yt-scifi",
    name: "Sci-fi",
    icon: <Cpu />,
  },
];

const tabs: TTab[] = [
  {
    id: "bg-video",
    content: "Animated wallpapers",
    component: <AnimatedWallpapers />,
  },
  {
    id: "wallpaper",
    content: "Static wallpapers",
    component: <Wallpapers />,
  },
  {
    id: "yt",
    content: "YouTube backgrounds",
    component: null,
  },
];

const Scenes = () => {
  const { isOpen, setIsOpen } = useWindowsStore();
  const { activeScene, activeYtScene } = usePlayerStore();
  const { themeStyle } = useThemeStore();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useState<TTabs>(
    activeScene === "yt" ? "yt" : activeScene
  );

  const [activeYtTab, setActiveYtTab] = useState<TActiveYtScene>(activeYtScene);

  if (!isOpen.scene) return;

  return (
    <div
      id="Scenes"
      className={cn(
        "modal opacity-100 visible transition",
        isDrawerOpen && "opacity-0 invisible"
      )}
      onClick={() => setIsOpen("scene", false)}
    >
      <button className={"modal__close"}>
        <CloseIconSVG />
      </button>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "modal__card modal__card--min-h",
          themeStyle == "glass" && "modal__card--glass"
        )}
      >
        <div className="flex flex-col md:grid md:grid-cols-[20%_80%]">
          <div className="p-8 md:pr-0">
            <h3 className="flex flex-row items-center text-xl gap-3 tracking-wide">
              <SceneEditSVG /> Scene selection
            </h3>
            <div className="flex flex-col items-start gap-2 mt-8">
              {tabs.map(({ content, id }) => (
                <ButtonTab
                  key={id}
                  onClick={() => setActiveTab(id)}
                  isActive={activeTab === id}
                >
                  {content}
                </ButtonTab>
              ))}
            </div>
          </div>

          <div className={"p-8 gap-6 flex flex-col"}>
            <div className="flex flex-col gap-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <h3 className="flex flex-row items-center text-xl gap-3 tracking-wide">
                  {activeTab === "bg-video" && "Animated Wallpapers"}
                  {activeTab === "wallpaper" && "Static Wallpapers"}
                  {activeTab === "yt" && "Youtube videos"}
                </h3>
                <div className="w-fit">
                  <DrawerBgSettings
                    isDrawerOpen={isDrawerOpen}
                    setIsDrawerOpen={setIsDrawerOpen}
                  />
                </div>
              </div>
              <Separator className="my-4 bg-white/30" />
            </div>

            {activeTab === "yt" && <div className="mx-auto flex gap-8 items-center flex-wrap content-center justify-center">
              {sceneButtons.map(({ id, name, icon, isPremium }) => {
                const ytScene = id.replace("yt-", "") as TActiveYtScene;

                return (
                  <SceneButton
                    key={id}
                    size="lg"
                    name={name}
                    icon={React.cloneElement(icon, {
                      size: 50,
                      strokeWidth: 1.2,
                    })}
                    isPremium={isPremium}
                    onClick={() => {
                      setActiveTab("yt");
                      setActiveYtTab(ytScene);
                    }}
                    isActive={activeYtTab === ytScene}
                  />
                );
              })}
            </div>}

            {activeTab === "yt" ? (
              <YoutubeVideos category={activeYtTab} />
            ) : (
              tabs.map(({ id, component }) => {
                if (activeTab === id) return <div key={id}>{component}</div>;
              })
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};


export default Scenes;
