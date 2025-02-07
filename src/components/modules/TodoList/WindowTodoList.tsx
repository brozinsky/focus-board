import React from "react";
import TodoItem from "./TodoItem";
import Window from "../Window/Window";

const WindowTodoList = ({ styles }: { styles: any }) => {

  return (
    <Window name="todoList" styles={styles} title="Todo list">
      <div className="flex-between gap-4 mb-2 w-[350px]">
        <div className="w-full group/timer right-20 text-neutral-100 z-20">
         
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
