import NotesSVG from "@/components/elements/svg/icons/interface/NotesSVG";
import ButtonIcon from "@/components/ui/buttons/ButtonIcon";
import { Separator } from "@/components/ui/Separator/Separator";
import Dropdown from "@/components/ui/dropdowns/Dropdown";
import Checkbox from "@/components/ui/inputs/Checkbox";
import ButtonDropdown from "@/components/ui/buttons/ButtonDropdown";
import useStickyNotesStore from "@/stores/zustand/sticky-notes/sticky-notes.store";
import useStickyNotesDb from "@/stores/supabase/useStickyNotesDb";
import { useAuthStore } from "@/stores/zustand/auth/auth.store";
import { Crown } from "lucide-react";
import ButtonPremium from "../../buttons/button-icon/ButtonPremium";

const DropdownStickyNote = () => {
  const { isLoggedIn } = useAuthStore();

  const {
    stickyNotes: stickyNoteDemo,
    addStickyNote: addStickyNoteDemo,
    areNotesVisible: areNotesVisibleDemo,
    setAreNotesVisible: setAreNotesVisibleDemo,
  } = useStickyNotesStore();

  const { addStickyNote, areNotesVisible, setAreNotesVisible } =
    useStickyNotesDb();

  const isDemoLimit = !isLoggedIn && stickyNoteDemo.length === 2;

  return (
    <Dropdown
      position={"top"}
      trigger={
        <ButtonIcon
          component="div"
          icon={<NotesSVG />}
          tooltip={"Sticky notes"}
        />
      }
    >
      <div className="flex flex-col gap-3 p-4">
        <div className="text-xl">Sticky notes</div>
        <Separator className="bg-white/30" />
        <div className="relative">
          <ButtonDropdown
            className="w-full"
            onClick={() => {
              isLoggedIn ? addStickyNote("note") : addStickyNoteDemo("note");
            }}
            isDisabled={!areNotesVisible || isDemoLimit}
          >
            + Add new note
          </ButtonDropdown>
          {isDemoLimit && (
            <div className="absolute right-0 top-0">
              <ButtonPremium onClick={() => null} />
            </div>
          )}
        </div>
        {/* <ButtonDropdown
                onClick={() => addStickyNote("todo")}
                isDsabled={!areNotesVisible}
              >
                + Add todo list
              </ButtonDropdown> */}
        <Checkbox
          isDisabled={stickyNoteDemo.length === 0}
          isSelected={isLoggedIn ? areNotesVisible : areNotesVisibleDemo}
          state={isLoggedIn ? areNotesVisible : areNotesVisibleDemo}
          onChange={isLoggedIn ? setAreNotesVisible : setAreNotesVisibleDemo}
        >
          Show notes
        </Checkbox>
      </div>
    </Dropdown>
  );
};

export default DropdownStickyNote;
