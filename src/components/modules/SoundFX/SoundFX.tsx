import React, { useEffect, useState } from "react";
import WavesSVG from "@/components/elements/svg/icons/fx/WavesSVG";
import WindSVG from "@/components/elements/svg/icons/fx/WindSVG";
import MoonSVG from "@/components/elements/svg/icons/fx/MoonSVG";
import SunSVG from "@/components/elements/svg/icons/fx/SunSVG";
import RainSVG from "@/components/elements/svg/icons/fx/RainSVG";
import StormSVG from "@/components/elements/svg/icons/fx/StormSVG";
import cafeMP3 from "@/assets/audio/fx/cafe.mp3";
import campfireMP3 from "@/assets/audio/fx/campfire.mp3";
import forestMP3 from "@/assets/audio/fx/forest.mp3";
import keyboardTypingMP3 from "@/assets/audio/fx/keyboard-typing.mp3";
import futureCityMP3 from "@/assets/audio/fx/future-city.mp3";
import cityMP3 from "@/assets/audio/fx/city.mp3";
import rainMP3 from "@/assets/audio/fx/rain.mp3";
import softRainMP3 from "@/assets/audio/fx/soft-rain.mp3";
import nightMP3 from "@/assets/audio/fx/night-forest.mp3";
import wavesMP3 from "@/assets/audio/fx/waves.mp3";
import windMP3 from "@/assets/audio/fx/wind.mp3";
import FxItem from "@/components/modules/FxItem/FxItem";
import Window from "@/components/modules/Window/Window";
import CoffeeSVG from "@/components/elements/svg/icons/fx/CoffeeSVG";
import FireSVG from "@/components/elements/svg/icons/fx/FireSVG";
import CitySVG from "@/components/elements/svg/icons/fx/CitySVG";
import ForestSVG from "@/components/elements/svg/icons/fx/ForestSVG";
import CpuSVG from "@/components/elements/svg/icons/fx/CpuSVG";
import useWindowsStore from "@/stores/zustand/useWindowsStore";

const SoundFX = () => {
  const {
    setIsSoundFXOpen,
    isSoundFXOpen,
    setIsSoundFXFirstOpen,
    isSoundFXFirstOpen,
  } = useWindowsStore();
  const [openCount, setOpenCount] = useState(0);

  useEffect(() => {
    console.log(isSoundFXFirstOpen);
  }, [isSoundFXFirstOpen]);

  useEffect(() => {
    if (isSoundFXOpen) {
      setOpenCount((prevCount) => prevCount + 1);
    }
  }, [isSoundFXOpen]);

  useEffect(() => {
    if (openCount === 2) {
      setIsSoundFXFirstOpen(true);
    }
  }, [openCount, setIsSoundFXFirstOpen]);

  return (
    <Window title={"Sound FX"} isOpen={isSoundFXOpen}>
      <div className="flex flex-col gap-2 pr-6">
        <FxItem
          icon={<RainSVG width={30} />}
          audio={rainMP3}
          name={"Ocean waves"}
        />
        <FxItem
          icon={<ForestSVG width={30} />}
          audio={forestMP3}
          name={"Forest"}
        />
        <FxItem
          icon={<WavesSVG width={30} />}
          audio={wavesMP3}
          name={"Ocean waves"}
        />
        <FxItem icon={<WindSVG width={30} />} audio={windMP3} name={"Wind"} />
        <FxItem icon={<MoonSVG width={30} />} audio={nightMP3} name={"Night"} />
        <FxItem
          icon={<CpuSVG width={30} />}
          audio={futureCityMP3}
          name={"Future city"}
        />
        <FxItem icon={<StormSVG width={30} />} audio={rainMP3} name={"Storm"} />
        <FxItem
          icon={<CoffeeSVG width={30} />}
          audio={cafeMP3}
          name={"Coffe shop"}
        />
        <FxItem
          icon={<FireSVG width={30} />}
          audio={campfireMP3}
          name={"Campfire"}
        />
        <FxItem icon={<CitySVG width={30} />} audio={cityMP3} name={"City"} />
      </div>
    </Window>
  );
};

export default SoundFX;
