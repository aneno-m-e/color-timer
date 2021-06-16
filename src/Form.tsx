import React, { FormEvent } from "react";
import { RgbColor } from "react-colorful";
import ColourPicker from "./ColourPicker";

type Props = {
  start: (event: FormEvent) => void;
  firstColour: RgbColor;
  setFirstColour: (colour: RgbColor) => void;
  lastColour: RgbColor;
  setLastColour: (colour: RgbColor) => void;
};

function Form({
  start,
  firstColour,
  setFirstColour,
  lastColour,
  setLastColour,
}: Props) {
  return (
    <form action="" onSubmit={start}>
      <label htmlFor="duration">Duration</label>
      <input id="duration" name="duration" type="Text" />

      <ColourPicker
        id="firstColour"
        label="First Colour"
        colour={firstColour}
        setColour={setFirstColour}
      />
      <ColourPicker
        id="lastColour"
        label="Last Colour"
        colour={lastColour}
        setColour={setLastColour}
      />

      <button>Start !</button>
    </form>
  );
}

export default Form;
