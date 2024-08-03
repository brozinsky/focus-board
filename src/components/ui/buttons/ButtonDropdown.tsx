import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface IProps {
  onClick?: (e: any) => void;
  className?: string;
  children: ReactNode;
  isDsabled: boolean;
}

const ButtonDropdown = ({
  onClick,
  className,
  children,
  isDsabled,
}: IProps) => {
  return (
    <button
      onClick={onClick}
      className={cn("button-dropdown", isDsabled && "disabled", className)}
      disabled={isDsabled}
    >
      <span>{children}</span>
    </button>
  );
};

export default ButtonDropdown;
