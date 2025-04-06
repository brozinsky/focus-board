import NextTrackSVG from "@/components/elements/svg/icons/media/NextTrackSVG";
import PauseIconSVG from "@/components/elements/svg/icons/media/PauseIconSVG";
import PlayIconSVG from "@/components/elements/svg/icons/media/PlayIconSVG";
import PrevTrackSVG from "@/components/elements/svg/icons/media/PrevTrackSVG";
import RefreshSVG from "@/components/elements/svg/icons/media/RefreshSVG";
import ButtonIcon from "@/components/ui/buttons/ButtonIcon";

interface IProps {
  isRunning: boolean;
  handleRestart: () => void;
  handleStart: () => void;
  handlePause: () => void;
  handleNext: () => void;
  handlePrev: () => void;
  handleAdd10Minutes: () => void;
  currentSession: number;
  isWorkSession: boolean;
}

const PomodoroControls = ({
  isRunning,
  handleRestart,
  handleStart,
  handlePause,
  handleNext,
  handlePrev,
  currentSession,
  isWorkSession
}:
IProps) => {
  return (
    <div className="mt-4 flex gap-4 items-center">
      <ButtonIcon
        className="absolute bottom-32 left-6"
        onClick={handleRestart}
        icon={<RefreshSVG />}
        variant="ghost"
        tooltip={"Restart timer"}
      />
      <ButtonIcon
        disabled={currentSession === 1 && isWorkSession}
        onClick={handlePrev}
        icon={<PrevTrackSVG />}
        variant="ghost"
        tooltip={"Previous step"}
      />
      {!isRunning ? (
        <ButtonIcon
          className="rounded-full"
          size="lg"
          variant="glass"
          rounded="circle"
          onClick={handleStart}
          icon={<PlayIconSVG />}
          tooltip={"Play"}
        />
      ) : (
        <ButtonIcon
          className="rounded-full"
          variant="primary"
          size="lg"
          rounded="circle"
          onClick={handlePause}
          icon={<PauseIconSVG pathClass="stroke-foreground-primary" />}
          tooltip={"Pause"}
        />
      )}
      <ButtonIcon
        onClick={handleNext}
        icon={<NextTrackSVG />}
        variant="ghost"
        tooltip={"Next step"}
      />
      {/* <ButtonIcon
        onClick={handleAdd10Minutes}
        icon={<div>+10m</div>}
        tooltip={"Add 10 minutes"}
      /> */}
    </div>
  );
};

export default PomodoroControls;
