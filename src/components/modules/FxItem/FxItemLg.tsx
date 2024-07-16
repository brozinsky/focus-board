import React, { ReactNode, useEffect, useState } from "react";
import Slider from "@/components/ui/inputs/Slider";
import { cn } from "@/lib/utils";
import ButtonFXLg from "@/components/ui/buttons/ButtonFXLg";
import useFxStore from "@/stores/zustand/useFxStore";
import RainSVG from "@/components/elements/svg/icons/fx/RainSVG";
import ForestSVG from "@/components/elements/svg/icons/fx/ForestSVG";
import WavesSVG from "@/components/elements/svg/icons/fx/WavesSVG";
import WindSVG from "@/components/elements/svg/icons/fx/WindSVG";
import MoonSVG from "@/components/elements/svg/icons/fx/MoonSVG";
import CpuSVG from "@/components/elements/svg/icons/fx/CpuSVG";
import StormSVG from "@/components/elements/svg/icons/fx/StormSVG";
import CoffeeSVG from "@/components/elements/svg/icons/fx/CoffeeSVG";
import FireSVG from "@/components/elements/svg/icons/fx/FireSVG";
import CitySVG from "@/components/elements/svg/icons/fx/CitySVG";

interface IProps {
  id: string;
  name: string;
}
const ICON_SIZE = 80;

const icons = [
  { id: "rain", icon: <RainSVG width={ICON_SIZE} /> },
  { id: "forest", icon: <ForestSVG width={ICON_SIZE} /> },
  { id: "ocean-waves", icon: <WavesSVG width={ICON_SIZE} /> },
  { id: "wind", icon: <WindSVG width={ICON_SIZE} /> },
  { id: "night", icon: <MoonSVG width={ICON_SIZE} /> },
  { id: "future-city", icon: <CpuSVG width={ICON_SIZE} /> },
  { id: "storm", icon: <StormSVG width={ICON_SIZE} /> },
  { id: "coffee-shop", icon: <CoffeeSVG width={ICON_SIZE} /> },
  { id: "campfire", icon: <FireSVG width={ICON_SIZE} /> },
  { id: "city", icon: <CitySVG width={ICON_SIZE} /> },
];

const FxItemLg = ({ id, name }: IProps) => {
  const { activeSoundFX, toggleSound, setVolume } = useFxStore();
  const [volume, setVolumeState] = useState<number>(0.5);

  const isActive = activeSoundFX.some((fx) => fx.id === id && fx.isActive);

  const icon = icons.find((item) => item.id === id)?.icon;

  useEffect(() => {
    const sound = activeSoundFX.find((fx) => fx.id === id);
    if (sound) {
      setVolumeState(sound.volume);
    }
  }, [activeSoundFX, id]);

  const handleClick = () => {
    toggleSound(id);
  };

  const handleVolumeChange = (value: number[]) => {
    if (value.length > 0) {
      const newVolume = value[0];
      setVolumeState(newVolume);
      setVolume(id, newVolume);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <ButtonFXLg
        tooltip={name}
        isActive={isActive}
        icon={icon}
        onClick={handleClick}
      />
      <div className="relative z-0 w-full">
        <div className="w-full group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md px-6 font-medium text-neutral-200 duration-500">
          <div
            className={cn(
              "translate-y-0 opacity-100 transition text-lg",
              isActive && "-translate-y-[150%] opacity-0"
            )}
          ></div>
          <div
            className={cn(
              "absolute translate-y-[150%] opacity-0 transition w-full",
              isActive && "translate-y-0 opacity-100"
            )}
          >
            <div className="mx-4">
              <Slider
                value={[volume * 100]}
                onValueChange={handleVolumeChange}
                min={0}
                max={100}
                step={1}
                disabled={!isActive}
              />
            </div>
          </div>
        </div>
        <div
          className={cn(
            "absolute text-lg duration-300 transform top-3 -z-10 origin-[0] scale-100 translate-y-0 text-center w-full ",
            isActive && " text-white -translate-y-6 text-base"
          )}
        >
          {name}
        </div>
      </div>
    </div>
  );
};

export default FxItemLg;
