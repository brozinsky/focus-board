import React, {
  ChangeEvent,
  useEffect,
  useRef,
  useState,
  memo,
  useMemo,
} from "react";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import CheckSVG from "@/components/elements/svg/icons/interface/CheckSVG";
import { TStickyNoteColor, TTodo } from "@/types/model-types";
import useStickyNotesStore from "@/stores/zustand/useStickyNotesStore";
import EditIconSVG from "@/components/elements/svg/icons/interface/EditIconSVG";
import ButtonIcon from "@/components/ui/buttons/ButtonIcon";
import TrashIconSVG from "@/components/elements/svg/icons/interface/TrashIconSVG";
import Checkbox from "@/components/ui/inputs/Checkbox";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
import autoAnimate from "@formkit/auto-animate";

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

const COLORS = [
  { name: "yellow" },
  { name: "cyan" },
  { name: "purple" },
  { name: "green" },
  { name: "violet" },
  { name: "white" },
];

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
  const [isEditing, setIsEditing] = useState(false);
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

  const { updateStickyNote, removeStickyNote, stickyNotes } =
    useStickyNotesStore();

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

  const handleColorChange = (newColor: TStickyNoteColor) => {
    if (isEditing) {
      updateStickyNote(id, { color: newColor });
    }
  };

  const handleTitleCheckbox = (value: boolean) => {
    if (isEditing) {
      updateStickyNote(id, { isTitle: value });
    }
  };

  const handleContentCheckbox = (value: boolean) => {
    if (isEditing) {
      updateStickyNote(id, { isContent: value });
    }
  };

  const handleTodoListCheckbox = (value: boolean) => {
    if (isEditing) {
      updateStickyNote(id, { isTodos: value });
    }
  };

  useEffect(() => {
    updateStickyNote(id, { todos: tasks });
  }, [tasks]);

  useEffect(() => {
    console.log(stickyNotes);
  }, [stickyNotes]);

  // const handleTasksChange = (value: TTodo[]) => {
  //   if (isEditing) {
  //     updateStickyNote(id, { todos: value });
  //   }
  // };

  const handleEditToggle = (e: Event) => {
    e.stopPropagation();
    setIsEditing(!isEditing);
  };

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        { id: String(Date.now()), content: newTask, isCompleted: false },
      ]);
      setNewTask("");
    }
  };

  const deleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const toggleTask = (taskId: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(updatedTasks);
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
      <div className={cn(`sticky-note gap-2 relative sticky-note--${color}`,
         {"cursor-grab": !isEditing}
      )}>
        {!isEditing && (
          <div className="absolute top-0 bottom-0 right-0 left-0 cursor-grab pointer-events-none"></div>
        )}
        <ButtonIcon
          className={cn(
            "group/edit absolute -bottom-12 right-2 bg-background hover:bg-primary hover:opacity-100",
            !isEditing && "group-hover:opacity-100 opacity-0 "
          )}
          onClick={handleEditToggle}
          icon={
            !isEditing ? (
              <EditIconSVG pathClass="group-hover/edit:stroke-foreground-primary stroke-foreground" />
            ) : (
              <CheckSVG pathClass="group-hover/edit:stroke-foreground-primary stroke-foreground" />
            )
          }
          tooltip={"Edit"}
        />
        <ButtonIcon
          className={cn(
            "group/delete absolute -bottom-12 left-2 bg-background hover:bg-red-500 hover:opacity-100 ",
            !isEditing && "group-hover:opacity-100 opacity-0"
          )}
          onClick={() => removeStickyNote(id)}
          icon={
            <TrashIconSVG pathClass="group-hover/delete:stroke-foreground-primary stroke-foreground" />
          }
          tooltip={"Delete"}
        />
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
        {isEditing && (
          <div className="absolute -right-2 translate-x-full w-42 top-0">
            <div className="bg-background p-4 rounded-md flex flex-col gap-2">
              <Checkbox
                isDisabled={false}
                isSelected={isTitle}
                state={isTitle}
                onChange={handleTitleCheckbox}
              >
                Show title
              </Checkbox>
              <Checkbox
                isDisabled={false}
                isSelected={isContent}
                state={isContent}
                onChange={handleContentCheckbox}
              >
                Show content
              </Checkbox>
              <Checkbox
                isDisabled={false}
                isSelected={isTodos}
                state={isTodos}
                onChange={handleTodoListCheckbox}
              >
                Todo list
              </Checkbox>
            </div>
          </div>
        )}
        {isEditing && (
          <div className="sticky-note__colors">
            {COLORS.map((item) => (
              <div
                key={item.name}
                className={cn(
                  item.name === color && "sticky-note__color--active",
                  `sticky-note__color sticky-note__color--${item.name}`
                )}
                onClick={() => handleColorChange(item.name as TStickyNoteColor)}
              >
                {item.name === color && <CheckSVG pathClass="stroke-black" />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
