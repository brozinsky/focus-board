import WindowTodoList from "./WindowTodoList";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import useWindowsStore, {
  createHandleDragEnd,
} from "@/stores/zustand/useWindowsStore";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import RichTextEditor from "./RichTextEditor";
import { NotebookPen } from "lucide-react";
import JournalEntry from "./JournalEntry";
import { useEffect, useState } from "react";
import useJournalQuery from "@/stores/supabase/journal/useJournalQuery";
import useAddJournalEntryMutation from "@/stores/supabase/journal/useAddJournalEntryMutation";
import { dateToString } from "@/utils/functions/fn-common";

const Journal = () => {
  const [content, setContent] = useState("");
  const [editedContent, setEditedContent] = useState<string | null>(null);

  const { data, isPending, refetch, isRefetching } = useJournalQuery();
  const { mutate: addJournalEntry, isPending: isPendingAdd } =
    useAddJournalEntryMutation();

  const [activeEntry, setActiveEntry] = useState<number>(4);

  useEffect(() => {
    console.log(data?.find((item) => item.id === activeEntry).content);
    const currentContent = data?.find(
      (item) => item.id === activeEntry
    ).content;
    setEditedContent(currentContent);
  }, [data]);

  useEffect(() => {
    console.log(editedContent);
  }, [editedContent]);

  return (
    <div className="absolute z-50 overflow-hidden top-4 right-4 left-4 bottom-4 flex items-center justify-center pointer-events-none">
      <div className="rounded-xl modal__card modal__card--glass !max-w-[900px] !h-[90%]">
        <div className="grid grid-cols-[30%_70%] h-full">
          <div className="p-8 pr-0">
            <h3 className="flex flex-row items-center text-xl gap-3 tracking-wide mb-8">
              <NotebookPen />
              Journal
            </h3>
            <div className="flex flex-col gap-2 pointer-events-auto">
              {!isPending &&
                data &&
                data.map(({ id, title, created_at }) => {
                  return (
                    <JournalEntry
                      key={id}
                      id={id}
                      active={id === activeEntry}
                      title={title}
                      setEntry={setActiveEntry}
                      date={dateToString(created_at)}
                    />
                  );
                })}
            </div>
          </div>
          <div className="p-8 rounded-l-sm flex flex-col justify-between">
            <div className="w-full h-7">Tu select</div>
            <div className="h-full max-w-[600px] bg-neutral-900 p-8 pt-0 rounded-sm pointer-events-auto">
              {!isPending && data && editedContent && (
                <RichTextEditor
                  key={activeEntry}
                  content={
                    data?.find((item) => item.id === activeEntry).content ?? ""
                  }
                  setContent={setContent}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journal;
