import { useEffect, useRef } from "react"; // Import useEffect
import { NotebookPen, Plus } from "lucide-react";
import JournalEntry from "./JournalEntry";
import useAddJournalEntryMutation from "@/stores/supabase/journal/useAddJournalEntryMutation";
import { dateToString } from "@/utils/functions/fn-common";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/ScrollArea/ScrollArea";
import { useJournalStore } from "@/stores/zustand/useJournalStore";
import { TJournalData } from "@/types/query-types";
import { formatJournalDate } from "@/utils/functions/fn-date";
import SpinnerSVG from "@/components/elements/svg/icons/interface/SpinnerSVG";
import clsx from "clsx";

const JournalLeftPanel = ({ data }: { data: TJournalData[] }) => {
  const { activeEntry, setActiveEntry } = useJournalStore();
  const { mutate: addJournalEntry, isPending: isPendingAdd } =
    useAddJournalEntryMutation();

  const prevDataLengthRef = useRef(data?.length || 0);

  useEffect(() => {
    if (data && data.length > 0) {
      const currentDataLength = data.length;

      if (currentDataLength !== prevDataLengthRef.current) {
        const lastEntry = data[data.length - 1];
        setActiveEntry(lastEntry.id);
      }

      prevDataLengthRef.current = currentDataLength;
    }
  }, [data, setActiveEntry]);

  const handleAddNew = () => {
    addJournalEntry({
      title: formatJournalDate(new Date()),
      content: "",
    });
  };

  return (
    <div className="relative p-8 pr-0 flex flex-col pointer-events-auto min-w-[280px] w-[280px]">
      {isPendingAdd && (
        <div className="z-10 absolute left-0 right-0 bottom-0 top-0 opacity-30"></div> //overlay block
      )}
      <h3 className="flex flex-row items-center text-xl gap-3 tracking-wide mb-8">
        <NotebookPen />
        Journal
      </h3>
      <button
        disabled={isPendingAdd}
        onClick={handleAddNew}
        className={cn(
          "relative flex items-center gap-2 justify-center px-4 py-2 rounded-sm cursor-pointer transition duration-200 hover:border-primary hover:bg-primary hover:text-foreground-primary border-ransparent border active:translate-y-2",
          isPendingAdd && "opacity-50 cursor-default"
        )}
      >
        {isPendingAdd && (
          <div className=" absolute left-1/2 -rotate-90 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <SpinnerSVG
              className="origin-center"
              pathClass="stroke-primary fill-primary"
            />
          </div>
        )}
        <div
          className={clsx(
            "flex flex-row gap-1 items-center",
            isPendingAdd && "opacity-0"
          )}
        >
          <Plus />
          <span className="text-lg truncate pr-4">Add new</span>
        </div>
      </button>
      <ScrollArea className="flex-grow min-h-0 overflow-y-auto mt-4">
        <div className="flex flex-col gap-2 pointer-events-auto">
          {data &&
            [...data]
              .reverse()
              .map(({ id, title, created_at }) => (
                <JournalEntry
                  key={id}
                  id={id}
                  active={id === activeEntry}
                  title={title}
                  setEntry={setActiveEntry}
                  date={dateToString(created_at)}
                />
              ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default JournalLeftPanel;
