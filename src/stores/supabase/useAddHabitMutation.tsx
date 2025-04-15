import React from "react";
import { supabaseClient } from "@/api/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { THabitsForm } from "@/types/query-types";

const mutationFn = async (values: THabitsForm) => {
  const { data, error } = await supabaseClient
    .from("habits")
    .insert([
      {
        title: values.title,
        start_date: values.startDate.toISOString(),
        end_date: values.endDate ? values.endDate.toISOString() : null,
        selected_days: values.selectedDays,
      },
    ])
    .select();
  if (error) console.error(error);
  else {
    console.log("Habit added:", data);
  }
};

const useAddHabitMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: mutationFn,
    onSuccess: (data) => {
      queryClient.refetchQueries({ queryKey: ["habits"] });
      console.log("Habit added successfully:", data);
    },
    onError: (error) => {
      console.error("Error adding new habit:", error);
    },
  });
};

export default useAddHabitMutation;
