import React, { useState } from "react";
import Window from "../Window/Window";
import HabitTable from "./HabitTable";

const WindowHabitTracker = ({ styles }: { styles: any }) => {
  return (
    <Window name="habitTracker" styles={styles} title="Habit Tracker">
      <div className="flex-between gap-4 mb-2 w-[650px]">
        <div className="w-full group/timer right-20 text-neutral-100 z-20">
          <HabitTable />
        </div>
      </div>
    </Window>
  );
};

export default WindowHabitTracker;
