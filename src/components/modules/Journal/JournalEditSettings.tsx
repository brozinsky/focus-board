import Select from "@/components/ui/dropdowns/Select";
import { JOURNALING_PROMPTS } from "@/lib/constants/const-journal";
import { Input } from "@/components/ui/inputs/Input";
import { useEffect, useState } from "react";
import { useJournalStore } from "@/stores/zustand/useJournalStore";

const JournalEditSettings = ({ title, setTitle, data }) => {
  const { journalPrompt, setJournalPrompt, activeEntry } = useJournalStore();

  useEffect(() => {
    setJournalPrompt(JOURNALING_PROMPTS[0]?.name || "");
  }, [setJournalPrompt]);

  const handlePromptChange = (selectedValue: number) => {
    const selectedPrompt = JOURNALING_PROMPTS.find(
      (prompt) => prompt.value === selectedValue
    );
    setJournalPrompt(selectedPrompt?.name || "");
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
            setState={(selectedValue: number) => handlePromptChange(selectedValue)}
            displayValue={journalPrompt}
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
