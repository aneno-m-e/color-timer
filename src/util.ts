import { RgbColor } from "react-colorful";

export const formatToRGBString = (colour: RgbColor): string => {
  return `rgb(${colour.r}, ${colour.g}, ${colour.b})`;
};
