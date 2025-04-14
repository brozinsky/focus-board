import React, { useEffect, useMemo, useState } from "react";
import { HabitCheckbox } from "./HabitCheckbox";
import useRemoveHabitMutation from "@/stores/supabase/useRemoveHabitMutation";
import LoadingSpinner from "@/components/ui/loaders/LoadingSpinner";
import ButtonIcon from "@/components/ui/buttons/ButtonIcon";
import { cn } from "@/lib/utils";
import EditIconSVG from "@/components/elements/svg/icons/interface/EditIconSVG";
import CheckSVG from "@/components/elements/svg/icons/interface/CheckSVG";
import { getWeekDays } from "@/utils/functions/fn-date";
import EditHabit from "./EditHabit";
import useUpdateHabitBox from "@/stores/supabase/useUpdateHabitBox";
import useHabitWeekStore from "@/stores/zustand/useHabitWeekStore";

const HabitRow = ({
  name,
  id,
  dates,
}: {
  id: string;
  name: string;
  dates: any;
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { mutate: updateHabit } = useUpdateHabitBox();
  const { mutate: removeHabit, isPending: isPendingRemove } =
    useRemoveHabitMutation();

  const { weekOffset } = useHabitWeekStore();

  const weekDays = useMemo(() => getWeekDays(weekOffset), [weekOffset]);

  useEffect(() => {
    console.log({
      weekOffset,
      weekDaysLength: weekDays.length,
      dates: Object.keys(dates).length,
      weekDays: weekDays.map(d => d.toISOString().split('T')[0])
    });
  }, [weekDays, dates, weekOffset]);

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
          <div>{name}</div>
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
          {weekDays.slice(0, 7).map((day) => {
            const formattedDate = day.toISOString().split("T")[0];
            return (
              <HabitCheckbox
                key={formattedDate}
                name={formattedDate}
                isChecked={dates[formattedDate]}
                onChange={(checked) =>
                  updateHabit({
                    habitId: id,
                    date: formattedDate,
                    isCompleted: Boolean(checked),
                  })
                }
              />
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default HabitRow;
