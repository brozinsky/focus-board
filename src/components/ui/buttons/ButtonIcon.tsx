import React, { ReactNode } from "react";
import LoadingSpinner from "../loaders/LoadingSpinner";
import { cn } from "@/lib/utils";
import useWindowsStore from "@/stores/zustand/useWindowsStore";

interface IProps {
  onClick?: () => void;
  icon: ReactNode;
  tooltip: string;
}

const ButtonIcon = ({ tooltip, onClick, icon }: IProps) => {
  const { isSoundFXFirstOpen } = useWindowsStore();

  return (
    <button
      title={tooltip}
      onClick={onClick}
      className={cn("hover:bg-white/20 transition hover:opacity-100 h-10 w-10 flex items-center justify-center p-2 rounded-md")}
    >
      {icon}
      <span className="sr-only">{tooltip}</span>
    </button>
  );
};

export default ButtonIcon;
