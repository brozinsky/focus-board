import React from "react";
import Window from "../Window/Window";
import TimerSm from "./TimerSm";

const WindowTimer = ({ styles }: { styles: any }) => {
  return (
    <Window name="timer" styles={styles} title="Timer">
      <TimerSm />
    </Window>
  );
};

export default WindowTimer;
