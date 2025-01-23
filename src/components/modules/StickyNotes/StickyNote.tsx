import React, { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { TStickyNoteColor, TTodo, TUserStatus } from "@/types/model-types";
import StickyNoteEditUI from "./StickyNoteEditUI";
import useStickyNoteForm from "@/hooks/forms/useStickyNoteForm";
import StickyNoteFormFields from "./StickyNoteFormFields";

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
  const [tasks, setTasks] = useState<TTodo[]>(todos);

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

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : {};

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
        <StickyNoteFormFields
          todos={todos}
          isEditing={isEditing}
          form={stickyNotesForm}
        />
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
