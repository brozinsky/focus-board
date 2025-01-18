import React from "react";
import ButtonIcon from "../ButtonIcon";
import { Crown } from "lucide-react";

const ButtonPremium = ({ onClick }: { onClick: () => void }) => {
  return (
    <ButtonIcon
      size={"sm"}
      onClick={onClick}
      icon={<Crown color="#efbf04" />}
      tooltip={"Premium"}
    />
  );
};

export default ButtonPremium;
