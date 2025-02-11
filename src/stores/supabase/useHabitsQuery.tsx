import { useQuery } from "@tanstack/react-query";
import { supabaseClient } from "@/api/client";

const getHabits = async () => {
  try {
    const response = await supabaseClient
      .from("habits")
      .select("*")
      .order("created_at", { ascending: true });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const useHabitsQuery = () => {
  return useQuery({
    queryKey: ["habits"],
    queryFn: () => getHabits(),
    refetchOnWindowFocus: false,
  });
};

export default useHabitsQuery;
