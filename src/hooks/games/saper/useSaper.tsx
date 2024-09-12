import React, { useCallback, useEffect, useState } from "react";

type TCellValue = "mine" | number;
type TCellState = "hidden" | "revealed" | "flagged";

type TCell = {
  value: TCellValue;
  state: TCellState;
};

const useSaper = (gridSize: number, numMines: number) => {
  const [grid, setGrid] = useState<TCell[][]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [minesLeft, setMinesLeft] = useState<number>(numMines);
  const [time, setTime] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  const initializeGrid = useCallback(() => {
    const newGrid: TCell[][] = [];

    for (let i = 0; i < gridSize; i++) {
      newGrid.push([]);
      for (let j = 0; j < gridSize; j++) {
        newGrid[i].push({ value: 0, state: "hidden" });
      }
    }

    let minesPlaced = 0;
    while (minesPlaced < numMines) {
      const row = Math.floor(Math.random() * gridSize);
      const col = Math.floor(Math.random() * gridSize);
      if (newGrid[row][col].value !== "mine") {
        newGrid[row][col].value = "mine";
        minesPlaced++;
      }
    }

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (newGrid[i][j].value !== "mine") {
          let count = 0;
          for (let di = -1; di <= 1; di++) {
            for (let dj = -1; dj <= 1; dj++) {
              const ni = i + di;
              const nj = j + dj;
              if (
                ni >= 0 &&
                ni < gridSize &&
                nj >= 0 &&
                nj < gridSize &&
                newGrid[ni][nj].value === "mine"
              ) {
                count++;
              }
            }
          }
          newGrid[i][j].value = count;
        }
      }
    }

    setGrid(newGrid);
    setGameOver(false);
    setGameWon(false);
    setMinesLeft(numMines);
    setTime(0);
    setGameStarted(false);
  }, [gridSize, numMines]);

  useEffect(() => {
    initializeGrid();
  }, [initializeGrid]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameStarted && !gameOver && !gameWon) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted, gameOver, gameWon]);

  const revealCell = (row: number, col: number) => {
    if (gameOver || gameWon || grid[row][col].state !== "hidden") return;

    if (!gameStarted) {
      setGameStarted(true);
    }

    const newGrid = [...grid];

    if (newGrid[row][col].value === "mine") {
      newGrid[row][col].state = "revealed";
      setGrid(newGrid);
      setGameOver(true);
      return;
    }

    const revealAdjacentCells = (r: number, c: number) => {
      if (
        r < 0 ||
        r >= gridSize ||
        c < 0 ||
        c >= gridSize ||
        newGrid[r][c].state !== "hidden"
      )
        return;

      newGrid[r][c].state = "revealed";

      if (newGrid[r][c].value === 0) {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            revealAdjacentCells(r + dr, c + dc);
          }
        }
      }
    };

    revealAdjacentCells(row, col);
    setGrid(newGrid);

    const hiddenNonMines = newGrid
      .flat()
      .filter(
        (cell) => cell.state === "hidden" && cell.value !== "mine"
      ).length;

    if (hiddenNonMines === 0) {
      setGameWon(true);

      const flaggedGrid = newGrid.map((row) =>
        row.map((cell) => {
          if (cell.value === "mine" && cell.state !== "flagged") {
            return { ...cell, state: "flagged" as TCellState };
          }
          return cell;
        })
      );

      setGrid(flaggedGrid);
    }
  };

  const toggleFlag = (row: number, col: number) => {
    if (gameOver || gameWon || grid[row][col].state === "revealed") return;

    const newGrid = [...grid];
    if (newGrid[row][col].state === "hidden") {
      newGrid[row][col].state = "flagged";
      setMinesLeft((prevMinesLeft) => prevMinesLeft - 1);
    } else if (newGrid[row][col].state === "flagged") {
      newGrid[row][col].state = "hidden";
      setMinesLeft((prevMinesLeft) => prevMinesLeft + 1);
    }
    setGrid(newGrid);

    const allMinesFlaggedCorrectly = newGrid.every((row) =>
      row.every(
        (cell) =>
          (cell.value === "mine" && cell.state === "flagged") ||
          (cell.value !== "mine" && cell.state !== "flagged")
      )
    );

    const hiddenNonMines = newGrid
      .flat()
      .filter(
        (cell) => cell.state === "hidden" && cell.value !== "mine"
      ).length;

    if (allMinesFlaggedCorrectly && hiddenNonMines === 0) {
      setGameWon(true);
    }
  };

  const getCellContent = (cell: TCell) => {
    if (cell.state === "hidden") return "";
    if (cell.state === "flagged") return "🚩";
    if (cell.value === "mine") return "💣";
    return cell.value === 0 ? "" : cell.value;
  };

  const formatTime = (time: number) => {
    return time.toString().padStart(3, "0");
  };

  const formatMinesLeft = (minesLeft: number) => {
    return minesLeft.toString().padStart(3, "0");
  };

  return {
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
  };
};

export default useSaper;
