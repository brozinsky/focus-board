import ButtonIcon from "@/components/ui/buttons/ButtonIcon";
import { useCurrentEditor } from "@tiptap/react";
import {
  Bold,
  CornerDownRight,
  Italic,
  List,
  ListOrdered,
  PaintBucket,
  Quote,
  Square,
  Squircle,
  Strikethrough,
  Type,
  Undo,
} from "lucide-react";
import React from "react";

const RichTextControls = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="control-group">
      <div className="flex gap-1 pt-1.5 pb-3 justify-between">
        <div className="flex gap-1">
          <ButtonIcon
            size={"sm"}
            tooltip="Bold"
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "bg-input" : ""}
            icon={<Bold />}
          />
          <ButtonIcon
            size={"sm"}
            tooltip="Italic"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "bg-input" : ""}
            icon={<Italic />}
          />
          <ButtonIcon
            size={"sm"}
            tooltip="Strikethrough"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "bg-input" : ""}
            icon={<Strikethrough />}
          />
          {/* <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
            Clear marks
          </button>
          <button onClick={() => editor.chain().focus().clearNodes().run()}>
            Clear nodes
          </button> */}
          <ButtonIcon
            size={"sm"}
            tooltip="Bullet list"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "bg-input" : ""}
            icon={<List />}
          />
          <ButtonIcon
            size={"sm"}
            tooltip="Ordered list"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "bg-input" : ""}
            icon={<ListOrdered />}
          />
          <ButtonIcon
            size={"sm"}
            tooltip="Blockquote"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive("blockquote") ? "bg-input" : ""}
            icon={<Quote />}
          />
          {/* <ButtonIcon
            size={"sm"}
            tooltip="Hard break"
            onClick={() => editor.chain().focus().setHardBreak().run()}
            icon={<CornerDownRight />}
          /> */}
          {/* <ButtonIcon
            size={"sm"}
            tooltip="Undo"
            onClick={() => editor.chain().focus().setHardBreak().run()}
            icon={<Undo />}
          /> */}
        </div>
        <div className="flex gap-1">
          <div className="flex items-center self-stretch justify-center">
            <Type size={18} />
          </div>
          <ButtonIcon
            size={"sm"}
            tooltip="Color"
            onClick={() => {
              if (editor.isActive("textStyle", { color: "#00bcff" })) {
                editor.chain().focus().unsetColor().run();
              } else {
                editor.chain().focus().setColor("#00bcff").run();
              }
            }}
            className={
              editor.isActive("textStyle", { color: "#00bcff" })
                ? "bg-input"
                : ""
            }
            icon={<Squircle fill={"#00bcff"} stroke={"#00bcff"} />}
          />
          <ButtonIcon
            size={"sm"}
            tooltip="Color"
            onClick={() => {
              if (editor.isActive("textStyle", { color: "#ec003f" })) {
                editor.chain().focus().unsetColor().run();
              } else {
                editor.chain().focus().setColor("#ec003f").run();
              }
            }}
            className={
              editor.isActive("textStyle", { color: "#ec003f" })
                ? "bg-input"
                : ""
            }
            icon={<Squircle fill={"#ec003f"} stroke={"#ec003f"} />}
          />
          <ButtonIcon
            size={"sm"}
            tooltip="Color"
            onClick={() => {
              if (editor.isActive("textStyle", { color: "#00bc7d" })) {
                editor.chain().focus().unsetColor().run();
              } else {
                editor.chain().focus().setColor("#00bc7d").run();
              }
            }}
            className={
              editor.isActive("textStyle", { color: "#00bc7d" })
                ? "bg-input"
                : ""
            }
            icon={<Squircle fill={"#00bc7d"} stroke={"#00bc7d"} />}
          />
          <ButtonIcon
            size={"sm"}
            tooltip="Color"
            onClick={() => {
              if (editor.isActive("textStyle", { color: "#958DF1" })) {
                editor.chain().focus().unsetColor().run();
              } else {
                editor.chain().focus().setColor("#958DF1").run();
              }
            }}
            className={
              editor.isActive("textStyle", { color: "#958DF1" })
                ? "bg-input"
                : ""
            }
            icon={<Squircle fill={"#958DF1"} stroke={"#958DF1"} />}
          />
        </div>

        {/* <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          Redo
        </button> */}
      </div>
    </div>
  );
};

export default RichTextControls;
