import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";
import useThemeStore from "@/stores/zustand/useThemeStore";

interface IProps {
  onClick?: () => void;
  icon: ReactNode;
  tooltip: string;
  size?: "lg" | "md" | "sm";
  className?: string;
}

const ButtonIcon = ({
  tooltip,
  onClick,
  icon,
  size = "md",
  className,
}: IProps) => {
  const { uiStyle } = useThemeStore();
  return (
    <button
      title={tooltip}
      onClick={onClick}
      className={cn(
        size === "sm" && "p-1.5 h-8 w-8",
        size === "lg" && "p-4 h-18 w-18",
        size === "md" && "p-2 h-10 w-10",
        uiStyle === "ghost" && " button-icon--ghost",
        uiStyle === "glass" && "button-icon--glass",
        "button-icon",
        className
      )}
    >
      {icon}
      <span className="sr-only">{tooltip}</span>
    </button>
  );
};

export default ButtonIcon;
