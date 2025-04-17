import CheckSVG from "@/components/elements/svg/icons/interface/CheckSVG";
import ButtonDelete from "@/components/ui/buttons/panel-edit/ButtonDelete";
import ButtonEdit from "@/components/ui/buttons/panel-edit/ButtonEdit";
import Checkbox from "@/components/ui/inputs/Checkbox";
import { cn } from "@/lib/utils";
import useStickyNotesDb from "@/stores/supabase/useStickyNotesDb";
import useStickyNotesStore from "@/stores/zustand/sticky-notes/sticky-notes.store";
import { TUserStatus } from "@/types/model/global.model";
import { TStickyNoteColor } from "@/types/model/sticky-note.model";
import { TTodo } from "@/types/model/todo-list.model";
import { FormikProps } from "formik";

const COLORS = [
  { name: "yellow" },
  { name: "cyan" },
  { name: "purple" },
  { name: "green" },
  { name: "violet" },
  { name: "white" },
];

type TProps = {
  color: TStickyNoteColor;
  tasks: TTodo[];
  setTasks: (tasks: TTodo[]) => void;
  id: string;
  isEditing: boolean;
  setIsEditing: (tasks: boolean) => void;
  form: FormikProps<any>;
  userStatus: TUserStatus;
};

const StickyNoteEditUI = ({
  isEditing,
  setIsEditing,
  id,
  form,
  userStatus,
}: TProps) => {
  const { removeStickyNote: removeStickyNoteLocal } = useStickyNotesStore();
  const { removeStickyNote: removeStickyNoteDb } = useStickyNotesDb();

  const handleChange = (field: string, value: boolean | TStickyNoteColor) => {
    if (form && typeof form.setFieldValue === "function") {
      form.setFieldValue(field, value);
    }
  };

  const handleEditSubmit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isEditing) {
      form.submitForm();
    }
    setIsEditing(!isEditing);
  };

  return (
    <>
      <ButtonEdit onClick={handleEditSubmit} isEditing={isEditing} />
      <ButtonDelete
        onClick={() => {
          userStatus === "offline" && removeStickyNoteLocal(id);
          userStatus === "online" && removeStickyNoteDb(id);
        }}
        isEditing={isEditing}
      />

      {isEditing ? (
        <>
          <div className="absolute -right-2 translate-x-full w-42 top-0">
            <div className="bg-background p-4 rounded-md flex flex-col gap-2">
              <Checkbox
                isDisabled={false}
                isSelected={form.values.isTitle}
                state={form.values.isTitle}
                onChange={(value) => {
                  handleChange("isTitle", value);
                }}
              >
                Show title
              </Checkbox>
              <Checkbox
                isDisabled={false}
                isSelected={form.values.isContent}
                state={form.values.isContent}
                onChange={(value) => handleChange("isContent", value)}
              >
                Show content
              </Checkbox>
              {/* <Checkbox
                isDisabled={false}
                isSelected={form.values.isTodos}
                state={form.values.isTodos}
                onChange={(value) => handleChange("isTodos", value)}
              >
                Todo list
              </Checkbox> */}
            </div>
          </div>
          <div className="sticky-note__colors">
            {COLORS.map((item) => (
              <div
                key={item.name}
                className={cn(
                  item.name === form.values.color &&
                    "sticky-note__color--active",
                  `sticky-note__color sticky-note__color--${item.name}`
                )}
                onClick={() =>
                  handleChange("color", item.name as TStickyNoteColor)
                }
              >
                {item.name === form.values.color && (
                  <CheckSVG pathClass="stroke-black" />
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="absolute top-0 bottom-0 right-0 left-0 cursor-grab pointer-events-none"></div>
      )}
    </>
  );
};

export default StickyNoteEditUI;
