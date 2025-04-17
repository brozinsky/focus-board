import React, { useEffect, useState } from "react";
import Slider from "@/components/ui/inputs/Slider";
import { cn } from "@/lib/utils";
import useFxStore from "@/stores/zustand/sfx/useFxStore";
import ButtonFX from "@/components/ui/buttons/ButtonFX";
import ButtonFXLg from "@/components/ui/buttons/ButtonFXLg";
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
import BadgePremium from "@/components/ui/badge/BadgePremium";
import { useAuthStore } from "@/stores/zustand/auth/auth.store";

interface IProps {
  id: string;
  name: string;
  variant: "md" | "lg";
  isPremium: boolean;
}

const ICON_SIZE_MD = 30;
const ICON_SIZE_LG = 80;

const iconComponents = {
  rain: RainSVG,
  forest: ForestSVG,
  "ocean-waves": WavesSVG,
  wind: WindSVG,
  night: MoonSVG,
  "future-city": CpuSVG,
  storm: StormSVG,
  "coffee-shop": CoffeeSVG,
  campfire: FireSVG,
  city: CitySVG,
};

const generateIcons = (size: number) => {
  return Object.entries(iconComponents).map(([id, Component]) => ({
    id,
    icon: <Component width={size} />,
  }));
};

const icons = generateIcons(ICON_SIZE_MD);
const iconsLg = generateIcons(ICON_SIZE_LG);

const FxItem = ({ id, name, variant = "md", isPremium = false }: IProps) => {
  const { activeSoundFX, toggleSound, setVolume } = useFxStore();
  const [volume, setVolumeState] = useState<number>(0.5);
  const { isLoggedIn } = useAuthStore();

  const isDisabled = isPremium && !isLoggedIn;

  const isActive = activeSoundFX.some((fx) => fx.id === id && fx.isActive);

  const icon =
    variant === "md"
      ? icons.find((item) => item.id === id)?.icon
      : iconsLg.find((item) => item.id === id)?.icon;

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
    <div
      className={cn(
        "flex relative",
        variant === "md"
          ? "flex-row items-center gap-4"
          : "flex-col items-center gap-4"
      )}
    >
      {isDisabled && <BadgePremium className="absolute top-1/2 -translate-y-1/2 right-0" size="sm"/>}
      {variant === "md" ? (
        <>
          <ButtonFX
            tooltip={name}
            isActive={isActive}
            isLoading={false}
            icon={icon}
            onClick={handleClick}
            isDisabled={isDisabled}
          />
          <div className={cn(isActive ? "opacity-100" : "opacity-30", "w-40")}>
            <Slider
              value={[volume * 100]}
              onValueChange={handleVolumeChange}
              min={0}
              max={100}
              step={1}
              disabled={!isActive}
            />
          </div>
        </>
      ) : (
        <>
          <ButtonFXLg
            tooltip={name}
            isActive={isActive}
            icon={icon}
            onClick={handleClick}
            isDisabled={isDisabled}
          />
          <div className="relative z-0 w-full">
            <div className="w-full group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md px-6 font-medium text-neutral-200 duration-500">
              <div
                className={cn(
                  "translate-y-0 opacity-100 transition text-lg",
                  isActive && "-translate-y-[150%] opacity-0"
                )}
              ></div>
              {!isDisabled && (
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
              )}
            </div>
            <div
              className={cn(
                "absolute text-lg duration-300 transform top-3 -z-10 origin-[0] scale-100 translate-y-0 text-center w-full ",
                isActive && " text-white -translate-y-6 text-base",
                isDisabled && "opacity-50"
              )}
            >
              {name}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FxItem;
