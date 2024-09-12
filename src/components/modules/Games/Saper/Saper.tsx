import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import DeadSVG from "@/components/elements/svg/icons/games/saper/DeadSVG";
import SmileySVG from "@/components/elements/svg/icons/games/saper/SmileySVG";
import WinnerSVG from "@/components/elements/svg/icons/games/saper/WinnerSVG";
import useSaper from "@/hooks/games/saper/useSaper";
import SurprisedSVG from "@/components/elements/svg/icons/games/saper/SurprisedSVG";
import Window from "../../Window/Window";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Select from "@/components/ui/dropdowns/Select";

const LEVELS = {
  beginner: { gridSize: 8, numMines: 10 },
  intermediate: { gridSize: 16, numMines: 40 },
};

type LevelKey = keyof typeof LEVELS;

type TProps = {
  styles: any;
};

const levelOptions = [
  { id: 0, name: "Beginner", value: "beginner" },
  { id: 1, name: "Intermediate", value: "intermediate" },
];

export default function Saper({ styles }: TProps) {
  const [level, setLevel] = useState<LevelKey>("beginner");
  const isMobile = useMediaQuery(`(max-width: 1024px)`);

  const { gridSize, numMines } = LEVELS[level];

  const {
    getCellContent,
    formatTime,
    time,
    formatMinesLeft,
    minesLeft,
    initializeGrid,
    gameOver,
    gameWon,
    grid,
    revealCell,
    toggleFlag,
  } = useSaper(gridSize, numMines);

  const [faceIcon, setFaceIcon] = useState<
    "smiley" | "surprised" | "winner" | "dead"
  >("smiley");

  const handleCellClick = (row: number, col: number) => {
    setFaceIcon("surprised");

    revealCell(row, col);

    setTimeout(() => {
      if (gameOver) {
        setFaceIcon("dead");
      } else if (gameWon) {
        setFaceIcon("winner");
      } else {
        setFaceIcon("smiley");
      }
    }, 200);
  };

  useEffect(() => {
    setFaceIcon("smiley");
  }, [initializeGrid]);

  return (
    <Window name="saper" title="Minesweeper" styles={styles}>
      <div
        className={cn(
          level === "beginner" && !isMobile && "w-[285px]",
          level === "intermediate" && !isMobile && "w-[570px]",
          level === "beginner" && isMobile && "w-[190px]",
          level === "intermediate" && isMobile && "w-[380px]",
          "flex flex-col items-center justify-center h-fit rounded-lg"
        )}
      >
        <div className="flex justify-between items-center mb-4 w-full">
          <div className="font-digital text-3xl font-medium text-red-600 w-20 h-16 flex items-center justify-center bg-black rounded-md text-center">
            {formatMinesLeft(minesLeft)}
          </div>
          <button
            onClick={initializeGrid}
            className="p-2 bg-white/20 rounded-md active:translate-y-[2px] transition"
          >
            <span className="sr-only">Start</span>
            <span className="h-10 w-10 rounded-full block bg-yellow-300">
              {gameOver ? (
                <DeadSVG className="scale-125" />
              ) : gameWon ? (
                <WinnerSVG className="scale-125" />
              ) : faceIcon === "surprised" ? (
                <SurprisedSVG className="scale-125" />
              ) : (
                <SmileySVG className="scale-125" />
              )}
            </span>
          </button>
          <div className="font-digital text-3xl font-medium text-red-600 w-20 h-16 flex items-center justify-center bg-black rounded-md text-center">
            {formatTime(time)}
          </div>
        </div>

        <div
          className="grid gap-1 relative"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
          }}
        >
          {grid.map((row, i) =>
            row.map((cell, j) => (
              <button
                key={`${i}-${j}`}
                className={cn(
                  isMobile ? "w-5 h-5" : "w-8 h-8",
                  "max-h-8 max-w-8 text-xl font-bold",
                  cell.state === "revealed"
                    ? cell.value === "mine"
                      ? "bg-red-500"
                      : "bg-gray-200 cursor-default opacity-30"
                    : "bg-gray-300 hover:bg-gray-400",
                  (typeof cell.value === "number" &&
                    cell.state === "revealed" &&
                    [
                      "text-sky-500 opacity-100",
                      "text-emerald-500 opacity-100",
                      "text-rose-500 opacity-100",
                      "text-indigo-500 opacity-100",
                      "text-amber-900 opacity-100",
                      "text-teal-500 opacity-100",
                      "text-black opacity-100",
                      "text-gray-500 opacity-100",
                    ][cell.value - 1]) ||
                    ""
                )}
                onClick={() => handleCellClick(i, j)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  toggleFlag(i, j);
                }}
              >
                {getCellContent(cell)}
              </button>
            ))
          )}
        </div>

        <div className="flex justify-end space-x-4 w-full mt-4">
          <Select
            buttonClassName="w-[160px]"
            size={"sm"}
            variant={"glass"}
            options={levelOptions}
            state={level}
            setState={setLevel}
            displayValue={level}
            position={"top"}
          />
        </div>
      </div>
    </Window>
  );
}
