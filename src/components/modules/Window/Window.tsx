import { ScrollArea } from "@/components/ui/ScrollArea/ScrollArea";
import React from "react";

interface IProps {
  children: React.ReactNode;
  title?: string;
  isOpen: boolean;
}

const Window = ({ children, title, isOpen }: IProps) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div className="absolute top-1/2 right-1/3 window pl-6 pt-8 pb-4 pr-2">
      <div className="window__drag-bar pt-1 px-3 text-xs">{title}</div>
      <ScrollArea className="h-[200px] rounded-md">{children}</ScrollArea>
    </div>
  );
};

export default Window;
