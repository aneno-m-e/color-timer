import React, { useRef, useCallback } from "react";
import ColourPicker from "../ColourPicker/ColourPicker";
import { RgbColor } from "react-colorful";
import "./Interval.css";

type Props = {
  index: number;
  firstColour: RgbColor;
  lastColour: RgbColor;
  onDurationChange: (index: number, duration: number) => void;
  onColourChange: (index: number, id: string, colour: RgbColor) => void;
  onDelete: (index: number) => void;
};

const Interval = ({
  index,
  firstColour,
  lastColour,
  onDurationChange,
  onColourChange,
  onDelete,
}: Props) => {
  const hoursInput = useRef<HTMLInputElement>(null);
  const minutesInput = useRef<HTMLInputElement>(null);
  const secondsInput = useRef<HTMLInputElement>(null);

  const handleDurationChange = useCallback(() => {
    const hours: number = hoursInput.current?.valueAsNumber || 0;
    const minutes: number = minutesInput.current?.valueAsNumber || 0;
    const seconds: number = secondsInput.current?.valueAsNumber || 0;
    const duration: number = (hours * 3600 + minutes * 60 + seconds) * 1000;

    onDurationChange(index, duration);
  }, [index, onDurationChange]);

  const handleDeleteInterval = useCallback(() => {
    onDelete(index);
  }, [index, onDelete]);

  return (
    <div className="interval">
      <div id="duration">
        <label htmlFor="hours">H</label>
        <input
          id="hours"
          type="number"
          placeholder="00"
          ref={hoursInput}
          onChange={handleDurationChange}
        />

        <label htmlFor="minutes">M</label>
        <input
          id="minutes"
          type="number"
          placeholder="00"
          ref={minutesInput}
          onChange={handleDurationChange}
        />

        <label htmlFor="seconds">S</label>
        <input
          id="seconds"
          type="number"
          placeholder="00"
          ref={secondsInput}
          onChange={handleDurationChange}
        />
      </div>
      <ColourPicker
        id="firstColour"
        label="First Colour"
        index={index}
        colour={firstColour}
        onColourChange={onColourChange}
      />
      <ColourPicker
        id="lastColour"
        label="Last Colour"
        index={index}
        colour={lastColour}
        onColourChange={onColourChange}
      />
      {index > 0 && (
        <button
          type="button"
          className="delete-button"
          onClick={handleDeleteInterval}
        >
          X
        </button>
      )}
    </div>
  );
};

export default Interval;
