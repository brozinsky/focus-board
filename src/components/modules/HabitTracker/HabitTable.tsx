import React, { useEffect } from "react";
import HabitRow from "./HabitRow";
import LoadingSpinner from "@/components/ui/loaders/LoadingSpinner";
import useHabitsQuery from "@/stores/supabase/useHabitsQuery";
import useAddHabitMutation from "@/stores/supabase/useAddHabitMutation";
import AddHabit from "./AddHabit";
import HabitHead from "./HabitHead";
import { Ghost } from "lucide-react";
import { useMemo } from "react";
import useUpdateHabitBox from "@/stores/supabase/useUpdateHabitBox";
import { EMPTY_STATE_HABIT_TRACKER } from "@/lib/constants/const-messages";

const HabitTable = () => {
  const { data, isPending, refetch, isRefetching } = useHabitsQuery();
  const { isPending: isPendingAdd } = useAddHabitMutation();

  const { mutate: updateHabit } = useUpdateHabitBox();

  const randomMessage = useMemo(() => {
    return EMPTY_STATE_HABIT_TRACKER[Math.floor(Math.random() * EMPTY_STATE_HABIT_TRACKER.length)];
  }, [data]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="flex flex-col gap-5">
      {isRefetching && (
        <div className="absolute top-0 right-10">
          <LoadingSpinner className={"w-3 h-3"} />
        </div>
      )}
      {data && data?.length > 0 ? (
        <HabitHead />
      ) : (
        !isPending && (
          <div className="flex items-center justify-start gap-4 opacity-60 mx-auto mt-3">
            <Ghost strokeWidth={2} size={40} />
            <div>
              <p className="text-muted text-xl">{randomMessage.heading}</p>
              <p className="text-muted text-base">
                {randomMessage.description}
              </p>
            </div>
          </div>
        )
      )}

      {!isPending &&
        data &&
        data.map((item) => {
          return (
            <HabitRow
              key={item.id}
              id={item.id}
              name={item.title}
              dates={item.dates}
            />
          );
        })}
      <div className="relative mt-8 ">
        {isPendingAdd && (
          <div className="z-50 absolute left-0 right-0 top-0 bottom-0 py-2 flex-center">
            <LoadingSpinner />
          </div>
        )}
        <AddHabit />
      </div>
    </div>
  );
};

export default HabitTable;
