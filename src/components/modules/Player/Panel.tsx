import Button from "@/components/ui/buttons/Button";
import usePlayerStore from "@/stores/zustand/usePlayerStore";
import React, { useState } from "react";
import Volume from "@/components/modules/settings/_partials/Volume";
import Slider from "@/components/ui/inputs/Slider";
import usePlaylistStore from "@/stores/zustand/usePlaylistStore";
import PlayIconSVG from "@/components/elements/svg/icons/media/PlayIconSVG";
import PauseIconSVG from "@/components/elements/svg/icons/media/PauseIconSVG";
import MixerIconSVG from "@/components/elements/svg/icons/interface/MixerIconSVG";
import useWindowsStore from "@/stores/zustand/useWindowsStore";
import MaximizeSVG from "@/components/elements/svg/icons/interface/MaximizeSVG";
import { goFullscreen } from "@/utils/functions/fn-common";
import PlaylistSVG from "@/components/elements/svg/icons/media/PlaylistSVG";
import usePomodoroStore from "@/stores/zustand/usePomodoroStore";
import TimerPlusSVG from "@/components/elements/svg/icons/interface/TimerPlusSVG";
import ButtonIcon from "@/components/ui/buttons/ButtonIcon";
import SettingsIconSVG from "@/components/elements/svg/icons/interface/SettingsIconSVG";
import VolumeLoIconSVG from "@/components/elements/svg/icons/media/VolumeLoIconSVG";
import NextTrackSVG from "@/components/elements/svg/icons/media/NextTrackSVG";
import PrevTrackSVG from "@/components/elements/svg/icons/media/PrevTrackSVG";
import Dropdown from "@/components/ui/dropdowns/Dropdown";
import useSceneStore from "@/stores/zustand/useSceneStore";
import SceneSettings from "../settings/SceneSettings";
import SceneEditSVG from "@/components/elements/svg/icons/interface/SceneEditSVG";
import Settings from "../settings/Settings";

interface IPanelProps {
  handleRewind: () => void;
  handlePlayPause: () => void;
  handleForward: () => void;
  handleSliderChange: (value: number[]) => void;
  handleVolumeChange: (value: number[]) => void;
}

const Panel: React.FC<IPanelProps> = ({
  handleRewind,
  handlePlayPause,
  handleForward,
  handleSliderChange,
  handleVolumeChange,
}) => {
  const { isPlaying, currentTime, duration, volume, setVolume } =
    usePlayerStore();
  const { setIsPlaylistOpen } = usePlaylistStore();
  const { isPomodoroOpen, setIsPomodoroOpen } = usePomodoroStore();
  const { setIsSoundFXOpen, isSoundFXOpen } = useWindowsStore();
  const { setIsSceneModalOpen, setIsSceneOpen } = useSceneStore();

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(prevVolume);
    } else {
      setVolume(0);
    }
  };

  const getVolumeIcon = (volume: number) => {
    if (volume >= 0.5) {
      return "volume-hi";
    } else if (volume > 0) {
      return "volume-lo";
    } else {
      return "volume-mute";
    }
  };

  return (
    <>
      <Settings />
      <div id="Panel" className="panel">
        <div className="panel__group">
          <ButtonIcon
            onClick={() => setIsPomodoroOpen(!isPomodoroOpen)}
            icon={<TimerPlusSVG />}
            tooltip={"Pomodoro"}
          />
          <ButtonIcon
            onClick={() => setIsSoundFXOpen(!isSoundFXOpen)}
            icon={<MixerIconSVG />}
            tooltip={"Sound effects"}
          />
        </div>
        <div className="panel__group">
          {/* <Button variant="glass" onClick={handleRewind}>
            -10s
          </Button> */}
          {/* <ButtonIcon
            onClick={handleForward}
            icon={<PrevTrackSVG />}
            tooltip={"Previous track"}
          /> */}
          <Button variant="glass" onClick={handlePlayPause}>
            {isPlaying ? <PauseIconSVG /> : <PlayIconSVG />}
          </Button>
          {/* <ButtonIcon
            onClick={handleForward}
            icon={<NextTrackSVG />}
            tooltip={"Next track"}
          /> */}
          {/* <div className="absolute bottom-[52px] rounded-full overflow-hidden left-0 py-4 w-full flex justify-center z-20">
            <Slider
              value={[currentTime]}
              min={0}
              max={duration}
              step={1}
              onValueChange={handleSliderChange}
            />
          </div> */}
        </div>
        <div className="panel__group">
          <ButtonIcon
            onClick={() => setIsPlaylistOpen(true)}
            icon={<PlaylistSVG />}
            tooltip={"Playlist"}
          />
          <ButtonIcon
            onClick={() => setIsSceneOpen(true)}
            icon={<SceneEditSVG />}
            tooltip={"Scene Settings"}
          />
          <Dropdown
            position="top"
            trigger={
              <ButtonIcon icon={<VolumeLoIconSVG />} tooltip={"Volume"} />
            }
          >
            <div className="flex flex-row gap-1 py-1 pl-1.5 pr-4">
              <Button
                label="Toggle mute"
                onClick={toggleMute}
                icon={getVolumeIcon(volume)}
                size="sm"
                variant="ghost"
              />
              <Volume volume={volume} handleVolumeChange={handleVolumeChange} />
            </div>
          </Dropdown>
          <ButtonIcon
            onClick={() => setIsSceneModalOpen(true)}
            icon={<SettingsIconSVG />}
            tooltip={"Settings"}
          />
          <ButtonIcon
            onClick={goFullscreen}
            icon={<MaximizeSVG />}
            tooltip={"Fullscreen"}
          />
        </div>
      </div>
    </>
  );
};

export default Panel;
