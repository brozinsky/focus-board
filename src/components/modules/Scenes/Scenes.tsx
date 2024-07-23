import React, { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import CloseIconSVG from "@/components/elements/svg/icons/interface/CloseIconSVG";
import PlaylistSVG from "@/components/elements/svg/icons/media/PlaylistSVG";
import useSceneStore from "@/stores/zustand/useSceneStore";
import { Separator } from "@/components/ui/Separator/Separator";
import AnimatedWallpapers from "./AnimatedWallpapers";
import Wallpapers from "./Wallpapers";
import YoutubeVideos from "./YoutubeVideos";
import { TActiveScene } from "@/types/query-types";
import usePlayerStore from "@/stores/zustand/usePlayerStore";
import ButtonTab from "@/components/ui/buttons/ButtonTab";
import SceneEditSVG from "@/components/elements/svg/icons/interface/SceneEditSVG";
import { cn } from "@/lib/utils";
import useThemeStore from "@/stores/zustand/useThemeStore";

type TTab = {
  id: string;
  content: string;
  component: ReactNode;
};

const tabs: TTab[] = [
  {
    id: "bg-video",
    content: "Animated wallpapers",
    component: <AnimatedWallpapers />,
  },
  { id: "wallpaper", content: "Static wallpapers", component: <Wallpapers /> },
  { id: "yt", content: "Youtube videos", component: <YoutubeVideos /> },
];

const Scenes = () => {
  const { isSceneOpen, setIsSceneOpen } = useSceneStore();
  const { activeScene } = usePlayerStore();
  const { themeStyle } = useThemeStore();

  const [activeTab, setActiveTab] = useState<TActiveScene>(activeScene);

  if (!isSceneOpen) return;

  return (
    <div id="Scenes" className={"modal"} onClick={() => setIsSceneOpen(false)}>
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
        <div className="grid grid-cols-[20%_80%]">
          <div className="p-8 pr-0">
            <h3 className="flex flex-row items-center text-xl gap-3 tracking-wide">
              <SceneEditSVG /> Scene selection
            </h3>
            <div className="flex flex-col items-start gap-2 mt-8">
              {tabs.map(({ content, id }: { content: string; id: string }) => (
                <ButtonTab
                  key={id}
                  onClick={() => setActiveTab(id as TActiveScene)}
                  isActive={activeTab === id}
                >
                  {content}
                </ButtonTab>
              ))}
            </div>
          </div>
          <div className={"p-8 gap-6 flex flex-col"}>
            <div className="flex flex-col gap-1">
              <h3 className="flex flex-row items-center text-xl gap-3 tracking-wide">
                {activeTab === "bg-video" && "Animated Wallpapers"}
                {activeTab === "wallpaper" && "Static Wallpapers"}
                {activeTab === "yt" && "Youtube videos"}
              </h3>
              <Separator className="my-4 bg-white/30" />
            </div>
            {tabs.map(({ id, component }: TTab) => {
              if (activeTab === id) {
                return <div key={id}>{component}</div>;
              }
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Scenes;
