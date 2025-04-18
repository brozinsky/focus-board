import React from "react";
import { supabaseClient } from "@/api/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const mutationFn = async ({
  id,
  title,
  content,
  questionPrompt,
}: {
  id: number;
  title: string;
  content: string;
  questionPrompt?: number | null;
}) => {
  const { data, error } = await supabaseClient
    .from("journal")
    .update({ title, content, question_prompt: questionPrompt })
    .eq("id", id)
    .select();

  if (error) throw error;
  return data;
};

const useEditJournalEntryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["journal"] });
      console.log("Journal entry updated successfully:", data);
    },
    onError: (error) => {
      console.error("Error updating journal entry:", error);
    },
  });
};

export default useEditJournalEntryMutation;
