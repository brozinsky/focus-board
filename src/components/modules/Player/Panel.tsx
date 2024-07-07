import usePlayerStore from "@/stores/zustand/usePlayerStore";
import React from "react";
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
import useSceneStore from "@/stores/zustand/useSceneStore";
import SceneEditSVG from "@/components/elements/svg/icons/interface/SceneEditSVG";
import Settings from "../settings/Settings";
import DropdownVolume from "@/components/ui/dropdowns/DropdownVolume";

interface IPanelProps {
  handleRewind: () => void;
  handlePlayPause: () => void;
  handleForward: () => void;
  handleSliderChange: (value: number[]) => void;
}

const Panel: React.FC<IPanelProps> = ({
  handleRewind,
  handlePlayPause,
  handleForward,
  handleSliderChange,
}) => {
  const { isPlaying, currentTime, duration } = usePlayerStore();
  const { setIsPlaylistOpen } = usePlaylistStore();
  const { isPomodoroOpen, setIsPomodoroOpen } = usePomodoroStore();
  const { setIsSoundFXOpen, isSoundFXOpen } = useWindowsStore();
  const { setIsSceneModalOpen, setIsSceneOpen } = useSceneStore();

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
          <ButtonIcon
            onClick={() => handlePlayPause()}
            icon={isPlaying ? <PauseIconSVG /> : <PlayIconSVG />}
            tooltip={isPlaying ? "Pause audio" : "Play audio"}
          />
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
          <DropdownVolume />
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
