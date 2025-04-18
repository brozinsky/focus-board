import React from "react";
import { supabaseClient } from "@/api/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const mutationFn = async ({ id }: { id: number }) => {
  const { data, error } = await supabaseClient
    .from("journal")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return data;
};

const useRemoveJournalEntryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["journal"] });
      console.log("Journal entry removed successfully:", data);
    },
    onError: (error) => {
      console.error("Error removing journal entry:", error);
    },
  });
};

export default useRemoveJournalEntryMutation;
