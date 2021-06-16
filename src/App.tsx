import React, { useState, useCallback, FormEvent } from "react";
import { RgbColor } from "react-colorful";
import "./App.css";
import Form from "./Form";
import { formatToRGBString } from "./util";

function App() {
  const [isActive, setIsActive] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const duration = 30 * 1000;
  const [currentDate, setCurrentDate] = useState<Date>();
  const [firstColour, setFirstColour] = useState<RgbColor>({
    r: 155,
    g: 45,
    b: 102,
  }); // <= set by user
  const [lastColour, setLastColour] = useState<RgbColor>({
    r: 24,
    g: 101,
    b: 47,
  }); // <= set by user

  const start = useCallback((event: FormEvent) => {
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
      }
      setCurrentDate(updatedCurrentDate);
    }, duration / 256);
  }, []);

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
      <header
        id="timer"
        className={`App-header${isActive ? " App-header--active" : ""}`}
      ></header>
      <Form
        start={start}
        firstColour={firstColour}
        setFirstColour={setFirstColour}
        lastColour={lastColour}
        setLastColour={setLastColour}
      />
    </div>
  );
}

export default App;
