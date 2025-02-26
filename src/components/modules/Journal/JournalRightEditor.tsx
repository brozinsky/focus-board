import RichTextEditor from "./RichTextEditor";
import { useEffect, useMemo, useState } from "react";
import Button from "@/components/ui/buttons/Button";
import useEditJournalEntryMutation from "@/stores/supabase/journal/useEditJournalEntryMutation";
import useRemoveJournalEntryMutation from "@/stores/supabase/journal/useRemoveJournalEntryMutation";
import Select from "@/components/ui/dropdowns/Select";
import { useJournalStore } from "@/stores/zustand/useJournalStore";
import {
  JOURNAL_BG_COLORS,
  JOURNAL_FONTS,
  JOURNAL_SHEETS,
  JOURNALING_PROMPTS,
} from "@/lib/constants/const-journal";
import { Input } from "@/components/ui/inputs/Input";
import { Contrast, FileText, Type } from "lucide-react";
import clsx from "clsx";
import {
  TJournalBgColors,
  TJournalFonts,
  TJournalSheets,
} from "@/types/model-types";

const JournalRightEditor = ({ data }) => {
  const {
    content,
    editedContent,
    journalPrompt,
    setContent,
    setJournalPrompt,
    activeEntry,
    setActiveEntry,
    sheetBgColor,
    setSheetBgColor,
    sheetBg,
    setSheetBg,
    fontFamily,
    setFontFamily,
  } = useJournalStore();

  const currentData = data?.find((item) => item.id === activeEntry);

  const [title, setTitle] = useState<string>(currentData?.title);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const currentData = data?.find((item) => item.id === activeEntry);
    setTitle(currentData?.title);
  }, [activeEntry]);

  const { mutate: editJournalEntry, isPending: isPendingEdit } =
    useEditJournalEntryMutation();
  const { mutate: removeJournalEntry, isPending: isPendingRemove } =
    useRemoveJournalEntryMutation();

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
    <div className="max-h-[90%] flex-grow p-8 rounded-l-sm gap-4 flex flex-col justify-between pointer-events-auto">
      {isEditing ? (
        <>
          <Select
            buttonClassName="w-full"
            size={"sm"}
            variant={"glass"}
            options={JOURNALING_PROMPTS}
            state={journalPrompt}
            setState={(selectedValue: number) =>
              handlePromptChange(selectedValue)
            }
            displayValue={journalPrompt}
          />
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
      ) : (
        <div className="grid grid-cols-3 gap-8 items-center">
          <div className="flex items-center justify-between gap-2 w-full">
            <FileText className="w-4 h-4 text-foreground-muted" />
            <div className="w-10/12">
              <Select
                buttonClassName="w-full"
                size="sm"
                variant="glass"
                options={JOURNAL_SHEETS}
                state={sheetBg}
                setState={(value: TJournalSheets) => setSheetBg(value)}
                displayValue={sheetBg}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 w-full">
            <Type className="w-4 h-4 text-foreground-muted" />
            <div className="w-10/12">
              <Select
                buttonClassName="w-full"
                size="sm"
                variant="glass"
                options={JOURNAL_FONTS}
                state={fontFamily}
                setState={(selectedValue: TJournalFonts) =>
                  setFontFamily(selectedValue)
                }
                displayValue={fontFamily}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 w-full">
            <Contrast className="w-4 h-4 text-foreground-muted" />
            <div className="w-10/12">
              <Select
                buttonClassName="w-full"
                size="sm"
                variant="glass"
                options={JOURNAL_BG_COLORS}
                state={sheetBgColor}
                setState={(value: TJournalBgColors) => setSheetBgColor(value)}
                displayValue={sheetBgColor}
              />
            </div>
          </div>
        </div>
      )}
      {editedContent && (
        <div
          className={
            "h-full max-h-[100%] overflow-y-auto max-w-[800px] bg-neutral-900 pt-0 px-0 rounded-sm pointer-events-auto flex"
          }
        >
          {isEditing && editedContent ? (
            <RichTextEditor
              key={`${activeEntry}-${editedContent}`}
              content={editedContent || ""}
              setContent={setContent}
            />
          ) : (
            <div className="max-h-[100%] overflow-y-auto w-full h-full">
              <div
                className={clsx(
                  `p-6 h-auto bg-journal relative self-stretch bg-journal--${sheetBg} text-gray-800`,
                  fontFamily,
                  sheetBgColor
                )}
                dangerouslySetInnerHTML={{
                  __html: `<p class="text-right absolute top-1 text-xs right-4">2025-02-20</p><p class="text-center pt-0.5 pb-1"><strong>${title}</strong></p>${editedContent}`,
                }}
              ></div>
            </div>
          )}
        </div>
      )}

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
          isDisabled={isPendingRemove}
        >
          Delete
        </Button>
        <Button
          isLoading={isPendingEdit}
          onClick={() => {
            if (isEditing) {
              editJournalEntry({
                id: activeEntry,
                title: title,
                content: content,
              });
              setIsEditing(false);
            } else {
              setIsEditing(true);
            }
          }}
          type={"submit"}
          variant={"primary"}
          //   isDisabled={true}
        >
          {isEditing ? "Save" : "Edit"}
        </Button>
      </div>
    </div>
  );
};

export default JournalRightEditor;
