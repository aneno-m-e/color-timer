import React, { useRef, useCallback, useState } from "react";
import ColourPicker from "./ColourPicker/ColourPicker";
import { RgbColor } from "react-colorful";

type Props = {
  index: number;
  onDurationChange: (index: number, duration: {}) => void;
};

const Interval = ({ index, onDurationChange }: Props) => {
  const hoursInput = useRef<HTMLInputElement>(null);
  const minutesInput = useRef<HTMLInputElement>(null);
  const secondsInput = useRef<HTMLInputElement>(null);

  // don't need:
  const [firstColour, setFirstColour] = useState<RgbColor>({
    r: 24,
    g: 31,
    b: 47,
  });
  const [lastColour, setLastColour] = useState<RgbColor>({
    r: 255,
    g: 238,
    b: 187,
  });

  const handleDurationChange = useCallback(() => {
    const hours: number = hoursInput.current?.valueAsNumber || 0;
    const minutes: number = minutesInput.current?.valueAsNumber || 0;
    const seconds: number = secondsInput.current?.valueAsNumber || 0;
    const duration: number = (hours * 3600 + minutes * 60 + seconds) * 1000;

    onDurationChange(index, duration);
  }, [index, onDurationChange]);

  return (
    <>
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
        colour={firstColour}
        setColour={setFirstColour}
      />
      <ColourPicker
        id="lastColour"
        label="Last Colour"
        colour={lastColour}
        setColour={setLastColour}
      />
    </>
  );
};

export default Interval;
