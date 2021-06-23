import React, { useState, useCallback, FormEvent } from "react";
import { RgbColor } from "react-colorful";
import "./App.css";
import Form from "./Form/Form";
import { formatToRGBString } from "./util";

function App() {
  const [isActive, setIsActive] = useState(false);
  const [firstColour, setFirstColour] = useState<RgbColor>({
    r: 155,
    g: 45,
    b: 102,
  });
  const [lastColour, setLastColour] = useState<RgbColor>({
    r: 24,
    g: 101,
    b: 47,
  });
  const [duration, setDuration] = useState(0);
  const [startDate, setStartDate] = useState<Date>();
  const [currentDate, setCurrentDate] = useState<Date>();

  const start = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      setIsActive(true);
      const updatedStartDate = new Date();
      setStartDate(updatedStartDate);
      // To do: Save intervalID outside callback so it can be used to pause or clear timer. const intervalID = useRef
      const intervalID = setInterval(() => {
        const updatedCurrentDate = new Date();
        if (
          updatedCurrentDate.getTime() >=
          updatedStartDate.getTime() + duration
        ) {
          clearInterval(intervalID);
          setIsActive(false);
          setStartDate(undefined);
          setCurrentDate(undefined);
        }
        setCurrentDate(updatedCurrentDate);
      }, duration / 256);
    },
    [duration]
  );

  let currentColour = firstColour;

  if (currentDate && startDate) {
    const timeSpentRatio =
      (currentDate.getTime() - startDate.getTime()) / duration;

    const changeAmount = {
      r: Math.round((lastColour.r - firstColour.r) * timeSpentRatio),
      g: Math.round((lastColour.g - firstColour.g) * timeSpentRatio),
      b: Math.round((lastColour.b - firstColour.b) * timeSpentRatio),
    };
    // Note: variations can be negative numbers
    // /!\ changeAmount need to be integers /!\

    currentColour = {
      r: firstColour.r + changeAmount.r,
      g: firstColour.g + changeAmount.g,
      b: firstColour.b + changeAmount.b,
    };
  }

  return (
    <div
      className="App"
      style={{ backgroundColor: formatToRGBString(currentColour) }}
    >
      {!isActive && (
        <Form
          start={start}
          setDuration={setDuration}
          firstColour={firstColour}
          setFirstColour={setFirstColour}
          lastColour={lastColour}
          setLastColour={setLastColour}
        />
      )}
      {isActive && (
        <div
          className="endColourCircle"
          style={{ backgroundColor: formatToRGBString(lastColour) }}
        ></div>
      )}
    </div>
  );
}

export default App;
