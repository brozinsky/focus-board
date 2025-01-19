import { ROOT_COLORS } from "@/lib/constants/const-theme";
import { cn } from "@/lib/utils";
import { Crown } from "lucide-react";
import React from "react";

const BadgePremium = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        className,
        "flex flex-row gap-2 items-center bg-black px-2 py-0.5 rounded-lg"
      )}
    >
      <span>Pro</span>
      <Crown size={16} color={ROOT_COLORS.premium} />
    </div>
  );
};

export default BadgePremium;
