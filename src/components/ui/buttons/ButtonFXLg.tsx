import React, { ReactNode } from "react";
import LoadingSpinner from "../loaders/LoadingSpinner";
import { cn } from "@/lib/utils";
import useWindowsStore from "@/stores/zustand/useWindowsStore";

interface IProps {
  isLoading?: boolean;
  isActive: boolean;
  onClick: () => void;
  icon: ReactNode;
  tooltip: string;
  isDisabled: boolean;
}

const ButtonFXLg = ({
  tooltip,
  isActive,
  isLoading,
  onClick,
  icon,
  isDisabled = false,
}: IProps) => {
  const { isOpen } = useWindowsStore();

  return (
    <button
      disabled={isDisabled}
      title={tooltip}
      onClick={onClick}
      className={cn(
        !isActive && "opacity-60",
        isDisabled ? "!opacity-20" : "hover:opacity-100 hover:bg-white/20",
        "transition h-16 w-16 sm:h-28 sm:w-28 flex items-center justify-center p-2 rounded-md"
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

export default ButtonFXLg;
