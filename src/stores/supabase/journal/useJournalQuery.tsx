import { useQuery } from "@tanstack/react-query";
import { supabaseClient } from "@/api/client";

const getJournal = async () => {
  try {
    const response = await supabaseClient
      .from("journal")
      .select("*")
      .order("created_at", { ascending: true });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const useJournalQuery = () => {
  return useQuery({
    queryKey: ["journal"],
    queryFn: () => getJournal(),
    refetchOnWindowFocus: false,
  });
};

export default useJournalQuery;
