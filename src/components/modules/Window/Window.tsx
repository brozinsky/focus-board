import { useDraggable } from "@dnd-kit/core";
import WindowBar from "../Window/WindowBar";
import { TWindowName } from "@/stores/zustand/useWindowsStore";
import { ReactNode } from "react";
import { ScrollArea } from "@/components/ui/ScrollArea/ScrollArea";
import { cn } from "@/lib/utils";

const Window = (props: {
  children: ReactNode;
  styles: any;
  title: string;
  name: TWindowName;
  isClose?: boolean;
  isMinimize?: boolean;
  onSettings?: (value: boolean) => void;
}) => {
  const id = props.name;
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : {};

  return (
    <div
      ref={setNodeRef}
      data-no-dnd="true"
      {...listeners}
      {...attributes}
      {...props}
      style={{ ...style, ...props.styles }}
      className="pointer-events-auto cursor-default"
      title={undefined}
    >
      <div className="overflow-hidden group/timer bg-background-glass rounded-lg absolute translate-x-1/2 -translate-y-1/2 right-1/2 top-1/2 text-neutral-100 z-20">
        <div className="mt-window-bar flex flex-col gap-2 ">
          <WindowBar {...props} />
          <ScrollArea
            className={cn(
              "rounded-md p-4 ",
              props.name === "todoList" && "h-[480px]"
            )}
          >
            {props.children}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default Window;
