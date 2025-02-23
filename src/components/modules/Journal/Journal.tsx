import RichTextEditor from "./RichTextEditor";
import { NotebookPen, Plus } from "lucide-react";
import JournalEntry from "./JournalEntry";
import { useEffect, useState } from "react";
import useJournalQuery from "@/stores/supabase/journal/useJournalQuery";
import useAddJournalEntryMutation from "@/stores/supabase/journal/useAddJournalEntryMutation";
import { dateToString } from "@/utils/functions/fn-common";
import Button from "@/components/ui/buttons/Button";
import useEditJournalEntryMutation from "@/stores/supabase/journal/useEditJournalEntryMutation";
import useRemoveJournalEntryMutation from "@/stores/supabase/journal/useRemoveJournalEntryMutation";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/ScrollArea/ScrollArea";
import Select from "@/components/ui/dropdowns/Select";

const journalingPrompts = [
  { id: 1, name: "What am I grateful for today?", value: 1 },
  {
    id: 2,
    name: "What is one thing I want to achieve this week/month?",
    value: 2,
  },
  { id: 3, name: "How do I feel right now, and why?", value: 3 },
  { id: 4, name: "What was the best part of my day?", value: 4 },
  {
    id: 5,
    name: "What are three things that bring me peace or calm?",
    value: 5,
  },
  {
    id: 6,
    name: "What is one thing I can do to take care of myself today?",
    value: 6,
  },
  {
    id: 7,
    name: "What’s a recent challenge I faced, and what did I learn from it?",
    value: 7,
  },
  { id: 8, name: "How have I grown in the past year?", value: 8 },
  { id: 9, name: "What are my top three priorities right now?", value: 9 },
  {
    id: 10,
    name: "What does my ideal life look like, and how can I move toward it?",
    value: 10,
  },
  {
    id: 11,
    name: "What are some fears I have, and how can I overcome them?",
    value: 11,
  },
  {
    id: 12,
    name: "What is one positive affirmation I want to focus on today?",
    value: 12,
  },
  { id: 13, name: "What do I need to let go of to move forward?", value: 13 },
  {
    id: 14,
    name: "When was the last time I felt truly happy, and why?",
    value: 14,
  },
  {
    id: 15,
    name: "How do I want to feel at the end of this week/month/year?",
    value: 15,
  },
  { id: 16, name: "Who or what inspires me, and why?", value: 16 },
  {
    id: 17,
    name: "What are some small habits I can form to improve my life?",
    value: 17,
  },
  {
    id: 18,
    name: "How can I practice more mindfulness in my daily routine?",
    value: 18,
  },
  {
    id: 19,
    name: "What’s one thing I can do to strengthen my relationships?",
    value: 19,
  },
  {
    id: 20,
    name: "What does success look like to me, and what steps can I take toward it?",
    value: 20,
  },
];

const Journal = () => {
  const [content, setContent] = useState("");
  const [editedContent, setEditedContent] = useState<string | null>(null);
  const [journalPrompt, setJournalPrompt] = useState<string>(
    journalingPrompts[0]?.name || ""
  );

  const { data, isPending, refetch, isRefetching } = useJournalQuery();
  const { mutate: addJournalEntry, isPending: isPendingAdd } =
    useAddJournalEntryMutation();
  const { mutate: editJournalEntry, isPending: isPendingEdit } =
    useEditJournalEntryMutation();
  const { mutate: removeJournalEntry, isPending: isPendingRemove } =
    useRemoveJournalEntryMutation();

  const [activeEntry, setActiveEntry] = useState<number>(4);

  useEffect(() => {
    if (data && data.length > 0) {
      const currentContent = data?.find(
        (item) => item.id === activeEntry
      )?.content;
      setEditedContent(currentContent);
    }
  }, [data]);

  const handlePromptChange = (selectedValue: number) => {
    const selectedPrompt = journalingPrompts.find(
      (prompt) => prompt.value === selectedValue
    );
    setJournalPrompt(selectedPrompt?.name || "");
  };

  return (
    <div className="absolute z-50 overflow-hidden top-4 right-4 left-4 bottom-4 flex items-center justify-center pointer-events-none">
      <div className="rounded-xl modal__card modal__card--glass !max-w-[900px] !h-[90vh]">
        <div className="grid grid-cols-[30%_70%] h-[500px]">
          <div className="p-8 pr-0 flex flex-col pointer-events-auto">
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
                refetch();
              }}
              className={cn(
                "flex items-center gap-2 justify-center px-4 py-2 rounded-sm cursor-pointer transition duration-200 hover:border-primary hover:bg-primary hover:text-foreground-primary border-ransparent border active:translate-y-2"
              )}
            >
              <Plus />
              <span className="text-lg truncate pr-4">Add new</span>
            </div>
            <ScrollArea className="flex-grow min-h-0 overflow-y-auto max-h-[70%] mt-4">
              <div className="flex flex-col gap-2 pointer-events-auto">
                {!isPending &&
                  data &&
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
          <div className="max-h-[90%] p-8 rounded-l-sm gap-4 flex flex-col justify-between pointer-events-auto">
            <Select
              buttonClassName="w-full"
              size={"sm"}
              variant={"glass"}
              options={journalingPrompts}
              state={journalPrompt}
              setState={(selectedValue: number) =>
                handlePromptChange(selectedValue)
              }
              displayValue={journalPrompt}
            />
            <div className="h-full max-w-[600px] bg-neutral-900 p-8 pt-0 rounded-sm pointer-events-auto">
              {!isPending && data && editedContent && (
                <RichTextEditor
                  key={activeEntry}
                  content={editedContent || ""}
                  setContent={setContent}
                />
              )}
            </div>

            <div className="flex flex-row justify-between gap-4 mt-4">
              <Button
                onClick={() => {
                  removeJournalEntry(
                    { id: activeEntry },
                    {
                      onSuccess: () => {
                        refetch();
                        setActiveEntry((prev) => {
                          const updatedData = data?.filter(
                            (item) => item.id !== prev
                          );
                          return updatedData?.length ? updatedData[0].id : null;
                        });
                      },
                    }
                  );
                }}
                type={"button"}
                variant={null}
              >
                Delete
              </Button>
              <Button
                onClick={() => {
                  editJournalEntry({
                    id: activeEntry,
                    title: "New entry",
                    content: content,
                  });
                  refetch();
                }}
                type={"submit"}
                variant={"primary"}
                isDisabled={true}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journal;
