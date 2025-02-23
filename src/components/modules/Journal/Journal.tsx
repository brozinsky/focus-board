import { useEffect } from "react";
import useJournalQuery from "@/stores/supabase/journal/useJournalQuery";
import { cn } from "@/lib/utils";
import JournalLeftPanel from "./JournalLeftPanel";
import JournalRightEditor from "./JournalRightEditor";
import useThemeStore from "@/stores/zustand/useThemeStore";
import { motion } from "framer-motion";
import CloseIconSVG from "@/components/elements/svg/icons/interface/CloseIconSVG";
import useWindowsStore from "@/stores/zustand/useWindowsStore";
import { useJournalStore } from "@/stores/zustand/useJournalStore";

const Journal = () => {
  const { isOpen, setIsOpen } = useWindowsStore();
  const { themeStyle } = useThemeStore();
  const { setEditedContent, activeEntry } = useJournalStore();

  const { data, isPending, refetch, isRefetching } = useJournalQuery();

  useEffect(() => {
    if (data && data.length > 0) {
      const currentContent = data?.find(
        (item) => item.id === activeEntry
      )?.content;
      console.log("---");
      console.log("activeEntry", activeEntry);
      console.log("currentContent", currentContent);
      setEditedContent(currentContent);
    }
  }, [data, activeEntry]);

  if (!isOpen.journal) return;

  return (
    <div
      id="Scenes"
      className={cn("modal opacity-100 visible transition")}
      onClick={() => setIsOpen("journal", false)}
    >
      <button className={"modal__close"}>
        <CloseIconSVG />
      </button>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "rounded-xl modal__card flex justify-between modal__card--min-h max-h-[70vh] !max-w-[1000px]",
          themeStyle == "glass" && "modal__card--glass"
        )}
      >
        {!isPending && <JournalLeftPanel data={data} />}
        {!isPending && <JournalRightEditor data={data} />}
      </motion.div>
    </div>

    // <div className="absolute z-50 overflow-hidden top-4 right-4 left-4 bottom-4 flex items-center justify-center pointer-events-none">

    // </div>
  );
};

export default Journal;
