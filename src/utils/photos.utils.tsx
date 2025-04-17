import HeartSVG from "@/components/elements/svg/scribble/HeartSVG";
import SmileSVG from "@/components/elements/svg/scribble/SmileSVG";
import StarSVG from "@/components/elements/svg/scribble/StarSVG ";
import { TPolaroid } from "@/types/model-types";

export const getSticker = (sticker: TPolaroid["sticker"]) => {
  switch (sticker) {
    case "star":
      return (
        <StarSVG className="w-20 h-20 absolute -top-4 -right-2 transform" />
      );
    case "heart":
      return (
        <HeartSVG className="w-20 h-20 -rotate-[15deg] absolute -top-2 left-0 transform" />
      );
    case "smile":
      return (
        <SmileSVG className="w-20 h-20 -rotate-[35deg] absolute -bottom-6 right-0 transform" />
      );
    default:
      return null;
  }
};
