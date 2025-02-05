import React from "react";
import { supabaseClient } from "@/api/client";
import { useMutation } from "@tanstack/react-query";

const addHabit = async (title: string) => {
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
  return useMutation({
    mutationKey: ["habits", "add"],
    mutationFn: (title: string) => addHabit(title),
  });
};

export default useAddHabitMutation;
