import { TPosition } from "@/types/model-types";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "@/utils/functions/fn-common";
import { DragEndEvent } from "@dnd-kit/core";
import { create } from "zustand";

export type TWindowName =
  | "pomodoro"
  | "timer"
  | "soundFX"
  | "soundFXFirstOpen"
  | "playlist"
  | "scene"
  | "todoList"
  | "habitTracker"
  | "spotify"
  | "saper"
  | "loginForm"
  | "sceneModal";

type TWindowPosition = {
  pomodoro: TPosition;
  timer: TPosition;
  todoList: TPosition;
  saper: TPosition;
  habitTracker: TPosition;
};
type TWindowPositionKey = keyof TWindowPosition;

interface IWindowsStore {
  windowPosition: TWindowPosition;
  setWindowPosition: (
    key: TWindowPositionKey,
    value: TPosition | ((currentPosition: TPosition) => TPosition)
  ) => void;
  handleDragEnd: (key: TWindowPositionKey) => (e: DragEndEvent) => void;

  isOpen: {
    //windows
    pomodoro: boolean;
    timer: boolean;
    todoList: boolean;
    saper: boolean;
    loginForm: boolean;
    spotify: boolean;
    habitTracker: boolean;

    //modals
    soundFX: boolean;
    soundFXFirstOpen: boolean;
    playlist: boolean;
    scene: boolean;
    sceneModal: boolean;
  };
  setIsOpen: (windowName: TWindowName, isOpen: boolean) => void;

  isMinimized: {
    pomodoro: boolean;
    timer: boolean;
  };
  setIsMinimized: (windowName: TWindowName, isMinimized: boolean) => void;
}

const initWindowPosition = {
  x: window.innerWidth / 2 - 50,
  y: window.innerHeight / 2 - 50,
};

const useWindowsStore = create<IWindowsStore>((set, get) => ({
  windowPosition: {
    pomodoro: getFromLocalStorage("pomodoroWindowPosition", initWindowPosition),
    timer: getFromLocalStorage("timerWindowPosition", initWindowPosition),
    todoList: getFromLocalStorage("todoListWindowPosition", initWindowPosition),
    saper: getFromLocalStorage("saperWindowPosition", initWindowPosition),
    habitTracker: getFromLocalStorage("habitTracker", initWindowPosition),
  },
  setWindowPosition: (key, value) => {
    set((state) => {
      const newPosition =
        typeof value === "function" ? value(state.windowPosition[key]) : value;

      const updatedWindowPosition = {
        ...state.windowPosition,
        [key]: newPosition,
      };

      setToLocalStorage(`${key}WindowPosition`, newPosition);

      return { windowPosition: updatedWindowPosition };
    });
  },
  handleDragEnd: (key) => (e: DragEndEvent) => {
    const { delta } = e;

    get().setWindowPosition(key, (prevPosition: TPosition) => ({
      x: prevPosition.x + delta.x,
      y: prevPosition.y + delta.y,
    }));
  },

  isOpen: {
    //windows
    pomodoro: false,
    timer: false,
    todoList: false,
    saper: false,
    loginForm: false,
    spotify: false,
    habitTracker: true,

    //modals
    soundFX: false,
    soundFXFirstOpen: false,
    playlist: false,
    scene: false,
    sceneModal: false,
  },
  setIsOpen: (windowName, isOpen) =>
    set((state) => ({
      isOpen: {
        ...state.isOpen,
        [windowName]: isOpen,
      },
    })),

  isMinimized: {
    pomodoro: false,
    timer: false,
  },
  setIsMinimized: (windowName, isMinimized) =>
    set((state) => ({
      isMinimized: {
        ...state.isMinimized,
        [windowName]: isMinimized,
      },
    })),
}));

export default useWindowsStore;

export function createHandleDragEnd(key: keyof TWindowPosition) {
  const { handleDragEnd } = useWindowsStore.getState();
  return (e: DragEndEvent) => handleDragEnd(key)(e);
}
