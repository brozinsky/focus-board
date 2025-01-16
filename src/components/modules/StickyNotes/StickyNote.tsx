import React, {
  ChangeEvent,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { TStickyNoteColor, TTodo, TUserStatus } from "@/types/model-types";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
import autoAnimate from "@formkit/auto-animate";
import StickyNoteEditUI from "./StickyNoteEditUI";
import useStickyNoteForm from "@/hooks/forms/useStickyNoteForm";

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
  userStatus: TUserStatus;
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
  userStatus,
}: TProps) {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<TTodo[]>(todos);

  const todoListRef = useRef(null);
  useEffect(() => {
    todoListRef.current && autoAnimate(todoListRef.current);
  }, [todoListRef]);

  const { stickyNotesForm, isEditing, setIsEditing } = useStickyNoteForm(
    id,
    title,
    content,
    color,
    todos,
    isTitle,
    isContent,
    isTodos
  );

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    disabled: isEditing,
  });

  const textareaRefs = useRef<(HTMLTextAreaElement | null)[]>([]);

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
      className="group/panel pb-14 pointer-events-auto"
    >
      <form
        onSubmit={stickyNotesForm.handleSubmit}
        className={cn(
          `sticky-note gap-2 relative sticky-note--${stickyNotesForm.values.color}`,
          {
            "cursor-grab": !isEditing,
          }
        )}
      >
        {stickyNotesForm.values.isTitle && (
          <textarea
            name="title"
            onChange={stickyNotesForm.handleChange}
            value={stickyNotesForm.values.title}
            rows={1}
            ref={(el) => (textareaRefs.current[0] = el)}
            className={cn(
              isEditing ? "active" : "pointer-events-none",
              `overflow-hidden text-xl sticky-note__textarea sticky-note__textarea--${color}`
            )}
            placeholder={isEditing ? "Title" : ""}
            onKeyDown={(e) => e.stopPropagation()}
            disabled={!isEditing}
            unselectable="on"
            spellCheck={false}
          />
        )}
        {stickyNotesForm.values.isContent && (
          <textarea
            name="content"
            onChange={stickyNotesForm.handleChange}
            value={stickyNotesForm.values.content}
            ref={(el) => (textareaRefs.current[1] = el)}
            className={cn(
              isEditing ? "active" : "pointer-events-none",
              `select-none flex-grow resize-none sticky-note__textarea sticky-note__textarea--${color}`
            )}
            placeholder={isEditing ? "Your note" : ""}
            onKeyDown={(e) => e.stopPropagation()}
            disabled={!isEditing}
            spellCheck={false}
          />
        )}
        {stickyNotesForm.values.isTodos && isEditing && (
          <TodoInput
            onChange={handleInputChange}
            value={newTask}
            onClick={addTask}
            color={color}
          />
        )}
        {stickyNotesForm.values.isTodos && (
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
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          form={stickyNotesForm}
          userStatus={userStatus}
        />
      </form>
    </div>
  );
}
