import { TPosition } from "@/types/model/global.model";
import { TTimerTodoItem } from "@/types/model/todo-list.model";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "@/utils/common.utils";
import { create } from "zustand";

interface IStore {
  todoList: TTimerTodoItem[];
  isTodoListOpen: boolean;
  setIsTodoListOpen: (value: boolean) => void;
  windowPosition: TPosition;
  setWindowPosition: (
    value: TPosition | ((prev: TPosition) => TPosition)
  ) => void;
  setTodoList: (
    updateFn: (prevList: TTimerTodoItem[]) => TTimerTodoItem[]
  ) => void;
  deleteTask: (id: number) => void;
}

const useTodoTimerStore = create<IStore>((set) => ({
  todoList: getFromLocalStorage("todoTimerList", [
    {
      id: 1,
      title: "Task nr 1",
      isCompleted: false,
      timeElapsed: 0,
      isRunning: false,
      timeEstimation: 25,
    },
    {
      id: 2,
      title: "Task nr 2",
      isCompleted: true,
      timeElapsed: 0,
      isRunning: false,
      timeEstimation: 60,
    },
    {
      id: 3,
      title: "Task nr 3",
      isCompleted: false,
      timeElapsed: 0,
      isRunning: false,
      timeEstimation: 25,
    },
  ]),
  isTodoListOpen: getFromLocalStorage("isTodoListOpen", false),
  setIsTodoListOpen: (value) => set({ isTodoListOpen: value }),
  windowPosition: getFromLocalStorage("todoListWindowPosition", {
    x: window.innerWidth / 2 - 50,
    y: window.innerHeight / 2 - 50,
  }),
  setWindowPosition: (value) => {
    set((state) => {
      const newPosition =
        typeof value === "function" ? value(state.windowPosition) : value;
      setToLocalStorage("todoListWindowPosition", newPosition);
      return { windowPosition: newPosition };
    });
  },
  setTodoList: (updateFn) =>
    set((state) => {
      const updatedList = updateFn(state.todoList);
      setToLocalStorage("todoTimerList", updatedList);
      return { todoList: updatedList };
    }),
  deleteTask: (id) =>
    set((state) => {
      const updatedList = state.todoList.filter((task) => task.id !== id);
      setToLocalStorage("todoTimerList", updatedList);
      return { todoList: updatedList };
    }),
}));

export default useTodoTimerStore;
