import React, { memo, useCallback, useState } from "react";
import ArrowSmSVG from "@/components/elements/svg/icons/interface/ArrowSmSVG";
import CloseIconSVG from "@/components/elements/svg/icons/interface/CloseIconSVG";
import EditIconSVG from "@/components/elements/svg/icons/interface/EditIconSVG";
import TrashIconSVG from "@/components/elements/svg/icons/interface/TrashIconSVG";
import PlayIconSVG from "@/components/elements/svg/icons/media/PlayIconSVG";
import ButtonIcon from "@/components/ui/buttons/ButtonIcon";
import Checkbox from "@/components/ui/inputs/Checkbox";
import { cn } from "@/lib/utils";
import { TTimerTodoItem } from "@/types/model-types";
import useTodoTimerStore from "@/stores/zustand/useTodoTimerStore";

type TProps = {
  item: TTimerTodoItem;
};

const TodoItem = ({ item }: TProps) => {
  const { setTodoList, deleteTask } = useTodoTimerStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(item.title);

  const handleSave = useCallback(() => {
    setTodoList((prevList) =>
      prevList.map((todo) =>
        todo.id === item.id ? { ...todo, title: editedTitle } : todo
      )
    );
    setIsEditing(false);
  }, [editedTitle, item.id, setTodoList]);

  const handleCancel = useCallback(() => {
    setEditedTitle(item.title);
    setIsEditing(false);
  }, [item.title]);

  const handleToggleCompletion = useCallback(() => {
    setTodoList((prevList) =>
      prevList.map((todo) =>
        todo.id === item.id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  }, [item.id, item.isCompleted, setTodoList]);

  const handleDelete = useCallback(() => {
    deleteTask(item.id);
  }, [item.id, deleteTask]);

  return (
    <div
      className={cn(
        "group/item glass-blur p-4 border border-foreground-muted rounded-md flex flex-col gap-2 pr-12",
        item.isCompleted && "opacity-60"
      )}
    >
      <div className="group-hover/item:visible group-hover/item:opacity-100 opacity-0 invisible right-0.5 top-0.5 absolute transition">
        <ButtonIcon
          variant="glass"
          size="sm"
          onClick={handleDelete}
          icon={<TrashIconSVG />}
          tooltip={"Remove"}
        />
      </div>
      {!isEditing && (
        <div className="group-hover/item:visible group-hover/item:opacity-100 opacity-0 invisible right-0.5 bottom-0.5 absolute transition">
          <ButtonIcon
            variant="glass"
            size="sm"
            onClick={() => setIsEditing(true)}
            icon={<EditIconSVG pathClass={"stroke-foreground"} />}
            tooltip={"Edit"}
          />
        </div>
      )}
      <div className="flex-between gap-4 min-h-10">
        <Checkbox
          variant="default"
          isDisabled={false}
          isSelected={item.isCompleted}
          state={item.isCompleted}
          onChange={handleToggleCompletion}
        >
          {isEditing ? (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
                if (e.key === "Escape") handleCancel();
              }}
              className="text-lg bg-transparent border-b border-foreground focus:outline-none"
              autoFocus
            />
          ) : (
            <span
              className={cn(
                item.isCompleted ? "line-through text-foreground" : "",
                "text-lg"
              )}
            >
              {item.title}
            </span>
          )}
        </Checkbox>
        {/* {!item.isCompleted && !isEditing && (
          <ButtonIcon
            className="rounded-full"
            onClick={() => null}
            icon={<PlayIconSVG />}
            tooltip={"Play"}
          />
        )} */}
      </div>
      {isEditing && (
        <div className="flex gap-2 mt-2">
          <button
            className="w-20 px-3 py-1 bg-green-500/50 hover:bg-green-500 transition text-white rounded"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="w-20 px-3 py-1 border border-white/30 text-foreground rounded transition hover:bg-white/20"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default memo(TodoItem);
