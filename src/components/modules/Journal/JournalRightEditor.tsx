import RichTextEditor from "./RichTextEditor";
import { useEffect, useState } from "react";
import Button from "@/components/ui/buttons/Button";
import useEditJournalEntryMutation from "@/stores/supabase/journal/useEditJournalEntryMutation";
import useRemoveJournalEntryMutation from "@/stores/supabase/journal/useRemoveJournalEntryMutation";
import { useJournalStore } from "@/stores/zustand/useJournalStore";
import clsx from "clsx";
import JournalSheetSettings from "./JournalSheetSettings";
import JournalEditSettings from "./JournalEditSettings";

const JournalRightEditor = ({ data }) => {
  const {
    content,
    editedContent,
    setContent,
    activeEntry,
    setActiveEntry,
    sheetBgColor,
    sheetBg,
    fontFamily,
  } = useJournalStore();

  useEffect(() => {
    console.log(editedContent);
  }, [editedContent]);

  const currentData = data?.find((item) => item.id === activeEntry);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(currentData?.title);

  useEffect(() => {
    const currentData = data?.find((item) => item.id === activeEntry);
    setTitle(currentData?.title);
  }, [activeEntry]);

  const { mutate: editJournalEntry, isPending: isPendingEdit } =
    useEditJournalEntryMutation();
  const { mutate: removeJournalEntry, isPending: isPendingRemove } =
    useRemoveJournalEntryMutation();

  return (
    <div className="max-h-[90%] flex-grow p-8 rounded-l-sm gap-4 flex flex-col justify-between pointer-events-auto">
      {isEditing ? (
        <JournalEditSettings data={data} title={title} setTitle={setTitle} />
      ) : (
        <JournalSheetSettings />
      )}
      {
        <div
          className={
            "h-full max-h-[100%] flex flex-col overflow-y-auto max-w-[800px] bg-neutral-900 pt-0 px-0 rounded-sm pointer-events-auto flex"
          }
        >
          {isEditing ? (
            <RichTextEditor
              key={`${activeEntry}-${editedContent}`}
              content={editedContent || ""}
              setContent={setContent}
            />
          ) : (
            <div className="max-h-[100%] overflow-y-auto w-full h-full">
              <div
                className={clsx(
                  `p-6 h-auto min-h-full bg-journal relative self-stretch bg-journal--${sheetBg} text-gray-800`,
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
      }

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
