import React, { useState, useCallback, FormEvent } from "react";
import { RgbColor } from "react-colorful";
import "./App.css";
import Form from "./Form/Form";
import { formatToRGBString } from "./util";

export type TInterval = {
  firstColour: RgbColor;
  lastColour: RgbColor;
  duration: number;
};

const defaultIntervals = [
  {
    firstColour: { r: 24, g: 31, b: 47 },
    lastColour: { r: 255, g: 238, b: 187 },
    duration: 0,
  },
];

function App() {
  // To do
  // - Check accessibility
  // - Test
  // - Display error message if duration = 0
  // - Implemente pause and restart
  // - Create favicon
  // - timer with multiple intervals doesn't work for longer durations
  // - Fix false first start
  // - Hide delete button of first interval if it's by itself
  // - Improve auto generation of last colours https://github.com/bgrins/TinyColor
  // - Create utils with previousInterval and nextInterval to make code more readable?

  const [isActive, setIsActive] = useState(false);

  const [intervals, setIntervals] = useState<TInterval[]>(defaultIntervals);

  const [startDate, setStartDate] = useState<Date>();
  const [currentDate, setCurrentDate] = useState<Date>();
  const [totalDuration, setTotalDuration] = useState<number>(0);
  const [intervalDuration, setIntervalDuration] = useState(0);
  const [index, setIndex] = useState<number>(0); // Remove 0?

  const start = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      try {
        if (totalDuration === 0) throw new Error("Duration = 0");
      } catch (err) {
        console.error(err.message);
        return false;
      }

      setIsActive(true);
      timer();
    },
    [timer, totalDuration]
  );

  // Need to solve React error: "The 'timer' function makes the dependencies of useCallback Hook (at line 57) change on every render.
  // Move it inside the useCallback callback.
  // Alternatively, wrap the definition of 'timer' in its own useCallback() Hook"
  async function timer() {
    for (let index = 0; index < intervals.length; index++) {
      let interval = intervals[index];
      const updatedStartDate = new Date();
      setStartDate(updatedStartDate);
      setIntervalDuration(interval.duration);
      setIndex(index);

      await new Promise((resolve, reject) => {
        // To do: Save intervalID outside callback so it can be used to pause or clear timer. const intervalID = useRef
        const intervalID = setInterval(() => {
          const updatedCurrentDate = new Date();
          if (
            updatedCurrentDate.getTime() >=
            updatedStartDate.getTime() + intervalDuration
          ) {
            if (index === intervals.length - 1) {
              setIsActive(false);
              setStartDate(undefined);
              setCurrentDate(undefined);
              //     setIntervalDuration(0);
            }
            clearInterval(intervalID);
            resolve("End of interval");
          }
          setCurrentDate(updatedCurrentDate);
        }, intervalDuration / 256);
      });
    }
  }

  let currentColour = intervals[0].firstColour;

  if (currentDate && startDate) {
    const timeSpentRatio =
      (currentDate.getTime() - startDate.getTime()) / intervals[index].duration;

    const changeAmount = {
      r: Math.round(
        (intervals[index].lastColour.r - intervals[index].firstColour.r) *
          timeSpentRatio
      ),
      g: Math.round(
        (intervals[index].lastColour.g - intervals[index].firstColour.g) *
          timeSpentRatio
      ),
      b: Math.round(
        (intervals[index].lastColour.b - intervals[index].firstColour.b) *
          timeSpentRatio
      ),
    };
    // Note: variations can be negative numbers
    // /!\ changeAmount need to be integers /!\

    currentColour = {
      r: intervals[index].firstColour.r + changeAmount.r,
      g: intervals[index].firstColour.g + changeAmount.g,
      b: intervals[index].firstColour.b + changeAmount.b,
    };
  }

  return (
    <div
      className="App"
      style={{
        backgroundColor: formatToRGBString(currentColour),
      }}
    >
      {!isActive && (
        <Form
          start={start}
          intervals={intervals}
          setIntervals={setIntervals}
          setTotalDuration={setTotalDuration}
        />
      )}
      {isActive &&
        intervals.map((interval, index) => (
          <div
            className="firstToLastColourCircle"
            key={index}
            style={{
              backgroundImage: `linear-gradient(to right, ${formatToRGBString(
                interval.firstColour
              )}, ${formatToRGBString(interval.lastColour)})`,
              // backgroundColor:  formatToRGBString(intervals[index].lastColour),
            }}
          ></div>
        ))}
    </div>
  );
}

export default App;
