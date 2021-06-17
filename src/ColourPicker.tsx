import React, { useCallback, useState } from "react";
import { RgbColorPicker, RgbColor } from "react-colorful";
import { formatToRGBString } from "./util";

type Props = {
  id: string;
  label: string;
  colour: RgbColor;
  setColour: (colour: RgbColor) => void;
};

function ColourPicker({ id, label, colour, setColour }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => {
    setIsOpen((currentValue) => !currentValue);
  }, []);

  return (
    <>
      <label htmlFor={id}>
        {label}
        <button
          type="button"
          style={{ backgroundColor: formatToRGBString(colour) }}
          onClick={toggle}
        ></button>
      </label>
      <div className="picker">
        {isOpen && <RgbColorPicker color={colour} onChange={setColour} />}
      </div>
    </>
  );
}

export default ColourPicker;
