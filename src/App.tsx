import React, { useState, useCallback, useRef } from "react";
import "./App.css";

// Utilitaire -> move it somewhere else
const getRGBValues = (colour: string): number[] => {
  return colour.match(/\d+/g)?.map((e) => +e)!; // Unary plus. Industry standard: parseInt(e, 10)
  // ! = forces TS to discard possibility of a null result
};

function App() {
  const [isActive, setIsActive] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const duration = 20 * 1000;
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
      console.log(intervalID);
      setCurrentDate(updatedCurrentDate);
    }, 2000);
    // setInterval interval = to determine, but no need to refresh every seconds for long durations. Need to figure out what the best ratios are.
    // maybe need to consider amplitude between colours as well?
  }, []);

  let updatedColour = firstColour;

  const firstColourValues = getRGBValues(firstColour);
  const lastColourValues = getRGBValues(lastColour);

  const VariationsPerInterval = lastColourValues.map((num, i) =>
    Math.round((num - firstColourValues[i]) / 20)
  );
  // (divide by the number of time the colour is going to be refreshed instead of 20)
  // Note: variations can be negative numbers
  // /!\ Variations need to be integers /!\

  let colourValues = [];
  colourValues = firstColourValues; // need to define in 2. and pass to the newColoursValues function. Then update its value in setInterval
  let newColour = (colourValues: number[]) => {
    let newColourValues = colourValues.map(
      (num, i) => num + VariationsPerInterval[i]
    );
    return (
      "rgb(" +
      newColourValues[0] +
      ", " +
      newColourValues[1] +
      ", " +
      newColourValues[2] +
      ")"
    );
  };

  //need to put following part into 2.
  // document.getElementById("timer").style (need to find correct path / or update state but how? )
  // = newColour

  return (
    <div className="App" style={{ backgroundColor: updatedColour }}>
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
