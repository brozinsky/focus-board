import React from "react";

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
      <p>
        Session: {currentSession}/{totalSessions}
      </p>
      <p>
        {isWorkSession
          ? "Work Session"
          : currentSession === totalSessions
          ? "Long Break"
          : "Break"}
      </p>
    </div>
  );
};

export default PomodoroSessions;
