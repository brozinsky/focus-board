import usePlayerStore from "@/stores/zustand/usePlayerStore";
import React from "react";
import PlayIconSVG from "@/components/elements/svg/icons/media/PlayIconSVG";
import PauseIconSVG from "@/components/elements/svg/icons/media/PauseIconSVG";
import MixerIconSVG from "@/components/elements/svg/icons/interface/MixerIconSVG";
import useWindowsStore from "@/stores/zustand/useWindowsStore";
import MaximizeSVG from "@/components/elements/svg/icons/interface/MaximizeSVG";
import { goFullscreen } from "@/utils/functions/fn-common";
import TimerPlusSVG from "@/components/elements/svg/icons/interface/TimerPlusSVG";
import NotesSVG from "@/components/elements/svg/icons/interface/NotesSVG";
import ButtonIcon from "@/components/ui/buttons/ButtonIcon";
import SettingsIconSVG from "@/components/elements/svg/icons/interface/SettingsIconSVG";
import SceneEditSVG from "@/components/elements/svg/icons/interface/SceneEditSVG";
import Settings from "../settings/Settings";
import DropdownVolume from "@/components/ui/dropdowns/DropdownVolume";
import { Separator } from "@/components/ui/Separator/Separator";
import useStickyNotesStore from "@/stores/zustand/useStickyNotesStore";
import Dropdown from "@/components/ui/dropdowns/Dropdown";
import Checkbox from "@/components/ui/inputs/Checkbox";
import ButtonDropdown from "@/components/ui/buttons/ButtonDropdown";
import MusicNoteSVG from "@/components/elements/svg/icons/media/MusicNoteSVG";
import TasksSVG from "@/components/elements/svg/icons/interface/TasksSVG";
import HourglassSVG from "@/components/elements/svg/icons/interface/HourglassSVG";
import TimerSVG from "@/components/elements/svg/icons/interface/TimerSVG";
import GameControllerSVG from "@/components/elements/svg/icons/interface/GameControllerSVG";
import FlagSVG from "@/components/elements/svg/icons/games/saper/FlagSVG";
import { useToast } from "@/hooks/useToast";
import NowPlaying from "@/components/ui/NowPlaying";
import UserIconSVG from "@/components/elements/svg/icons/interface/UserIconSVG";
import AuthModal from "../auth/AuthModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog/Dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/dialog/AlertDialog";
import OnboardingDialog from "@/components/ui/dialog/OnboardingDialog";
import SpotifyPlayer from "./SpotifyPlayer";
import DrawerSpotifyPlaylist from "@/components/ui/drawer/DrawerSpotifyPlaylist";
import usePolaroidStore from "@/stores/zustand/usePolaroidStore";
import CameraOffSVG from "@/components/elements/svg/icons/interface/panel/CameraOffSVG";
import CameraSVG from "@/components/elements/svg/icons/interface/panel/CameraSVG";

interface IPanelProps {
  handlePlayPause: () => void;
}

const Panel: React.FC<IPanelProps> = ({ handlePlayPause }) => {
  const { isAudioPlaying, currentAudio, audioSource, setAudioSource } =
    usePlayerStore();
  const { isOpen, setIsOpen } = useWindowsStore();
  const { addStickyNote, areNotesVisible, setAreNotesVisible } =
    useStickyNotesStore();
  const { toast } = useToast();
  const { addNewPolaroid, arePhotosVisible, setArePhotosVisible } =
    usePolaroidStore();

  return (
    <>
      <Settings />
      <AuthModal />
      <div id="Panel" className="panel">
        <div className="panel__group">
          {audioSource === "spotify" && <SpotifyPlayer />}
          {audioSource === "youtube" && (
            <>
              <ButtonIcon
                onClick={() => handlePlayPause()}
                icon={isAudioPlaying ? <PauseIconSVG /> : <PlayIconSVG />}
                tooltip={isAudioPlaying ? "Pause audio" : "Play audio"}
                disabled={!currentAudio}
              />
              <DropdownVolume disabled={!currentAudio} />
            </>
          )}
          {/* {audioSource === "youtube" ? (
            <ButtonIcon
              onClick={() => setIsOpen("playlist", true)}
              icon={<MusicNoteSVG />}
              tooltip={"Playlist"}
            />
          ) : (
            <DrawerSpotifyPlaylist />
          )} */}

          <DrawerSpotifyPlaylist />

          {audioSource === "youtube" && (
            <>
              <NowPlaying title={currentAudio?.title} />
            </>
          )}
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
          <div>tester?</div>
          <Dialog>
            <DialogTrigger>Open</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          {/* <button
            onClick={() => {
              toast({
                title: "You're waking up in 5 hours",
                description: "Sleep noification",
                icon: <FlagSVG />,
              });
            }}
          >
            Toast test
          </button> */}
          <OnboardingDialog />
          <Dropdown
            position={"top"}
            trigger={
              <ButtonIcon
                icon={arePhotosVisible ? <CameraSVG /> : <CameraOffSVG />}
                tooltip={"Photos"}
              />
            }
          >
            <div className="flex flex-col gap-3 p-4">
              <div className="text-xl">Photos</div>
              <Separator className="bg-white/30" />
              <ButtonDropdown
                onClick={addNewPolaroid}
                isDsabled={!arePhotosVisible}
              >
                + Add new photo
              </ButtonDropdown>
              <Checkbox
                isDisabled={false}
                isSelected={arePhotosVisible}
                state={arePhotosVisible}
                onChange={setArePhotosVisible}
              >
                Show photos
              </Checkbox>
            </div>
          </Dropdown>
          <Dropdown
            position={"top"}
            trigger={
              <ButtonIcon icon={<GameControllerSVG />} tooltip={"Games"} />
            }
          >
            <div className="flex flex-col gap-3 p-4">
              <div className="text-xl">Games</div>
              <Separator className="bg-white/30" />
              <ButtonIcon
                isOpen={isOpen.saper}
                className="relative"
                onClick={() => setIsOpen("saper", !isOpen.saper)}
                icon={<FlagSVG />}
                tooltip={"Minesweeper"}
              />
            </div>
          </Dropdown>
          <Separator orientation="vertical" className="mx-1 h-10 bg-white/20" />
          <ButtonIcon
            isOpen={isOpen.timer}
            className="relative"
            onClick={() => setIsOpen("timer", !isOpen.timer)}
            icon={<HourglassSVG />}
            tooltip={"Timer"}
          />
          <ButtonIcon
            isOpen={isOpen.pomodoro}
            className="relative"
            onClick={() => setIsOpen("pomodoro", !isOpen.pomodoro)}
            icon={!isOpen.pomodoro ? <TimerSVG /> : <TimerPlusSVG />}
            tooltip={"Pomodoro"}
          />
          <Separator orientation="vertical" className="mx-1 h-10 bg-white/20" />
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
            className="relative"
            isOpen={isOpen.todoList}
            onClick={() => setIsOpen("todoList", !isOpen.todoList)}
            icon={<TasksSVG />}
            tooltip={"Todo list"}
          />
          <Separator orientation="vertical" className="mx-1 h-10 bg-white/20" />

          <div className="relative z-100">
            <ButtonIcon
              onClick={() => setIsOpen("scene", true)}
              icon={<SceneEditSVG />}
              tooltip={"Scene Settings"}
            />
          </div>
          <ButtonIcon
            onClick={() => setIsOpen("soundFX", !isOpen.soundFX)}
            icon={<MixerIconSVG />}
            tooltip={"Sound effects"}
          />
          <Separator orientation="vertical" className="mx-1 h-10 bg-white/20" />
          <ButtonIcon
            onClick={() => setIsOpen("loginForm", true)}
            icon={<UserIconSVG />}
            tooltip={"User"}
          />
          <ButtonIcon
            onClick={() => setIsOpen("sceneModal", true)}
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
