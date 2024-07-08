import clsx from "clsx";
import { ReactNode } from "react";

type TProps = {
  onClick: () => void;
  isActive: boolean;
  children: ReactNode;
};

const ButtonTab = ({ onClick, isActive, children }: TProps) => {
  return (
    <button
      className={clsx(
        isActive && "button-settings--active",
        "button-settings "
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonTab;
