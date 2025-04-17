import React from "react";
import ButtonIcon from "../ButtonIcon";
import { Crown } from "lucide-react";
import { ROOT_COLORS } from "@/lib/constants/theme.constants";

const ButtonPremium = ({ onClick }: { onClick: () => void }) => {
  return (
    <ButtonIcon
      size={"sm"}
      onClick={onClick}
      icon={<Crown color={ROOT_COLORS.premium} />}
      tooltip={"Premium"}
    />
  );
};

export default ButtonPremium;
