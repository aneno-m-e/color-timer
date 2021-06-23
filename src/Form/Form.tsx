import React, { FormEvent, useCallback, useRef } from "react";
import { RgbColor } from "react-colorful";
import ColourPicker from "../ColourPicker/ColourPicker";
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
  const hoursInput = useRef<HTMLInputElement>(null);
  const minutesInput = useRef<HTMLInputElement>(null);
  const secondsInput = useRef<HTMLInputElement>(null);

  const setDurationInMs = useCallback(() => {
    const hours: number = hoursInput.current?.valueAsNumber || 0;
    const minutes: number = minutesInput.current?.valueAsNumber || 0;
    const seconds: number = secondsInput.current?.valueAsNumber || 0;
    setDuration((hours * 3600 + minutes * 60 + seconds) * 1000);
  }, [setDuration]);

  return (
    <form action="" onSubmit={start}>
      <h1>Colour Timer</h1>
      <div id="duration">
        <label htmlFor="hours">H</label>
        <input
          id="hours"
          type="number"
          placeholder="00"
          ref={hoursInput}
          onChange={setDurationInMs}
        />

        <label htmlFor="minutes">M</label>
        <input
          id="minutes"
          type="number"
          placeholder="00"
          ref={minutesInput}
          onChange={setDurationInMs}
        />

        <label htmlFor="seconds">S</label>
        <input
          id="seconds"
          type="number"
          placeholder="00"
          ref={secondsInput}
          onChange={setDurationInMs}
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
