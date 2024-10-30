import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const QUOTE_BASE_URL = "https://api.quotable.io/random";

const quoteTags = [
  "technology",
  "work",
  "wisdom",
  "virtue",
  "truth",
  "science",
  "philosophy",
  "motivational",
  "knowledge",
  "inspirational",
  "education",
  "competition",
  "character",
  "change",
  "business",
  // "famous-quotes" //1090
];

const fetchQuote = async () => {
  const tagsParam = quoteTags.join("|");
  const response = await axios.get(`${QUOTE_BASE_URL}?tags=${tagsParam}`, {
    params: {
      maxLength: 50,
    },
  });

  if (response.status !== 200) {
    throw new Error("An error occurred while fetching the quote");
  }

  const data = response.data;
  return {
    quote: data.content,
    cite: data.author,
  };
};

const useQuoteQuery = () => {
  return useQuery({
    queryKey: ["quote"],
    queryFn: fetchQuote,
    refetchOnWindowFocus: false,
  });
};

export default useQuoteQuery;
