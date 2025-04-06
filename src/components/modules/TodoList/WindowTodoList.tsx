import React from "react";
import Window from "../Window/Window";
import TodoListSm from "./TodoListSm";

const WindowTodoList = ({ styles }: { styles: any }) => {
  return (
    <Window name="todoList" styles={styles} title="Todo list">
      <TodoListSm />
    </Window>
  );
};

export default WindowTodoList;
