import React, { useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import useUpdateHabitMutation from "@/stores/supabase/update-habit.mutation";
import { getWeekDays } from "@/utils/date.utils";
import useHabitsQuery from "@/stores/supabase/get-habits.query";

const useHabitsForm = () => {
  const { mutate: updateHabits } = useUpdateHabitMutation();
  const { data: habits, isLoading } = useHabitsQuery();

  const weekDays = useMemo(() => getWeekDays(), []);

  const initialValues = useMemo(() => {
    if (!habits) return {};
    return habits.reduce((acc, habit) => {
      acc[habit.id] = weekDays.reduce((habitAcc, day) => {
        const formattedDate = day.toISOString().split("T")[0];
        habitAcc[formattedDate] = habit.dates?.[formattedDate] ?? false;
        return habitAcc;
      }, {} as Record<string, boolean>);
      return acc;
    }, {} as Record<string, Record<string, boolean>>);
  }, [habits, weekDays]);

  const form = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      const updates = Object.keys(values).flatMap((habitId) =>
        Object.keys(values[habitId]).map((date) => ({
          habitId,
          date,
          isCompleted: values[habitId][date],
        }))
      );

      updateHabits(updates);
    },
  });

//   const debouncedSubmit = useMemo(
//     () => debounce(form.submitForm, 1500),
//     [form.submitForm]
//   );

//   useEffect(() => {
//     if (!form.dirty) return;
//     debouncedSubmit();
//   }, [form.values, debouncedSubmit]);

  return { form, isLoading };
};

export default useHabitsForm;
