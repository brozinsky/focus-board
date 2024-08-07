import usePlayerStore from "@/stores/zustand/usePlayerStore";
import React, { useState } from "react";
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
import NotesSVG from "@/components/elements/svg/icons/interface/NotesSVG";
import ButtonIcon from "@/components/ui/buttons/ButtonIcon";
import SettingsIconSVG from "@/components/elements/svg/icons/interface/SettingsIconSVG";
import useSceneStore from "@/stores/zustand/useSceneStore";
import SceneEditSVG from "@/components/elements/svg/icons/interface/SceneEditSVG";
import Settings from "../settings/Settings";
import DropdownVolume from "@/components/ui/dropdowns/DropdownVolume";
import { Separator } from "@/components/ui/Separator/Separator";
import useStickyNotesStore from "@/stores/zustand/useStickyNotesStore";
import Dropdown from "@/components/ui/dropdowns/Dropdown";
import Checkbox from "@/components/ui/inputs/Checkbox";
import ButtonDropdown from "@/components/ui/buttons/ButtonDropdown";

interface IPanelProps {
  handlePlayPause: () => void;
}

const Panel: React.FC<IPanelProps> = ({ handlePlayPause }) => {
  const { isAudioPlaying } = usePlayerStore();
  const { setIsPlaylistOpen } = usePlaylistStore();
  const { isPomodoroOpen, setIsPomodoroOpen } = usePomodoroStore();
  const { setIsSoundFXOpen, isSoundFXOpen } = useWindowsStore();
  const { setIsSceneModalOpen, setIsSceneOpen } = useSceneStore();
  const { addStickyNote, areNotesVisible, setAreNotesVisible } =
    useStickyNotesStore();

  return (
    <>
      <Settings />
      <div id="Panel" className="panel">
        <div className="panel__group">
          <ButtonIcon
            onClick={() => handlePlayPause()}
            icon={isAudioPlaying ? <PauseIconSVG /> : <PlayIconSVG />}
            tooltip={isAudioPlaying ? "Pause audio" : "Play audio"}
          />
          <DropdownVolume />
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
          <Dropdown
            position={"top"}
            trigger={
              <ButtonIcon icon={<NotesSVG />} tooltip={"Sticky notes"} />
            }
          >
            <div className="flex flex-col gap-3 p-4">
              <div className="text-xl">Sticky notes</div>
              <Separator className="bg-white/30" />
              <ButtonDropdown
                onClick={() => addStickyNote("note")}
                isDsabled={!areNotesVisible}
              >
                + Add sticky note
              </ButtonDropdown>
              <ButtonDropdown
                onClick={() => addStickyNote("todo")}
                isDsabled={!areNotesVisible}
              >
                + Add todo list
              </ButtonDropdown>
              <Checkbox
                isDisabled={false}
                isSelected={areNotesVisible}
                state={areNotesVisible}
                onChange={setAreNotesVisible}
              >
                Show notes
              </Checkbox>
            </div>
          </Dropdown>

          <ButtonIcon
            onClick={() => setIsPomodoroOpen(!isPomodoroOpen)}
            icon={<TimerPlusSVG />}
            tooltip={"Pomodoro"}
          />
          <Separator orientation="vertical" className="mx-1 h-10 bg-white/20" />
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
          <ButtonIcon
            onClick={() => setIsSoundFXOpen(!isSoundFXOpen)}
            icon={<MixerIconSVG />}
            tooltip={"Sound effects"}
          />
          <Separator orientation="vertical" className="mx-1 h-10 bg-white/20" />
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
