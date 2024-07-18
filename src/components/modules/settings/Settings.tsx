import { motion } from "framer-motion";
import CloseIconSVG from "@/components/elements/svg/icons/interface/CloseIconSVG";
import SettingsIconSVG from "@/components/elements/svg/icons/interface/SettingsIconSVG";
import useSceneStore from "@/stores/zustand/useSceneStore";
import { Separator } from "@/components/ui/Separator/Separator";
import GeneralSettings from "./GeneralSettings";
import { useState } from "react";
import TimeSettings from "./TimeSettings";
import SceneSettings from "./SceneSettings";
import clsx from "clsx";
import AudioSettings from "./AudioSettings";

const Settings = () => {
  const { isSceneModalOpen, setIsSceneModalOpen } = useSceneStore();

  const [activeSettings, setActiveSettings] = useState<
    "main" | "scene" | "time" | "audio" | "pomodoro"
  >("main");

  if (!isSceneModalOpen) return null;

  return (
    <div
      id="Settings"
      className={"modal"}
      onClick={() => setIsSceneModalOpen(false)}
    >
      <button className={"modal__close"}>
        <CloseIconSVG />
      </button>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        className={"modal__card modal__card--overflow-visible !max-w-[1000px]"}
      >
        <div className="grid grid-cols-[20%_80%]">
          <div className="p-8 pr-0">
            <h3 className="flex flex-row items-center text-xl gap-3 tracking-wide">
              <SettingsIconSVG /> Settings
            </h3>
            <div className="flex flex-col items-start gap-2 mt-8">
              <button
                onClick={() => setActiveSettings("main")}
                className={clsx(
                  activeSettings === "main" && "button-settings--active",
                  "button-settings "
                )}
              >
                General
              </button>
              <button
                onClick={() => setActiveSettings("scene")}
                className={clsx(
                  activeSettings === "scene" && "button-settings--active",
                  "button-settings "
                )}
              >
                Scene
              </button>
              <button
                onClick={() => setActiveSettings("audio")}
                className={clsx(
                  activeSettings === "audio" && "button-settings--active",
                  "button-settings "
                )}
              >
                Audio
              </button>
              <button
                onClick={() => setActiveSettings("time")}
                className={clsx(
                  activeSettings === "time" && "button-settings--active",
                  "button-settings "
                )}
              >
                Clock / Timer
              </button>
            </div>
          </div>
          <div className={"p-8 gap-6 flex flex-col"}>
            <div className="flex flex-col gap-1">
              <h3 className="flex flex-row items-center text-xl gap-3 tracking-wide">
                {activeSettings === "main" && "General Settings"}
                {activeSettings === "scene" && "Scene Settings"}
                {activeSettings === "time" && "Clock / Timer Settings"}
                {activeSettings === "audio" && "Audio Settings"}
              </h3>
              <Separator className="my-4 bg-white/30" />
            </div>
            {activeSettings === "main" && <GeneralSettings />}
            {activeSettings === "time" && <TimeSettings />}
            {activeSettings === "scene" && <SceneSettings />}
            {activeSettings === "audio" && <AudioSettings />}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;
