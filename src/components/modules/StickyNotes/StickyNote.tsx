import React, { useEffect, useRef, useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import CheckSVG from "@/components/elements/svg/icons/interface/CheckSVG";
import { TStickyNoteColor } from "@/types/model-types";
import useStickyNotesStore from "@/stores/zustand/useStickyNotesStore";
import EditIconSVG from "@/components/elements/svg/icons/interface/EditIconSVG";
import ButtonIcon from "@/components/ui/buttons/ButtonIcon";
import TrashIconSVG from "@/components/elements/svg/icons/interface/TrashIconSVG";
import Checkbox from "@/components/ui/inputs/Checkbox";

type TProps = {
  id: string;
  color: TStickyNoteColor;
  title: string;
  content: string;
  styles: any;
  isTitle: boolean;
  isContent: boolean;
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
  content,
  title,
  isTitle,
  isContent,
}: TProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { attributes, listeners, setNodeRef, transform, setActivatorNodeRef } =
    useDraggable({
      id,
      disabled: isEditing,
    });
  const textareaRefs = useRef<(HTMLTextAreaElement | null)[]>([]);

  const { updateStickyNote, removeStickyNote } = useStickyNotesStore();

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

  const handleEditToggle = (e: Event) => {
    e.stopPropagation();
    setIsEditing(!isEditing);
  };

  return (
    <div
      ref={setNodeRef}
      data-no-dnd="true"
      {...listeners}
      {...attributes}
      style={{ ...style, ...styles }}
    >
      <div className={`group sticky-note relative sticky-note--${color}`}>
        {!isEditing && (
          <div className="absolute top-0 bottom-0 right-0 left-0 cursor-grab"></div>
        )}
        <ButtonIcon
          className={cn(
            "absolute -bottom-12 right-2 bg-background hover:bg-background hover:opacity-100",
            !isEditing && "group-hover:opacity-100 opacity-0 "
          )}
          onClick={handleEditToggle}
          icon={
            !isEditing ? (
              <EditIconSVG pathClass="stroke-foreground" />
            ) : (
              <CheckSVG pathClass="stroke-foreground" />
            )
          }
          tooltip={"Edit"}
        />
        <ButtonIcon
          className={cn(
            "absolute -bottom-12 left-2 bg-background hover:opacity-100 ",
            !isEditing && "group-hover:opacity-100 opacity-0"
          )}
          onClick={() => removeStickyNote(id)}
          icon={<TrashIconSVG pathClass="stroke-foreground" />}
          tooltip={"Delete"}
        />
        {isTitle && (
          <textarea
            rows={1}
            ref={(el) => (textareaRefs.current[0] = el)}
            className={`overflow-hidden text-xl sticky-note__textarea sticky-note__textarea--${color}`}
            value={title}
            onChange={(e) => handleTitleChange(e)}
            onKeyDown={(e) => e.stopPropagation()}
            disabled={!isEditing}
            unselectable="on"
          />
        )}
        {isContent && (
          <textarea
            ref={(el) => (textareaRefs.current[1] = el)}
            className={`select-none flex-grow resize-none sticky-note__textarea sticky-note__textarea--${color}`}
            value={content}
            onChange={(e) => handleContentChange(e)}
            onKeyDown={(e) => e.stopPropagation()}
            disabled={!isEditing}
          />
        )}
        {isEditing && (
          <div className="absolute -right-[150px] w-36 top-0">
            <div className="bg-background p-4 rounded-md flex flex-col gap-2">
              <Checkbox
                isDisabled={false}
                isSelected={isTitle}
                state={isTitle}
                onChange={handleTitleCheckbox}
              >
                Title
              </Checkbox>
              <Checkbox
                isDisabled={false}
                isSelected={isContent}
                state={isContent}
                onChange={handleContentCheckbox}
              >
                Content
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
