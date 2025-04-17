import usePlayerStore from "@/stores/zustand/player/player.store";
import React from "react";
import Marquee from "react-fast-marquee";

const OnboardingButton = ({ title, text, onClick, icon, variant }) => {
  const { isAudioPlaying, currentAudio } = usePlayerStore();

  return (
    <div
      onClick={onClick}
      className="flex bg-white/20 hover:bg-white/30 w-full min-h-40 rounded-xl cursor-pointer active:translate-y-[2px] transition"
    >
      <div className="p-4 flex flex-col justify-between h-auto">
        <div>
          <div className="text-2xl flex items-center gap-2">
            {icon}
            {title}
          </div>
          <p>{text}</p>
        </div>
        {variant === "audio" && !currentAudio && (
          <div className="flex flex-col">
            <span>No audio</span>
          </div>
        )}
        {variant === "audio" && currentAudio && (
          <div className="flex items-center gap-4">
            <div className="flex flex-row gap-1 items-center whitespace-nowrap">
              Now playing:
            </div>
            <div>
              <Marquee direction="left" speed={10} pauseOnHover>
                {currentAudio.title}
              </Marquee>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingButton;
