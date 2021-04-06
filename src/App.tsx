import React, { useState, useCallback, useRef } from "react";
import "./App.css";
import { formatToRGB, getRGBValues } from "./util";

// Utilitaire -> move it somewhere else

function App() {
  const [isActive, setIsActive] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const duration = 5 * 1000;
  const [currentDate, setCurrentDate] = useState<Date>();
  const [firstColour, setFirstColour] = useState("rgb(52,111,171)"); // <= set by user
  const [lastColour, setLastColour] = useState("rgb(226,255,79)"); // <= set by user

  const start = useCallback(() => {
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
    // setInterval interval = to determine, but no need to refresh every seconds for long durations. Need to figure out what the best ratios are.
    // maybe need to consider amplitude between colours as well?
  }, []);

  let currentColour = firstColour;

  if (currentDate && startDate) {
    const firstColourValues = getRGBValues(firstColour);
    const lastColourValues = getRGBValues(lastColour);

    const timeSpentRatio =
      (currentDate.getTime() - startDate.getTime()) / duration;

    const colourDifference = lastColourValues.map(
      (num, i) => num - firstColourValues[i]
    );

    const changeAmount = colourDifference.map((val) =>
      Math.round(val * timeSpentRatio)
    );
    // Note: variations can be negative numbers
    // /!\ changeAmount need to be integers /!\

    const currentColourValues = firstColourValues.map(
      (num, i) => num + changeAmount[i]
    );

    currentColour = formatToRGB(currentColourValues);
  }

  return (
    <div className="App" style={{ backgroundColor: currentColour }}>
      <header
        id="timer"
        className={`App-header${isActive ? " App-header--active" : ""}`}
      >
        <input id="duration" type="Text" />
        {/* 1: */}
        {/* Change it to <input type="number"/> */}
        {/* 5 of them in a row for hours minutes seconds */}
        {/* Add 2 <input type="colour"/> to get 1st and last colour*/}
        {/* On Submit, grab values with hooks and see 2: */}

        <button onClick={start}>Start!</button>
      </header>
    </div>
  );
}

export default App;
