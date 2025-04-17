import ArrowSmSVG from "@/components/elements/svg/icons/interface/ArrowSmSVG";
import CloseIconSVG from "@/components/elements/svg/icons/interface/CloseIconSVG";
import SettingsIconSVG from "@/components/elements/svg/icons/interface/SettingsIconSVG";
import ButtonIcon from "@/components/ui/buttons/ButtonIcon";
import useWindowsStore, { TWindowName } from "@/stores/zustand/global/windows.store";
import React from "react";

const WindowBar = ({
  title,
  onSettings,
  name,
  isClose = true,
  isMinimize = true,
}: {
  title: string;
  isClose?: boolean;
  isMinimize?: boolean;
  onSettings?: () => void;
  name?: TWindowName;
}) => {
  const { setIsOpen, setIsMinimized, isMinimized } = useWindowsStore();

  return (
    <div className="group hover:bg-black/10 bg-transparent transition cursor-grab pl-4 py-0.25 flex items-center justify-between right-0 top-0 left-0 absolute">
      <div>
        <div className="select-none transition group-hover:opacity-100 text-foreground opacity-50">
          {title}
        </div>
      </div>
      <div className="flex-center gap-2">
        {onSettings && (
          <ButtonIcon
            className="group-hover/timer:flex hidden transition opacity-50"
            variant="ghost"
            size="sm"
            onClick={onSettings}
            icon={
              <SettingsIconSVG
                pathClass={"stroke-foreground"}
                className="rotate-90"
              />
            }
            tooltip={"Settings"}
          />
        )}
        {/* {windowName && isMinimize && (
          <ButtonIcon
            className="group-hover/timer:flex hidden transition opacity-50"
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(windowName, !isMinimized[windowName])}
            icon={
              <ArrowSmSVG
                pathClass={"stroke-foreground"}
                className="rotate-90"
              />
            }
            tooltip={"Minimize"}
          />
        )} */}
        {name && isClose && (
          <ButtonIcon
            className="group-hover/timer:flex hidden transition opacity-50"
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(name, false)}
            icon={<CloseIconSVG />}
            tooltip={"Close"}
          />
        )}
      </div>
    </div>
  );
};

export default WindowBar;
