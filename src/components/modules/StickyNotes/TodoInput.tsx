import AddSquareSVG from "@/components/elements/svg/icons/interface/AddSquareSVG";
import ButtonIcon from "@/components/ui/buttons/ButtonIcon";
import { Input } from "@/components/ui/inputs/Input";
import { cn } from "@/lib/utils";
import { TStickyNoteColor } from "@/types/model-types";
import React, { ChangeEvent } from "react";

type TProps = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  onClick: () => void;
  color: TStickyNoteColor;
};

const TodoInput = ({ onChange, value, onClick, color }: TProps) => {
  return (
    <div className="input-container flex justify-center mt-4 gap-2 items-center">
      <Input
        className={cn(
          `select-none sticky-note__textarea sticky-note__textarea--${color} active`,
          "!rounded-none w-full text-base"
        )}
        value={value}
        onChange={onChange}
        placeholder="New task"
        type="text"
      />

      <ButtonIcon
        size="sm"
        className={cn(
          "p-1 text-sm bg-background hover:bg-primary hover:text-primary-foreground active:translate-y-1 text-foreground rounded-lg w-12 h-10"
        )}
        onClick={onClick}
        icon={<AddSquareSVG pathClass="stroke-white" />}
        tooltip={"Add"}
      />
    </div>
  );
};

export default TodoInput;
