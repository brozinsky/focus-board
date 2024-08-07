import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";
import useThemeStore from "@/stores/zustand/useThemeStore";

interface IProps {
  onClick?: (e: any) => void;
  icon: ReactNode;
  tooltip: string;
  size?: "lg" | "md" | "sm";
  className?: string;
  variant?: "ghost" | "glass";
  disabled?: boolean;
}

const ButtonIcon = ({
  disabled = false,
  tooltip,
  onClick,
  icon,
  size = "md",
  className,
  variant,
}: IProps) => {
  const { uiStyle } = useThemeStore();

  const buttonVariant = variant || uiStyle;

  return (
    <button
      title={tooltip}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        size === "sm" && "p-1.5 h-8 w-8",
        size === "lg" && "p-4 h-18 w-18",
        size === "md" && "p-2 h-10 w-10",
        buttonVariant === "ghost" && "button-icon--ghost",
        buttonVariant === "glass" && "button-icon--glass",
        disabled && "disabled",
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
