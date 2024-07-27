import { useEffect, useRef } from "react";

type TProps = {
  color: "yellow" | "purple" | "violet" | "green" | "white";
};

const StickyNote = ({ color }: TProps) => {
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

  return (
    <div className={`sticky-note sticky-note--${color}`}>
      <textarea
        rows={1}
        ref={(el) => (textareaRefs.current[0] = el)}
        className={`overflow-hidden text-xl sticky-note__textarea sticky-note__textarea--${color}`}
      >
        Note
      </textarea>
      <textarea
        ref={(el) => (textareaRefs.current[1] = el)}
        className={`flex-grow resize-none sticky-note__textarea sticky-note__textarea--${color}`}
      >
        Type your note here.
      </textarea>
    </div>
  );
};

export default StickyNote;
