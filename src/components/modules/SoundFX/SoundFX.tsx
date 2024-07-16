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
import CoffeeSVG from "@/components/elements/svg/icons/fx/CoffeeSVG";
import FireSVG from "@/components/elements/svg/icons/fx/FireSVG";
import CitySVG from "@/components/elements/svg/icons/fx/CitySVG";
import ForestSVG from "@/components/elements/svg/icons/fx/ForestSVG";
import CpuSVG from "@/components/elements/svg/icons/fx/CpuSVG";
import useWindowsStore from "@/stores/zustand/useWindowsStore";
import { motion } from "framer-motion";
import CloseIconSVG from "@/components/elements/svg/icons/interface/CloseIconSVG";
import PlaylistSVG from "@/components/elements/svg/icons/media/PlaylistSVG";
import FxItemLg from "../FxItem/FxItemLg";
import MixerIconSVG from "@/components/elements/svg/icons/interface/MixerIconSVG";
import { SFX_AUDIO } from "@/lib/constants/const-sfx";

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
    <div
      id="Playlist"
      className={"modal"}
      onClick={() => setIsSoundFXOpen(false)}
    >
      <button className={"modal__close"}>
        {/* <MdClose /> */}
        <CloseIconSVG />
      </button>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        className={"modal__card"}
      >
        <div className={"p-8 gap-6 flex flex-col"}>
          <div className="flex justify-between items-center">
            <h2 className="flex flex-row items-center text-xl gap-4 tracking-wide">
              <MixerIconSVG /> Sound effects
            </h2>
          </div>
          <div
            className={
              "gap-8 grid xl:grid-cols-5 md:grid-cols-3 lg:grid-cols-4 grid-cols-1"
            }
          >
            {SFX_AUDIO.map(({ name, id }) => {
              return <FxItemLg key={id} id={id} name={name} />;
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SoundFX;
