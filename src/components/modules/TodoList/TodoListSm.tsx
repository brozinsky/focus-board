import React from "react";
import TodoItem from "./TodoItem";
import Window from "../Window/Window";
import useTodoTimerStore from "@/stores/zustand/useTodoTimerStore";

const TodoListSm = () => {
  const { todoList } = useTodoTimerStore();
  return (
    <div className="flex-between gap-4 mb-2 w-full md:w-[350px]">
      <div className="w-full group/timer right-20 text-neutral-100 z-20">
        <div className="space-y-2 mt-2">
          {todoList.map((item) => (
            <TodoItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoListSm;
