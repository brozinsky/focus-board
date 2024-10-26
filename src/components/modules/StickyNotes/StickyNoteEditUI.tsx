import CheckSVG from "@/components/elements/svg/icons/interface/CheckSVG";
import EditIconSVG from "@/components/elements/svg/icons/interface/EditIconSVG";
import TrashIconSVG from "@/components/elements/svg/icons/interface/TrashIconSVG";
import ButtonIcon from "@/components/ui/buttons/ButtonIcon";
import ButtonDelete from "@/components/ui/buttons/panel-edit/ButtonDelete";
import ButtonEdit from "@/components/ui/buttons/panel-edit/ButtonEdit";
import Checkbox from "@/components/ui/inputs/Checkbox";
import { cn } from "@/lib/utils";
import useStickyNotesStore from "@/stores/zustand/useStickyNotesStore";
import { TStickyNoteColor, TTodo } from "@/types/model-types";

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
  isTitle: boolean;
  isContent: boolean;
  isTodos: boolean;
  isEditing: boolean;
  setIsEditing: (tasks: boolean) => void;
};

const StickyNoteEditUI = ({
  isEditing,
  setIsEditing,
  id,
  isTitle,
  isContent,
  isTodos,
  color,
}: TProps) => {
  const { updateStickyNote, removeStickyNote } = useStickyNotesStore();

  const handleChange = (field: string, value: boolean | TStickyNoteColor) => {
    if (isEditing) {
      updateStickyNote(id, { [field]: value });
    }
  };

  const handleEditToggle = (e: Event) => {
    e.stopPropagation();
    setIsEditing(!isEditing);
  };

  return (
    <>
      <ButtonEdit onClick={handleEditToggle} isEditing={isEditing} />
      <ButtonDelete
        onClick={() => removeStickyNote(id)}
        isEditing={isEditing}
      />

      {isEditing ? (
        <>
          <div className="absolute -right-2 translate-x-full w-42 top-0">
            <div className="bg-background p-4 rounded-md flex flex-col gap-2">
              <Checkbox
                isDisabled={false}
                isSelected={isTitle}
                state={isTitle}
                onChange={(value) => handleChange("isTitle", value)}
              >
                Show title
              </Checkbox>
              <Checkbox
                isDisabled={false}
                isSelected={isContent}
                state={isContent}
                onChange={(value) => handleChange("isContent", value)}
              >
                Show content
              </Checkbox>
              <Checkbox
                isDisabled={false}
                isSelected={isTodos}
                state={isTodos}
                onChange={(value) => handleChange("isTodos", value)}
              >
                Todo list
              </Checkbox>
            </div>
          </div>
          <div className="sticky-note__colors">
            {COLORS.map((item) => (
              <div
                key={item.name}
                className={cn(
                  item.name === color && "sticky-note__color--active",
                  `sticky-note__color sticky-note__color--${item.name}`
                )}
                onClick={() =>
                  handleChange("color", item.name as TStickyNoteColor)
                }
              >
                {item.name === color && <CheckSVG pathClass="stroke-black" />}
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
