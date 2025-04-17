import { TPosition } from "./global.model";

export type TPolaroid = {
  id: number;
  variant: "polaroid" | "picture";
  orientation: "portrait" | "landscape";
  padding?: "none" | "padding";
  frame?: "light" | "dark" | "none";
  styles?: any;
  image: string | null;
  caption: string;
  tilt: "left" | "center" | "right";
  sticker: "star" | "heart" | "smile" | null;
  position: TPosition;
};
