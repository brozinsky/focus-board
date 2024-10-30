import React, { useState } from "react";
import TodoItem from "./TodoItem";
import useTodoTimerStore from "@/stores/zustand/useTodoTimerStore";
import Window from "../Window/Window";
import PlusSVG from "@/components/elements/svg/icons/interface/PlusSVG";
import CloseIconSVG from "@/components/elements/svg/icons/interface/CloseIconSVG";

const WindowTodoList = ({ styles }: { styles: any }) => {
  const { todoList, setTodoList } = useTodoTimerStore();
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleAddNewTask = () => {
    if (newTaskTitle.trim() === "") return;

    setTodoList((prevList) => [
      ...prevList,
      {
        id: prevList.length + 1,
        title: newTaskTitle,
        isCompleted: false,
        timeElapsed: 0,
        isRunning: false,
        timeEstimation: 25,
      },
    ]);

    setNewTaskTitle("");
    setIsEditing(false);
  };

  const handleStartEditing = () => {
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    setIsEditing(false);
    setNewTaskTitle("");
  };

  return (
    <Window name="todoList" styles={styles} title="Todo list">
      <div className="flex-between gap-4 mb-2 w-[350px]">
        <div className="w-full group/timer right-20 text-neutral-100 z-20">
          {isEditing ? (
            <div className="flex gap-1 items-stretch w-full">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Enter new task"
                className="border border-white/30 bg-transparent glass-blur rounded-lg px-2 w-full"
              />
              <div className="flex gap-1">
                <button
                  onClick={handleAddNewTask}
                  className="border active:translate-y-[2px] border-white/30 bg-transparent glass-blur rounded-lg p-3 hover:bg-white/20 transition w-full"
                >
                  Add
                </button>
                <button
                  onClick={handleCancelEditing}
                  className="border active:translate-y-[2px] border-white/30 bg-transparent glass-blur rounded-lg p-3 hover:bg-white/20 transition w-full"
                >
                  <CloseIconSVG />
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={handleStartEditing}
              className="border active:translate-y-[2px] border-white/30 bg-transparent glass-blur rounded-lg px-4 py-3 hover:bg-white/20 transition w-full"
            >
              <span className="flex items-center self-center mx-auto block w-fit">
                <PlusSVG /> Add new
              </span>
            </button>
          )}
          <div className="space-y-2 mt-2">
            {todoList.map((item) => (
              <TodoItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </Window>
  );
};

export default WindowTodoList;
