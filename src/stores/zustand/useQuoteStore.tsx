import {
  getFromLocalStorage,
  setToLocalStorage,
} from "@/utils/common.utils";
import { create } from "zustand";

interface ISceneStore {
  isQuoteActive: boolean;
  //   quoteTags: string[];
  setIsQuoteActive: (isQuoteActive: boolean) => void;
  //   setQuoteTags: (quoteTags: string[]) => void;
}

// const defaultQuoteTags = [
//   "technology",
//   "work",
//   "wisdom",
//   "virtue",
//   "truth",
//   "science",
//   "philosophy",
//   "motivational",
//   "knowledge",
//   "inspirational",
//   "education",
//   "competition",
//   "character",
//   "change",
//   "business",
//   // "famous-quotes" //1090
// ];

// TODO - add quote tags multi select funcitonality
const useQuoteStore = create<ISceneStore>((set) => ({
  isQuoteActive: getFromLocalStorage("isQuoteActive", true),
  setIsQuoteActive: (value) => {
    setToLocalStorage("isQuoteActive", value);
    set({ isQuoteActive: value });
  },
  //   quoteTags: getFromLocalStorage("quoteTags", defaultQuoteTags),
  //   setQuoteTags: (value) => {
  //     setToLocalStorage("quoteTags", value);
  //     set({ quoteTags: value });
  //   },
}));

export default useQuoteStore;
