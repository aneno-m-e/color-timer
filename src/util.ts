export const getRGBValues = (colour: string): number[] => {
  return colour.match(/\d+/g)?.map((e) => +e)!; // Unary plus. Industry standard: parseInt(e, 10)
  // ! = forces TS to discard possibility of a null result
};

export const formatToRGB = (colourValues: number[]): string => {
  return (
    "rgb(" +
    colourValues[0] +
    ", " +
    colourValues[1] +
    ", " +
    colourValues[2] +
    ")"
  );
};
