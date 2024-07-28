import React, { useEffect, useRef } from "react";
import { useDraggable } from "@dnd-kit/core";

type TProps = {
  id: string;
  color: "yellow" | "purple" | "violet" | "green" | "white";
  title: string;
  content: string;
  styles: any;
};

export function StickyNote({ id, color, styles, content, title }: TProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
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

  return (
    <div
      ref={setNodeRef}
      className={`sticky-note sticky-note--${color}`}
      {...listeners}
      {...attributes}
      style={{ ...style, ...styles }}
    >
      <textarea
        rows={1}
        ref={(el) => (textareaRefs.current[0] = el)}
        className={`overflow-hidden text-xl sticky-note__textarea sticky-note__textarea--${color}`}
      >
        {title}
      </textarea>
      <textarea
        ref={(el) => (textareaRefs.current[1] = el)}
        className={`flex-grow resize-none sticky-note__textarea sticky-note__textarea--${color}`}
      >
        {content}
      </textarea>
    </div>
  );
}
