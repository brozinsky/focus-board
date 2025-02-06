import React from "react";
import { supabaseClient } from "@/api/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const mutationFn = async (title: string) => {
  const { data, error } = await supabaseClient
    .from("habits")
    .insert([{ title, dates: {} }])
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
