import React from "react";
import { motion } from "framer-motion";
import CloseIconSVG from "@/components/elements/svg/icons/interface/CloseIconSVG";
import DropdownVolume from "@/components/ui/dropdowns/DropdownVolume";
import useThemeStore from "@/stores/zustand/useThemeStore";
import { cn } from "@/lib/utils";
import useWindowsStore from "@/stores/zustand/useWindowsStore";
import MusicNoteSVG from "@/components/elements/svg/icons/media/MusicNoteSVG";
import PlaylistItems from "./PlaylistItems";

const Playlist = () => {
  const { isOpen, setIsOpen } = useWindowsStore();
  const { themeStyle } = useThemeStore();

  if (!isOpen.playlist) return;

  return (
    <div
      id="Playlist"
      className={"modal"}
      onClick={() => setIsOpen("playlist", false)}
    >
      <button className={"modal__close"}>
        {/* <MdClose /> */}
        <CloseIconSVG />
      </button>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "modal__card",
          themeStyle == "glass" && "modal__card--glass"
        )}
      >
        <div className={"p-8 gap-6 flex flex-col"}>
          <div className="flex justify-between items-center">
            <h2 className="flex flex-row items-center text-xl gap-4 tracking-wide">
              <MusicNoteSVG /> Media playlist
            </h2>
            <DropdownVolume position="bottom" />
          </div>
          {/* <Separator className="bg-white/30" /> */}
          <div
            className={"gap-8 grid xl:grid-cols-2 md:grid-cols-1 grid-cols-1"}
          >
            <PlaylistItems />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Playlist;
