import useEditJournalEntryMutation from "@/stores/supabase/journal/useEditJournalEntryMutation";
import { useJournalStore } from "@/stores/zustand/useJournalStore";
import Button from "@/components/ui/buttons/Button";
import useWindowsStore from "@/stores/zustand/useWindowsStore";
import { motion } from "framer-motion";
import CloseIconSVG from "@/components/elements/svg/icons/interface/CloseIconSVG";
import { cn } from "@/lib/utils";
import useThemeStore from "@/stores/zustand/useThemeStore";

const JournalEditDialog = () => {
  const { themeStyle } = useThemeStore();
  const { isOpen, setIsOpen } = useWindowsStore();
  const { setIsEditing, title } = useJournalStore();

  const { mutate: editJournalEntry, isPending: isPendingEdit } =
    useEditJournalEntryMutation();
  const { content, activeEntry } = useJournalStore();

  if (!isOpen.journalIsEditing) return;

  return (
    <div
      id="JournalEditDialog"
      className={"modal modal--centered modal--no-scroll"}
      onClick={() => setIsOpen("journalIsEditing", false)}
    >
      <button className={"modal__close"}>
        <CloseIconSVG />
      </button>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "modal__card modal__card--overflow-visible !w-[450px]",
          themeStyle == "glass" && "modal__card--glass"
        )}
      >
        <div className={"p-8 gap-6 flex flex-col"}>
          <h3 className="flex flex-row items-center text-xl gap-3 tracking-wide">
            Are you sure?
          </h3>
          <div className="flex flex-col gap-8 items-left">
            You have unsaved changes. Do you want to save them before leaving?
          </div>
          <div className="flex flex-row justify-between gap-4">
            <Button
              onClick={() => {
                setIsOpen("journalIsEditing", false);
              }}
              type={"button"}
              variant={null}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setIsOpen("journalIsEditing", false);
                setIsOpen("journal", false);
                setIsEditing(false);
              }}
              type={"button"}
              variant={"danger"}
            >
              Discard
            </Button>
            <div className="flex flex-row gap-2">
              <Button
                isLoading={isPendingEdit}
                onClick={() => {
                  editJournalEntry({
                    id: activeEntry,
                    title: title,
                    content: content,
                  });
                  setIsEditing(false);
                  setIsOpen("journalIsEditing", false);
                  setIsOpen("journal", false);
                }}
                type={"submit"}
                variant={"primary"}
              >
                Save & Exit
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default JournalEditDialog;
