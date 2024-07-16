import React, { ReactNode, useState } from "react";
import LoadingSpinner from "../loaders/LoadingSpinner";
import { cn } from "@/lib/utils";
import useWindowsStore from "@/stores/zustand/useWindowsStore";

interface IProps {
  isLoading?: boolean;
  isActive: boolean;
  onClick: () => void;
  icon: ReactNode;
  tooltip: string;
}

const ButtonFXLg = ({ tooltip, isActive, isLoading, onClick, icon }: IProps) => {
  const { isSoundFXFirstOpen } = useWindowsStore();

return (
    <button
      title={tooltip}
      onClick={onClick}
      className={cn(!isActive && "opacity-60", "hover:bg-white/20 transition hover:opacity-100 h-28 w-28 flex items-center justify-center p-2 rounded-md")}
    >
      {(isLoading && !isSoundFXFirstOpen) ? <LoadingSpinner className="opacity-60" /> : icon}
      <span className="sr-only">{tooltip}</span>
    </button>
  );
};

export default ButtonFXLg;
