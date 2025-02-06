import React from "react";
import { supabaseClient } from "@/api/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const mutationFn = async (id: string) => {
  const { data, error } = await supabaseClient
    .from("habits")
    .delete()
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error removing habit:", error);
  } else {
    console.log("Habit removed:", data);
  }
};

const useRemoveHabitMutation = () => {
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

export default useRemoveHabitMutation;
