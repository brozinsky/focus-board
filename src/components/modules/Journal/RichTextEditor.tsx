import React from "react";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import RichTextControls from "./RichTextControls";

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  //@ts-ignore
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
];

export default ({
  content,
  setContent,
}: {
  content: string;
  setContent: (content: string) => void;
}) => {
  return (
    <EditorProvider
      slotBefore={<RichTextControls />}
      extensions={extensions}
      content={content}
      onUpdate={({ editor }) => {
        setContent(editor.getHTML());
      }}
    ></EditorProvider>
  );
};
