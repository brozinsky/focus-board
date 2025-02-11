import React from "react";
import ButtonIcon from "../ButtonIcon";
import TrashIconSVG from "@/components/elements/svg/icons/interface/TrashIconSVG";
import { cn } from "@/lib/utils";

const ButtonDelete = ({
  isEditing,
  onClick,
}: {
  isEditing: boolean;
  onClick: any;
}) => {
  return (
    <ButtonIcon
      type="button"
      className={cn(
        "group/delete absolute -bottom-12 left-2 bg-background hover:bg-red-500 hover:opacity-100 ",
        !isEditing && "group-hover/panel:opacity-100 opacity-0"
      )}
      onClick={onClick}
      icon={
        <TrashIconSVG pathClass="group-hover/delete:stroke-foreground-primary stroke-foreground" />
      }
      tooltip={"Delete"}
    />
  );
};

export default ButtonDelete;
