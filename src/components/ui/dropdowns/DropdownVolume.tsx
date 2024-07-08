import React from "react";
import Dropdown from "./Dropdown";
import ButtonIcon from "../buttons/ButtonIcon";
import VolumeLoIconSVG from "@/components/elements/svg/icons/media/VolumeLoIconSVG";
import Button from "../buttons/Button";
import Volume from "@/components/modules/settings/_partials/Volume";
import useVolume from "@/hooks/useVolume";

const DropdownVolume = ({
  position = "top",
}: {
  position?: "top" | "bottom";
}) => {
  const { changeVolume, toggleMute, getVolumeIcon, volumeAudio } = useVolume();

  return (
    <Dropdown
      position={position}
      trigger={<ButtonIcon icon={<VolumeLoIconSVG />} tooltip={"Volume"} />}
    >
      <div className="flex flex-row gap-1 py-1 pl-1.5 pr-4">
        <Button
          label="Toggle mute"
          onClick={toggleMute}
          icon={getVolumeIcon(volumeAudio)}
          size="sm"
          variant="ghost"
        />
        <Volume volume={volumeAudio} handleVolumeChange={changeVolume} />
      </div>
    </Dropdown>
  );
};

export default DropdownVolume;
