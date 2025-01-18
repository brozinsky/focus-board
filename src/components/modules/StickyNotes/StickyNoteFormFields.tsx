import React, {
  ChangeEvent,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import { cn } from "@/lib/utils";
// import TodoInput from "./TodoInput";
// import TodoItem from "./TodoItem";
import { FormikProps } from "formik";
import { TTodo } from "@/types/model-types";
import autoAnimate from "@formkit/auto-animate";

const StickyNoteFormFields = ({
  isEditing,
  form,
  todos,
}: {
  isEditing: boolean;
  form: FormikProps<any>;
  todos: TTodo[];
}) => {
  const textareaRefs = useRef<(HTMLTextAreaElement | null)[]>([]);
  // const [newTask, setNewTask] = useState<string>("");
  // const [tasks, setTasks] = useState<TTodo[]>(todos);

  const todoListRef = useRef(null);
  useEffect(() => {
    todoListRef.current && autoAnimate(todoListRef.current);
  }, [todoListRef]);

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

  // const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setNewTask(e.target.value);
  // };

  // const addTask = () => {
  //   if (newTask.trim()) {
  //     setTasks([
  //       ...tasks,
  //       { id: String(Date.now()), content: newTask, isCompleted: false },
  //     ]);
  //     setNewTask("");
  //   }
  // };

  // const incompleteTasks = useMemo(
  //   () => tasks.filter((task) => !task.isCompleted),
  //   [tasks]
  // );
  // const completedTasks = useMemo(
  //   () => tasks.filter((task) => task.isCompleted),
  //   [tasks]
  // );

  return (
    <>
      {form.values.isTitle && (
        <textarea
          name="title"
          onChange={form.handleChange}
          value={form.values.title}
          rows={1}
          ref={(el) => (textareaRefs.current[0] = el)}
          className={cn(
            isEditing ? "active" : "pointer-events-none",
            `overflow-hidden text-xl sticky-note__textarea sticky-note__textarea--${form.values.color}`
          )}
          placeholder={isEditing ? "Title" : ""}
          onKeyDown={(e) => e.stopPropagation()}
          disabled={!isEditing}
          unselectable="on"
          spellCheck={false}
        />
      )}
      {form.values.isContent && (
        <textarea
          name="content"
          onChange={form.handleChange}
          value={form.values.content}
          ref={(el) => (textareaRefs.current[1] = el)}
          className={cn(
            isEditing ? "active" : "pointer-events-none",
            `select-none flex-grow resize-none sticky-note__textarea sticky-note__textarea--${form.values.color}`
          )}
          placeholder={isEditing ? "Your note" : ""}
          onKeyDown={(e) => e.stopPropagation()}
          disabled={!isEditing}
          spellCheck={false}
        />
      )}
      {/* {form.values.isTodos && isEditing && (
        <TodoInput
          onChange={handleInputChange}
          value={newTask}
          onClick={addTask}
          color={form.values.color}
        />
      )} */}
      {/* {form.values.isTodos && (
        <ul ref={todoListRef} className="list-none p-0">
          {incompleteTasks.map((task) => (
            <TodoItem
              key={task.id}
              id={task.id}
              color={form.values.color}
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
              color={form.values.color}
              tasks={tasks}
              setTasks={setTasks}
              content={task.content}
              isCompleted={task.isCompleted}
            />
          ))}
        </ul>
      )} */}
    </>
  );
};

export default StickyNoteFormFields;
