import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabaseClient } from "@/api/client";

const mutationFn = async ({
  habitId,
  newTitle,
}: {
  habitId: string;
  newTitle: string;
}) => {
  try {
    const { data: habit, error: fetchError } = await supabaseClient
      .from("habits")
      .select("title")
      .eq("id", habitId)
      .single();

    if (fetchError) {
      console.error("Error fetching habit:", fetchError);
      return;
    }

    if (habit) {
      const { error: updateError } = await supabaseClient
        .from("habits")
        .update({ title: newTitle })
        .eq("id", habitId);

      if (updateError) {
        console.error("Error updating habit title:", updateError);
      } else {
        console.log("Habit title updated successfully.");
      }
    }
  } catch (error) {
    console.error("Error editing habit:", error);
  }
};

const useEditHabitMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: mutationFn,
    onSuccess: (data) => {
      queryClient.refetchQueries(["habits"]);
      console.log("Habit updated successfully:", data);
    },
    onError: (error) => {
      console.error("Error editing habit:", error);
    },
  });
};

export default useEditHabitMutation;
