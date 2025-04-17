import { TPosition } from "./global.model";
import { TTodo } from "./todo-list.model";

export type TStickyNotePosition = TPosition & {
  id: string;
};

export type TStickyNoteColor =
  | "yellow"
  | "purple"
  | "cyan"
  | "violet"
  | "green"
  | "white";

export type TStickyNote = {
  id: string;
  title?: string;
  content?: string;
  todos?: TTodo[];
  // position: TPosition;
  color: TStickyNoteColor;
  isTitle?: boolean;
  isContent?: boolean;
  isTodos?: boolean;
  created_at?: Date;
  updated_at?: Date;
};
