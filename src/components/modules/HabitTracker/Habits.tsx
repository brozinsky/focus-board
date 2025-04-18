import React, { Suspense, useEffect } from "react";
import useJournalQuery from "@/stores/supabase/journal/journal.query";
import { cn } from "@/lib/utils";
import useThemeStore from "@/stores/zustand/global/theme.store";
import { motion } from "framer-motion";
import CloseIconSVG from "@/components/elements/svg/icons/interface/CloseIconSVG";
import useWindowsStore from "@/stores/zustand/global/windows.store";
import { useJournalStore } from "@/stores/zustand/journal/journal.store";
import LoadingSpinner from "@/components/ui/loaders/LoadingSpinner";
import HabitTracker from "./HabitTracker";
import HabitTable from "./HabitTable";
import { Calendar } from "@/components/ui/datepicker/Calendar";

const Habits = () => {
  const { isOpen, setIsOpen } = useWindowsStore();
  const { themeStyle } = useThemeStore();

  if (!isOpen.habitTracker) return;

  return (
    <>
      <div
        id="Habits"
        className={cn(
          "modal modal--centered modal--no-scroll opacity-100 visible transition"
        )}
        onClick={() => setIsOpen("habitTracker", false)}
      >
        <button className={"modal__close"}>
          <CloseIconSVG />
        </button>
        <Suspense fallback={<LoadingSpinner />}>
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "rounded-xl modal__card flex justify-between !max-w-[1000px] p-8",
              themeStyle == "glass" && "modal__card--glass"
            )}
          >
            <div className="flex-between gap-4 mb-2 w-[650px]">
              <div className="w-full group/timer right-20 text-neutral-100 z-20">
                <HabitTable />
              </div>
            </div>
          </motion.div>
        </Suspense>
      </div>
    </>
  );
};

export default Habits;
