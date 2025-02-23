import { NotebookPen, Plus } from "lucide-react";
import JournalEntry from "./JournalEntry";
import useAddJournalEntryMutation from "@/stores/supabase/journal/useAddJournalEntryMutation";
import { dateToString } from "@/utils/functions/fn-common";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/ScrollArea/ScrollArea";
import { useJournalStore } from "@/stores/zustand/useJournalStore";
import { useEffect } from "react";

const JournalLeftPanel = ({ data }) => {
  const {
    content,
    editedContent,
    journalPrompt,
    setContent,
    setEditedContent,
    setJournalPrompt,
    activeEntry,
    setActiveEntry,
  } = useJournalStore();
  //   const [content, setContent] = useState("");
  //   const [editedContent, setEditedContent] = useState<string | null>(null);

  //   const { data, isPending, refetch, isRefetching } = useJournalQuery();
  const { mutate: addJournalEntry, isPending: isPendingAdd } =
    useAddJournalEntryMutation();

  //   const [activeEntry, setActiveEntry] = useState<number>(4);

  //   useEffect(() => {
  //     if (data && data.length > 0) {
  //       const currentContent = data?.find(
  //         (item) => item.id === activeEntry
  //       )?.content;
  //       setEditedContent(currentContent);
  //     }
  //   }, [data]);

  return (
    <div className="p-8 pr-0 flex flex-col pointer-events-auto w-[280px]">
      <h3 className="flex flex-row items-center text-xl gap-3 tracking-wide mb-8">
        <NotebookPen />
        Journal
      </h3>
      <div
        onClick={() => {
          addJournalEntry({
            title: "New entry",
            content: content,
          });
          //   refetch();
        }}
        className={cn(
          "flex items-center gap-2 justify-center px-4 py-2 rounded-sm cursor-pointer transition duration-200 hover:border-primary hover:bg-primary hover:text-foreground-primary border-ransparent border active:translate-y-2"
        )}
      >
        <Plus />
        <span className="text-lg truncate pr-4">Add new</span>
      </div>
      <ScrollArea className="flex-grow min-h-0 overflow-y-auto mt-4">
        <div className="flex flex-col gap-2 pointer-events-auto">
          {data &&
            data.map(({ id, title, created_at }) => (
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
