import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabaseClient } from "@/api/client";

const mutationFn = async ({
  habitId,
  date,
  isCompleted,
}: {
  habitId: string;
  date: string;
  isCompleted: boolean;
}) => {
  const { data: habit, error: fetchError } = await supabaseClient
    .from("habits")
    .select("dates")
    .eq("id", habitId)
    .single();

  if (fetchError) {
    throw new Error("Error fetching habit: " + fetchError.message);
  }

  const updatedDates = { ...habit?.dates, [date]: isCompleted };

  const { error: updateError } = await supabaseClient
    .from("habits")
    .update({ dates: updatedDates })
    .eq("id", habitId);

  if (updateError) {
    throw new Error("Error updating habit: " + updateError.message);
  }
};

const useUpdateHabitBox = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: mutationFn,
    onSuccess: (data) => {
      queryClient.refetchQueries({ queryKey: ["habits"] });
      console.log("Habit box updated:", data);
    },
    onError: (error) => {
      console.error("Error updating the ahbit box:", error);
    },
  });
};

export default useUpdateHabitBox;
