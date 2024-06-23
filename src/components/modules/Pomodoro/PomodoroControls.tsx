import NextTrackSVG from "@/components/elements/svg/icons/media/NextTrackSVG";
import PauseIconSVG from "@/components/elements/svg/icons/media/PauseIconSVG";
import PlayIconSVG from "@/components/elements/svg/icons/media/PlayIconSVG";
import RefreshSVG from "@/components/elements/svg/icons/media/RefreshSVG";
import Button from "@/components/ui/buttons/Button";
import ButtonIcon from "@/components/ui/buttons/ButtonIcon";

interface IProps {
  isRunning: boolean;
  handleRestart: () => void;
  handleStart: () => void;
  handlePause: () => void;
  handleNext: () => void;
  handleAdd10Minutes: () => void;
}

const PomodoroControls = ({
  isRunning,
  handleRestart,
  handleStart,
  handlePause,
  handleNext,
  handleAdd10Minutes,
}: IProps) => {
  return (
    <div className="mt-4 flex gap-4 items-center">
      <ButtonIcon
        onClick={handleRestart}
        icon={<RefreshSVG />}
        variant="glass"
        tooltip={"Restart timer"}
      />
      {!isRunning ? (
        <ButtonIcon
          className="rounded-full"
          size="lg"
          variant="glass"
          onClick={handleStart}
          icon={<PlayIconSVG />}
          tooltip={"Play"}
        />
      ) : (
        <ButtonIcon
          className="rounded-full"
          variant="glass"
          size="lg"
          onClick={handlePause}
          icon={<PauseIconSVG />}
          tooltip={"Pause"}
        />
      )}
      <ButtonIcon
        onClick={handleNext}
        icon={<NextTrackSVG />}
        variant="glass"
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
