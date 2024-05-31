import CloseIconSVG from "@/components/elements/svg/icons/interface/CloseIconSVG";
import MinimizeSVG from "@/components/elements/svg/icons/interface/MinimizeSVG";
import { ScrollArea } from "@/components/ui/ScrollArea/ScrollArea";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

interface IProps {
  children: React.ReactNode;
  title?: string;
  isOpen: boolean;
  closeWindow?: () => void;
}

const Window = ({ children, title, isOpen, closeWindow }: IProps) => {
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  if (!isOpen) {
    return null;
  }
  return (
    <div
      className={cn(
        !isMinimized && "pl-6 pt-8 pb-4 pr-2 ",
        "absolute top-1/2 right-1/3 window w-[280px] z-30"
      )}
    >
      <div className="window__drag-bar pt-1 px-3 text-xs flex justify-between">
        {title}
        <div className="flex gap-2.5 items-center h-full pb-1.5">
          <button
            className="button-drag-bar"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            <MinimizeSVG width="16" />
          </button>
          {closeWindow && (
            <button className="button-drag-bar" onClick={closeWindow}>
              <CloseIconSVG width="16" />
            </button>
          )}
        </div>
      </div>
      <ScrollArea
        className={cn(isMinimized && "hidden", "h-[200px] rounded-md")}
      >
        {children}
      </ScrollArea>
    </div>
  );
};

export default Window;
