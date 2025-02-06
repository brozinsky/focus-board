import React, { useEffect } from "react";
import HabitRow from "./HabitRow";
import LoadingSpinner from "@/components/ui/loaders/LoadingSpinner";
import useHabitsQuery from "@/stores/supabase/useHabitsQuery";
import useAddHabitMutation from "@/stores/supabase/useAddHabitMutation";
import { useFormik } from "formik";
import AddHabit from "./AddHabit";
import HabitHead from "./HabitHead";
import { Ghost } from "lucide-react";
import { useMemo } from "react";

const emptyMessages = [
  {
    id: 1,
    heading: "No habits yet",
    description: "Every great routine starts somewhere!",
  },
  {
    id: 2,
    heading: "A fresh start!",
    description: "Add your first habit to begin tracking.",
  },
  {
    id: 3,
    heading: "This space is waiting for your first habit",
    description: "Let’s go!",
  },
  {
    id: 4,
    heading: "Nothing here yet",
    description: "Small steps lead to big changes!",
  },
  {
    id: 5,
    heading: "Your habit tracker is looking a little empty",
    description: "Time to fix that!",
  },
  {
    id: 6,
    heading: "Build the habits that shape your day",
    description: "Start by adding one!",
  },
  {
    id: 7,
    heading: "No habits added yet",
    description: "But every journey begins with a first step.",
  },
  {
    id: 8,
    heading: "An empty tracker today",
    description: "A streak champion tomorrow!",
  },
  {
    id: 9,
    heading: "No habits to track yet",
    description: "What’s the first one on your list?",
  },
  {
    id: 10,
    heading: "Your habit journey starts here",
    description: "Add your first one now!",
  },
];

const HabitTable = () => {
  const { data, isPending, refetch, isRefetching } = useHabitsQuery();
  const { mutate: addHabit, isPending: isPendingAdd } = useAddHabitMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
    },

    onSubmit: (values) => {
      console.log("submit");
    },
  });

  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);

  useEffect(() => {
    if (!isPendingAdd) return;
    refetch();
  }, [isPendingAdd]);

  const randomMessage = useMemo(() => {
    return emptyMessages[Math.floor(Math.random() * emptyMessages.length)];
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
        <div className="flex items-center justify-start gap-4 opacity-60 mx-auto mt-3">
          <Ghost strokeWidth={2} size={40} />
          <div>
            <p className="text-muted text-xl">{randomMessage.heading}</p>
            <p className="text-muted text-base">{randomMessage.description}</p>
          </div>
        </div>
      )}

      {!isPending &&
        data &&
        data.map((item, i) => {
          return (
            <HabitRow
              key={i}
              refetch={refetch}
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
