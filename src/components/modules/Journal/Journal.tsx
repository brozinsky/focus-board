import { Suspense, useEffect } from "react";
import useJournalQuery from "@/stores/supabase/journal/journal.query";
import { cn } from "@/lib/utils";
import JournalLeftPanel from "./JournalLeftPanel";
import JournalRightEditor from "./JournalRightEditor";
import useThemeStore from "@/stores/zustand/global/theme.store";
import { motion } from "framer-motion";
import CloseIconSVG from "@/components/elements/svg/icons/interface/CloseIconSVG";
import useWindowsStore from "@/stores/zustand/global/windows.store";
import { useJournalStore } from "@/stores/zustand/journal/journal.store";
import LoadingSpinner from "@/components/ui/loaders/LoadingSpinner";
import JournalEditDialog from "./JournalEditDialog";

const Journal = () => {
  const { isOpen, setIsOpen } = useWindowsStore();
  const { themeStyle } = useThemeStore();
  const { setEditedContent, activeEntry, isEditing } = useJournalStore();

  const { data, isPending } = useJournalQuery();

  useEffect(() => {
    const currentContent =
      data?.find((item) => item.id === activeEntry)?.content ?? null;
    setEditedContent(currentContent);
  }, [data, activeEntry]);

  if (!isOpen.journal) return;

  return (
    <>
      <div
        id="Journal"
        className={cn(
          "modal modal--high modal--no-scroll opacity-100 visible transition"
        )}
        onClick={() =>
          isEditing
            ? !isOpen.journalIsEditing && setIsOpen("journalIsEditing", true)
            : setIsOpen("journal", false)
        }
      >
        <JournalEditDialog />
        <button className={"modal__close"}>
          <CloseIconSVG />
        </button>
        <Suspense fallback={<LoadingSpinner />}>
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "rounded-xl modal__card flex justify-between modal__card--min-h max-h-[90vh] !max-w-[1000px]",
              themeStyle == "glass" && "modal__card--glass"
            )}
          >
            {data && !isPending && <JournalLeftPanel data={data} />}
            {data && !isPending && <JournalRightEditor data={data} />}
            {isPending && <LoadingSpinner />}
          </motion.div>
        </Suspense>
      </div>
    </>
  );
};

export default Journal;
