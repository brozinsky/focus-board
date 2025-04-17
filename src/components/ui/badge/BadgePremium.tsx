import { ROOT_COLORS } from "@/lib/constants/theme.constants";
import { cn } from "@/lib/utils";
import { Crown } from "lucide-react";
import React from "react";

const BadgePremium = ({
  className,
  size = "default",
  background = "default",
}: {
  className?: string;
  size?: "sm" | "default";
  background?: "default" | "transparent";
}) => {
  return (
    <div
      className={cn(
        className,
        "flex flex-row items-center rounded-lg",
        size === "default" && "px-2 py-0.5 gap-2",
        size === "sm" && "p-1.5",
        background === "default" && "bg-black/70",
        background === "transparent" && "bg-transparent"
      )}
    >
      {size === "default" && <span>Pro</span>}
      <Crown size={16} color={ROOT_COLORS.premium} />
    </div>
  );
};

export default BadgePremium;
