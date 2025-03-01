import { useQuery } from "@tanstack/react-query";
import { supabaseClient } from "@/api/client";
import { TJournalData } from "@/types/query-types";

const getJournal = async (): Promise<TJournalData[]> => {
  try {
    const response = await supabaseClient
      .from("journal")
      .select("*")
      .order("created_at", { ascending: true });

    if (response.error) {
      throw response.error;
    }

    return response.data ?? [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
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
