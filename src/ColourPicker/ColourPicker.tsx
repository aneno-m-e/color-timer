import React, { useCallback, useRef, useState } from "react";
import { RgbColorPicker, RgbColor } from "react-colorful";
import { formatToRGBString, useClickOutside } from "../util";
import "./ColourPicker.css";

type Props = {
  id: string;
  label: string;
  index: number;
  colour: RgbColor;
  onColourChange: (index: number, id: string, colour: RgbColor) => void;
};

function ColourPicker({ id, label, index, colour, onColourChange }: Props) {
  const popover = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => {
    setIsOpen((currentValue) => !currentValue);
  }, []);

  useClickOutside(popover, toggle);

  const handleColourChange = useCallback(
    (colour: RgbColor) => {
      onColourChange(index, id, colour);
    },
    [index, id, onColourChange]
  );

  return (
    <div className="picker-container">
      <label htmlFor={id}>
        {label}
        <button
          type="button"
          style={{ backgroundColor: formatToRGBString(colour) }}
          onClick={toggle}
        ></button>
      </label>
      {isOpen && (
        <div className="picker" ref={popover}>
          <RgbColorPicker color={colour} onChange={handleColourChange} />
        </div>
      )}
    </div>
  );
}

export default ColourPicker;
