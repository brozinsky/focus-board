import RichTextEditor from "./RichTextEditor";
import { useEffect } from "react";
import Button from "@/components/ui/buttons/Button";
import useEditJournalEntryMutation from "@/stores/supabase/journal/useEditJournalEntryMutation";
import useRemoveJournalEntryMutation from "@/stores/supabase/journal/useRemoveJournalEntryMutation";
import Select from "@/components/ui/dropdowns/Select";
import { useJournalStore } from "@/stores/zustand/useJournalStore";

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

const JournalRightEditor = ({ data }) => {
  const {
    content,
    editedContent,
    journalPrompt,
    setContent,
    setJournalPrompt,
    activeEntry,
    setActiveEntry,
  } = useJournalStore();

  const { mutate: editJournalEntry, isPending: isPendingEdit } =
    useEditJournalEntryMutation();
  const { mutate: removeJournalEntry, isPending: isPendingRemove } =
    useRemoveJournalEntryMutation();

  useEffect(() => {
    setJournalPrompt(journalingPrompts[0]?.name || "");
  }, [setJournalPrompt]);

  const handlePromptChange = (selectedValue: number) => {
    const selectedPrompt = journalingPrompts.find(
      (prompt) => prompt.value === selectedValue
    );
    setJournalPrompt(selectedPrompt?.name || "");
  };

  useEffect(() => {
    console.log("editedContent change!", editedContent);
  }, [editedContent]);

  return (
    <div className="max-h-[90%] flex-grow p-8 rounded-l-sm gap-4 flex flex-col justify-between pointer-events-auto">
      <Select
        buttonClassName="w-full"
        size={"sm"}
        variant={"glass"}
        options={journalingPrompts}
        state={journalPrompt}
        setState={(selectedValue: number) => handlePromptChange(selectedValue)}
        displayValue={journalPrompt}
      />
      <div className="h-full max-h-[100%] overflow-y-auto max-w-[800px] bg-neutral-900 pt-0 px-0 rounded-sm pointer-events-auto">
        <RichTextEditor
          key={`${activeEntry}-${editedContent}`}
          content={editedContent || ""}
          setContent={setContent}
        />
      </div>

      <div className="flex flex-row justify-between gap-4">
        <Button
          onClick={() => {
            removeJournalEntry(
              { id: activeEntry },
              {
                onSuccess: () => {
                  //   refetch();
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
            // refetch();
          }}
          type={"submit"}
          variant={"primary"}
          //   isDisabled={true}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default JournalRightEditor;
