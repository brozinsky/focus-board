import React from "react";
import { supabaseClient } from "@/api/client";
import { useMutation } from "@tanstack/react-query";

const updateHabits = async (
  updates: {
    habitId: string;
    date: string;
    isCompleted: boolean;
  }[]
) => {
  try {
    const updatesPromises = updates.map(({ habitId, date, isCompleted }) =>
      supabaseClient
        .from("habits")
        .select("dates")
        .eq("id", habitId)
        .single()
        .then(({ data: habit, error: fetchError }) => {
          if (fetchError) {
            console.error("Error fetching habit:", fetchError);
            return;
          }

          const currentDates = habit?.dates ?? {};
          const updatedDates = { ...currentDates, [date]: isCompleted };

          return supabaseClient
            .from("habits")
            .update({ dates: updatedDates })
            .eq("id", habitId);
        })
    );

    await Promise.all(updatesPromises);
    console.log("All habits updated successfully.");
  } catch (error) {
    console.error("Error updating habits:", error);
  }
};

const useUpdateHabitMutation = () => {
  return useMutation({
    mutationKey: ["habits", "update"],
    mutationFn: updateHabits,
  });
};

export default useUpdateHabitMutation;
