import React, { FormEvent, useCallback, ChangeEvent } from "react";
import { RgbColor } from "react-colorful";
import ColourPicker from "../ColourPicker";
import "./Form.css";

type Props = {
  start: (event: FormEvent) => void;
  setDuration: (duration: number) => void;
  firstColour: RgbColor;
  setFirstColour: (colour: RgbColor) => void;
  lastColour: RgbColor;
  setLastColour: (colour: RgbColor) => void;
};

function Form({
  start,
  setDuration,
  firstColour,
  setFirstColour,
  lastColour,
  setLastColour,
}: Props) {
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  const getDurationInMs = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      switch (event.target.id) {
        case "hours":
          hours = event.target.valueAsNumber;
          break;
        case "minutes":
          minutes = event.target.valueAsNumber;
          break;
        case "seconds":
          seconds = event.target.valueAsNumber;
          break;
        default:
          break;
      }

      setDuration((hours * (60 ^ 2) + minutes * 60 + seconds) * 1000);
    },
    []
  );

  return (
    <form action="" onSubmit={start}>
      <h1>Colour Timer</h1>
      <div id="duration">
        <label htmlFor="hours">H</label>
        <input
          id="hours"
          type="number"
          placeholder="00"
          onChange={getDurationInMs}
        />

        <label htmlFor="minutes">M</label>
        <input
          id="minutes"
          type="number"
          placeholder="00"
          onChange={getDurationInMs}
        />

        <label htmlFor="seconds">S</label>
        <input
          id="seconds"
          type="number"
          placeholder="00"
          onChange={getDurationInMs}
        />
      </div>
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
