import React from "react";
import ButtonIcon from "../ButtonIcon";
import { cn } from "@/lib/utils";
import EditIconSVG from "@/components/elements/svg/icons/interface/EditIconSVG";
import CheckSVG from "@/components/elements/svg/icons/interface/CheckSVG";

const ButtonEdit = ({
  isEditing,
  onClick,
}: {
  isEditing: boolean;
  onClick: any;
}) => {
  return (
    <ButtonIcon
      className={cn(
        "group/edit absolute -bottom-12 right-2 bg-background hover:bg-primary hover:opacity-100",
        !isEditing && "group-hover/panel:opacity-100 opacity-0 "
      )}
      onClick={onClick}
      icon={
        !isEditing ? (
          <EditIconSVG pathClass="group-hover/edit:stroke-foreground-primary stroke-foreground" />
        ) : (
          <CheckSVG pathClass="group-hover/edit:stroke-foreground-primary stroke-foreground" />
        )
      }
      tooltip={"Edit"}
    />
  );
};

export default ButtonEdit;
