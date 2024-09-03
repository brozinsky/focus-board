import React, { ReactNode } from "react";
import LoadingSpinner from "../loaders/LoadingSpinner";
import { cn } from "@/lib/utils";
import useWindowsStore from "@/stores/zustand/useWindowsStore";

interface IProps {
  isLoading: boolean;
  isActive: boolean;
  onClick: () => void;
  icon: ReactNode;
  tooltip: string;
}

const ButtonFX = ({ tooltip, isActive, isLoading, onClick, icon }: IProps) => {
  const { isOpen } = useWindowsStore();

  return (
    <button
      title={tooltip}
      onClick={onClick}
      className={cn(
        !isActive && "opacity-60",
        "hover:bg-white/20 transition hover:opacity-100 h-10 w-10 flex items-center justify-center p-2 rounded-md"
      )}
    >
      {isLoading && !isOpen.soundFXFirstOpen ? (
        <LoadingSpinner className="opacity-60" />
      ) : (
        icon
      )}
      <span className="sr-only">{tooltip}</span>
    </button>
  );
};

export default ButtonFX;
