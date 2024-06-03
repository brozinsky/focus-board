import React from "react";
import Stepper from "./Stepper"; // Adjust the import path as needed

interface IProps {
  isWorkSession: boolean;
  currentSession: number;
  totalSessions: number;
}

const PomodoroSessions = ({
  isWorkSession,
  currentSession,
  totalSessions,
}: IProps) => {
  return (
    <div className="mt-4">
      {/* <p>
        Session: {currentSession}/{totalSessions}
      </p> */}
      <div
        className="flex w-full items-center"
        aria-label="registration progress"
      >
        {Array.from({ length: totalSessions }, (_, i) => (
          <Stepper
            key={i + 1}
            isLast={i + 1 === totalSessions}
            step={i + 1}
            isWorkSession={isWorkSession}
            isCurrent={currentSession === i + 1}
            isCompleted={i +1 < currentSession}
          />
        ))}
      </div>
    </div>
  );
};

export default PomodoroSessions;
