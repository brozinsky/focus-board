import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface IProps {
  onClick?: (e: any) => void;
  className?: string;
  children: ReactNode;
  isDisabled: boolean;
}

const ButtonDropdown = ({
  onClick,
  className,
  children,
  isDisabled,
}: IProps) => {
  return (
    <button
      onClick={onClick}
      className={cn("button-dropdown", isDisabled && "disabled", className)}
      disabled={isDisabled}
    >
      <span>{children}</span>
    </button>
  );
};

export default ButtonDropdown;
