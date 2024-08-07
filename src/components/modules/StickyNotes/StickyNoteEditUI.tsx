import CheckSVG from "@/components/elements/svg/icons/interface/CheckSVG";
import EditIconSVG from "@/components/elements/svg/icons/interface/EditIconSVG";
import TrashIconSVG from "@/components/elements/svg/icons/interface/TrashIconSVG";
import ButtonIcon from "@/components/ui/buttons/ButtonIcon";
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
      <ButtonIcon
        className={cn(
          "group/edit absolute -bottom-12 right-2 bg-background hover:bg-primary hover:opacity-100",
          !isEditing && "group-hover:opacity-100 opacity-0 "
        )}
        onClick={handleEditToggle}
        icon={
          !isEditing ? (
            <EditIconSVG pathClass="group-hover/edit:stroke-foreground-primary stroke-foreground" />
          ) : (
            <CheckSVG pathClass="group-hover/edit:stroke-foreground-primary stroke-foreground" />
          )
        }
        tooltip={"Edit"}
      />
      <ButtonIcon
        className={cn(
          "group/delete absolute -bottom-12 left-2 bg-background hover:bg-red-500 hover:opacity-100 ",
          !isEditing && "group-hover:opacity-100 opacity-0"
        )}
        onClick={() => removeStickyNote(id)}
        icon={
          <TrashIconSVG pathClass="group-hover/delete:stroke-foreground-primary stroke-foreground" />
        }
        tooltip={"Delete"}
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
