import React, { useState } from "react";
import { useFormik } from "formik";
import useStickyNotesStore from "@/stores/zustand/useStickyNotesStore";
import { TStickyNoteColor, TTodo } from "@/types/model-types";

const useStickyNoteForm = (
  id: string,
  title: string,
  content: string,
  color: string,
  todos: TTodo[],
  isTitle: boolean,
  isContent: boolean,
  isTodos: boolean
) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { updateStickyNote } = useStickyNotesStore();

  const stickyNotesForm = useFormik({
    initialValues: {
      title,
      content,
      todos,
      color,
      isTitle,
      isContent,
      isTodos,
    },

    onSubmit: (values) => {
      console.log("submit");
      console.log("values.title", values.title);
      console.log("values.content", values.content);
      console.log("values.color", values.color);
      console.log("values.isTitle", values.isTitle);
      console.log("values.isContent", values.isContent);
      console.log("values.isTodos", values.isTodos);

      updateStickyNote(id, {
        title: values.title,
        content: values.content,
        color: values.color as TStickyNoteColor,
        isTitle: values.isTitle,
        isContent: values.isContent,
        isTodos: values.isTodos,
      });

      setIsEditing(false);
    },
  });

  return { stickyNotesForm, isEditing, setIsEditing };
};

export default useStickyNoteForm;
