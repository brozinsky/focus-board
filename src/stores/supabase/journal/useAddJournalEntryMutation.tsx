import React from "react";
import { supabaseClient } from "@/api/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const mutationFn = async ({
  title,
  content,
  questionPrompt,
}: {
  title: string;
  content: string;
  questionPrompt?: number | null;
}) => {
  const { data, error } = await supabaseClient
    .from("journal")
    .insert([{ title, content, question_prompt: questionPrompt }])
    .select();
  if (error) console.error(error);
  else {
    console.log("Journal entry added:", data);
  }
};

const useAddJournalEntryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: mutationFn,
    onSuccess: (data) => {
      queryClient.refetchQueries({ queryKey: ["journal"] });
      console.log("Journal entry successfully:", data);
    },
    onError: (error) => {
      console.error("Error adding new journal entry:", error);
    },
  });
};

export default useAddJournalEntryMutation;
