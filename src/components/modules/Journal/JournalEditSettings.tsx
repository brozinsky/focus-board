import Select from "@/components/ui/dropdowns/Select";
import { JOURNALING_PROMPTS } from "@/lib/constants/journal.constants";
import { Input } from "@/components/ui/inputs/Input";
import { useEffect } from "react";
import { useJournalStore } from "@/stores/zustand/journal/journal.store";

const JournalEditSettings = () => {
  const { journalPrompt, setJournalPrompt, activeEntry, title, setTitle } =
    useJournalStore();

  // useEffect(() => {
  //   setJournalPrompt(JOURNALING_PROMPTS[1]);
  // }, [setJournalPrompt]);

  const handlePromptChange = (selectedValue: number) => {
    const selectedPrompt = JOURNALING_PROMPTS.find(
      (prompt) => prompt.value === selectedValue
    );
    setJournalPrompt(selectedPrompt || JOURNALING_PROMPTS[1]);
  };

  return (
    <>
      <div className="relative z-20">
        <Select
          buttonClassName="w-full"
          size={"sm"}
          variant={"glass"}
          options={JOURNALING_PROMPTS}
          state={journalPrompt}
          setState={(selectedValue: number) =>
            handlePromptChange(selectedValue)
          }
          displayValue={journalPrompt.name}
        />
      </div>
      <Input
        key={`${activeEntry}`}
        className="w-full p-2 border rounded"
        placeholder="Enter the title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
    </>
  );
};

export default JournalEditSettings;
