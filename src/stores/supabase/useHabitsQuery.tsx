import { useQuery } from "@tanstack/react-query";
import { supabaseClient } from "@/api/client";

const getHabits = async () => {
  try {
    const response = await supabaseClient.from("habits").select("*");
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
