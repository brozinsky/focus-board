import WindowTodoList from "./WindowTodoList";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import useWindowsStore, {
  createHandleDragEnd,
} from "@/stores/zustand/useWindowsStore";
import { restrictToParentElement } from "@dnd-kit/modifiers";

const TodoList = () => {
  const { windowPosition } = useWindowsStore();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );
  return (
    <div className="absolute pointer-events-none z-40 overflow-hidden top-4 right-4 left-4 bottom-4">
      <DndContext
        autoScroll={false}
        modifiers={[restrictToParentElement]}
        onDragEnd={createHandleDragEnd("todoList")}
        sensors={sensors}
      >
        <WindowTodoList
          styles={{
            position: "absolute",
            left: `${windowPosition.todoList.x}px`,
            top: `${windowPosition.todoList.y}px`,
          }}
        />
      </DndContext>
    </div>
  );
};

export default TodoList;