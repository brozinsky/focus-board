import React, { useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import { HabitCheckbox } from "./HabitCheckbox";
import useRemoveHabitMutation from "@/stores/supabase/useRemoveHabitMutation";
import useUpdateHabitMutation from "@/stores/supabase/useUpdateHabitMutation";
import LoadingSpinner from "@/components/ui/loaders/LoadingSpinner";
import TrashIconSVG from "@/components/elements/svg/icons/interface/TrashIconSVG";
import ButtonIcon from "@/components/ui/buttons/ButtonIcon";
import { cn } from "@/lib/utils";
import EditIconSVG from "@/components/elements/svg/icons/interface/EditIconSVG";
import CheckSVG from "@/components/elements/svg/icons/interface/CheckSVG";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { debounce } from "@/utils/functions/fn-common";
import { getWeekDays } from "@/utils/functions/fn-date";
import EditHabit from "./EditHabit";

const HabitRow = ({
  name,
  dates,
  id,
  refetch,
}: {
  id: string;
  name: string;
  dates: Record<string, boolean>;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any[] | null | undefined, Error>>;
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { mutate: removeHabit, isPending: isPendingRemove } =
    useRemoveHabitMutation();

  const { mutate: updateHabits, isPending: isPendingUpdate } =
    useUpdateHabitMutation();

  const weekDays = useMemo(() => getWeekDays(), []);

  const formik = useFormik({
    initialValues: weekDays.reduce((acc, day) => {
      const formattedDate = day.toISOString().split("T")[0];
      acc[formattedDate] = dates?.[formattedDate] ?? false;
      return acc;
    }, {} as Record<string, boolean>),

    onSubmit: (values) => {
      const updates = Object.keys(values).map((date) => ({
        habitId: id,
        date,
        isCompleted: values[date],
      }));

      updateHabits(updates);
    },
  });

  const debouncedSubmit = useMemo(
    () => debounce(formik.submitForm, 4000),
    [formik.submitForm]
  );

  useEffect(() => {
    if (!isPendingRemove) return;
    refetch();
  }, [isPendingRemove]);

  useEffect(() => {
    if (!formik.dirty) return;
    debouncedSubmit();
  }, [formik.values, debouncedSubmit]);

  return (
    <React.Fragment>
      <EditHabit
        habitId={id}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        habitName={name}
        onDelete={() => {
          removeHabit(id);
        }}
      />
      <div className="flex flex-row gap-4 items-center relative">
        {isPendingRemove && (
          <div className="z-50 absolute left-0 right-0 top-0 bottom-0 py-2 flex-center">
            <LoadingSpinner />
          </div>
        )}
        <div
          className={cn(
            isPendingRemove && "opacity-15",
            "min-w-[33%] relative group/habit"
          )}
        >
          <textarea
            name="title"
            onChange={() => null}
            value={name}
            rows={1}
            className={cn(
              isEditing
                ? "active bg-input"
                : "pointer-events-none bg-transparent",
              `overflow-hidden resize-none`
            )}
            placeholder={isEditing ? "Title" : ""}
            onKeyDown={(e) => e.stopPropagation()}
            disabled={!isEditing}
            unselectable="on"
            spellCheck={false}
          />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex-center gap-1">
            <ButtonIcon
              type="button"
              className={cn(
                "bg-background hover:bg-primary text-primary-foreground hover:opacity-100 ",
                true && "group-hover/habit:opacity-100 opacity-0"
              )}
              onClick={() => setIsEditing(!isEditing)}
              icon={
                !isEditing ? (
                  <EditIconSVG pathClass="group-hover/edit:stroke-foreground-primary stroke-foreground" />
                ) : (
                  <CheckSVG pathClass="group-hover/edit:stroke-foreground-primary stroke-foreground" />
                )
              }
              tooltip={"Edit"}
            />
          </div>
        </div>
        <div
          className={cn(
            isPendingRemove && "opacity-15",
            "grid grid-cols-7 gap-4 w-full justify-items-center"
          )}
        >
          {weekDays.map((day) => {
            const formattedDate = day.toISOString().split("T")[0];
            return (
              <HabitCheckbox
                key={formattedDate}
                name={formattedDate}
                isChecked={formik.values[formattedDate]}
                onChange={(checked) => {
                  formik.setFieldValue(formattedDate, checked);
                }}
              />
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default HabitRow;
