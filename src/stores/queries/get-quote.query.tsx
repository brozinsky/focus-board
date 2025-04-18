import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// const QUOTE_BASE_URL = "https://api.quotable.io/quotes/random";
const QUOTE_BASE_URL = "https://thequoteshub.com/api/random-quote";

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
  // const response = await axios.get(`${QUOTE_BASE_URL}?tags=${tagsParam}`, {
  const response = await axios.get(`${QUOTE_BASE_URL}?keyword=${tagsParam}`, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    params: {
      maxLength: 50,
    },
  });

  if (response.status !== 200) {
    throw new Error("An error occurred while fetching the quote");
  }

  const text = response.data;

  const quoteMatch = text.match(/^Quote:\s(.+)/m);
  const authorMatch = text.match(/^Author:\s(.+)/m);

  if (!quoteMatch || !authorMatch) {
    throw new Error("Failed to parse quote response");
  }

  return {
    quote: quoteMatch[1].trim(),
    author: authorMatch[1].trim(),
  };
};

const useQuoteQuery = () => {
  return useQuery({
    queryKey: ["quote"],
    queryFn: fetchQuote,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });
};

export default useQuoteQuery;
