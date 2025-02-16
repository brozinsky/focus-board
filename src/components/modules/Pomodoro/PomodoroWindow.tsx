import Window from "../Window/Window";
import PomodoroSm from "./PomodoroSm";

type TProps = {
  setIsSettingsOpen: (value: boolean) => void;
  styles: any;
};

const PomodoroWindow = ({ setIsSettingsOpen, styles }: TProps) => {
  return (
    <Window
      name="pomodoro"
      title="Pomodoro Timer"
      styles={styles}
      onSettings={setIsSettingsOpen}
    >
      <PomodoroSm />
    </Window>
  );
};

export default PomodoroWindow;
