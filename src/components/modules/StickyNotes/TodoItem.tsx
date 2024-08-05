import CloseIconSVG from "@/components/elements/svg/icons/interface/CloseIconSVG";
import TrashIconSVG from "@/components/elements/svg/icons/interface/TrashIconSVG";
import ButtonIcon from "@/components/ui/buttons/ButtonIcon";
import Checkbox from "@/components/ui/inputs/Checkbox";
import { cn } from "@/lib/utils";
import { TStickyNoteColor, TTodo } from "@/types/model-types";

type TProps = {
  isCompleted: boolean;
  content: string;
  id: string;
  tasks: TTodo[];
  setTasks: (value: TTodo[]) => void;
  color: TStickyNoteColor;
};

const TodoItem = ({
  tasks,
  setTasks,
  content,
  isCompleted,
  id,
  color,
}: TProps) => {
  const deleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const toggleTask = (taskId: string) => {
    const updatedTasks = tasks.map((task) =>
      id === taskId ? { ...task, isCompleted: !isCompleted } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <li
      className={`group/todoitem hover:bg-white/30 transition flex items-center justify-between p-2 mb-2 text-note-${color}`}
    >
      <Checkbox
        variant="dark"
        isDisabled={false}
        isSelected={isCompleted}
        state={isCompleted}
        onChange={() => toggleTask(id)}
      >
        <span
          className={cn(
            isCompleted ? "line-through" : "",
            `pl-1 text-note-${color}`
          )}
        >
          {content}
        </span>
      </Checkbox>
      <ButtonIcon
        size="sm"
        className={cn(
          "p-1 text-sm text-white rounded-lg opacity-0 group-hover/todoitem:opacity-100"
        )}
        onClick={() => deleteTask(id)}
        icon={<CloseIconSVG pathClass="stroke-background" />}
        tooltip={"Delete"}
      />
    </li>
  );
};

export default TodoItem;
