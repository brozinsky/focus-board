import { ROOT_COLORS } from "@/lib/constants/const-theme";
import { cn } from "@/lib/utils";
import { Crown } from "lucide-react";
import React from "react";

const BadgePremium = ({
  className,
  size = "default",
}: {
  className?: string;
  size?: "sm" | "default";
}) => {
  return (
    <div
      className={cn(
        className,
        "flex flex-row items-center bg-black/70 rounded-lg",
        size === "default" && "px-2 py-0.5 gap-2",
        size === "sm" && "p-1.5"
      )}
    >
      {size === "default" && <span>Pro</span>}
      <Crown size={16} color={ROOT_COLORS.premium} />
    </div>
  );
};

export default BadgePremium;
