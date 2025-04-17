import React from "react";
import { cn } from "@/lib/utils";
import useFxStore from "@/stores/zustand/sfx/useFxStore";
import ButtonFXLg from "@/components/ui/buttons/ButtonFXLg";
import BadgePremium from "@/components/ui/badge/BadgePremium";
import { useAuthStore } from "@/stores/zustand/auth/auth.store";
import { Music, Cpu, Footprints, Joystick, Film, Leaf } from "lucide-react";

const ICON_SIZE_XL = 100;

const iconComponents = {
  music: Music,
  footprints: Footprints,
  cpu: Cpu,
  joystick: Joystick,
  film: Film,
  leaf: Leaf,
};

interface IProps {
  icon: React.ReactNode;
  name: string;
  isPremium?: boolean;
  isActive?: boolean;
  size: "sm" | "lg";
  onClick: () => void;
}

const SceneButton = ({
  isActive,
  size,
  icon,
  name,
  isPremium = false,
  onClick,
}: IProps) => {
  const { isLoggedIn } = useAuthStore();
  const isDisabled = isPremium && !isLoggedIn;

  return (
    <div className="flex flex-col items-center gap-4 relative">
      {isDisabled && (
        <BadgePremium
          className="absolute top-2 right-2"
          size={size === "sm" ? "sm" : "default"}
        />
      )}
      <button
        disabled={isDisabled}
        title={name}
        onClick={onClick}
        className={cn(
          !isActive && "opacity-60",
          isDisabled ? "!opacity-20" : "hover:opacity-100 hover:bg-white/20",
          size === "sm" && "size-12",
          size === "lg" && "size-20 sm:size-[7rem]",
          "flex itms-center flex-col gap-4 transition items-center justify-center p-2 rounded-md"
        )}
      >
        <div>{icon}</div>
        {size === "lg" && (
          <div
            className={cn(
              "text-sm font-medium duration-300",
              isActive ? "text-white" : "text-gray-400",
              isDisabled && "opacity-50"
            )}
          >
            {name}
          </div>
        )}
      </button>
    </div>
  );
};

export default SceneButton;
