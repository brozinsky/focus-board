import TrashIconSVG from "@/components/elements/svg/icons/interface/TrashIconSVG";
import ButtonIcon from "@/components/ui/buttons/ButtonIcon";
import { cn } from "@/lib/utils";
import React, { ChangeEvent } from "react";

type TProps = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  onClick: () => void;
};

const TodoInput = ({ onChange, value, onClick }: TProps) => {
  return (
    <div className="input-container flex justify-center mb-4">
      <input
        type="text"
        placeholder="new task"
        value={value}
        onChange={onChange}
        className="p-2 text-lg border border-gray-300 rounded-lg w-full max-w-xs"
      />
      <ButtonIcon
        size="sm"
        className={cn(
          "p-1 text-sm bg-primary text-primary-foreground rounded-lg"
        )}
        onClick={onClick}
        icon={<TrashIconSVG pathClass="stroke-white" />}
        tooltip={"Add"}
      />
    </div>
  );
};

export default TodoInput;
