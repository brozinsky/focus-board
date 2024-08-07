import React, {
  ChangeEvent,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { TStickyNoteColor, TTodo } from "@/types/model-types";
import useStickyNotesStore from "@/stores/zustand/useStickyNotesStore";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
import autoAnimate from "@formkit/auto-animate";
import StickyNoteEditUI from "./StickyNoteEditUI";

type TProps = {
  id: string;
  color: TStickyNoteColor;
  title?: string;
  content?: string;
  styles: any;
  isTitle?: boolean;
  isContent?: boolean;
  isTodos?: boolean;
  todos?: TTodo[];
};

export function StickyNote({
  id,
  color,
  styles,
  content = "",
  title = "",
  isTitle = false,
  isContent = false,
  isTodos = false,
  todos = [],
}: TProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<TTodo[]>(todos);

  const todoListRef = useRef(null);

  useEffect(() => {
    todoListRef.current && autoAnimate(todoListRef.current);
  }, [todoListRef]);

  const { attributes, listeners, setNodeRef, transform, setActivatorNodeRef } =
    useDraggable({
      id,
      disabled: isEditing,
    });
  const textareaRefs = useRef<(HTMLTextAreaElement | null)[]>([]);

  const { updateStickyNote } = useStickyNotesStore();

  useEffect(() => {
    const handleResize = () => {
      textareaRefs.current.forEach((textarea) => {
        if (textarea) {
          textarea.style.height = "auto";
          textarea.style.height = `${textarea.scrollHeight}px`;
        }
      });
    };

    handleResize();

    window.addEventListener("input", handleResize);
    return () => {
      window.removeEventListener("input", handleResize);
    };
  }, []);

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : {};

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isEditing) {
      updateStickyNote(id, { title: e.target.value });
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isEditing) {
      updateStickyNote(id, { content: e.target.value });
    }
  };

  useEffect(() => {
    updateStickyNote(id, { todos: tasks });
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        { id: String(Date.now()), content: newTask, isCompleted: false },
      ]);
      setNewTask("");
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };

  const incompleteTasks = useMemo(
    () => tasks.filter((task) => !task.isCompleted),
    [tasks]
  );
  const completedTasks = useMemo(
    () => tasks.filter((task) => task.isCompleted),
    [tasks]
  );

  return (
    <div
      ref={setNodeRef}
      data-no-dnd="true"
      {...listeners}
      {...attributes}
      style={{ ...style, ...styles }}
      className="group pb-14"
    >
      <div
        className={cn(`sticky-note gap-2 relative sticky-note--${color}`, {
          "cursor-grab": !isEditing,
        })}
      >
        {isTitle && (
          <textarea
            rows={1}
            ref={(el) => (textareaRefs.current[0] = el)}
            className={cn(
              isEditing ? "active" : "pointer-events-none",
              `overflow-hidden text-xl sticky-note__textarea sticky-note__textarea--${color}`
            )}
            value={title}
            placeholder={isEditing ? "Title" : ""}
            onChange={(e) => handleTitleChange(e)}
            onKeyDown={(e) => e.stopPropagation()}
            disabled={!isEditing}
            unselectable="on"
          />
        )}
        {isContent && (
          <textarea
            ref={(el) => (textareaRefs.current[1] = el)}
            className={cn(
              isEditing ? "active" : "pointer-events-none",
              `select-none flex-grow resize-none sticky-note__textarea sticky-note__textarea--${color}`
            )}
            placeholder={isEditing ? "Your note" : ""}
            value={content}
            onChange={(e) => handleContentChange(e)}
            onKeyDown={(e) => e.stopPropagation()}
            disabled={!isEditing}
          />
        )}
        {isTodos && isEditing && (
          <TodoInput
            onChange={handleInputChange}
            value={newTask}
            onClick={addTask}
            color={color}
          />
        )}
        {isTodos && (
          <ul ref={todoListRef} className="list-none p-0">
            {incompleteTasks.map((task) => (
              <TodoItem
                key={task.id}
                id={task.id}
                color={color}
                tasks={tasks}
                setTasks={setTasks}
                content={task.content}
                isCompleted={task.isCompleted}
              />
            ))}
            {completedTasks.map((task) => (
              <TodoItem
                key={task.id}
                id={task.id}
                color={color}
                tasks={tasks}
                setTasks={setTasks}
                content={task.content}
                isCompleted={task.isCompleted}
              />
            ))}
          </ul>
        )}
        <StickyNoteEditUI
          id={id}
          color={color}
          tasks={tasks}
          setTasks={setTasks}
          isTitle={isTitle}
          isContent={isContent}
          isTodos={isTodos}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      </div>
    </div>
  );
}
