import React from "react";
import { supabaseClient } from "@/api/client";
import { useMutation } from "@tanstack/react-query";

const removeHabit = async (id: string) => {
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
  return useMutation({
    mutationKey: ["habits", "remove"],
    mutationFn: (id: string) => removeHabit(id),
  });
};

export default useRemoveHabitMutation;
