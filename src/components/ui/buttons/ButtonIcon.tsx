import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface IProps {
  onClick?: () => void;
  icon: ReactNode;
  tooltip: string;
  size?: "lg" | "md";
  className?: string;
  variant?: "ghost" | "glass";
}

const ButtonIcon = ({
  tooltip,
  onClick,
  icon,
  size = "md",
  className,
  variant = "ghost",
}: IProps) => {
  return (
    <button
      title={tooltip}
      onClick={onClick}
      className={cn(
        size === "lg" && "p-4 h-18 w-18",
        size === "md" && "p-2 h-10 w-10",
        variant === "ghost" && "hover:bg-white/20",
        variant === "glass" && "hover:bg-white/20 bg-white/15",
        "transition hover:opacity-100 flex items-center justify-center rounded-md",
        className
      )}
    >
      {icon}
      <span className="sr-only">{tooltip}</span>
    </button>
  );
};

export default ButtonIcon;
