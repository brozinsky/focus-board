import React, { useState } from "react";
import { useFormik } from "formik";
import useStickyNotesStore from "@/stores/zustand/useStickyNotesStore";
import useStickyNotesDb from "@/stores/supabase/useStickyNotesDb";
import { useAuthStore } from "@/stores/zustand/auth/useAuthStore";
import { TTodo } from "@/types/model/todo-list.model";

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
  const { updateStickyNote: updateStickyNoteDemo } = useStickyNotesStore();
  const { updateStickyNote } = useStickyNotesDb();
  const { isLoggedIn } = useAuthStore();

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

      const newStickyNote = {
        title: values.title,
        content: values.content,
        color: values.color as TStickyNoteColor,
        isTitle: values.isTitle,
        isContent: values.isContent,
        isTodos: values.isTodos,
      };

      if (isLoggedIn) {
        updateStickyNote(id, newStickyNote);
      } else {
        updateStickyNoteDemo(id, newStickyNote);
      }

      setIsEditing(false);
    },
  });

  return { stickyNotesForm, isEditing, setIsEditing };
};

export default useStickyNoteForm;
